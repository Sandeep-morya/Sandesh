export const validateSeconds = (timer: number | string) => {
	timer = timer.toString();
	return timer.length === 1 ? `0${timer}` : timer;
};
