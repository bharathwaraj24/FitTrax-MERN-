import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
    
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUser({ email: decoded.email }); 
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        history.push('/dashboard');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        history.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
