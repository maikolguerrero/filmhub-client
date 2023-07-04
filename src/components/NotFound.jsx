import Container from 'react-bootstrap/Container';
import API_ENDPOINT from '../../config/api_endpoint';

export default function NotFound() {
  const fetch404 = async () => {
    try {
      await fetch(`${API_ENDPOINT}/error`);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetch404();

  return (
    <Container fluid className="py-5 bg-warning text-center" style={{ width: "100%" }}>
      <div className="py-5">
        <h1 className='text-danger py-1'>404 - Página no encontrada</h1>
        <h2 className='text-black'>La página que estás buscando no existe.</h2>
      </div>
    </Container>
  );
}
