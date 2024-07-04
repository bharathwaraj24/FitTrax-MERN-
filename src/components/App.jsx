import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Auth/Login.jsx";
import Register from "./Auth/Register.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Workouts from "./Workouts/Workouts.jsx";
import Exercises from "./Exercises/Exercises.jsx";
import Home from "./Home/Home.jsx";
import { WorkoutsProvider } from "./Workouts/WorkoutsContext.jsx";
import './App.css';

const App = () => {
    return (
        <WorkoutsProvider>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/workouts" element={<Workouts />} />
                    <Route path="/exercises" element={<Exercises />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </WorkoutsProvider>
    );
}

export default App;
