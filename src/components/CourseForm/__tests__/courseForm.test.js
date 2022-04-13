import { render, screen, fireEvent, within, waitFor } from 'test/test-utils';

import * as constants from '../../../constants';
import CourseFormContainer from '../CourseFormContainer';
import { mockedStore } from 'test/mocked-store';

describe('CourseForm', () => {
	beforeEach(() => {
		render(<CourseFormContainer />);
	});

	describe('should show authors lists:', () => {
		it(`Should show all authors list`, () => {
			expect(screen.getByTestId('all-authors')).toBeInTheDocument();
		});

		it(`Default text should be displayed if the list of course authors is empty`, () => {
			expect(screen.getByTestId('course-authors-error')).toBeInTheDocument();
		});
	});

	describe('Should have the clickable button "Create author"', () => {
		let btnCreateAuthor;
		beforeEach(() => {
			const input = screen.getByLabelText(
				constants.CREATE_COURSE_ADD_AUTHOR_FIELD_LABEL
			);
			expect(input).toBeInTheDocument();
			fireEvent.change(input, { target: { value: 'Test' } });
			btnCreateAuthor = screen.getByRole('button', {
				name: constants.CREATE_COURSE_ADD_AUTHOR_FIELD_BUTTON_TEXT,
			});
		});

		it('The button should be present in form', () => {
			expect(btnCreateAuthor).toBeInTheDocument();
		});

		it('Clicking on the button should call dispatch', () => {
			fireEvent.click(btnCreateAuthor, { button: 0 });
			waitFor(() => {
				expect(mockedStore.dispatch).toHaveBeenCalled();
			});
		});
	});

	describe('Should have the clickable button "Add author"', () => {
		let courseAuthors;
		let btnsAddAuthor;
		let authorsList;
		beforeEach(() => {
			authorsList = mockedStore.getState().authors.entities;
			courseAuthors = screen.queryByTestId('course-authors');
			btnsAddAuthor = screen.getAllByRole('button', {
				name: constants.CREATE_COURSE_ADD_AUTHOR_BUTTON,
			});
		});

		it('The button should be present in form', () => {
			expect(btnsAddAuthor[0]).toBeInTheDocument();
		});

		it('There should be no list of course authors at the beginning.', () => {
			expect(courseAuthors).not.toBeInTheDocument();
		});

		it('Clicking on the button should add an author to course authors list', () => {
			fireEvent.click(btnsAddAuthor[0]);
			const firstAuthor = screen.getByText(authorsList[0].name);
			waitFor(() => {
				expect(courseAuthors).toContainElement(firstAuthor);
			});
		});
	});

	describe('Should have the clickable button "Delete author"', () => {
		let courseAuthors;
		let btnsAddAuthor;
		let btnDeleteAuthor;
		beforeEach(() => {
			courseAuthors = screen.queryByTestId('course-authors');
			btnsAddAuthor = screen.getAllByRole('button', {
				name: constants.CREATE_COURSE_ADD_AUTHOR_BUTTON,
			});
		});

		it('This button should be present in form', () => {
			fireEvent.click(btnsAddAuthor[0]);

			waitFor(() => {
				btnDeleteAuthor =
					within(courseAuthors).queryByTestId('delete-author-btn');
				expect(btnDeleteAuthor).toBeInTheDocument();
			});
		});

		it('Clicking on the should delete an author from the course list', () => {
			fireEvent.click(btnsAddAuthor[0]);

			waitFor(() => {
				btnDeleteAuthor =
					within(courseAuthors).queryByTestId('delete-author-btn');

				fireEvent.click(btnDeleteAuthor);
			});

			waitFor(() => {
				expect(courseAuthors).toBeEmptyDOMElement();
			});
		});
	});
});
