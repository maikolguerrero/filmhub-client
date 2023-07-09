import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDarkMode } from '../../app/features/darkMode/darkMode'
import { listarGeneros } from "../../app/features/movies/generosSlice";
import { Button } from "react-bootstrap";
import API_ENDPOINT from "../../../config/api_endpoint";
import { fetchMovies } from "../../app/features/movies/moviesSlice";
import CustomAlert from "../alerts/CustomAlert";

export default function MoviesForm(props) {
  const authState = useSelector((state) => state.auth);
  const generosState = useSelector((state) => state.generos);
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  const [state, setState] = useState({
    title: "",
    genre: "",
    synopsis: "",
    release_date: "",
    actors: "",
    directors: "",
    franchise: "",
    image: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(listarGeneros());

    if (props.envio) {
      let release_date = props.movie.release_date.split(/T/, 1)
      let genre = 0
      generosState.generos.forEach(genero => {
        if (genero.name === props.movie.genre) {
          genre = genero.id
        }
      });

      setState({
        ...state,
        title: props.movie.title,
        genre: genre.toString(),
        synopsis: props.movie.synopsis,
        release_date: release_date.toString(),
        actors: props.movie.actors.toString(),
        directors: props.movie.directors.toString(),
        franchise: props.movie.franchise,
        image: 'permanece',
      })
    }
  }, []);

  const error = undefined;

  const validacion = () => {
    let claves = Object.keys(state);
    for (let i = 0; i < claves.length; i++) {
      let clave = claves[i];
      if (state[clave].trim() === '') {
        return true
      };
    }
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const error = validacion();

    if (error) {
      setMessage('Algún Campo es Inválido')
      setShowAlert(true)
      return
    }

    const formData = new FormData(e.currentTarget)

    if (props.edit) {
      return fetch(`${API_ENDPOINT}/movies/${props.movie.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authState.token}`
        },
        body: formData
      })
        .then(response => response.json())
        .then(data => {

          if (data.status === 200) {
            dispatch(fetchMovies())
            setMessage(data.message)
            setShowAlert(true)
          }

        })
    }

    fetch(`${API_ENDPOINT}/movies`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authState.token}`
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 201) {
          dispatch(fetchMovies())
          setMessage(data.message)
          setShowAlert(true)
        }

      })

    setState({
      title: "",
      genre: "",
      synopsis: "",
      release_date: "",
      actors: "",
      directors: "",
      franchise: "",
      image: "",
    })
  };

  return (
    <div className={`container p-4 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-center">{props.titulo}</h2>

        <Form.Group className="mb-3" controlId="titulo-m">
          <Form.Label>Título:</Form.Label>
          <Form.Control
            name="title"
            type="text"
            placeholder="Ingresa el Título"
            onChange={handleChange}
            value={state.title}
            className={`${darkMode ? 'bg-dark text-light custom-placeholder' : 'text-dark'}`}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="fecha-m">
          <Form.Label>Fecha de Publicación:</Form.Label>
          <Form.Control
            name="release_date"
            type="date"
            onChange={handleChange}
            value={state.release_date}
            className={`${darkMode ? 'bg-dark text-light custom-placeholder' : 'text-dark'}`}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="sinopsis-m">
          <Form.Label>Sinopsis:</Form.Label>
          <Form.Control
            name="synopsis"
            as="textarea"
            rows={3}
            placeholder="Ingresa la sinopsis de la películas..."
            onChange={handleChange}
            value={state.synopsis}
            className={`${darkMode ? 'bg-dark text-light custom-placeholder' : 'text-dark'}`}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="actores-m">
          <Form.Label>Actores:</Form.Label>
          <Form.Control
            name="actors"
            type="text"
            placeholder="Ingresa los actores"
            onChange={handleChange}
            value={state.actors}
            className={`${darkMode ? 'bg-dark text-light custom-placeholder' : 'text-dark'}`}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="generos-m">
          <Form.Label>Género:</Form.Label>
          <Form.Select
            name="genre"
            aria-label="Default select example"
            onChange={handleChange}
            value={state.genre}
            className={`${darkMode ? 'bg-dark text-light custom-placeholder' : 'text-dark'}`}
          >
            <option value=""> </option>
            {generosState.generos.map((genero) => (
              <option value={genero.id} key={genero.id}>
                {" "}
                {genero.name}{" "}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="directores-m">
          <Form.Label>Directores:</Form.Label>
          <Form.Control
            name="directors"
            type="text"
            placeholder="Ingresa los directores"
            onChange={handleChange}
            value={state.directors}
            className={`${darkMode ? 'bg-dark text-light custom-placeholder' : 'text-dark'}`}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="franquisia-m">
          <Form.Label>Franquisia:</Form.Label>
          <Form.Control
            name="franchise"
            type="text"
            placeholder="Ingresa la franquicia"
            onChange={handleChange}
            value={state.franchise}
            className={`${darkMode ? 'bg-dark text-light custom-placeholder' : 'text-dark'}`}
          />
        </Form.Group>

        <Form.Group controlId="imagen-m" className="mb-3">
          <Form.Label>Ingresa el poster: </Form.Label>
          <Form.Control
            name="image"
            type="file"
            onChange={handleChangeImage}
            className={`${darkMode ? 'bg-dark text-light custom-placeholder' : 'text-dark'}`}
          />
        </Form.Group>

        <Button
          disabled={error}
          className="boton-enviar text-light"
          type="submit"
          variant="info"
        >
          {props.titulo}
        </Button>
      </Form>

      {
        showAlert && (
          <CustomAlert message={message} setShowAlert={setShowAlert} show={showAlert} duration={5000} />
        )
      }
    </div>
  );
}