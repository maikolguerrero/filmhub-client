import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../app/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toggleDarkMode, selectDarkMode } from '../app/features/darkMode/darkMode';

export default function NavbarResponsive() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const darkMode = useSelector(selectDarkMode);

  const handleLogout = () => {
    dispatch(logout());
    navigate('admin/login');
  };

  const handleToggleDarkMode = () => {
    localStorage.setItem('darkMode', !darkMode);
    dispatch(toggleDarkMode());
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" className='shadow'>
        <Container>
          <Navbar.Brand as={Link} to="/">Filmhub</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className='font-weight-bold'>Inicio</Nav.Link>
              <Nav.Link href="#contacto" className='font-weight-bold'>Contacto</Nav.Link>
              {isLoggedIn && (
                <>
                  <Nav.Link as={Link} to="/admin/panel" className='font-weight-bold'>Panel</Nav.Link>
                </>
              )}
            </Nav>

            <Button variant='primary' className='p-0 m-0 mx-4' onClick={handleToggleDarkMode}>
              <img className='' src="/assets/darkmode.png" alt="darkmode" style={{ width: '25px', height: 'auto' }} />
            </Button>
            {isLoggedIn && (
              <Button variant="primary" className='p-0 m-0 font-weight-bold text-danger mx-4' onClick={handleLogout}>
                Cerrar sesión
              </Button>
            )}

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}