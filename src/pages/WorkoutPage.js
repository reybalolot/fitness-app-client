
import { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import UserContext from '../context/UserContext';
import swal from "sweetalert2";

const WorkoutPage = () => {

    const { user } = useContext(UserContext)
    const [ workouts, setWorkouts ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);
    const [ showUpdateModal, setShowUpdateModal ] = useState(false);
    const [ selectedId, setSelectedId] = useState('');
    const [ newWorkoutName, setNewWorkoutName] = useState('');
    const [ newWorkoutDuration, setNewWorkoutDuration] = useState('');
    const [ isChanged, setIsChanged ] = useState(false);

    const navigate = useNavigate()
    const url = process.env.REACT_APP_URL || "https://fitnessapp-api-ln8u.onrender.com";


    const fetchWorkouts = () => {

         fetch(`${url}/workouts/getMyWorkouts`, {
             headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`,
                "Content-Type": "application/json",
            }
         })
        .then(res => res.json())
        .then(data => {

            if (data.message === 'No Workouts found.') {
                setWorkouts(<h3>NO WORKOUTS FOUND</h3>)
            } else {

                const workoutItems = data.workouts.map(item => {
                    return (
                        <Col className="d-flex justify-content-center my-3 col-12 col-md-6 col-lg-4" key={item._id}>
                        <Card style={{width:'300px', minWidth:'300px' }}>
                            <Card.Body>
                              <Card.Title>{item.name}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">{item.duration}</Card.Subtitle>
                              <Card.Subtitle className="text-secondary">{item.status}</Card.Subtitle>
                              <Row className="m-1">
                                <Button className="my-2" variant="outline-success" onClick={() => handleCompleteWorkout(item._id)}>Mark Complete</Button>
                              </Row>
                              <Row className="m-1">
                                <Button className="col-6" variant="outline-info" onClick={() => handleUpdateWorkout(item._id, item)}>Update</Button>
                                <Button className="col-6" variant="outline-danger" onClick={() => handleDeleteWorkout(item._id)}>Delete</Button>
                              </Row>
                            </Card.Body>
                        </Card>
                        </Col>
                    )
                })
                setWorkouts(workoutItems)
            }
        })
    }

    const handleCreateWorkout = () => {
         fetch(`${url}/workouts/addWorkout`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newWorkoutName,
                duration: newWorkoutDuration
            })
         })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Error adding workout',
                });
            } else {
                swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Workout created successfully!',
                });
            }
            setIsChanged(true);
            setShowModal(false);
            setNewWorkoutName('');
            setNewWorkoutDuration('');
        })
    }

    const handleUpdateWorkout = (id, workout) => {
        setSelectedId(id);
        setNewWorkoutName(workout.name)
        setNewWorkoutDuration(workout.duration)
        setShowUpdateModal(true);
    }

    const handleSaveUpdateWorkout = () => {
          fetch(`${url}/workouts/updateWorkout/${selectedId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newWorkoutName,
                duration: newWorkoutDuration
            })
         })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Error adding workout',
                });
            } else {
                swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Workout updated successfully!',
                });
            }
            setIsChanged(true);
            setShowUpdateModal(false);
            setNewWorkoutName('');
            setNewWorkoutDuration('');
        })
    }

    const handleCompleteWorkout = (id) => {
        console.log(id)
         fetch(`${url}/workouts/completeWorkoutStatus/${id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`,
                "Content-Type": "application/json",
            },
         })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Error saving workout',
                });
            } else {
                swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Workout completed!',
                });
            }
            setIsChanged(true)
        })
    }

      const handleDeleteWorkout = (id) => {
         fetch(`${url}/workouts/deleteWorkout/${id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${ localStorage.getItem('token') }`,
                "Content-Type": "application/json",
            },
         })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Error deleting workout',
                });
            } else {
                swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Workout deleted!',
                });
            }
            setIsChanged(true)
        })
    }


    useEffect(() => {
        console.log(user.id)
        if (user.id === null) {
            // navigate('/login')
        } else {
            fetchWorkouts();
        }
    },[user])

    useEffect(() => {
        if(user.id !== null) {
            fetchWorkouts();
            setIsChanged(false)
        }
    }, [isChanged])

    return (
        <>
        {user.id === null ? (
             <p className="text-center mt-3">
             You've been logged out. Go to <Link to="/login">login</Link>.
            </p>
    ) : (
            <>

        <Container className="">
            <h2 className="fw-bold">My Workouts</h2>
            <div className="d-flex" style={{justifyContent:'start', alignItems:'center'}}>
                <Button className="btn text-white" style={{width:'90px', backgroundColor:'#653fc0',border:'1px solid #653fc0'}} onClick={() => setShowModal(true)}>Add</Button>
            </div>
            <hr/>
            <Row className="justify-content-center">
                {workouts}
            </Row>
        </Container>

        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newWorkoutName}
                                onChange={(e) => setNewWorkoutName(e.target.value)}
                                maxLength={80}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration in Minutes</Form.Label>
                            <Form.Control
                                type="text"
                                value={newWorkoutDuration}
                                onChange={(e) => setNewWorkoutDuration(e.target.value)}
                                maxLength={80}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveUpdateWorkout}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

        {/* ADD MODAL */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newWorkoutName}
                                onChange={(e) => setNewWorkoutName(e.target.value)}
                                maxLength={80}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration in Minutes</Form.Label>
                            <Form.Control
                                type="text"
                                value={newWorkoutDuration}
                                onChange={(e) => setNewWorkoutDuration(e.target.value)}
                                maxLength={80}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleCreateWorkout}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
        )}
        </>
    )
}

export default WorkoutPage;
