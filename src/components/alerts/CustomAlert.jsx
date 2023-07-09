import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../app/features/darkMode/darkMode'
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function CustomAlert({ message, show, setShowAlert, duration, redirectPath }) {
  const navigate = useNavigate();
  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    if (show && duration) {
      const timeoutId = setTimeout(() => {
        onDismiss();
      }, duration);

      if (show && duration && redirectPath) {
        setTimeout(() => {
          navigate(redirectPath);
        }, duration);
      }

      return () => clearTimeout(timeoutId);
    }
  }, [show, duration]);

  const onDismiss = () => {
    setShowAlert(false);
  };

  const handleClose = () => {
    onDismiss();
  };

  return (
    <Modal show={show} onHide={handleClose} centered className='d-flex justify-content-center align-items-center m-0 p-0'>
      <Modal.Header className="bg-info text-white">
        <Modal.Title>Info</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`shadow ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>{message}</Modal.Body>
    </Modal>
  );
}

CustomAlert.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
};
