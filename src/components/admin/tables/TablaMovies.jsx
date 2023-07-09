import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDarkMode } from '../../../app/features/darkMode/darkMode';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { IoCreate, IoEllipsisHorizontalCircleSharp, IoTrash } from "react-icons/io5";
import { deleteMovie } from '../../../app/features/movies/moviesSlice';
import { Link } from 'react-router-dom';
import ModalCentrado from '../modals/ModalCentrado';
import MoviesForm from '../../forms/MoviesForm';
import { Paginacion } from './Paginacion';
import ConfirmationModal from '../../alerts/ConfirmationModal';
import { AnimatePresence, motion } from "framer-motion"
import { variants } from '../../../styles/animations/variants';

export default function TablaMovies({ movieState }) {
  const authState = useSelector((state) => state.auth);
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);
  const [pelicula, setPelicula] = useState({});
  const [confirmacionEliminar, setConfirmacionEliminar] = useState(false);
  const [idMovie, setIdMovie] = useState('');

  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(10);
  const [maximo, setMaximo] = useState(Math.ceil(movieState.movies.length / porPagina));


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
      <motion.h1
        className={`py-3 text-center ${darkMode ? 'text-light' : 'text-dark'}`}
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
      >
        Administrar Películas
      </motion.h1>
      {movieState?.movies?.length === 0 ? (
        <h2 className={`text-danger`}>No hay peliculas disponibles</h2>
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
              {movieState.movies.slice(
                (pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina
              ).map((movie, index) => (
                <motion.tr
                  className='h-auto min-h-4'
                  key={movie.id}
                  custom={{ delay: (index + 1) * 0.2 }}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  variants={variants}
                  layoutId={movie.id}
                >
                  <td>{movie.id}</td>
                  <td>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.release_date.slice(0, 10)}</td>
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
                    ><IoTrash className='text-danger fs-4 d-flex justify-content-center align-items-center' /></Button>
                    <Link className='d-flex justify-content-center align-items-center' to={`/movies/${movie.id}`}>
                      <Button variant={`${darkMode ? 'primary' : 'dark'}`}><IoEllipsisHorizontalCircleSharp className='text-success fs-4 d-flex justify-content-center align-items-center' /></Button>
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          
        </Table >
      )
      }

      {
        movieState?.movies?.length != 0 && (
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
        )
      }

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

    </>
  );
}