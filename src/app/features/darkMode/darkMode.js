import { createSlice } from '@reduxjs/toolkit';

const storedDarkMode = localStorage.getItem('darkMode');
const darkMode = storedDarkMode == 'true' ? true : false;
const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: darkMode,
  reducers: {
    toggleDarkMode: (state) => {
      return !state;
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export const selectDarkMode = (state) => state.darkMode; // Selector para obtener el token del estado de autenticación
export default darkModeSlice.reducer;