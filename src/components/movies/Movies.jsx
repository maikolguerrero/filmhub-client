import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../../app/features/movies/moviesSlice';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MovieCard from './MovieCard';
import SearchBar from '../SearchBar';

export default function Movies() {
  const movieState = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);


  if (movieState.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (movieState.status === 'failed') {
    return <div>Error: {movieState.error}</div>;
  }

  return (
    <Container fluid className="pt-5 pb-2 bg-light" id="movies" style={{ width: "100%" }}>
      <h1 className="text-center mb-4 text-dark">Películas</h1>
      <SearchBar />
      <Row xs={1} sm={2} md={3} lg={3} xl={4} className="justify-content-center">
        {movieState.movies.length == 0 ? (
          <p className="text-center text-danger pb-5 mb-0 d-flex justify-content-center fs-3">No hay películas disponibles</p>
        ) : (
          movieState.movies.map((movie) => (
            <Col key={movie.id} className="mb-5 d-flex justify-content-center">
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  )
}

