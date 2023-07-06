import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import API_ENDPOINT from '../../../config/api_endpoint';
import { login } from '../../app/features/auth/authSlice';
import CustomAlert from '../alerts/CustomAlert';

export default function LoginForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const validateText = (text) => text.trim() !== '';


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password
    };

    const verifyUsername = validateText(username);
    const verifyPassword = validateText(password);

    setUsernameError(!verifyUsername ? 'Por favor, ingresa un nombre de usuario.' : '');
    setPasswordError(!verifyPassword ? 'Por favor, ingresa una contraseña.' : '');

    if (!verifyUsername || !verifyPassword) return;

    try {
      const response = await fetch(`${API_ENDPOINT}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const json = await response.json();
        const token = json.token;

        localStorage.setItem('token', token);

        dispatch(login(token)); // Dispatch de la acción de login
      } else {
        // No se inicio sesión correctamente
        const dataResponse = await response.json();
        setMessage(dataResponse.message);
        setShowAlert(true);
      }
    } catch (error) {
      // Manejar error de solicitud
      setMessage('Hubo un problema al realizar la solicitud.');
      setShowAlert(true);
    }
  };

  return (
    <Container fluid className="py-5 bg-light d-flex justify-content-center" style={{ width: '100%' }}>
      <Card className="m-4 p-4 rounded bg-secondary text-light shadow" style={{ width: '25rem' }}>
        <h4 className="mb-4">Inicio de sesión</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Nombre de usuario</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              isInvalid={usernameError !== ''}
              className='shadow'
            />
            <Form.Control.Feedback type="invalid" className="error-message">
              {usernameError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={passwordError !== ''}
              className='shadow'
            />
            <Form.Control.Feedback type="invalid" className="error-message">
              {passwordError}
            </Form.Control.Feedback>
          </Form.Group>

          <div className='d-flex justify-content-center'>
            <Button variant="secondary mx-2" as={Link} to="/admin/registro">
              Crear cuenta
            </Button>
            <Button variant="success" type="submit" className="mx-2 text-light shadow">
              Ingresar
            </Button>
          </div>

        </Form>

        {showAlert && (
          <CustomAlert message={message} setShowAlert={setShowAlert} show={showAlert} duration={5000} />
        )}
      </Card>
    </Container>
  );
}