import React from 'react';
import { Form as FormAnt } from 'antd';

import PropTypes from 'prop-types';

const Form = ({ onFinish, scrollToFirstError, name, children }) => {
	const [form] = FormAnt.useForm();

	return (
		<FormAnt
			form={form}
			onFinish={onFinish}
			scrollToFirstError={scrollToFirstError}
			name={name}
		>
			{children}
		</FormAnt>
	);
};

Form.defaultProps = {
	scrollToFirstError: true,
};

Form.propTypes = {
	onFinish: PropTypes.func.isRequired,
	scrollToFirstError: PropTypes.bool,
	name: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default Form;
