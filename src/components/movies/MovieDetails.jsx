import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieDetails } from '../../app/features/movies/moviesSlice';
import { addReview } from '../../app/features/movies/reviewsSlice'; // Importar addReview desde reviewsSlice
import API_ENDPOINT from '../../../config/api_endpoint';
import { AiFillStar } from 'react-icons/ai';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function MovieDetails() {
    const { id } = useParams();
    const movieDetails = useSelector((state) => state.movies.movieDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);
    const [name, setName] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        dispatch(fetchMovieDetails(id)).then((response) => {
            if (response.error) {
                navigate('/notfound');
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
            alert('Por favor completa los campos de nombre y comentario antes de enviar el formulario.');
            return;
        }

        const review = { name, rating, comment, movieId: movieDetails.id };
        dispatch(addReview(review));
        alert("Su reseña ha sido enviada exitosamente");
        setName('');
        setRating(0);
        setComment('');
    };

    return (
        <>
            <Row className='mx-3'>
                <Col md={5} className="my-5 d-flex align-items-center justify-content-center mx-3">
                    <Image
                        width={300}
                        height={450}
                        src={`${API_ENDPOINT}/images/${movieDetails.image}`}
                        alt={movieDetails.title}
                        style={
                            hover
                                ? { transform: 'scale(1.1)', opacity: 0.8 }
                                : {}
                        }
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    />
                </Col>
                <Col md={5} className="my-5 align-items-center justify-content-center">
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
            <Row className="my-5 mx-3">
                <Col md={{ span: 6, offset: 3 }}>
                    <h2>Agregar una reseña</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa tu nombre"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
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
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
}
