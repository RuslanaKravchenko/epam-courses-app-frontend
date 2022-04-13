import React from 'react';
import PropTypes from 'prop-types';

import { Button as ButtonAnt } from 'antd';

import ButtonStyled from './ButtonStyled';

const Button = ({
	buttonText,
	onClick,
	type,
	ghost,
	className,
	icon,
	...props
}) => {
	return (
		<ButtonStyled>
			<ButtonAnt
				type={type}
				ghost={ghost}
				onClick={onClick}
				className={`button ${className}`}
				{...props}
			>
				{buttonText}
				{icon}
			</ButtonAnt>
		</ButtonStyled>
	);
};

Button.defaultProps = {
	type: 'primary',
	ghost: true,
	className: '',

	buttonText: '',
	icon: null,
	onClick: null,
};

Button.propTypes = {
	buttonText: PropTypes.string,
	icon: PropTypes.node,
	onClick: PropTypes.func,

	type: PropTypes.string,
	ghost: PropTypes.bool,
	className: PropTypes.string,
};

export default Button;
