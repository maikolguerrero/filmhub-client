import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDarkMode } from '../../app/features/darkMode/darkMode';
import { selectToken } from '../../app/features/admins/adminsSlice';
import { selectReviews, fetchReviews } from '../../app/features/movies/reviewsSlice';
import API_ENDPOINT from '../../../config/api_endpoint';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ConfirmationModal from '../alerts/ConfirmationModal';
import CustomAlert from '../alerts/CustomAlert';
import { AiFillStar } from 'react-icons/ai';
import { Paginacion } from '../admin/tables/Paginacion';
import { variants } from '../../styles/animations/variants';
import { AnimatePresence, motion } from "framer-motion"

export default function ReviewsTable() {
  const reviews = useSelector(selectReviews);
  const token = useSelector(selectToken);
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(12);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleDeleteReview = (reviewId) => {
    setReviewToDelete(reviewId);
    setShowConfirmationModal(true);
  };

  const handleClose = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/reviews/${reviewToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setMessage('Error al eliminar la reseña.');
      } else {
        const dataResponse = await response.json();
        setMessage(dataResponse.message);
      }

      setShowAlert(true);
      handleClose();
      dispatch(fetchReviews());
    } catch (error) {
      setMessage('Error al eliminar la reseña.');
      setShowAlert(true);
    }
  };

  const roundToHalfStar = (rating) => {
    return Math.round(rating);
  };

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
          />
        );
      } else if (isDecimal && i === Math.floor(currentRating) + 1) {
        stars.push(
          <AiFillStar
            key={i}
            className="half-star fs-5 text-warning"
          />
        );
      } else {
        stars.push(
          <AiFillStar
            key={i}
            className="empty-star fs-5"
          />
        );
      }
    }
    return stars;
  };

  const maximo = Math.ceil(reviews.length / porPagina);

  return (
    <Container fluid className={`py-5 text-center ${darkMode ? 'bg-dark' : 'bg-light'}`} style={{ width: '100%' }}>
      <motion.h1
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
        className={`py-3 text-center ${darkMode ? 'text-light' : 'text-dark'}`}
      >
        Administrar Reseñas
      </motion.h1>
      {reviews.length === 0 ? (
        <h2 className={`text-danger`}>No hay reseñas disponibles</h2>
      ) : (
        <>
          <Table striped bordered hover responsive="md" variant={`${darkMode ? 'dark' : 'info'}`} className={`text-center text-light align-middle shadow border-1 border-info ${darkMode ? 'dark' : 'primary'}`}>
            <thead>
              <tr className='align-middle'>
                <th>ID</th>
                <th>Nombre</th>
                <th>Calificación</th>
                <th>Comentario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className='align-middle'>
              {reviews.slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina).map((review, index) => (
                <motion.tr
                  key={review.id}
                  custom={{ delay: (index + 1) * 0.2 }}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  variants={variants}
                  layoutId={review.id}
                >
                  <td>{review.id}</td>
                  <td>{review.name}</td>
                  <td>
                    {renderStars(roundToHalfStar(review.rating))}
                  </td>
                  <td>{review.comment}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteReview(review.id)}>
                      Eliminar
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </Table>

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
            <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
          </motion.div>

        </>
      )}

      <ConfirmationModal
        show={showConfirmationModal}
        handleClose={() => handleClose()}
        handleConfirm={() => handleConfirmDelete()}
        text={'¿Estás seguro de que quieres eliminar la reseña?'}
      />

      {showAlert && (
        <CustomAlert message={message} setShowAlert={setShowAlert} show={showAlert} duration={5000} />
      )}
    </Container>
  );
}
