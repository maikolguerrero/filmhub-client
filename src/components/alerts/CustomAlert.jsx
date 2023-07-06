// import React, { useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// import Modal from 'react-bootstrap/Modal';
// // import { hideAlert } from '../../app/features/alert/alertSlice';

// export default function CustomAlert({messageAlert, }) {
//   // const dispatch = useDispatch();

//   // const showAlert = useSelector((state) => state.alert.showAlert);
//   // const messageAlert = useSelector((state) => state.alert.messageAlert);

//   useEffect(() => {
//     if (showAlert) {
//       const timeoutId = setTimeout(() => {
//         handleClose();
//       }, 5000);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [showAlert]);

//   const handleClose = () => {
//     dispatch(hideAlert());
//   };

//   return (
//     <Modal show={showAlert} onHide={handleClose} centered className='d-flex justify-content-center align-items-center m-0 p-0'>
//       <Modal.Header className="bg-warning text-white">
//         <Modal.Title>Info</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>{messageAlert}</Modal.Body>
//     </Modal>
//   );
// }



import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function CustomAlert({ message, show, setShowAlert, duration, redirectPath }) {
  const navigate = useNavigate();
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
      <Modal.Header className="bg-warning text-white">
        <Modal.Title>Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
    </Modal>
  );
}

CustomAlert.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
};
