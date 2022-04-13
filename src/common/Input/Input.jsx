import React from 'react';
import PropTypes from 'prop-types';

import { Input as InputAnt } from 'antd';

const { Search } = InputAnt;

const Input = ({
	labelText,
	placeholderText,
	onChange,
	value,
	className,
	type,
	onSearch,
	...props
}) => {
	return (
		<label>
			<span className='label'>{labelText}</span>

			{onSearch ? (
				<Search
					placeholder={placeholderText}
					onChange={onChange}
					value={value}
					className={className}
					type={type}
					onSearch={onSearch}
					{...props}
				/>
			) : (
				<InputAnt
					placeholder={placeholderText}
					onChange={onChange}
					value={value}
					className={className}
					type={type}
					{...props}
				/>
			)}
		</label>
	);
};

Input.defaultProps = {
	className: '',
	type: 'text',

	labelText: '',
	placeholderText: '',
	onChange: null,
	onSearch: null,
	value: '',
};

Input.propTypes = {
	labelText: PropTypes.string,
	placeholderText: PropTypes.string,
	onChange: PropTypes.func,
	onSearch: PropTypes.func,
	value: PropTypes.string,

	className: PropTypes.string,
	type: PropTypes.string,
};

export default Input;
