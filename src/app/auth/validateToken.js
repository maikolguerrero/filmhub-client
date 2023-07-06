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
    console.error('Error al validar el token:', error);
    return false;
  }
};

export default validateToken;