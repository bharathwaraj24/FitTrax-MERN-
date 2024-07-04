import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <nav>
            <Link to="/" className='title'>FitTrax</Link>
            <div className="menu" onClick={() => {
                setIsOpen(!isOpen);
            }}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={isOpen ? "open" : ""}>
                <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/workouts">Workouts</NavLink>
                </li>
                <li>
                    <NavLink to="/exercises">Exercises</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/register">Register</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;