import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API_ENDPOINT from '../../../../config/api_endpoint';

// Acción asincrónica para obtener las películas
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/movies`);
    if (!response.ok) return [];

    const data = await response.json();
    return data?.data?.movies ?? [];
  } catch (error) {
    console.error('Error al obtener las películas:', error);
    return []; // Retornar un arreglo vacío en caso de error
  }
});

// Acción asincrónica para buscar películas
export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (searchTerm) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/movies/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ search: searchTerm })
      });
      if (!response.ok) return [];

      const data = await response.json();
      return data?.data?.movies ?? [];
    } catch (error) {
      console.error('Error al buscar las películas:', error);
      return []; // Retornar un arreglo vacío en caso de error
    }
  }
);

// Acción asincrónica para obtener los detalles de una película
export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/movies/${movieId}`);
      if (response.status === 404) {
        throw new Error('Película no encontrada');
      }
      const data = await response.json();
      return data.data.movie;
    } catch (error) {
      console.error('Error al obtener los detalles de la película:', error);
      throw error;
    }
  }
);

// Eliminar Movies
export const deleteMovie = createAsyncThunk (
  'movies/deleteMovie',
  async (info) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/movies/${info.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${info.token}`
        }
      });
      const data = await response.json();
      if (data.status === 200) {

        return info.id
      }; // Se eliminó exitosamente la pelicula

      return false; // Hubo un problema al eliminar la Pelicula
    } catch (error) {
      console.error('Error al Eliminar la Película:', error);
      return false; // Ocurrió un error al eliminar la pelicula
    }
  }
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    movieDetails: null,
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
      })
      .addCase(searchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        for (let i = 0; i < state.movies.length; i++) {
          
          if (state.movies[i].id === action.payload) {
            state.movies.splice(i, 1)
          }
          
        }
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;