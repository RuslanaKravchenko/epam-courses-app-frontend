import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from 'helpers/handleError';

import * as services from '../../services';

export const signInOperation = createAsyncThunk(
	'auth/signIn',
	async (userData, { rejectWithValue }) => {
		try {
			const response = await services.login(userData);

			if (response.status === 201 && response.data.successful) {
				const { result, user } = response.data;
				const data = { ...user, token: result };

				return data;
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const logoutOperation = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			const response = await services.logout();
			if (response.status === 200) {
				services.token.unset();
				return response;
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const getCurrentUserOperation = createAsyncThunk(
	'auth/getUser',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const response = await services.getCurrentUser();
			if (response.status === 200 && response.data.successful) {
				return response.data.result;
			}
		} catch (error) {
			if (error.response.status === 401) {
				dispatch(logoutOperation.fulfilled());
			}
			return rejectWithValue(error);
		}
	}
);

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
	errors: [],
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signUpRequest: () => [],
		signUpError: handleError,
	},
	extraReducers: builder => {
		builder.addCase(signInOperation.pending, state => {
			state.errors = [];
		});
		builder.addCase(getCurrentUserOperation.pending, state => {
			state.errors = [];
		});
		builder.addCase(logoutOperation.pending, state => {
			state.errors = [];
		});

		builder.addCase(signInOperation.fulfilled, (state, { payload }) => {
			state.email = payload.email;
			state.name = payload.name;
			state.token = payload.token;
			state.isAuth = true;
		});
		builder.addCase(getCurrentUserOperation.fulfilled, (state, { payload }) => {
			state.email = payload.email;
			state.name = payload.name;
			state.role = payload.role;
			state.isAuth = true;
		});
		builder.addCase(logoutOperation.fulfilled, () => initialState);

		builder.addCase(signInOperation.rejected, (state, { payload }) => {
			state.errors = handleError(payload);
		});
		builder.addCase(getCurrentUserOperation.rejected, (state, { payload }) => {
			state.errors = handleError(payload);
		});
		builder.addCase(logoutOperation.rejected, (state, { payload }) => {
			state.errors = handleError(payload);
		});
	},
});

export const { signUpRequest, signUpError } = userSlice.actions;

export default userSlice.reducer;
