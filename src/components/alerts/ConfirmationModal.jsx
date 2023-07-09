import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../app/features/darkMode/darkMode'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmationModal({ show, handleClose, handleConfirm, text }) {
  const darkMode = useSelector(selectDarkMode);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className='bg-danger'>
        <Modal.Title className='text-light'>Confirmar eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
        {text}
      </Modal.Body>
      <Modal.Footer className={`${darkMode ? 'bg-dark' : 'bg-light'}`}>
        <Button variant="primary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}