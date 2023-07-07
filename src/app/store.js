import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './features/movies/moviesSlice';
import authReducer from './features/auth/authSlice';
import adminsReducer from './features/admins/adminsSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
    admins: adminsReducer
  },
});
