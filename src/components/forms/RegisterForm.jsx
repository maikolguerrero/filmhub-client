import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import API_ENDPOINT from '../../../config/api_endpoint';
import CustomAlert from '../alerts/CustomAlert';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [registrationCodeError, setRegistrationCodeError] = useState('');

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [redirectPath, setRedirectPath] = useState('');

  const validateText = (text) => text.trim() !== '';
  const validateUsername = (text) => text.trim() !== '' && text.trim().length >= 3;
  const validatePassword = (text) => text.trim() !== '' && text.trim().length >= 8;
  const validatePasswords = (password, confirmPassword) => password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const verifyUsername = validateUsername(username);
    const verifyPassword = validatePassword(password);
    const verifyConfirmPassword = validatePassword(confirmPassword);
    const verifyPasswords = validatePasswords(password, confirmPassword);
    const verifyRegistrationCode = validateText(registrationCode);

    setUsernameError(!verifyUsername ? 'Por favor, ingresa un nombre de usuario válido con 3 caracteres mínimo.' : '');
    setPasswordError(!verifyPassword ? 'Por favor, ingresa una contraseña con 8 caracteres mínimo.' : '');
    setConfirmPasswordError(!verifyConfirmPassword ? 'Por favor, ingresa una contraseña con 8 caracteres mínimo.' : '');

    if (verifyPassword && verifyConfirmPassword) {
      setPasswordError(!verifyPasswords ? 'Las contraseñas no coinciden.' : '');
      setConfirmPasswordError(!verifyPasswords ? 'Las contraseñas no coinciden.' : '');
    }

    setRegistrationCodeError(!verifyRegistrationCode ? 'Ingresa un valor.' : '');

    if (!verifyUsername || !verifyPassword || !verifyConfirmPassword || !verifyPasswords || !verifyRegistrationCode) {
      return;
    }

    const data = {
      username,
      password,
      secret: registrationCode
    };

    try {
      const response = await fetch(`${API_ENDPOINT}/admin/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const dataResponse = await response.json();
      if (response.ok) {
        setMessage(dataResponse.message);
        setShowAlert(true);
        setRedirectPath('/admin/login');
      } else {
        setMessage(dataResponse.message);
        setShowAlert(true);
      }
    } catch (error) {
      setMessage('Hubo un problema alrealizar la solicitud.');
      setShowAlert(true);
    }
  };

  return (
    <Container fluid className="py-5 bg-light d-flex justify-content-center" style={{ width: '100%' }}>
      <Card className="m-4 p-4 rounded bg-secondary text-light border-2 border-info" style={{ width: '25rem' }}>
        <h4 className="mb-4">Registro</h4>
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

          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={confirmPasswordError !== ''}
              className='shadow'
            />
            <Form.Control.Feedback type="invalid" className="error-message">
              {confirmPasswordError}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="registrationCode" className="mb-3">
            <Form.Label>Código de Registro</Form.Label>
            <Form.Control
              type="password"
              value={registrationCode}
              onChange={(e) => setRegistrationCode(e.target.value)}
              isInvalid={registrationCodeError !== ''}
              className='shadow'
            />
            <Form.Control.Feedback type="invalid" className="error-message">
              {registrationCodeError}
            </Form.Control.Feedback>
          </Form.Group>

          <div className='d-flex justify-content-center'>
            <Button variant="secondary" className="mx-1" as={Link} to="/admin/login">
              Iniciar Sesión
            </Button>
            <Button variant="info" className="mx-1 text-light shadow" type="submit">
              Crear cuenta
            </Button>
          </div>
        </Form>

        {showAlert && (
          <CustomAlert message={message} setShowAlert={setShowAlert} show={showAlert} duration={5000} redirectPath={redirectPath} />
        )}

      </Card>
    </Container>
  );
}
