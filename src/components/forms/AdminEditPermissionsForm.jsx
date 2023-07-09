import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../app/features/darkMode/darkMode'
import { selectToken } from '../../app/features/admins/adminsSlice';
import API_ENDPOINT from '../../../config/api_endpoint';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CustomAlert from '../alerts/CustomAlert';

export default function AdminEditPermissionsForm({ adminId, permissions: initialPermissions }) {
  const token = useSelector(selectToken); // Obtener el token del estado de autenticación
  const darkMode = useSelector(selectDarkMode);

  const [show, setShow] = useState(false);
  const [permissions, setPermissions] = useState(initialPermissions);
  const [permissionsOriginal, setPermissionsOriginal] = useState(initialPermissions);
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!edit) setPermissions(permissionsOriginal);
    else setPermissionsOriginal(permissions);

    if (edit) setEdit(false);
  }, [show, edit]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPermissions(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_ENDPOINT}/admin/permissions/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ permissions }),
      });

      if (!response.ok) setMessage("Error al actualizar los permisos");
      else {
        const dataResponse = await response.json();
        setMessage(dataResponse.message);
        setEdit(true)
      };

      setShowAlert(true);
      handleClose();
    } catch (error) {
      setMessage("Error al actualizar los permisos");
      setShowAlert(true);
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Permisos
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className='bg-warning'>
          <Modal.Title>Editar Permisos</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="createPermission">
              <Form.Check
                type="checkbox"
                label="Crear"
                name="create"
                checked={permissions.create}
                onChange={handleCheckboxChange}
              />

            </Form.Group>

            <Form.Group controlId="editPermission">
              <Form.Check
                type="checkbox"
                label="Editar"
                name="edit"
                checked={permissions.edit}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Form.Group controlId="deletePermission">
              <Form.Check
                type="checkbox"
                label="Eliminar"
                name="delete"
                checked={permissions.delete}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Modal.Footer className={`${darkMode ? 'bg-dark' : 'bg-light'}`}>
              <Button variant="danger" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="warning" type="submit">
                Editar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {showAlert && (
        <CustomAlert message={message} setShowAlert={setShowAlert} show={showAlert} duration={5000} />
      )}
    </>
  );
};