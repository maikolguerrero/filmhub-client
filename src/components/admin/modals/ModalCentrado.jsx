import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../../app/features/darkMode/darkMode'

export default function ModalCentrado(props) {
  const darkMode = useSelector(selectDarkMode);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='border-2 border-info'
    >
      <Modal.Header closeButton className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`} >
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-light'}`} >
        {props.content}
      </Modal.Body>
      <Modal.Footer className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-light'}`}>
        <Button variant='danger' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}