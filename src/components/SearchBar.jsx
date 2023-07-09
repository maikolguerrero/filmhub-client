import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../app/features/movies/moviesSlice';
import { selectDarkMode } from '..//app/features/darkMode/darkMode'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(searchMovies(searchTerm));
  }

  return (
    <Form onSubmit={handleSearch} className={`custom-placeholder d-flex mb-5 mx-5 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
      <Form.Control
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className={`${darkMode ? 'bg-dark text-light custom-placeholder' : 'text-dark'}`}
      />
      <Button type="submit" className="ms-2">Buscar</Button>
    </Form>
  );
}