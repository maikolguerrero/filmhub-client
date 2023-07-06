import API_ENDPOINT from '../../../config/api_endpoint';

// Verificar el token de autenticación en el backend
export const validateToken = async (token) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/admin/panel`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error al verificar el token de autenticación');
  }
};