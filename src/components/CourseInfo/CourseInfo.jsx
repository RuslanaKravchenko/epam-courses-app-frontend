import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import * as constants from '../../constants';

import { dateGenerator } from 'helpers/dateGenerator';
import { pipeDuration } from 'helpers/pipeDuration';

import authorsSelectors from 'store/authors/selectors';
import coursesSelectors from 'store/courses/selectors';

import CourseInfoStyled from './CourseInfoStyled';

const CourseInfo = () => {
	const { courseId } = useParams();

	const allCourses = useSelector(coursesSelectors.getCourses);
	const allAuthors = useSelector(authorsSelectors.getAuthors);

	const [currentCourse, setCurrentCourse] = useState({});
	const [courseAuthors, setCourseAuthors] = useState([]);

	useEffect(() => {
		const course = allCourses.find(course => course.id === courseId);

		if (course) {
			setCurrentCourse(course);
		}
	}, [allCourses, courseId]);

	useEffect(() => {
		if (currentCourse?.authors?.length) {
			const filteredAuthors = allAuthors.filter(author =>
				currentCourse.authors.includes(author.id)
			);
			setCourseAuthors([...filteredAuthors]);
		}
	}, [currentCourse?.authors, allAuthors]);

	return (
		<CourseInfoStyled>
			<div className='container'>
				<Link className='back' to='/courses'>
					{constants.COURSE_INFO_BACK_BTN}
				</Link>

				{currentCourse?.title && (
					<h1 className='title'>{currentCourse.title}</h1>
				)}

				<div className='content'>
					{currentCourse?.description && <p>{currentCourse.description}</p>}

					<div>
						{currentCourse?.id && (
							<p className='field'>
								<span className='label'>{constants.COURSE_INFO_ID_TITLE}:</span>
								{currentCourse.id}
							</p>
						)}

						{currentCourse?.duration && (
							<p className='field'>
								<span className='label'>
									{constants.COURSE_INFO_DURATION_FIELD_TITLE}:
								</span>
								<span className='duration'>
									{pipeDuration(currentCourse.duration)}
								</span>
								{constants.COURSE_INFO_DURATION_FIELD_TEXT}
							</p>
						)}

						{currentCourse?.creationDate && (
							<p className='field'>
								<span className='label'>
									{constants.COURSE_INFO_CREATED_FIELD_TITLE}:
								</span>
								{dateGenerator(currentCourse.creationDate)}
							</p>
						)}

						<div className='authors'>
							<p className='label label--authors'>
								{constants.COURSE_CARD_AUTHORS_FIELD_TITLE}:
							</p>
							{courseAuthors.length !== 0 && (
								<ul className='list'>
									{courseAuthors.map(author => (
										<li key={author.id}>{author.name}</li>
									))}
								</ul>
							)}
						</div>
					</div>
				</div>
			</div>
		</CourseInfoStyled>
	);
};

export default CourseInfo;
