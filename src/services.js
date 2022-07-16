const axios = require('axios').default;

const axiosApiInstance = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

export const token = {
	set(token) {
		axiosApiInstance.defaults.headers.common.Authorization = token;
	},
	unset() {
		axiosApiInstance.defaults.headers.common.Authorization = '';
	},
};

axiosApiInstance.interceptors.request.use(
	function (req) {
		const localStorageData = localStorage.getItem('persist:user');
		const persistedToken = JSON.parse(localStorageData).token?.slice(1, -1);

		if (persistedToken) {
			req.headers.Authorization = persistedToken;
		}

		return req;
	},
	function (error) {
		return Promise.reject(error);
	}
);

axiosApiInstance.interceptors.response.use(
	function (response) {
		if (response.status === 201 && response.data.result) {
			token.set(response.data.result);
		}

		return response;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export const registration = userData =>
	axiosApiInstance.post('/register', userData);
export const login = userData => axiosApiInstance.post('/login', userData);
export const logout = () => axiosApiInstance.delete('/logout');

export const getCurrentUser = () => axiosApiInstance.get('/users/me');

export const getAllCourses = () => axiosApiInstance.get('/courses/all');
export const createCourse = data => axiosApiInstance.post('/courses/add', data);
export const deleteCourse = id => axiosApiInstance.delete(`/courses/${id}`);
export const updateCourse = course => {
	const { id, ...data } = course;
	return axiosApiInstance.put(`/courses/${id}`, data);
};

export const getAllAuthors = () => axiosApiInstance.get('/authors/all');
export const createAuthor = data => axiosApiInstance.post('/authors/add', data);
