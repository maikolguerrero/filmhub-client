import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API_ENDPOINT from '../../../../config/api_endpoint';

export const fetchAdmins = createAsyncThunk(
  'admins/fetchAdmins',
  async (_, { getState }) => {
    const token = getState().auth.token;

    try {
      const response = await fetch(`${API_ENDPOINT}/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) return [];

      const data = await response.json();
      return data?.data?.admins ?? [];
    } catch (error) {
      console.error('Error al obtener los usuarios admin.');
      return []; // Retornar un arreglo vacío en caso de error
    }
  }
);

const initialState = {
  admins: [],
  loading: false,
  error: null,
};

const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectToken = (state) => state.auth.token; // Selector para obtener el token del estado de autenticación
export const selectAdmins = (state) => state.admins.admins; // Selector para obtener los administradores
export default adminsSlice.reducer;