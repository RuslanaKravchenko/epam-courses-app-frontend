import Header from '../Header';

import { render, screen } from 'test/test-utils';
import { mockedStore } from 'test/mocked-store';

describe('Header', () => {
	beforeEach(() => {
		render(<Header />);
	});
	it('Should have logo', () => {
		expect(screen.getByTestId('logo')).toBeInTheDocument();
	});

	describe("Should have user's name", () => {
		let usernameRef;
		beforeEach(() => {
			usernameRef = screen.getByTestId('userName');
		});

		it(`Container for user's name should be in DOM`, () => {
			expect(usernameRef).toBeInTheDocument();
		});

		it(`And this container should display user's name`, () => {
			const username = mockedStore.getState().user.name;
			expect(usernameRef).toHaveTextContent(username);
		});
	});
});
