import { render, screen, fireEvent } from 'test/test-utils';

import Courses from '../Courses';
import CourseFormContainer from 'components/CourseForm/CourseFormContainer';
import { mockedStore } from 'test/mocked-store';

const testif = condition => (condition ? test : test.skip);

describe('Testing of Courses component', () => {
	describe('Courses', () => {
		beforeEach(() => {
			render(<Courses />);
		});

		testif(mockedStore.getState().courses.length)(
			'Should display amount of CourseCard equal length of courses array',
			() => {
				expect(screen.getAllByTestId('course-card').length).toEqual(
					mockedStore.getState().courses.length
				);
			}
		);

		testif(mockedStore.getState().courses.length === 0)(
			`Should display Empty container if courses array length is 0`,
			() => {
				expect(screen.queryByTestId('courses-list')).not.toBeInTheDocument();
				expect(screen.getByTestId('courses-error')).toBeInTheDocument();
			}
		);

		testif(mockedStore.getState().courses.length)(
			`Should display Empty container if courses array length is 0`,
			() => {
				expect(screen.queryByTestId('courses-list')).toBeInTheDocument();
				expect(screen.queryByTestId('courses-error')).not.toBeInTheDocument();
			}
		);
	});

	describe('The "Add new course" button', () => {
		let buttonAddCourse;
		beforeEach(() => {
			render(
				<>
					<Courses />
					<CourseFormContainer />
				</>
			);
			buttonAddCourse = screen.queryByTestId('add-course');
		});
		testif(mockedStore.getState().user.role === 'admin')(
			'Should be on page "Courses" if user has role "admin"',
			() => {
				expect(buttonAddCourse).toBeInTheDocument();
			}
		);

		testif(mockedStore.getState().user.role !== 'admin')(
			'Should be not on page "Courses" if user has not role "admin"',
			() => {
				expect(buttonAddCourse).not.toBeInTheDocument();
			}
		);
		testif(mockedStore.getState().user.role === 'admin')(
			'CourseForm should be shown after clicking on the button',
			() => {
				fireEvent.click(buttonAddCourse);
				expect(screen.getByTestId('courseForm')).toBeInTheDocument();
			}
		);
	});
});
