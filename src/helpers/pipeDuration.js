export const pipeDuration = duration => {
	const hours = Math.trunc(duration / 60);
	const minutes = duration % 60;

	const formattedDuration = `${hours < 10 ? '0' + hours : hours}:${
		minutes < 10 ? '0' + minutes : minutes
	}`;
	return formattedDuration;
};
