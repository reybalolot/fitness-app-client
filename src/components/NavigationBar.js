import { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';


const NavigationBar = () => {

    const { user, unsetUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
      unsetUser();
      localStorage.clear();
      navigate('/login');
    }


    return (
        <>
        <Navbar className="bg-body-tertiary m-2 rounded-3 p-0 shadow" style={{border:'3px solid #653fc0'}}>
          <Container className=''>
            <Navbar.Text className='fw-bolder fs-5 p-0'><span style={{color:'#653fc0'}}>Fit</span>Pulse</Navbar.Text>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              {user.id === null ? (
                <Nav.Link as={Link} to={'/register'} className='fw-regular fs-6'>Register</Nav.Link>
              ) : (
                <Nav.Link as={Link} onClick={handleLogout} className='fw-bold'>Logout</Nav.Link>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </>
    )
}


export default NavigationBar;
