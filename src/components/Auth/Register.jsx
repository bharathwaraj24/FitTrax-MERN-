import React, { useState } from 'react';
import './Auth.css';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/register', { username, email, password });
            console.log('User registered');
        } catch (error) {
            console.error('Error registering user', error);
        }
    };

    return (
        <div className="full-screen-container">
            <div className="auth-container">
                <h2>REGISTER</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <MdEmail className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <FaLock className="icon" />
                    </div>
                    <button type="submit">Register</button>
                    <div className="register-link">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
