import coursesReducer, { initialState } from '../courses/coursesSlice';

import { mockedCoursesList } from 'mocks/mockedData';
import {
	createCourseOperation,
	getAllCoursesOperation,
} from 'store/courses/coursesSlice';

describe('CoursesReducer', () => {
	it('Should return the initial state', () => {
		expect(coursesReducer(undefined, {})).toEqual(initialState);
	});

	it('Should handle SAVE_COURSE and returns new state', () => {
		const newCourse = {
			id: 'id',
			title: 'title',
			description: 'description',
			creationDate: '24/3/2021',
			duration: 120,
			authors: ['1', '2'],
		};

		expect(
			coursesReducer(undefined, {
				type: createCourseOperation.fulfilled,
				payload: {
					...newCourse,
				},
			})
		).toEqual({
			...initialState,
			entities: [...initialState.entities, newCourse],
		});
	});

	it('Should handle GET_COURSES and returns new state', () => {
		expect(
			coursesReducer(initialState, {
				type: getAllCoursesOperation.fulfilled,
				payload: [...mockedCoursesList],
			})
		).toEqual({
			...initialState,
			entities: [...mockedCoursesList],
		});
	});
});
