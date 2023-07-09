import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieDetails } from '../../app/features/movies/moviesSlice';
import { addReview } from '../../app/features/movies/reviewsSlice'; // Importar addReview desde reviewsSlice
import API_ENDPOINT from '../../../config/api_endpoint';
import { AiFillStar } from 'react-icons/ai';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { selectDarkMode } from '../../app/features/darkMode/darkMode'
import CustomAlert from '../alerts/CustomAlert';
import { AnimatePresence, motion } from "framer-motion"
import { variants2 } from '../../styles/animations/variants';

export default function MovieDetails() {
  const { id } = useParams();
  const movieDetails = useSelector((state) => state.movies.movieDetails);
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    dispatch(fetchMovieDetails(id)).then((response) => {
      if (response.error) {
        navigate('/error404');
      }
    });
  }, [dispatch, id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const roundToHalfStar = (rating) => {
    return Math.round(rating);
  }

  const renderStars = (currentRating) => {
    currentRating = roundToHalfStar(currentRating);
    const stars = [];
    const isDecimal = currentRating % 1 !== 0;
    for (let i = 1; i <= 5; i++) {
      if (i <= currentRating) {
        stars.push(
          <AiFillStar
            key={i}
            className="filled-star fs-5 text-warning"
            onClick={() => setRating(i)}
          />
        );
      } else if (isDecimal && i === Math.floor(currentRating) + 1) {
        stars.push(
          <AiFillStar
            key={i}
            className="half-star fs-5 text-warning"
            onClick={() => setRating(i)}
          />
        );
      } else {
        stars.push(
          <AiFillStar
            key={i}
            className="empty-star fs-5"
            onClick={() => setRating(i)}
          />
        );
      }
    }
    return stars;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validar que los campos de nombre y comentario no estén vacíos
    if (!name || !comment) {
      setAlertMessage('Por favor completa los campos de "Nombre" y "Comentario" antes de enviar el formulario.');
      setShowAlert(true);
      return;
    }

    const review = { name, rating, comment, movieId: movieDetails.id };
    dispatch(addReview(review));
    setAlertMessage("Su reseña ha sido enviada exitosamente!!");
    setShowAlert(true);
    setName('');
    setRating(0);
    setComment('');
  };

  return (
    <>
      {/* Renderizar el componente CustomAlert */}
      <CustomAlert
        message={alertMessage}
        show={showAlert}
        setShowAlert={setShowAlert}
        duration={3000}
      />

      <Row className={`px-3 ${darkMode ? 'bg-dark text-light' : 'bg-light'}`}>
        <Col md={5} className="my-5 d-flex align-items-center justify-content-center mx-3">
          <motion.div
            custom={{ delay: 0}}
            initial='hidden'
            animate='visible'
            exit='hidden'
            whileHover='hover'
            variants={variants2}
          >
            <Image
              width={300}
              height={450}
              src={`${API_ENDPOINT}/images/${movieDetails.image}`}
              alt={movieDetails.title}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            />
          </motion.div>
        </Col>
        <Col md={5} className="my-5 align-items-center justify-content-center">
          <motion.div
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
            <h1 className="movie-title">{movieDetails.title}</h1>
            <p>
              <strong>Calificación:</strong> {renderStars(roundToHalfStar(movieDetails.rating))}
            </p>
            <p>
              <strong>Sinopsis:</strong> {movieDetails.synopsis}
            </p>
            <p>
              <strong>Género:</strong>{' '}
              {typeof movieDetails.genre === 'string'
                ? movieDetails.genre
                : 'N/A'}
            </p>
            <p>
              <strong>Franquicia:</strong> {movieDetails.franchise}
            </p>
            <p>
              <strong>Fecha de lanzamiento:</strong>{' '}
              {movieDetails.release_date.slice(0, 10)}
            </p>
            <p>
              <strong>Actores:</strong> {movieDetails.actors.join(', ')}
            </p>
            <p>
              <strong>Directores:</strong> {movieDetails.directors.join(', ')}
            </p>
          </motion.div>
        </Col>
      </Row>
      <Row className={`py-5 px-3 ${darkMode ? 'bg-dark text-light' : 'bg-light'}`}>
        <Col md={{ span: 6, offset: 3 }}>
          <motion.div
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
            <h2>Agregar una reseña</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={`${darkMode ? 'bg-dark text-light custom-placeholder' : 'text-dark'}`}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Calificación</Form.Label>
                <div>{renderStars(rating)}</div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="comment">
                <Form.Label>Comentario</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ingresa tu comentario"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  className={`${darkMode ? 'bg-dark text-light custom-placeholder' : 'text-dark'}`}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Enviar
              </Button>
            </Form>
          </motion.div>
        </Col>
      </Row>
    </>
  );
}