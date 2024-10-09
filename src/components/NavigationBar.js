import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {


    return (
        <>
        <Navbar className="bg-body-tertiary m-2 rounded-3 p-0 shadow-" style={{border:'3px solid #653fc0'}}>
          <Container className=''>
            <Navbar.Text className='fw-bolder fs-5 p-0'><span style={{color:'#653fc0'}}>Fit</span>Pulse</Navbar.Text>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Link>Logout</Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </>
    )
}


export default NavigationBar;
