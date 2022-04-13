import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button } from 'common';
import sprite from 'assets/sprite.svg';

import {
	COURSE_CARD_BUTTON_TEXT,
	COURSE_CARD_AUTHORS_FIELD_TITLE,
	COURSE_CARD_DURATION_FIELD_TITLE,
	COURSE_CARD_DURATION_FIELD_TEXT,
	COURSE_CARD_CREATED_FIELD_TITLE,
} from '../../../../constants';

import { dateGenerator } from 'helpers/dateGenerator';
import { pipeDuration } from 'helpers/pipeDuration';

import authorsSelectors from 'store/authors/selectors';

import CourseCardStyled from './CourseCardStyled';
import authSelectors from 'store/user/selectors';
import { deleteCourseOperation } from 'store/courses/coursesSlice';

const CourseCard = ({ course }) => {
	const { title, description, creationDate, duration, authors, id } = course;

	const dispatch = useDispatch();
	const allAuthors = useSelector(authorsSelectors.getAuthors);
	const isAdmin = useSelector(authSelectors.isAdmin);

	const [authorsList, setAuthorsList] = useState('');

	useEffect(() => {
		const filteredAuthors = allAuthors.reduce((acc, author) => {
			if (authors.includes(author.id)) {
				acc = [...acc, author.name];
			}
			return acc;
		}, []);

		filteredAuthors.length && setAuthorsList(filteredAuthors.join(', '));
	}, [allAuthors, authors]);

	const onHandleDelete = e => {
		dispatch(deleteCourseOperation(id));
	};

	return (
		<CourseCardStyled data-testid='course-card'>
			<div className='mainInfo'>
				<p className='title'>{title}</p>
				<p className='description'>{description}</p>
			</div>

			<div className='metaInfo'>
				<p className='authors'>
					<span className='label'>{COURSE_CARD_AUTHORS_FIELD_TITLE}:</span>
					{authorsList && <span>{authorsList}</span>}
				</p>

				<p>
					<span className='label'>{COURSE_CARD_DURATION_FIELD_TITLE}:</span>
					<span>
						{pipeDuration(duration)} {COURSE_CARD_DURATION_FIELD_TEXT}
					</span>
				</p>

				<p>
					<span className='label'>{COURSE_CARD_CREATED_FIELD_TITLE}:</span>
					<span>{dateGenerator(creationDate)}</span>
				</p>
				<div className='btns'>
					<Link to={`/courses/${course.id}`}>
						<Button
							buttonText={COURSE_CARD_BUTTON_TEXT}
							className='metaInfo__infoBtn'
						/>
					</Link>

					{isAdmin && (
						<>
							<Link to={`/courses/update/${course.id}`}>
								<Button
									className='metaInfo__updateBtn'
									icon={
										<svg className='icon' width='16px' height='16px'>
											<use href={sprite + '#icon-pencil'} />
										</svg>
									}
								/>
							</Link>

							<Button
								onClick={onHandleDelete}
								className='metaInfo__deleteBtn'
								icon={
									<svg className='icon' width='16px' height='16px'>
										<use href={sprite + '#icon-bin2'} />
									</svg>
								}
							/>
						</>
					)}
				</div>
			</div>
		</CourseCardStyled>
	);
};

CourseCard.propTypes = {
	course: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		creationDate: PropTypes.string.isRequired,
		duration: PropTypes.number.isRequired,
		authors: PropTypes.arrayOf(PropTypes.string).isRequired,
	}).isRequired,
};

export default CourseCard;
