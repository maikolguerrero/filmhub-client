import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import DatosContacto from './DatosContacto';

export default function Footer() {
  return (
    <footer className="bg-primary shadow text-light">
      <Container className="pb-1">
        <Row className="flex-column flex-md-row justify-content-center pt-2">
          <h4 id="contacto" className='text-center mt-3'>Contacto</h4>
          <DatosContacto linkGitHub={"https://github.com/maikolguerrero"} email={"maikolguerrerop@gmail.com"} imagen={"/images/Maikol.jpg"}/>
          <DatosContacto linkGitHub={"https://github.com/Fran-JF"} email={"franciscouzcategui2021@gmail.com"} imagen={"/images/Francisco.jpg"}/>
          <DatosContacto linkGitHub={"https://github.com/AnggeloHuz"} email={"huzanggelo0904@gmail.com"} imagen={"/images/Anggelo.jpg"}/>
        </Row>
        <hr/>
        <p className="text-center">© 2023 Filmhub. Todos los derechos reservados.</p>
      </Container>
    </footer>
  );
}