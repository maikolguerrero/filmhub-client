import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API_ENDPOINT from '../../../../config/api_endpoint';
import { fetchMovieDetails } from './moviesSlice';

export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (_, { getState }) => {
    const token = getState().auth.token;

    try {
      const response = await fetch(`${API_ENDPOINT}/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) return [];

      const data = await response.json();
      return data?.data?.reviews ?? [];
    } catch (error) {
      console.error('Error al obtener las reseñas.');
      return []; // Retornar un arreglo vacío en caso de error
    }
  }
);

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
    reviews: [],
    loading: false,
    error: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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

export const selectToken = (state) => state.auth.token; // Selector para obtener el token del estado de autenticación
export const selectReviews = (state) => state.reviews.reviews; // Selector para obtener las reseñas
export default reviewsSlice.reducer;