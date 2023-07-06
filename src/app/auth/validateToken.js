import API_ENDPOINT from '../../../config/api_endpoint';

// Verificar el token de autenticación en el backend
const validateToken = async (token) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/admin/panel`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) return true;
    return false;
  } catch (error) {
    throw new Error('Error al verificar el token de autenticación');
  }
};

export default validateToken;