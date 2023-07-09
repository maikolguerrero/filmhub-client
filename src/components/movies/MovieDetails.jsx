import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectDarkMode } from '../../app/features/darkMode/darkMode'
import { fetchMovieDetails } from '../../app/features/movies/moviesSlice';
import API_ENDPOINT from '../../../config/api_endpoint';
import { AiFillStar } from 'react-icons/ai';
import { Row, Col, Image } from 'react-bootstrap';

export default function MovieDetails() {
  const { id } = useParams();
  const movieDetails = useSelector((state) => state.movies.movieDetails);
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  const renderStars = () => {
    const stars = [];
    const roundedRating = Math.round(movieDetails.rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(
          <AiFillStar key={i} className="filled-star fs-5 text-warning" />
        );
      } else {
        stars.push(<AiFillStar key={i} className="empty-star fs-5" />);
      }
    }

    return stars;
  };

  return (
    <Row className={`${darkMode ? 'bg-dark text-light' : 'bg-light'}`}>
      <Col md={5} className="my-5 d-flex align-items-center justify-content-center">
        <Image
          width={300}
          height={450}
          src={`${API_ENDPOINT}/images/${movieDetails.image}`}
          alt={movieDetails.title}
          style={
            hover
              ? { transform: 'scale(1.1)', opacity: 0.9 }
              : {}
          }
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      </Col>
      <Col md={5} className="my-5 align-items-center justify-content-center">
        <h1 className="movie-title">{movieDetails.title}</h1>
        <p>
          <strong>Calificación:</strong> {renderStars()}
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
          {movieDetails.release_date}
        </p>
        <p>
          <strong>Actores:</strong> {movieDetails.actors.join(', ')}
        </p>
        <p>
          <strong>Directores:</strong> {movieDetails.directors.join(', ')}
        </p>
      </Col>
    </Row>
  );
}
