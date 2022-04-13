import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authSelectors from 'store/user/selectors';

import * as constants from 'constants';
import { registration } from 'services';

import RegistrationForm from './components/RegistrationForm';

import RegistrationStyled from './RegistrationStyled';
import { signUpError, signUpRequest } from 'store/user/userSlice';

const Registration = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuth = useSelector(authSelectors.isAuthenticated);

	const errors = useSelector(authSelectors.getErrors);

	useEffect(() => {
		if (isAuth) {
			navigate('/courses');
		}
	}, [isAuth, navigate]);

	const onSubmit = useCallback(
		async values => {
			const newUser = {
				name: values.name,
				password: values.password,
				email: values.email,
			};

			try {
				dispatch(signUpRequest());

				const response = await registration(newUser);

				if (response.status === 201 && response.data.successful) {
					navigate('/login', { replace: true });
				}
			} catch (error) {
				dispatch(signUpError(error));
			}
		},
		[navigate, dispatch]
	);

	return (
		<div className='container'>
			<RegistrationStyled>
				<h1 className='title'>{constants.REGISTRATION_PAGE_TITLE}</h1>
				<RegistrationForm onSubmit={onSubmit} />
				<p className='text'>
					{constants.REGISTRATION_PAGE_TEXT}
					<Link className='link' to='/login'>
						{constants.LOGIN_PAGE_TITLE}
					</Link>
				</p>
				{errors.length !== 0 && <p className='error'>{errors.join(' ')}</p>}
			</RegistrationStyled>
		</div>
	);
};

export default Registration;
