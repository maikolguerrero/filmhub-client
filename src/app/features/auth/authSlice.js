import { createSlice } from '@reduxjs/toolkit';
import adminLogout from '../../auth/adminLogout';
import validateToken from '../../auth/validateToken';

const storedToken = localStorage.getItem('token');
const validate = await validateToken(storedToken);

const initialState = {
  isLoggedIn: validate,
  token: storedToken || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    logout(state) {
      const success = async () => await adminLogout(state.token);
      if (!success) { console.error("Token no válido") }
      state.isLoggedIn = false;
      state.token = '';
      localStorage.setItem('token', '');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;