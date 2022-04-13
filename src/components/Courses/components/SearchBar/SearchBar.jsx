import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Input } from 'common';

import { SEARCHBAR_BUTTON_TEXT, SEARCHBAR_PLACEHOLDER_TEXT } from 'constants';

import SearchBarStyled from './SearchBarStyled';

const SearchBar = ({ setCurrentFilterValue }) => {
	const [filter, setFilter] = useState('');

	const onHandleChangeFilter = e => {
		if (!e.target.value) {
			setFilter(e.target.value);
			setCurrentFilterValue('');
		} else {
			setFilter(e.target.value);
		}
	};

	const onHandleClick = () => {
		setCurrentFilterValue(filter);
	};

	return (
		<SearchBarStyled>
			<Input
				placeholderText={SEARCHBAR_PLACEHOLDER_TEXT}
				onChange={onHandleChangeFilter}
				value={filter}
				className='filter'
				onSearch={onHandleClick}
			/>

			<Button buttonText={SEARCHBAR_BUTTON_TEXT} onClick={onHandleClick} />
		</SearchBarStyled>
	);
};

SearchBar.propTypes = {
	setCurrentFilterValue: PropTypes.func.isRequired,
};

export default SearchBar;
