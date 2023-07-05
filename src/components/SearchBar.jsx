import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { searchMovies } from '../app/features/movies/moviesSlice';
import { Container } from 'react-bootstrap';


export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(searchMovies(searchTerm));
  }

  return (    
    <Container fluid className="pt-5 pb-2 bg-light" id="searchBar" style={{ width: "100%" }}>
      <Form onSubmit={handleSearch} className="d-flex mt-5 mx-5">
        <Form.Control
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Button type="submit" className="ms-2 btn-lg" style={{ width: '200px' }}>Buscar</Button>
      </Form>
    </Container>
  );
}






