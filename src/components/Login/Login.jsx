import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import * as constants from 'constants';
import { signInOperation } from 'store/user/userSlice';
import authSelectors from 'store/user/selectors';

import LoginForm from './components/LoginForm';

import LoginStyled from './LoginStyled';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isAuth = useSelector(authSelectors.isAuthenticated);

	const errors = useSelector(authSelectors.getErrors);

	useEffect(() => {
		if (isAuth) {
			navigate('/courses');
		}
	}, [isAuth, navigate]);

	const onSubmit = useCallback(
		async values => {
			const user = {
				password: values.password,
				email: values.email,
			};

			dispatch(signInOperation(user));
		},
		[dispatch]
	);

	return (
		<div className='container'>
			<LoginStyled>
				<h1 className='title'>{constants.LOGIN_PAGE_TITLE}</h1>
				<LoginForm onSubmit={onSubmit} />

				<p className='text'>
					{constants.LOGIN_PAGE_TEXT}
					<Link className='link' to='/registration'>
						{constants.REGISTRATION_PAGE_TITLE}
					</Link>
				</p>

				{errors?.length !== 0 && <p className='error'>{errors?.join(' ')}</p>}
			</LoginStyled>
		</div>
	);
};

export default Login;
