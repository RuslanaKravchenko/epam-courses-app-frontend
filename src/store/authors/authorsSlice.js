import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from 'helpers/handleError';
import { logoutOperation } from 'store/user/userSlice';

import * as services from '../../services';

export const getAllAuthorsOperation = createAsyncThunk(
	'authors/getAuthors',
	async (_, { rejectWithValue }) => {
		try {
			const response = await services.getAllAuthors();

			if (response.status === 200 && response.data.successful) {
				return response.data.result;
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const createAuthorOperation = createAsyncThunk(
	'authors/createAuthor',
	async (newAuthor, { rejectWithValue }) => {
		try {
			const response = await services.createAuthor(newAuthor);

			if (response.status === 201 && response.data.successful) {
				return response.data.result;
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const authorsSlice = createSlice({
	name: 'authors',
	initialState: {
		entities: [],
		errors: [],
	},

	extraReducers: builder => {
		builder.addCase(getAllAuthorsOperation.pending, state => {
			state.errors = [];
		});
		builder.addCase(createAuthorOperation.pending, state => {
			state.errors = [];
		});
		builder.addCase(logoutOperation.pending, state => {
			state.errors = [];
		});

		builder.addCase(getAllAuthorsOperation.fulfilled, (state, action) => {
			state.entities.push(...action.payload);
		});
		builder.addCase(createAuthorOperation.fulfilled, (state, action) => {
			state.entities.push(action.payload);
		});
		builder.addCase(logoutOperation.fulfilled, state => {
			state.entities = [];
		});

		builder.addCase(getAllAuthorsOperation.rejected, (state, { payload }) => {
			state.errors = handleError(payload);
		});
		builder.addCase(createAuthorOperation.rejected, (state, { payload }) => {
			state.errors = handleError(payload);
		});
		builder.addCase(logoutOperation.rejected, (state, { payload }) => {
			state.errors = handleError(payload);
		});
	},
});

export default authorsSlice.reducer;
