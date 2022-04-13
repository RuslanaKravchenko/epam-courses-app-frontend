import React from 'react';
import PropTypes from 'prop-types';

import { InputNumber as InputNumberAnt } from 'antd';

const InputNumber = ({
	placeholderText,
	onChange,
	onBlur,
	controls,
	value,
	name,
	style,
	...props
}) => {
	return (
		<InputNumberAnt
			name={name}
			onChange={onChange}
			onBlur={onBlur}
			controls={controls}
			value={value}
			placeholder={placeholderText}
			style={style}
			{...props}
		/>
	);
};

InputNumber.defaultProps = {
	controls: false,

	placeholderText: '',
	onChange: null,
	onBlur: null,
	value: null,
	style: null,
};

InputNumber.propTypes = {
	placeholderText: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	controls: PropTypes.bool,
	value: PropTypes.number,
	name: PropTypes.string.isRequired,
	style: PropTypes.shape({
		width: PropTypes.string,
	}),
};

export default InputNumber;
