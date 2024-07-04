import React, { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css';
import { WorkoutsContext } from '../Workouts/WorkoutsContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { workouts, setWorkouts } = useContext(WorkoutsContext);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    console.log('Stored User:', storedUser);  // Debug: Check if user is retrieved
                    setUser(JSON.parse(storedUser));
                } else {
                    console.error('No user found in local storage');
                    setUser({ username: 'Guest', email: '' });  // Set default values or handle accordingly
                }
            } catch (error) {
                console.error('Error fetching user', error);
                setUser({ username: 'Guest', email: '' });  // Set default values or handle accordingly
            }
        };

        const fetchWorkouts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/workouts', {
                    headers: { 'x-access-token': token }
                });
                setWorkouts(response.data);
            } catch (error) {
                console.error('Error fetching workouts', error);
            }
        };

        fetchUser();
        fetchWorkouts();
    }, [setWorkouts]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setWorkouts([]);
        navigate('/login');
    };

    const totalWorkouts = workouts.length;
    const totalCalories = workouts.reduce((acc, workout) => acc + Number(workout.calories), 0);
    const uniqueDays = new Set(workouts.map(workout => new Date(workout.date).toDateString())).size;

    const chartData = {
        labels: workouts.map(workout => workout.workoutName),
        datasets: [
            {
                label: 'Calories Burnt',
                data: workouts.map(workout => workout.calories),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <div className="card">
                <h3>Total Workouts</h3>
                <p>{totalWorkouts}</p>
            </div>
            <div className="card">
                <h3>Total Calories Burnt</h3>
                <p>{totalCalories}</p>
            </div>
            <div className="card">
                <h3>Total Days Streak</h3>
                <p>{uniqueDays}</p>
            </div>
            <div className="chart-container">
                <h3>Progress Chart</h3>
                <Bar data={chartData} />
            </div>
            <div className="user-profile-card">
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;
