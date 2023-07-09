import React, { useState } from "react";
import { useSelector } from 'react-redux'
import { selectDarkMode } from '../../app/features/darkMode/darkMode';
import TablaMovies from "./tables/TablaMovies";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ModalCentrado from "./modals/ModalCentrado";
import MoviesForm from "../forms/MoviesForm";
import { IoAddCircle } from "react-icons/io5";

export default function PanelMovies() {
    const darkMode = useSelector(selectDarkMode);
    const movieState = useSelector((state) => state.movies);
    const [modalShow, setModalShow] = useState(false);

    return (
        <Container fluid className={`py-5 text-center  ${darkMode ? 'bg-dark' : 'bg-light'}`} style={{ width: "100%" }}>
            {movieState.movies.length === 0 ? (<></>) : (<TablaMovies />)}

            <Button variant='dark'
                className="d-flex justify-content-center align-items-center gap-2"
                onClick={() => {
                    setModalShow(true)
                }}>
                Agregar Nueva Película <IoAddCircle className="text-success fs-3" />
            </Button>

            <ModalCentrado
                title={'Agregar Películas'}
                content={<MoviesForm titulo={'Agregar Pelicula'} />}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </Container>
    );
}