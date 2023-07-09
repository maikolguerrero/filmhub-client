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
import { AnimatePresence, motion } from "framer-motion"
import { variants2 } from '../../styles/animations/variants';

export default function Movies() {
  const movieState = useSelector((state) => state.movies);
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(8);

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
      <motion.h1
        className={`text-center mb-4 ${darkMode ? 'text-light' : 'text-dark'}`}
        initial={{
          opacity: 0,
          scale: 0
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 1,
          ease: 'backOut'
        }}
        exit={{
          opacity: 0
        }}
      >
        Películas
      </motion.h1>
      <motion.div
        initial={{
          x: 200,
          opacity: 0
        }}
        animate={{
          x: 0,
          opacity: 1
        }}
        transition={{
          duration: 1,
          ease: 'easeOut',
        }}
        exit={{
          opacity: 0
        }}
      >
        <SearchBar />
      </motion.div>

      <Row xs={1} sm={2} md={3} lg={3} xl={4} className="justify-content-center">
        {movieState.movies.length == 0 ? (
          <p className="text-center text-danger pb-5 mb-0 d-flex justify-content-center fs-3">No hay películas disponibles</p>
        ) : (
          movieState.movies.slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina).map((movie, index) => (
            <Col key={movie.id} className="mb-5 d-flex justify-content-center">
              <motion.div
                custom={{ delay: (index + 1) * 0.2 }}
                initial='hidden'
                animate='visible'
                exit='hidden'
                variants={variants2}
                layoutId={movie.id}
              >
                <MovieCard movie={movie} />
              </motion.div>
            </Col>
          ))
        )}
      </Row>
      <motion.div
        initial={{
          x: 200,
          opacity: 0
        }}
        animate={{
          x: 0,
          opacity: 1
        }}
        transition={{
          duration: 1,
          ease: 'easeOut',
        }}
        exit={{
          opacity: 0
        }}
      >
        {movieState.movies.length !== 0 && <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />}
      </motion.div>
    </Container>
  )
}