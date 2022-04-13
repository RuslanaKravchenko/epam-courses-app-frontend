import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button, Input, InputNumber, Textarea } from 'common';

import { pipeDuration } from 'helpers/pipeDuration';

import * as constants from '../../constants';

import CourseFormStyled from './CourseFormStyled';

const CourseForm = ({
	allVisibleAuthors,
	addedCourseAuthors,
	onHandleChange,
	onHandleChangeAuthorName,
	onHandleChangeDuration,

	onHandleAddAuthor,
	onHandleDeleteAuthor,
	onHandleBlurDuration,

	onHandleCreateAuthor,
	newAuthor,
	newCourse,
	errors,
	onSubmit,

	isEdit,
}) => {
	return (
		<CourseFormStyled>
			<Link className='back' to='/courses'>
				{constants.COURSE_INFO_BACK_BTN}
			</Link>

			<form onSubmit={onSubmit} className='container' data-testid='courseForm'>
				<div className='top__wrapper'>
					<div className='titleFild'>
						<Input
							labelText={constants.CREATE_COURSE_TITLE_FIELD_LABEL}
							placeholderText={constants.CREATE_COURSE_TITLE_FIELD_PLACEHOLDER}
							onChange={onHandleChange}
							value={newCourse.title}
							name='title'
						/>
						{errors.title && <p className='error'>{errors.title}</p>}
					</div>

					<Button
						buttonText={
							isEdit
								? constants.UPDATE_COURSE_BUTTON_TEXT
								: constants.CREATE_COURSE_BUTTON_TEXT
						}
						htmlType='submit'
						ghost={false}
						className='createCourse__btn'
					/>
				</div>

				<div className='descriptionFild'>
					<label>
						<span className='label'>
							{constants.CREATE_COURSE_DESCRIPTION_FIELD_LABEL}
						</span>

						<Textarea
							value={newCourse.description}
							rows={3}
							placeholderText={
								constants.CREATE_COURSE_DESCRIPTION_FIELD_PLACEHOLDER
							}
							name='description'
							onChange={onHandleChange}
						/>

						{errors.description && (
							<p className='error'>{errors.description}</p>
						)}
					</label>
				</div>

				<div className='metaInfo'>
					<div>
						<div className='addAuthorFild'>
							<p className='subtitle'>
								{constants.CREATE_COURSE_ADD_AUTHOR_FIELD_TITLE}
							</p>
							<Input
								labelText={constants.CREATE_COURSE_ADD_AUTHOR_FIELD_LABEL}
								placeholderText={
									constants.CREATE_COURSE_ADD_AUTHOR_FIELD_PLACEHOLDER
								}
								onChange={onHandleChangeAuthorName}
								value={newAuthor.name}
								name='authorName'
							/>
							{errors.authorName && (
								<p className='error'>{errors.authorName}</p>
							)}
						</div>

						<Button
							buttonText={constants.CREATE_COURSE_ADD_AUTHOR_FIELD_BUTTON_TEXT}
							className='createAuthor__btn'
							onClick={onHandleCreateAuthor}
						/>

						<div className='durationFild'>
							<p className='subtitle'>
								{constants.CREATE_COURSE_DURATION_FIELD_TITLE}
							</p>

							<label>
								<span className='label'>
									{constants.CREATE_COURSE_DURATION_FIELD_LABEL}
								</span>
								<InputNumber
									name='duration'
									onChange={onHandleChangeDuration}
									onBlur={onHandleBlurDuration}
									value={newCourse.duration}
									placeholderText={
										constants.CREATE_COURSE_DURATION_FIELD_PLACEHOLDER
									}
									style={{ width: '100%' }}
								/>
							</label>

							{errors.duration && <p className='error'>{errors.duration}</p>}

							<p className='durationFild__output'>
								{constants.CREATE_COURSE_DURATION_OUTPUT_TITLE}:
								<span>{pipeDuration(newCourse.duration)}</span>
								{constants.CREATE_COURSE_DURATION_OUTPUT_TEXT}
							</p>
						</div>
					</div>

					<div>
						<div className='authorsFild'>
							<p className='subtitle'>
								{constants.CREATE_COURSE_AUTHORS_FIELD_TITLE}
							</p>
							{allVisibleAuthors.length ? (
								<ul data-testid='all-authors' className='authorsList list'>
									{allVisibleAuthors.map(author => (
										<li
											key={author.id}
											className='authorsList__item'
											data-testid='authors-list-item'
										>
											<p className='name'>{author.name}</p>
											<Button
												buttonText={constants.CREATE_COURSE_ADD_AUTHOR_BUTTON}
												onClick={onHandleAddAuthor(author.id)}
											/>
										</li>
									))}
								</ul>
							) : (
								<p>{constants.CREATE_COURSE_AUTHORS_DEFAULT_TEXT}</p>
							)}
						</div>

						<div className='courseAuthorsFild'>
							<p className='subtitle'>
								{constants.CREATE_COURSE_COURSE_AUTHORS_FIELD_TITLE}
							</p>

							{addedCourseAuthors.length ? (
								<ul className='authorsList list' data-testid='course-authors'>
									{addedCourseAuthors.map(author => (
										<li
											key={author.id}
											className='authorsList__item'
											data-testid='course-list-item'
										>
											<p className='name'>{author.name}</p>
											<Button
												data-testid='delete-author-btn'
												buttonText={
													constants.CREATE_COURSE_DELETE_AUTHOR_BUTTON
												}
												onClick={onHandleDeleteAuthor(author.id)}
											/>
										</li>
									))}
								</ul>
							) : (
								<p
									data-testid='course-authors-error'
									className={errors.authors ? 'error' : ''}
								>
									{constants.CREATE_COURSE_AUTHORS_DEFAULT_TEXT}
								</p>
							)}
						</div>
					</div>
				</div>
			</form>
		</CourseFormStyled>
	);
};

CourseForm.defaultProps = {
	newAuthor: null,
	errors: {
		title: '',
		description: '',
		authorName: '',
		authors: false,
		duration: '',
	},
};

CourseForm.propTypes = {
	allVisibleAuthors: PropTypes.arrayOf(
		PropTypes.shape({ name: PropTypes.string, id: PropTypes.string })
	).isRequired,
	addedCourseAuthors: PropTypes.arrayOf(
		PropTypes.shape({ name: PropTypes.string, id: PropTypes.string })
	).isRequired,

	onHandleChange: PropTypes.func.isRequired,
	onHandleChangeAuthorName: PropTypes.func.isRequired,
	onHandleChangeDuration: PropTypes.func.isRequired,

	onHandleAddAuthor: PropTypes.func.isRequired,
	onHandleDeleteAuthor: PropTypes.func.isRequired,
	onHandleBlurDuration: PropTypes.func.isRequired,
	onHandleCreateAuthor: PropTypes.func.isRequired,

	newAuthor: PropTypes.shape({ name: PropTypes.string }),
	newCourse: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		creationDate: PropTypes.string,
		duration: PropTypes.number,
		authors: PropTypes.arrayOf(PropTypes.string),
	}).isRequired,

	errors: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		authorName: PropTypes.string,
		authors: PropTypes.bool,
		duration: PropTypes.string,
	}),
	onSubmit: PropTypes.func.isRequired,

	isEdit: PropTypes.bool.isRequired,
};

export default CourseForm;
