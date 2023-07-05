import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarResponsive from "./components/Navbar";
import Footer from "./components/footer/Footer";
import NotFound from './components/NotFound';
import Home from './components/Home';
import MovieDetails from './components/movies/MovieDetails';

export default function App() {
  return (
    <BrowserRouter className="styles">
      <NavbarResponsive />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="movies">
          <Route path="" element={<>movies</>} />
          <Route path=":id" element={<MovieDetails />} />
        </Route>

        <Route path="/admin">
          <Route path="" element={<>Reditigir...</>} />
          <Route path="login" element={<>login</>} />
          <Route path="registro" element={<>registro</>} />

          <Route path="panel">
            <Route path="" element={<>Panel admin</>} />

            <Route path="movies">
              <Route path="" element={<>Panel ver movies para editar y eliminar</>} />
              <Route path="add" element={<>Panel agregar movies</>} />
            </Route>

            <Route path="users" element={<>Panel usuarios admin</>} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}
