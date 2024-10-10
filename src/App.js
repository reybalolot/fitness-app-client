import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { UserProvider } from './context/UserContext';
import WorkoutPage from './pages/WorkoutPage';
import LoginPage from './pages/LoginPage';
import NavigationBar from "./components/NavigationBar";
import RegistrationPage from "./pages/RegistrationPage";
import HomePage from "./pages/HomePage";

import './App.css';

function App() {

  const [user, setUser] = useState({id:null});
  const unsetUser = () => { localStorage.clear(); setUser({id:null})}

  const url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch(`${url}/workouts/getMyWorkouts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.workouts) {

          setUser({id:data.workouts[0].userId})
          console.log(user)
        } else {
          setUser({id:null})
        }
      })
    }
  },[])


  return (
    <>
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <Container className="h-100">
        <NavigationBar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<RegistrationPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/workout" element={<WorkoutPage/>}/>
        </Routes>
        </Container>
      </Router>
    </UserProvider>
    </>
  );
}

export default App;
