import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDarkMode } from '../../../app/features/darkMode/darkMode';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { IoCreate, IoEllipsisHorizontalCircleSharp, IoTrash } from "react-icons/io5";
import { deleteMovie, fetchMovies } from '../../../app/features/movies/moviesSlice';
import { Link } from 'react-router-dom';
import ModalCentrado from '../modals/ModalCentrado';
import MoviesForm from '../../forms/MoviesForm';
import { Paginacion } from './Paginacion';
import ConfirmationModal from '../../alerts/ConfirmationModal';

function TablaMovies() {
  const darkMode = useSelector(selectDarkMode);

  const [modalShow, setModalShow] = useState(false);
  const [pelicula, setPelicula] = useState({});
  const [confirmacionEliminar, setConfirmacionEliminar] = useState(false);
  const [idMovie, setIdMovie] = useState('')

  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);


  const authState = useSelector((state) => state.auth);
  const movieState = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const maximo = Math.ceil(movieState.movies.length / porPagina);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleClose = () => {
    setConfirmacionEliminar(false);
  }

  const peticionEliminar = () => {
    dispatch(deleteMovie({ id: idMovie, token: authState.token }))
    handleClose()
  }

  const handleDeleteMovie = (id) => {
    setIdMovie(id);
    setConfirmacionEliminar(true);
  };

  return (
    <>
      <h1 className={`py-3 text-center ${darkMode ? 'text-light' : 'text-dark'}`}>Administrar Películas</h1>
      {movieState.movies.length === 0 ? (
        <p>No hay peliculas disponibles</p>
      ) : (
        <Table striped bordered hover responsive="lg" variant={`${darkMode ? 'dark' : 'info'}`} className={`text-center text-light align-middle shadow border-1 border-info ${darkMode ? 'dark' : 'primary'}`}>
          <thead className='align-middle'>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Género</th>
              <th>Fecha de Publicación</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody className='align-middle'>
            {
              movieState.movies.length === 0 ? (
                <p>No hay peliculas disponibles</p>
              ) : (
                movieState.movies.slice(
                  (pagina - 1) * porPagina,
                  (pagina - 1) * porPagina + porPagina
                ).map((movie) => (
                  <tr className='h-auto min-h-4' key={movie.id}>
                    <td>{movie.id}</td>
                    <td>{movie.title}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.release_date}</td>
                    <td className='fs-2 gap-2 d-flex justify-content-center align-items-center'>
                      <Button variant={`${darkMode ? 'primary' : 'dark'}`}
                        onClick={() => {
                          setPelicula(movie)
                          setModalShow(true)
                        }}><IoCreate className='text-info fs-4 d-flex justify-content-center align-items-center' /></Button>
                      <Button
                        variant={`${darkMode ? 'primary' : 'dark'}`}
                        onClick={e => {
                          handleDeleteMovie(movie.id)
                        }}
                      ><IoTrash className='text-danger fs-4 d-flex justify-content-center align-items-center'
                        /></Button>
                      <Link className='d-flex justify-content-center align-items-center' to={`/movies/${movie.id}`}>
                        <Button variant={`${darkMode ? 'primary' : 'dark'}`}><IoEllipsisHorizontalCircleSharp className='text-success fs-4 d-flex justify-content-center align-items-center' /></Button>
                      </Link>

                    </td>
                  </tr>
                ))
              )
            }
          </tbody>
        </Table>
      )}

      <ConfirmationModal
        show={confirmacionEliminar}
        handleClose={() => handleClose()}
        handleConfirm={peticionEliminar}
        text={"¿Estás seguro de que quieres eliminar la Película?"}
      />

      <ModalCentrado
        title={'Editar Película'}
        content={<MoviesForm titulo={'Editar Película'} edit={true} envio={true} movie={pelicula} />}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
    </>

  );
}

export default TablaMovies;