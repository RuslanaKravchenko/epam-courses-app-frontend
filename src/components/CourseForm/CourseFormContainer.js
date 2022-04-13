import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { dateGenerator } from 'helpers/dateGenerator';

import CourseForm from './CourseForm';

import {
	REQUIRED_FIELD,
	REQUIRED_ALL_FIELDS,
	AUTHOR_NAME_FIELD_LENGTH,
	DURATION_FIELD_VALUE,
	FIELD_LENGTH,
} from '../../constants';

import authorsSelectors from 'store/authors/selectors';
import {
	createCourseOperation,
	updateCourseOperation,
} from 'store/courses/coursesSlice';
import coursesSelectors from 'store/courses/selectors';
import { createAuthorOperation } from 'store/authors/authorsSlice';

const initialStateCourse = {
	title: '',
	description: '',
	creationDate: dateGenerator(),
	duration: null,
	authors: [],
};

const initialStateAuthor = {
	name: '',
};

const initialErrors = {
	title: '',
	description: '',
	authorName: '',
	authors: false,
	duration: '',
};

const CourseFormContainer = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { courseId } = useParams();

	const allCourses = useSelector(coursesSelectors.getCourses);
	const allAuthors = useSelector(authorsSelectors.getAuthors);

	const [errors, setErrors] = useState(initialErrors);

	//==== If you need to update the course ====

	const [courseToBeUpdated, setCourseToBeUpdated] = useState(null);
	useEffect(() => {
		const course = allCourses.find(course => course.id === courseId);

		if (course) {
			setCourseToBeUpdated(course);
		}
	}, [allCourses, courseId]);

	// ===== If you want to create a course  or author ======

	const [newCourse, setNewCourse] = useState(initialStateCourse);
	const [newAuthor, setNewAuthor] = useState(initialStateAuthor);

	const [allVisibleAuthors, setAllVisibleAuthors] = useState([]);
	const [addedCourseAuthors, setAddedCourseAuthors] = useState([]);

	useEffect(() => {
		if (courseToBeUpdated) {
			setNewCourse(courseToBeUpdated);
		}
	}, [courseToBeUpdated]);

	useEffect(() => {
		setAllVisibleAuthors([...allAuthors]);
	}, [allAuthors]);

	useEffect(() => {
		const addedAuthors = allAuthors.filter(author =>
			newCourse.authors.includes(author.id)
		);
		setAddedCourseAuthors([...addedAuthors]);

		const filteredAllAuthors = allAuthors.filter(
			author => !newCourse.authors.includes(author.id)
		);
		setAllVisibleAuthors([...filteredAllAuthors]);
	}, [newCourse.authors, allAuthors]);

	const onHandleChange = useCallback(e => {
		const { name, value } = e.target;

		if (!value) {
			setErrors(prev => ({
				...prev,
				[name]: REQUIRED_FIELD,
			}));
		} else if (value.length < 2) {
			setErrors(prev => ({
				...prev,
				[name]: FIELD_LENGTH,
			}));
		} else {
			setErrors(prev => ({
				...prev,
				[name]: '',
			}));
		}

		setNewCourse(prev => ({ ...prev, [name]: value }));
	}, []);

	//========================= DURATION ==========================

	const onHandleChangeDuration = useCallback(value => {
		if ((Number.isNaN(value) || Number(value) < 1) && value !== null) {
			setErrors(prev => ({
				...prev,
				duration: DURATION_FIELD_VALUE,
			}));
			setNewCourse(prev => ({ ...prev, duration: '' }));
		} else {
			setErrors(prev => ({
				...prev,
				duration: '',
			}));

			setNewCourse(prev => ({
				...prev,
				duration: value !== null ? Math.round(value) : '',
			}));
		}
	}, []);

	const onHandleBlurDuration = useCallback(e => {
		if (e.target.value === null || e.target.value === '') {
			setErrors(prev => ({
				...prev,
				[e.target.name]: REQUIRED_FIELD,
			}));
		} else if (Number.isNaN(e.target.value) || Number(e.target.value) < 1) {
			setErrors(prev => ({
				...prev,
				[e.target.name]: DURATION_FIELD_VALUE,
			}));
		} else {
			setErrors(prev => ({
				...prev,
				[e.target.name]: '',
			}));
		}
	}, []);
	//  ================== ADDING AN AUTHOR  =================

	const onHandleAddAuthor = useCallback(
		authorId => e => {
			setNewCourse(prev => ({
				...prev,
				authors: [...prev.authors, authorId],
			}));
		},
		[]
	);

	//  ================ REMOVING AN AUTHOR ============
	const onHandleDeleteAuthor = useCallback(
		id => e => {
			const authorsAfterRemoval = newCourse.authors.filter(
				authorId => authorId !== id
			);

			setNewCourse(prev => ({ ...prev, authors: [...authorsAfterRemoval] }));
		},
		[newCourse.authors]
	);

	//  ================ CREATE A NEW AUTHOR ====================
	const onHandleChangeAuthorName = useCallback(e => {
		if (e.target.value !== '' && e.target.value.length < 2) {
			setErrors(prev => ({
				...prev,
				[e.target.name]: AUTHOR_NAME_FIELD_LENGTH,
			}));
		} else {
			setErrors(prev => ({
				...prev,
				[e.target.name]: '',
			}));
		}

		setNewAuthor(prev => ({ ...prev, name: e.target.value }));
	}, []);

	const onHandleCreateAuthor = useCallback(() => {
		if (newAuthor.name.length < 2) {
			return;
		} else {
			dispatch(createAuthorOperation(newAuthor));

			setNewAuthor(initialStateAuthor);
		}
	}, [dispatch, newAuthor]);

	//  ================ CREATE A NEW COURSE ====================

	const onSubmit = useCallback(
		e => {
			e.preventDefault();

			if (
				!newCourse.title ||
				!newCourse.description ||
				!newCourse.duration ||
				newCourse.authors.length === 0
			) {
				setErrors(prev => ({
					...prev,
					title: !newCourse.title ? REQUIRED_FIELD : '',
					description: !newCourse.description ? REQUIRED_FIELD : '',
					duration: !newCourse.duration ? REQUIRED_FIELD : '',
					authors: newCourse.authors.length === 0 ? true : false,
				}));

				alert(REQUIRED_ALL_FIELDS);
				return;
			}

			if (!courseToBeUpdated) {
				dispatch(createCourseOperation(newCourse));
				navigate('/courses');
			} else if (courseToBeUpdated) {
				dispatch(updateCourseOperation({ id: courseId, ...newCourse }));
				navigate('/courses');
			}
		},
		[dispatch, navigate, courseId, courseToBeUpdated, newCourse]
	);

	return (
		<CourseForm
			allVisibleAuthors={allVisibleAuthors}
			addedCourseAuthors={addedCourseAuthors}
			onHandleChange={onHandleChange}
			onHandleChangeAuthorName={onHandleChangeAuthorName}
			onHandleChangeDuration={onHandleChangeDuration}
			onHandleBlurDuration={onHandleBlurDuration}
			onHandleAddAuthor={onHandleAddAuthor}
			onHandleDeleteAuthor={onHandleDeleteAuthor}
			onHandleCreateAuthor={onHandleCreateAuthor}
			newAuthor={newAuthor}
			newCourse={newCourse}
			errors={errors}
			onSubmit={onSubmit}
			isEdit={courseToBeUpdated ? true : false}
		/>
	);
};

export default CourseFormContainer;
