import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { CourseCard, SearchBar } from './components';
import { Button } from 'common';

import {
	BUTTON_TEXT_ADD_NEW_COURSE,
	COURSES_DEFAULT_TEXT,
} from '../../constants';

import CoursesStyled from './CoursesStyled';

import { getCoursesByFilter } from 'helpers/getCoursesByFilter';

import coursesSelectors from 'store/courses/selectors';

import authSelectors from 'store/user/selectors';

const Courses = () => {
	const allCourses = useSelector(coursesSelectors.getCourses);
	const isAdmin = useSelector(authSelectors.isAdmin);

	const [currentFilterValue, setCurrentFilterValue] = useState('');
	const [visibleCourses, setVisibleCourses] = useState([]);

	useEffect(() => {
		setVisibleCourses(getCoursesByFilter(allCourses, currentFilterValue));
	}, [currentFilterValue, allCourses]);

	return (
		<CoursesStyled>
			<div className='container'>
				<div className='searchBar__wrapper'>
					<SearchBar setCurrentFilterValue={setCurrentFilterValue} />

					{isAdmin && (
						<Link to='/courses/add'>
							<Button
								data-testid='add-course'
								buttonText={BUTTON_TEXT_ADD_NEW_COURSE}
								className='searchBar__addCourse'
							/>
						</Link>
					)}
				</div>

				{visibleCourses.length ? (
					<ul data-testid='courses-list' className='coursesList list'>
						{visibleCourses.map(course => (
							<li key={course.id} className='coursesList__item'>
								<CourseCard course={course} />
							</li>
						))}
					</ul>
				) : (
					<p data-testid='courses-error' className='defaultText'>
						{COURSES_DEFAULT_TEXT}
					</p>
				)}
			</div>
		</CoursesStyled>
	);
};

export default Courses;
