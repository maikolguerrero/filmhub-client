import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
      <Form onSubmit={handleSearch} className="d-flex mb-5 mx-5">
        <Form.Control
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Button type="submit" className="ms-2">Buscar</Button>
      </Form>

  );
}






