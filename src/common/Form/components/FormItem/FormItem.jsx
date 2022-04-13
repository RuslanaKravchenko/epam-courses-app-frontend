import React from 'react';
import { Form } from 'antd';

import PropTypes from 'prop-types';

import * as constants from 'constants';

const FormItem = ({ name, label, className, children }) => {
	if (name === 'name') {
		return (
			<Form.Item
				name={name}
				label={label}
				rules={[
					{
						required: true,
						message: constants.AUTH_FORM_NAME_FIELD_REQUIRED,
						whitespace: true,
					},
					{
						min: 2,
						message: constants.AUTH_FORM_NAME_FIELD_LENGTH,
					},
				]}
				className={className}
			>
				{children}
			</Form.Item>
		);
	}

	if (name === 'email') {
		return (
			<Form.Item
				name={name}
				label={label}
				rules={[
					{
						type: 'email',
						message: constants.AUTH_FORM_EMAIL_FIELD_NOT_VALID,
					},
					{
						required: true,
						message: constants.AUTH_FORM_EMAIL_FIELD_REQUIRED,
					},
				]}
				className={className}
			>
				{children}
			</Form.Item>
		);
	}

	if (name === 'password') {
		return (
			<Form.Item
				name={name}
				label={label}
				rules={[
					{
						required: true,
						message: constants.AUTH_FORM_PASSWORD_FIELD_REQUIRED,
					},
					{
						min: 6,
						message: constants.AUTH_FORM_PASSWORD_FIELD_LENGTH,
					},
				]}
				hasFeedback
				className={className}
			>
				{children}
			</Form.Item>
		);
	}
	return <Form.Item>{children}</Form.Item>;
};

FormItem.defaultProps = {
	name: '',
	className: '',
	label: '',
};

FormItem.propTypes = {
	name: PropTypes.string,
	children: PropTypes.element.isRequired,
	className: PropTypes.string,
	label: PropTypes.string,
};

export default FormItem;
