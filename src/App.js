import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { UserProvider } from './context/UserContext';
import WorkoutPage from './pages/WorkoutPage';
import LoginPage from './pages/LoginPage';
import HomePage from "./pages/HomePage";

import './App.css';

function App() {

  const [user, setUser] = useState({id:null});
  const unsetUser = () => { localStorage.clear(); setUser({id:null})}

  useEffect(() => {
    // const token = localStorage.getItem('token');

    // if (token) {
    //   fetch(`${process.env.API_SERVER_URL}/user`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   })
    //   .then(res => res.json())
    //   .then(data => {
    //     // Make sure data.user exists before accessing properties
    //     if (data && data.user) {
    //       setUser({
    //         id: data.user._id,
    //         isAdmin: data.user.isAdmin
    //       });
    //     } else {
    //       setUser({ id: null });  // Handle case where user is not found
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error fetching user details:', error);
    //     setUser({ id: null });  // Handle any errors gracefully
    //   });
    // }
  }, []);

  return (
    <>
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
          <Container className="h-100">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<WorkoutPage/>}/>
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
