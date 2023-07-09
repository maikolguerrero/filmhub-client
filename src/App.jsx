import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import NavbarResponsive from "./components/Navbar";
import Footer from "./components/footer/Footer";
import NotFound from './components/NotFound';
import Home from './components/Home';
import MovieDetails from './components/movies/MovieDetails';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
import { store } from './app/store';
import ProtectedRoute from './app/auth/ProtectedRoute';
import Panel from './components/admin/Panel';
import AdminsTable from './components/admin/AdminsTable';
import PanelMovies from './components/admin/PanelMovies';
import ReviewsTable from './components/admin/ReviewsTable';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter className="styles">
        <NavbarResponsive />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movies/:id" element={<MovieDetails />} />

          <Route path="/admin">
            <Route path="" element={<ProtectedRoute />} />
            <Route path="login" element={<ProtectedRoute route={LoginForm} />} />
            <Route path="registro" element={<ProtectedRoute route={RegisterForm} myPath="registro" />} />

            <Route path="panel">
              <Route path="" element={<ProtectedRoute route={Panel} />} />
              <Route path="movies" element={<ProtectedRoute panelRoute={PanelMovies} />} />
              <Route path="reviews" element={<ProtectedRoute panelRoute={ReviewsTable} />} />
              <Route path="users" element={<ProtectedRoute panelRoute={AdminsTable} />} />
            </Route>
          </Route>

          <Route path="error404" Component={NotFound} />
          <Route path="*" element={<Navigate to="/error404" />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </Provider>
  )
}