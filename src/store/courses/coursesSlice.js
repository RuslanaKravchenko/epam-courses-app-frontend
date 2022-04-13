import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { handleError } from 'helpers/handleError';
import { logoutOperation } from 'store/user/userSlice';

import * as services from '../../services';

export const getAllCoursesOperation = createAsyncThunk(
	'courses/getCourses',
	async (_, { rejectWithValue }) => {
		try {
			const response = await services.getAllCourses();

			if (response.status === 200 && response.data.successful) {
				return response.data.result;
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const createCourseOperation = createAsyncThunk(
	'courses/createCourse',
	async (newCourse, { rejectWithValue }) => {
		try {
			const response = await services.createCourse(newCourse);

			if (response.status === 201 && response.data.successful) {
				return response.data.result;
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const updateCourseOperation = createAsyncThunk(
	'courses/updateCourse',
	async (course, { rejectWithValue }) => {
		try {
			const response = await services.updateCourse(course);

			if (response.status === 200 && response.data.successful) {
				return response.data.result;
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const deleteCourseOperation = createAsyncThunk(
	'courses/deleteCourse',
	async (id, { rejectWithValue }) => {
		try {
			const response = await services.deleteCourse(id);

			if (response.status === 200 && response.data.successful) {
				return id;
			}
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const initialState = { entities: [], errors: [] };

const coursesSlice = createSlice({
	name: 'courses',
	initialState,

	extraReducers: builder => {
		builder.addCase(getAllCoursesOperation.pending, state => {
			state.errors = [];
		});
		builder.addCase(createCourseOperation.pending, state => {
			state.errors = [];
		});
		builder.addCase(updateCourseOperation.pending, state => {
			state.errors = [];
		});
		builder.addCase(deleteCourseOperation.pending, state => {
			state.errors = [];
		});

		builder.addCase(getAllCoursesOperation.fulfilled, (state, action) => {
			state.entities.push(...action.payload);
		});
		builder.addCase(createCourseOperation.fulfilled, (state, action) => {
			state.entities.push(action.payload);
		});
		builder.addCase(updateCourseOperation.fulfilled, (state, action) => {
			state.entities = state.entities.map(item =>
				item.id === action.payload.id ? { ...action.payload } : item
			);
		});
		builder.addCase(deleteCourseOperation.fulfilled, (state, action) => {
			state.entities = state.entities.filter(
				item => item.id !== action.payload
			);
		});
		builder.addCase(logoutOperation.fulfilled, state => {
			state.entities = [];
		});

		builder.addCase(getAllCoursesOperation.rejected, (state, { payload }) => {
			state.errors = handleError(payload);
		});
		builder.addCase(createCourseOperation.rejected, (state, { payload }) => {
			state.errors = handleError(payload);
		});
		builder.addCase(updateCourseOperation.rejected, (state, { payload }) => {
			state.errors = handleError(payload);
		});
		builder.addCase(deleteCourseOperation.rejected, (state, { payload }) => {
			state.errors = handleError(payload);
		});
	},
});

export default coursesSlice.reducer;
