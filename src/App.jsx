import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';

import Header from './components/Header/Header';

import AppRoutes from './Routes';

import { getAllAuthorsOperation } from 'store/authors/authorsSlice';
import authSelectors from 'store/user/selectors';
import { getCurrentUserOperation } from 'store/user/userSlice';
import { getAllCoursesOperation } from 'store/courses/coursesSlice';

function App() {
	const token = useSelector(authSelectors.getToken);
	const isAuth = useSelector(authSelectors.isAuthenticated);

	const dispatch = useDispatch();

	useEffect(() => {
		if (token) {
			dispatch(getCurrentUserOperation());
		}
	}, [token, dispatch]);

	useEffect(() => {
		if (isAuth) {
			dispatch(getAllCoursesOperation());
			dispatch(getAllAuthorsOperation());
		}
	}, [dispatch, isAuth]);

	return (
		<>
			<Header />

			<main>
				<AppRoutes />
			</main>
		</>
	);
}
export default App;
