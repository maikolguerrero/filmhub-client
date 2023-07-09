import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './features/movies/moviesSlice';
import authReducer from './features/auth/authSlice';
import adminsReducer from './features/admins/adminsSlice';
import generosReducer from './features/movies/generosSlice'
import darkModeReducer from './features/darkMode/darkMode';
import reviewsReducer from './features/movies/reviewsSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    auth: authReducer,
    admins: adminsReducer,
    generos: generosReducer,
    darkMode: darkModeReducer,
    reviews: reviewsReducer,
  },
});
