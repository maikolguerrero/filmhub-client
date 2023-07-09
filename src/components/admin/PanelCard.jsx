import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../../app/features/darkMode/darkMode'

export default function PanelCard({title, text, to}) {
  const darkMode = useSelector(selectDarkMode);
  
  return (
    <Card bg={`${darkMode ? 'dark' : 'secondary'}`} className='border-2 border-info'  style={{ width: '14rem' }}>
      <Card.Header className="text-center text-light fs-4">{title}</Card.Header>
      <Card.Body className="text-center text-light">
        <Card.Text>{text}</Card.Text>
        <Card.Link className="d-flex justify-content-center text-warning" as={Link} to={to}>Administrar</Card.Link>
      </Card.Body>
    </Card>
  );
}