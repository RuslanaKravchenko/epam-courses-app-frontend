import React from 'react';
import PropTypes from 'prop-types';

import { Input, Button, Form, FormItem } from 'common';

import * as constants from 'constants';

import RegistrationFormStyled from './RegistrationFormStyled.js';

const RegistrationForm = ({ onSubmit }) => {
	const onFinish = values => {
		onSubmit(values);
	};

	return (
		<RegistrationFormStyled>
			<Form name='authForm' onFinish={onFinish} scrollToFirstError>
				<FormItem
					name='name'
					label={constants.AUTH_FORM_NAME_FIELD_LABEL}
					className='field'
				>
					<Input placeholderText={constants.AUTH_FORM_NAME_FIELD_PLACEHOLDER} />
				</FormItem>

				<FormItem
					name='email'
					label={constants.AUTH_FORM_EMAIL_FIELD_LABEL}
					className='field'
				>
					<Input
						placeholderText={constants.AUTH_FORM_EMAIL_FIELD_PLACEHOLDER}
					/>
				</FormItem>
				<FormItem
					name='password'
					label={constants.AUTH_FORM_PASSWORD_FIELD_LABEL}
					className='field'
				>
					<Input
						type='password'
						placeholderText={constants.AUTH_FORM_EMAIL_PASSWORD_PLACEHOLDER}
					/>
				</FormItem>
				<FormItem>
					<Button
						htmlType='submit'
						buttonText={constants.AUTH_FORM_REGISTRATION_BTN}
						className='auth__btn'
					/>
				</FormItem>
			</Form>
		</RegistrationFormStyled>
	);
};

RegistrationForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};

export default RegistrationForm;
