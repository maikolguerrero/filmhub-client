import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdmins, selectAdmins, selectToken } from '../../app/features/admins/adminsSlice';
import API_ENDPOINT from '../../../config/api_endpoint';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ConfirmationModal from '../alerts/ConfirmationModal';
import AdminEditPermissionsForm from '../forms/AdminEditPermissionsForm';
import CustomAlert from '../alerts/CustomAlert';
import { Paginacion } from '../admin/tables/Paginacion';

export default function AdminsTable() {
  const admins = useSelector(selectAdmins)
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const [adminDeleted, setAdminDeleted] = useState(false);
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);

  useEffect(() => {
    dispatch(fetchAdmins());
    setAdminDeleted(false);
  }, [dispatch, token, adminDeleted]);

  const handleDeleteAdmin = (adminId) => {
    setAdminToDelete(adminId);
    setShowConfirmationModal(true);
  };

  const maximo = Math.ceil(admins.length / porPagina);

  const handleClose = () => {
    setShowConfirmationModal(false);
  }

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/admin/${adminToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) { setMessage("Error al eliminar el admin.") }
      else {
        const dataResponse = await response.json();
        setMessage(dataResponse.message);
      };

      setShowAlert(true);
      setAdminDeleted(true);
      handleClose();
    } catch (error) {
      setMessage("Error al eliminar el admin.");
      setShowAlert(true);
    }
  };

  return (
    <Container fluid className="py-5 bg-light text-center" style={{ width: "100%" }}>
      {admins.length == 0 ?
        <div className="py-5">
          <h1 className='text-danger py-1'>No tienes permisos</h1>
          <h2 className='text-black'>No puedes ver los datos de los admins</h2>
        </div> :
        <>
          <h1>Administrar Usuarios Admins</h1>
          <Row className="justify-content-center pt-3">
            <Col xs={11} sm={9} md={7} lg={6}>
              <Table striped bordered hover variant="info" responsive="md" className="text-center text-light align-middle shadow border-1 border-info">
                <thead>
                  <tr className='align-middle'>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.slice(
                    (pagina - 1) * porPagina,
                    (pagina - 1) * porPagina + porPagina
                  ).map((admin) => (
                    <tr key={admin.id}>
                      <td>{admin.id}</td>
                      <td>{admin.username}</td>
                      <td>{admin.role}</td>
                      <td>
                        <Row xs={1} sm={2} md={2} lg={2} xl={2} className="mx-0">
                          <Col className="my-1">
                            <AdminEditPermissionsForm adminId={admin.id} permissions={admin.permissions} />
                          </Col>
                          <Col className="my-1">
                            <Button variant="danger" className='' onClick={() => handleDeleteAdmin(admin.id)}>
                              Eliminar
                            </Button>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      }

      <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />

      <ConfirmationModal
        show={showConfirmationModal}
        handleClose={() => handleClose()}
        handleConfirm={handleConfirmDelete}
        text={"¿Estás seguro de que quieres eliminar al admin?"}
      />

      {showAlert && (
        <CustomAlert message={message} setShowAlert={setShowAlert} show={showAlert} duration={5000} />
      )}
    </Container >
  );
}