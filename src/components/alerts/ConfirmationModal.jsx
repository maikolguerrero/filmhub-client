import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmationModal({ show, handleClose, handleConfirm, text }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className='bg-danger'>
        <Modal.Title className='text-light'>Confirmar eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {text}
      </Modal.Body>
      <Modal.Footer>
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