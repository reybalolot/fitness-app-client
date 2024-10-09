import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <Container>
                <Row className="flex justify-content-center">
                    <h1 className="text-center m-2">Welcome to YOUR FITNESS APP</h1>
                    <Link className="flex justify-content-center btn btn-primary"  to="/login">Log In</Link>
                </Row>
            </Container>
        </>
    )
}

export default HomePage;
