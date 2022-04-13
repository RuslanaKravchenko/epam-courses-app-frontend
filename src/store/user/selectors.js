const isAuthenticated = state => state.user.isAuth;
const getUserName = state => state.user.name;
const getToken = state => state.user.token;
const isAdmin = state => state.user.role === 'admin';

const getErrors = state => state.user.errors;

const authSelectors = {
	isAuthenticated,
	getUserName,
	getToken,
	isAdmin,

	getErrors,
};

export default authSelectors;
