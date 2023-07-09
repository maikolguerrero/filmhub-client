import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { IoLockClosed, IoPersonCircle, IoKeySharp } from "react-icons/io5";
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

  const handleChange = () => {
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

    setRegistrationCodeError(!verifyRegistrationCode ? 'Ingresa un valor en el Código.' : '');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const verifyUsername = validateUsername(username);
    const verifyPassword = validatePassword(password);
    const verifyConfirmPassword = validatePassword(confirmPassword);
    const verifyPasswords = validatePasswords(password, confirmPassword);
    const verifyRegistrationCode = validateText(registrationCode);

    if (!verifyUsername) {
      setShowAlert(true)
      setMessage(usernameError)
      return
    }

    if (!verifyPassword) {
      setShowAlert(true)
      setMessage(passwordError)
      return
    }

    if (!verifyRegistrationCode) {
      setShowAlert(true)
      setMessage(registrationCodeError)
      return
    }

    if (!verifyPasswords) {
      setShowAlert(true)
      setMessage(passwordError)
      return
    }

    if (!verifyConfirmPassword) {
      setShowAlert(true)
      setMessage(confirmPasswordError)
      return
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
    <main>

      <section className="seccion-registro my-5">
        <div className="caja-formulario lg:caja-formulario-grande border border-3 border-dark bg-light">
          <form action="" className="formulario lg:p-4"
            onSubmit={handleSubmit}
          >
            <h2 className="titulo-form text-dark fs-1">Registrate</h2>
            <div className="caja-input border-bottom border-3 border-dark">
              <IoPersonCircle className="icono text-dark" />
              <input
                type="text"
                className='text-primary fs-5 '
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  handleChange()
                }}
              />
              <label htmlFor="">Usuario</label>
            </div>

            <div className="caja-input border-bottom border-3 border-dark">
              <IoLockClosed className="icono text-dark" />
              <input
                type="password"
                className='text-primary fs-5 '
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  handleChange()
                }}
              />
              <label htmlFor="">Contraseña</label>
            </div>
            <div className="caja-input border-bottom border-3 border-dark">
              <IoLockClosed className="icono text-dark" />
              <input
                type="password"
                className='text-primary fs-5 '
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  handleChange()
                }}
              />
              <label htmlFor="">Confirmar Contraseña</label>
            </div>
            <div className="caja-input border-bottom border-3 border-dark">
              <IoKeySharp className="icono text-dark" />
              <input
                type="text"
                className='text-primary fs-5 '
                required
                value={registrationCode}
                onChange={(e) => {
                  setRegistrationCode(e.target.value)
                  handleChange()
                }}
              />
              <label htmlFor="">Código de Registro</label>
            </div>


            <div className='d-flex gap-2'>
              <Button className="boton-enviar" variant="secondary" as={Link} to="/admin/login">
                Iniciar Sesión
              </Button>
              <Button className="boton-enviar" variant="primary" type="submit">
                Crear cuenta
              </Button>
            </div>

          </form>
        </div>
      </section>
      {
        showAlert && (
          <CustomAlert message={message} setShowAlert={setShowAlert} show={showAlert} duration={5000} redirectPath={redirectPath} />
        )
      }
    </main>
  );
}
