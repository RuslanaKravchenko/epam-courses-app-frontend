export const handleError = payload => {
	let errMessage = [];

	if (payload.response) {
		const { errors, result } = payload.response.data;
		if (errors) {
			errMessage = [...errors];
		} else if (result) {
			errMessage.push(result);
		}
	}
	if (!errMessage.length) {
		errMessage.push(payload.message);
	}

	return errMessage;
};
