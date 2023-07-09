import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IoCreate, IoEllipsisHorizontalCircleSharp, IoTrash } from "react-icons/io5";
import { deleteMovie, fetchMovies } from '../../../app/features/movies/moviesSlice';
import { Link } from 'react-router-dom';
import ModalCentrado from '../modals/ModalCentrado';
import MoviesForm from '../../forms/MoviesForm';
import { Paginacion } from './Paginacion';
import ConfirmationModal from '../../alerts/ConfirmationModal';

function TablaMovies() {

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
            <h2 className="text-center p-3">Todas las Películas</h2>
            <Table responsive="lg" className='m-auto text-center border border-3 border-dark '>
                <thead >
                    <tr className='h-4'>
                        <th className='bg-primary text-light h-100'><h4 className='d-flex m-0 h-100 justify-content-center align-items-center fs-5'>ID</h4></th>
                        <th className='bg-primary text-light h-100'><h4 className='d-flex m-0 h-100 justify-content-center align-items-center fs-5'>Título</h4></th>
                        <th className='bg-primary text-light h-100'><h4 className='d-flex m-0 h-100 justify-content-center align-items-center fs-5'>Género</h4></th>
                        <th className='bg-primary text-light h-100'><h4 className='d-flex m-0 h-100 justify-content-center align-items-center fs-5'>Fecha de Publicación</h4></th>
                        <th className='bg-primary text-light h-100'><h4 className='d-flex m-0 h-100 justify-content-center align-items-center fs-5'>Opciones</h4></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        movieState.movies.length === 0 ? (
                            <p>No hay peliculas disponibles</p>
                        ) : (
                            movieState.movies.slice(
                                (pagina - 1) * porPagina,
                                (pagina - 1) * porPagina + porPagina
                            ).map((movie) => (
                                <tr className='h-auto min-h-4' key={movie.id}>
                                    <td className='bg-secondary text-light h-100'> <p className='d-flex m-0 h-100 justify-content-center align-items-center'>{movie.id}</p></td>
                                    <td className='bg-secondary text-light h-100'> <p className='d-flex m-0 h-100 justify-content-center align-items-center'>{movie.title}</p></td>
                                    <td className='bg-secondary text-light h-100'> <p className='d-flex m-0 h-100 justify-content-center align-items-center'>{movie.genre}</p></td>
                                    <td className='bg-secondary text-light h-100'> <p className='d-flex m-0 h-100 justify-content-center align-items-center'>{movie.release_date}</p></td>
                                    <td className='bg-secondary fs-3 gap-2 h-100'>
                                        <div className='fs-1 gap-2 d-flex justify-content-center align-items-center w-100 h-100'>
                                            <Button variant="dark"
                                                onClick={() => {
                                                    setPelicula(movie)
                                                    setModalShow(true)
                                                }}><IoCreate className='text-info fs-4 d-flex justify-content-center align-items-center' /></Button>
                                            <Button
                                                variant="dark"
                                                onClick={e => {
                                                    handleDeleteMovie(movie.id)
                                                }}
                                            ><IoTrash className='text-danger fs-4 d-flex justify-content-center align-items-center'
                                                /></Button>
                                            <Link className='d-flex justify-content-center align-items-center' to={`/movies/${movie.id}`}>
                                                <Button variant="dark"><IoEllipsisHorizontalCircleSharp className='text-success fs-4 d-flex justify-content-center align-items-center' /></Button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </Table>

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