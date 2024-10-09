import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import swal from "sweetalert2";

const RegistrationPage = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isActive, setIsActive ] = useState(false);
    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();

        const url = process.env.API_SERVER_URL || "https://fitnessapp-api-ln8u.onrender.com";

        fetch(`${url}/users/register`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			if (typeof data.access !== 'undefined') {

                localStorage.setItem('token', data.access);
                navigate('/login')

			} else if (data.message === "Email already exists") {
                swal.fire({
                    title: "Email already exists",
                    icon: "info",
                    text: "Try logging in"
                }).then(() => {
                    navigate('/login');
                })
            } else {
				swal.fire({
					title: "Registration failed",
					icon: "error",
					text: "Check your login details and try again."
				});
			}
		})
		.catch(error => {
			swal.fire({
				title: "Registration Failed",
				icon: "error",
				text: "Something went wrong. Please try again later."
			});
		});
    }

    useEffect(() => {
        if (email !== '' && password !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password]);

    return (
        <>
           <Container className="flex">
                <Row className="justify-content-center">
                    <Card className="m-5">
                        <Form onSubmit={register} className="p-5">
                            <h1 className="">Registration</h1>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
	        	                    value={email}
            				        onChange={(e) => setEmail(e.target.value)}
	        	                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="password"
	        	                    placeholder="Enter password"
	        	                    value={password}
            				        onChange={(e) => setPassword(e.target.value)}
	        	                    required
                                />
                            </Form.Group>

                             { isActive ?
	        	                <Button variant="primary" type="submit" id="submitBtn" className="mt-3 w-100">
	        	                    Submit
	        	                </Button>
	        	                 :
	        	                <Button variant="secondary" type="submit" id="submitBtn" disabled className="mt-3 w-100">
	        	                    Submit
	        	                </Button>
	        	            }
					            <p className="text-center mt-3">
                    	            Don't have an account? Click <Link to="/register">here</Link> to register.
                	            </p>
                        </Form>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default RegistrationPage;
