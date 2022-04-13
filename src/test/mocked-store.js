import { mockedAuthorsList, mockedCoursesList } from '../mocks/mockedData';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		role: 'admin',
	},
	courses: { entities: mockedCoursesList, errors: [] },
	authors: { entities: mockedAuthorsList, errors: [] },
};

export const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};
