import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDarkMode } from '../../app/features/darkMode/darkMode'
import { fetchMovies } from '../../app/features/movies/moviesSlice';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MovieCard from './MovieCard';
import SearchBar from '../SearchBar';
import { Paginacion } from '../admin/tables/Paginacion';

export default function Movies() {
  const movieState = useSelector((state) => state.movies);
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(12);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const maximo = Math.ceil(movieState.movies.length / porPagina);

  if (movieState.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (movieState.status === 'failed') {
    return <div>Error: {movieState.error}</div>;
  }

  return (
    <Container fluid className={`pt-5 pb-2 ${darkMode ? 'bg-dark' : 'bg-light'}`} id="movies" style={{ width: "100%" }}>
      <h1 className={`text-center mb-4 ${darkMode ? 'text-light' : 'text-dark'}`}>Películas</h1>
      <SearchBar />
      <Row xs={1} sm={2} md={3} lg={3} xl={4} className="justify-content-center">
        {movieState.movies.length == 0 ? (
          <p className="text-center text-danger pb-5 mb-0 d-flex justify-content-center fs-3">No hay películas disponibles</p>
        ) : (
          movieState.movies.slice(
            (pagina - 1) * porPagina,
            (pagina - 1) * porPagina + porPagina
          ).map((movie) => (
            <Col key={movie.id} className="mb-5 d-flex justify-content-center">
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
      {movieState.movies.length !== 0 && <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />}
    </Container>
  )
}