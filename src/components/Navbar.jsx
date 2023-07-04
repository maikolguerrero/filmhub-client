import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export default function NavbarResponsive() {
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
            </Nav>
            <Button variant='primary' className='p-0 m-0'>
              <img className='' src="/assets/darkmode.png" alt="darkmode" style={{ width: '25px', height: 'auto' }} />
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}