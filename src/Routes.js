import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CourseFormContainer from './components/CourseForm/CourseFormContainer';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses';
import DefaultPage from './components/DefaultPage/DefaultPage';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import Registration from './components/Registration/Registration';
import RequireAuth from './components/RequireAuth/RequireAuth';

const AppRoutes = () => {
	return (
		<Routes>
			<Route exect path='/' element={<Navigate to='/courses' replace />} />

			<Route path='/registration' element={<Registration />} />
			<Route path='/login' element={<Login />} />

			<Route element={<RequireAuth />}>
				<Route path='/courses' element={<Courses />} />
				<Route path='courses/:courseId' element={<CourseInfo />} />

				<Route
					path='/courses/add'
					element={
						<PrivateRoute>
							<CourseFormContainer />
						</PrivateRoute>
					}
				/>

				<Route
					path='/courses/update/:courseId'
					element={
						<PrivateRoute>
							<CourseFormContainer />
						</PrivateRoute>
					}
				/>
			</Route>

			<Route path='*' element={<DefaultPage />} />
		</Routes>
	);
};

export default AppRoutes;
