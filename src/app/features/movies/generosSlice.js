import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API_ENDPOINT from '../../../../config/api_endpoint';

const initialState = {
  generos: []
};

// Acción asincrónica para listar generos
export const listarGeneros = createAsyncThunk(
  'generos/listarGeneros',
  async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/genres`);
      const data = await response.json();
      
      return data?.data?.genres ?? [];
    } catch (error) {
      console.error('Error al buscar los generos:', error);
      return []; // Retornar un arreglo vacío en caso de error
    }
  }
);

const generosSlice = createSlice({
  name: 'generos',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(listarGeneros.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(listarGeneros.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.generos = action.payload;
      })
      .addCase(listarGeneros.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default generosSlice.reducer;