import { useState, useEffect } from "react";

function useTimeAgo(timestamp: Date) {
	const [timeAgo, setTimeAgo] = useState("");

	useEffect(() => {
		const date = new Date(timestamp);
		const now = new Date();
		const diff = now.getTime() - date.getTime();

		const minute = 60 * 1000;
		const hour = minute * 60;
		const day = hour * 24;
		const month = day * 30;
		const year = month * 12;

		if (diff < minute) {
			setTimeAgo("just now");
		} else if (diff < hour) {
			const minutes = Math.floor(diff / minute);
			setTimeAgo(`${minutes} minute${minutes > 1 ? "s" : ""} ago`);
		} else if (diff < day) {
			const hours = Math.floor(diff / hour);
			setTimeAgo(`${hours} hour${hours > 1 ? "s" : ""} ago`);
		} else if (diff < month) {
			const days = Math.floor(diff / day);
			setTimeAgo(`${days} day${days > 1 ? "s" : ""} ago`);
		} else if (diff < year) {
			const months = Math.floor(diff / month);
			setTimeAgo(`${months} month${months > 1 ? "s" : ""} ago`);
		} else {
			const years = Math.floor(diff / year);
			setTimeAgo(`${years} year${years > 1 ? "s" : ""} ago`);
		}
	}, [timestamp]);

	return timeAgo;
}

export default useTimeAgo;
