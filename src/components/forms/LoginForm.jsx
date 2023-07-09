import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectDarkMode } from '../../app/features/darkMode/darkMode'
import Button from 'react-bootstrap/Button';
import { IoLockClosed, IoPersonCircle } from "react-icons/io5";
import API_ENDPOINT from '../../../config/api_endpoint';
import { login } from '../../app/features/auth/authSlice';
import CustomAlert from '../alerts/CustomAlert';

export default function LoginForm() {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

    if (!verifyUsername) {
      setShowAlert(true)
      setMessage('Por favor, ingresa un nombre de usuario válido.')
      return
    }

    if (!verifyPassword) {
      setShowAlert(true)
      setMessage('Por favor, ingresa una contraseña válida.')
      return
    }

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
    <main className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <section className="seccion-registro py-5">
        <div className={`caja-formulario lg:caja-formulario-grande border border-3 border-info ${darkMode ? 'bg-dark' : 'bg-light'}`}>
          <form className="formulario lg:p-4" onSubmit={handleSubmit}>
            <h2 className="titulo-form fs-1">Iniciar Sesión</h2>
            <div className="caja-input border-bottom border-3 border-info">
              <IoPersonCircle className={`icono ${darkMode ? 'text-light' : 'text-dark'}`}/>
              <input type="text"
                className={`fs-5 ${darkMode ? 'text-light' : 'text-dark'}`}
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
              <label>Usuario</label>
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
                }}/>
              <label>Contraseña</label>
            </div>


            <div className='d-flex gap-2'>
              <Button className="boton-enviar" type="submit" variant={`${darkMode ? 'dark' : 'light'}`} as={Link} to="/admin/registro">Crear Cuenta</Button>
              <Button className="boton-enviar text-light" type="submit" variant="info">Iniciar Sesión</Button>
            </div>
          </form>
        </div>
      </section>

      {
        showAlert && (
          <CustomAlert message={message} setShowAlert={setShowAlert} show={showAlert} duration={5000} />
        )
      }
    </main>
  );
}