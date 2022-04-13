import React from 'react';

import sprite from 'assets/sprite.svg';

import LogoStyled from './logoStyled';
import { Link } from 'react-router-dom';

const Logo = () => (
	<LogoStyled>
		<Link to='/'>
			<svg
				className='icon'
				width='36px'
				height='36px'
				aria-label='Logo'
				data-testid='logo'
			>
				<use href={sprite + '#icon-school'} />
			</svg>
		</Link>
	</LogoStyled>
);

export default Logo;
