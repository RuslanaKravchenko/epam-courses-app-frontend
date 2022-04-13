import { configureStore } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import authorsReducer from './authors/authorsSlice';
import coursesReducer from './courses/coursesSlice';
import userReducer from './user/userSlice';

const userPersistConfig = {
	key: 'user',
	version: 1,
	storage,
	whitelist: ['token', 'isAuth'],
};

export const store = configureStore({
	reducer: {
		courses: coursesReducer,
		authors: authorsReducer,
		user: persistReducer(userPersistConfig, userReducer),
	},

	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);
