import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectDarkMode } from '../../app/features/darkMode/darkMode'
import { IoLockClosed, IoPersonCircle, IoKeySharp } from "react-icons/io5";
import API_ENDPOINT from '../../../config/api_endpoint';
import CustomAlert from '../alerts/CustomAlert';
import { AnimatePresence, motion } from "framer-motion"

export default function RegisterForm() {
  const darkMode = useSelector(selectDarkMode);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');

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

    if (!verifyUsername) {
      setShowAlert(true)
      setMessage('Por favor, ingresa un nombre de usuario válido con 3 caracteres mínimo.')
      return
    }

    if (!verifyPassword) {
      setShowAlert(true)
      setMessage('Por favor, ingresa una contraseña con 8 caracteres mínimo.')
      return
    }

    if (!verifyConfirmPassword) {
      setShowAlert(true)
      setMessage('Por favor, ingresa una contraseña con 8 caracteres mínimo.')
      return
    }

    if (!verifyPasswords) {
      setShowAlert(true)
      setMessage('Las contraseñas no coinciden.')
      return
    }

    if (!verifyRegistrationCode) {
      setShowAlert(true)
      setMessage('Ingresa un valor en el Código.')
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
    <main className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <motion.section
        className="seccion-registro py-5"
        initial={{
          opacity: 0,
          scale: 0
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 1,
          ease: 'backOut'
        }}
        exit={{
          opacity: 0
        }}
      >
        <div className={`caja-formulario lg:caja-formulario-grande border border-3 border-info ${darkMode ? 'bg-dark' : 'bg-light'}`}>
          <form className="formulario lg:p-4" onSubmit={handleSubmit}>
            <h2 className="titulo-form fs-1">Registrate</h2>
            <div className="caja-input border-bottom border-3 border-info">
              <IoPersonCircle className={`icono ${darkMode ? 'text-light' : 'text-dark'}`} />
              <input
                type="text"
                className={`fs-5 ${darkMode ? 'text-light' : 'text-dark'}`}
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
              <label htmlFor="">Usuario</label>
            </div>

            <div className="caja-input border-bottom border-3 border-info">
              <IoLockClosed className={`icono ${darkMode ? 'text-light' : 'text-dark'}`} />
              <input
                type="password"
                className={`fs-5 ${darkMode ? 'text-light' : 'text-dark'}`}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <label htmlFor="">Contraseña</label>
            </div>
            <div className="caja-input border-bottom border-3 border-info">
              <IoLockClosed className="icono text-dark" />
              <input
                type="password"
                className={`fs-5 ${darkMode ? 'text-light' : 'text-dark'}`}
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
              <label htmlFor="">Confirmar Contraseña</label>
            </div>
            <div className="caja-input border-bottom border-3 border-info">
              <IoKeySharp className="icono text-dark" />
              <input
                type="password"
                className={`fs-5 ${darkMode ? 'text-light' : 'text-dark'}`}
                required
                value={registrationCode}
                onChange={(e) => {
                  setRegistrationCode(e.target.value)
                }}
              />
              <label htmlFor="">Código de Registro</label>
            </div>


            <div className='d-flex gap-2'>
              <Button className="boton-enviar" variant={`${darkMode ? 'dark' : 'light'}`} as={Link} to="/admin/login">
                Iniciar Sesión
              </Button>
              <Button className="boton-enviar" variant="info" type="submit">
                Crear cuenta
              </Button>
            </div>

          </form>
        </div>
      </motion.section>
      {
        showAlert && (
          <CustomAlert message={message} setShowAlert={setShowAlert} show={showAlert} duration={5000} redirectPath={redirectPath} />
        )
      }
    </main>
  );
}
