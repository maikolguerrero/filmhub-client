import { useDispatch } from 'react-redux';
import { setLoggedIn, setToken } from './authSlice';
import validateToken from '../../app/auth/validateToken';

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    dispatch(setToken(storedToken));
  }, [dispatch]);

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (!token || !(await validateToken(token))) {
        dispatch(setLoggedIn(false));
      } else {
        dispatch(setLoggedIn(true));
      }
    };

    if (token) {
      checkTokenValidity();
    }
  }, [token, dispatch]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};