import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { AiFillStar } from 'react-icons/ai';
import API_ENDPOINT from '../../../config/api_endpoint';
import { Link } from 'react-router-dom';
import { selectDarkMode } from '../../app/features/darkMode/darkMode'

export default function MovieCard({ movie }) {
  const { title, image, rating } = movie;
  const darkMode = useSelector(selectDarkMode);

  const renderStars = () => {
    const stars = [];
    const roundedRating = Math.round(rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(<AiFillStar key={i} className="filled-star fs-5 text-warning" />);
      } else {
        stars.push(<AiFillStar key={i} className="empty-star fs-5" />);
      }
    }

    return stars;
  };

  return (
    <Card className={`text-light shadow border-2 border-info ${darkMode ? 'bg-primary' : 'bg-secondary'}`} style={{ width: '16rem' }}>
      <Card.Img variant="top" src={`${API_ENDPOINT}/images/${image}`} alt="imágen_película" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{renderStars()}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex justify-content-center align-items-center">
          <Link to={`/movies/${movie.id}`}>
            <Button variant={`${darkMode ? 'dark' : 'light'}`}>Ver más...</Button>
          </Link>
        </div>
      </Card.Footer>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
  }).isRequired,
};