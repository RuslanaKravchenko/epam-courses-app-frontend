import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { mockedStore } from './mocked-store';

export * from '@testing-library/react';

export function render(ui, { preloadedState, ...renderOptions } = {}) {
	function Wrapper({ children }) {
		return (
			<Provider store={mockedStore}>
				<BrowserRouter>{children}</BrowserRouter>
			</Provider>
		);
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}
