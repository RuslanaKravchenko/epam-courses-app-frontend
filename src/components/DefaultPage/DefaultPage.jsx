import React from 'react';
import { Link } from 'react-router-dom';

import * as constants from 'constants';

import imagePath from 'assets/pusheen.jpg';
import DefaultPageStyled from './DefaultPageSyyled';

const DefaultPage = () => (
	<DefaultPageStyled>
		<h1 className='default_title'>404</h1>
		<img
			className='default_image'
			src={imagePath}
			alt='cat detective'
			width='200'
		/>
		<p className='default_text'>
			{constants.DWFAULT_PAGE_TEXT_1}
			<Link className='default_link' to='/'>
				{constants.DWFAULT_PAGE_TEXT_LINK}
			</Link>
			{constants.DWFAULT_PAGE_TEXT_2}
		</p>
	</DefaultPageStyled>
);

export default DefaultPage;
