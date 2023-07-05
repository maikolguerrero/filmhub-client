import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch } from 'react-redux';
import { searchMovies } from '../app/features/movies/moviesSlice';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(searchMovies(searchTerm));
  }

  return (
    <Form onSubmit={handleSearch}>
      <Form.Control
        type="text"
        placeholder="Ingrese el concepto para Búscar..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <Button type="submit">Buscar</Button>
    </Form>
  );
}




