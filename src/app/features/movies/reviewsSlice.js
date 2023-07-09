import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API_ENDPOINT from '../../../../config/api_endpoint';
import { fetchMovieDetails } from './moviesSlice';

// Acción asincrónica para agregar una reseña
export const addReview = createAsyncThunk(
  'reviews/addReview',
  async (review, { dispatch, getState }) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
      });
      const data = await response.json();

      // Actualizar la calificación de la película
      const movieId = getState().movies.movieDetails.id;
      dispatch(fetchMovieDetails(movieId));

      return data;
    } catch (error) {
      console.error('Error al agregar la reseña:', error);
      return null; // Retornar null en caso de error
    }
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addReview.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default reviewsSlice.reducer;
