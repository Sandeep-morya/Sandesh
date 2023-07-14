import { useState, useRef, useEffect, useCallback } from "react";

const useTimer = (seconds: number) => {
	const [timer, setTimer] = useState(seconds);
	const id = useRef<NodeJS.Timer | null>(null);

	const stopTimer = useCallback(() => {
		if (id.current) {
			clearInterval(id.current);
		}
	}, [id]);

	const timerReset = useCallback(() => {
		stopTimer();
		setTimer(seconds);
	}, [id]);

	const startTimer = useCallback(() => {
		if (id.current) {
			clearInterval(id.current);
		}
		id.current = setInterval(() => {
			setTimer((e) => {
				if (e <= 1) {
					clearInterval(id.current);
					return 0;
				} else {
					return e - 1;
				}
			});
		}, 1000);
	}, [id]);

	useEffect(() => {
		startTimer();
		return stopTimer;
	}, []);

	console.log(id);

	return { timer, startTimer, timerReset, stopTimer };
};

export default useTimer;
