import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { UserProvider } from './context/UserContext';
import WorkoutPage from './pages/WorkoutPage';
import LoginPage from './pages/LoginPage';
import NavigationBar from "./components/NavigationBar";
import HomePage from "./pages/HomePage";

import './App.css';

function App() {

  const [user, setUser] = useState({id:null});
  const unsetUser = () => { localStorage.clear(); setUser({id:null})}

  return (
    <>
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <Container className="h-100">
        <NavigationBar/>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
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
