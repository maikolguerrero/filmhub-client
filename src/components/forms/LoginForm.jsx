import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { IoLockClosed, IoPersonCircle } from "react-icons/io5";
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

  const handleChange = () => {
    const verifyUsername = validateText(username);
    const verifyPassword = validateText(password);

    setUsernameError(!verifyUsername ? 'Por favor, ingresa un nombre de usuario.' : '');
    setPasswordError(!verifyPassword ? 'Por favor, ingresa una contraseña.' : '');

    if (!verifyUsername || !verifyPassword) return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password
    };

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
    <main>

      <section className="seccion-registro my-5">
        <div className="caja-formulario lg:caja-formulario-grande border border-3 border-dark bg-light">
          <form action="" className="formulario lg:p-4" onSubmit={handleSubmit}>
            <h2 className="titulo-form text-dark fs-1">Iniciar Sesión</h2>
            <div className="caja-input border-bottom border-3 border-dark">
              <IoPersonCircle className="icono text-dark" />
              <input type="text"
                Vali='hola'
                className='text-primary fs-5 '
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  handleChange()
                }}
              />
              <label htmlFor="" className='text-dark'>Usuario</label>
            </div>

            <div className="caja-input border-bottom border-3 border-dark">
              <IoLockClosed className="icono text-dark" />
              <input
                type="password"
                className='text-primary fs-5'
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  handleChange()
                }}/>
              <label htmlFor="" className='text-dark'>Contraseña</label>
            </div>


            <div className='d-flex gap-2'>
              <Button className="boton-enviar" type="submit" variant="secondary" as={Link} to="/admin/registro">Crear Cuenta</Button>
              <Button className="boton-enviar" type="submit" variant="primary" 
             >Iniciar Sesión</Button>
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