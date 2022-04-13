import React from 'react';
import PropTypes from 'prop-types';

import { Input as InputAnt } from 'antd';
const { TextArea } = InputAnt;

const Textarea = ({
	placeholderText,
	onChange,
	onBlur,
	value,
	rows,
	name,
	...props
}) => {
	return (
		<TextArea
			value={value}
			rows={rows}
			placeholder={placeholderText}
			autoSize={{ minRows: 3, maxRows: 5 }}
			name={name}
			onChange={onChange}
			onBlur={onBlur}
			{...props}
		/>
	);
};

Textarea.defaultProps = {
	onBlur: null,
};

Textarea.propTypes = {
	placeholderText: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	value: PropTypes.string.isRequired,
	rows: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
};

export default Textarea;
