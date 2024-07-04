import React, { useState } from 'react';
import './Auth.css';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            console.log('API Response:', response.data);  // Debug: Log API response
    
            // Store token and user data in localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
    
            navigate('/dashboard');  // Redirect to dashboard after successful login
        } catch (error) {
            setError('Invalid email or password');
            console.error('Error logging in', error);
        }
    };

    return (
        <div className="full-screen-container">
            <div className="auth-container">
                <h2>SIGN IN</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <MdEmail className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <FaLock className="icon" />
                    </div>
                    <button type="submit">Login</button>
                    {error && <p className="error-message">{error}</p>}
                    <div className="register-link">
                        <p>Don't you have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
