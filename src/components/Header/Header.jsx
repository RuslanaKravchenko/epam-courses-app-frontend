import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'common';
import { Logo } from './components';

import { BUTTON_TEXT_HEADER } from 'constants';

import HeaderStyled from './headerStyled';

import authSelectors from 'store/user/selectors';
import { logoutOperation } from 'store/user/userSlice';

const Header = () => {
	const isAuth = useSelector(authSelectors.isAuthenticated);
	const userName = useSelector(authSelectors.getUserName);

	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logoutOperation());
	};
	return (
		<HeaderStyled className='header'>
			<div className='container'>
				<Logo />
				{isAuth && userName && (
					<p data-testid='userName' className='userName'>
						{userName}
					</p>
				)}
				{isAuth && (
					<Button
						buttonText={BUTTON_TEXT_HEADER}
						className='header__btn'
						onClick={onLogout}
					/>
				)}
			</div>
		</HeaderStyled>
	);
};

export default Header;
