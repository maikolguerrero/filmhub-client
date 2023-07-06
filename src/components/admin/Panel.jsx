import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';
import PanelCard from './PanelCard'

export default function Panel() {
  return (
    <Container fluid className="pt-5 pb-2 bg-light" style={{ width: "100%" }}>
      <h1 className="text-center mb-4 text-dark">Panel de Admiminstración</h1>

      <Row xs={1} sm={2} md={3} lg={3} xl={4} className="justify-content-center">
        <Col className="mb-5 d-flex justify-content-center">
          <PanelCard title="Películas" text="Crea, edita y elimina películas." to="movies" />
        </Col>
        <Col className="mb-5 d-flex justify-content-center">
          <PanelCard title="Reviews" text="Observa y elimina reviews." to="reviews" />
        </Col>
        <Col className="mb-5 d-flex justify-content-center">
          <PanelCard title="Usuarios" text="Edita permisos y elimina usuarios." to="users" />
        </Col>
      </Row>
    </Container>
  )
}