import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

export default function DatosContacto({ linkGitHub, email, imagen }) {
  return (
    <Stack direction="horizontal" gap={3} className="flex-column-reverse flex-md-row justify-content-center my-4">
      <Col xs={12} md={6} lg={4} className="">
        <div className="d-flex flex-column align-items-center">
          <p><a href={linkGitHub} target="_blank" rel="noopener noreferrer"><img src="/assets/github.svg" alt="GitHub" style={{ width: '50px', height: 'auto' }} /></a></p>
          <p><strong>Email:</strong> {email}</p>
        </div>
      </Col>
      <Col xs={12} md={6} lg={4} className="d-flex flex-column align-items-center justify-center">
        <Image src={imagen} alt="foto-de-perfil" roundedCircle className="img-thumbnail" style={{ width: '150px', height: 'auto' }} />
      </Col>
    </Stack>
  );
}