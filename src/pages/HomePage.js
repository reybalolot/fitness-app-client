import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login')
    }

    return (
        <>
            <Container>
                <Row className="flex justify-content-center">
                    <h1 className="text-center m-2 fw-bold">Welcome to YOUR FITNESS APP</h1>
                    <div className="d-flex" style={{justifyContent:'center', alignItems:'center'}}>
                        <Button
                            className="btn text-white"
                            style={{width:'90px', backgroundColor:'#653fc0',border:'1px solid #653fc0'}}
                            onClick={goToLogin}
                            >Log In</Button>
                    </div>
                </Row>
            </Container>
        </>
    )
}

export default HomePage;
