import API_ENDPOINT from '../../../config/api_endpoint';

// Función para cerrar sesión
const adminLogout = async (token) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/admin/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) return true; // Se cerró la sesión correctamente
    return false; // Hubo un problema al cerrar sesión
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return false; // Ocurrió un error al cerrar sesión
  }
};

export default adminLogout;