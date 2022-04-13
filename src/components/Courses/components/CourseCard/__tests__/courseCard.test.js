import { render, screen } from 'test/test-utils';

import CourseCard from '../CourseCard';

import * as constants from '../../../../../constants';
import { pipeDuration } from 'helpers/pipeDuration';
import { dateGenerator } from 'helpers/dateGenerator';
import { mockedStore } from 'test/mocked-store';

describe('CourseCard', () => {
	const course = mockedStore.getState().courses.entities[0];
	beforeEach(() => {
		render(<CourseCard course={course} />);
	});

	it('Should display the title', () => {
		const { title } = course;
		expect(screen.getByText(title)).toBeInTheDocument();
	});

	it('Should display the description', () => {
		const description = mockedStore.getState().courses.entities[0].description;
		expect(screen.getByText(description)).toBeInTheDocument();
	});

	it('Should display the duration in the correct format', () => {
		const { duration } = mockedStore.getState().courses.entities[0];
		const str = `${pipeDuration(duration)} ${
			constants.COURSE_CARD_DURATION_FIELD_TEXT
		}`;

		expect(screen.getByText(str)).toBeInTheDocument();
	});

	it('Should display the authors list', () => {
		const allAuthors = mockedStore.getState().authors.entities;
		const courseAuthors = mockedStore.getState().courses.entities[0].authors;

		const str = courseAuthors
			.map(authorId => allAuthors.find(author => author.id === authorId).name)
			.join(', ');

		expect(screen.getByText(str)).toBeInTheDocument();
	});

	it('Should display created date in the correct format', () => {
		const { creationDate } = mockedStore.getState().courses.entities[0];
		const str = dateGenerator(creationDate);
		expect(screen.getByText(str)).toBeInTheDocument();
	});
});
