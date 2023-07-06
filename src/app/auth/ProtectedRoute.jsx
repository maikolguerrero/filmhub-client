import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Panel from '../../components/admin/Panel';

// Enrutamiento protegido
export default function ProtectedRoute({ panelRoute: PanelRoute, route: Route, myPath }) {
  const { token, isLoggedIn } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const path = myPath == "registro" ? "/admin/registro" : "/admin/login";
    // Verificar si el token existe y es válido
    if (!token || !isLoggedIn) return navigate(path); // Si no se ha iniciado sesión se redirige a la ruta del login o registro
    navigate('/admin/panel'); // Si no se redirige al panel
  }, [token, isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (PanelRoute ? <PanelRoute /> : <Panel />) : (Route ? <Route /> : <></>)}
    </>
  );
};
