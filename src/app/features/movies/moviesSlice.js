import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API_ENDPOINT from '../../../../config/api_endpoint';

// Acción asincrónica para obtener las películas
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/movies`);
    const data = await response.json();
    return data.data.movies;
  } catch (error) {
    console.error('Error al obtener las películas:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;