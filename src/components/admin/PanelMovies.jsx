import React, { useState } from "react";
import TablaMovies from "./tables/TablaMovies";
import { Button } from "react-bootstrap";
import ModalCentrado from "./modals/ModalCentrado";
import MoviesForm from "../forms/MoviesForm";
import { IoAddCircle } from "react-icons/io5";

export default function PanelMovies() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <section className='container h-auto p-4 my-5 bg-light rounded-3 border border-3 border-primary'>
            <TablaMovies />

            <Button variant="dark"
                className="d-flex justify-content-center align-items-center gap-2"
                onClick={() => {
                    setModalShow(true)
                }}>
                Agregar Nueva Película <IoAddCircle className="text-success fs-3"/>
            </Button>

            <ModalCentrado
                title={'Agregar Películas'}
                content={<MoviesForm titulo={'Agregar Pelicula'} />}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </section>
    );
}