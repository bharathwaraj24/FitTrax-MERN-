import React, { useState, useContext } from 'react';
import './Workouts.css';
import { WorkoutsContext } from './WorkoutsContext.jsx';
import axios from 'axios';

const Workouts = () => {
    const { workouts, setWorkouts } = useContext(WorkoutsContext);
    const [workoutName, setWorkoutName] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [calories, setCalories] = useState("");
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    const addWorkout = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:5000/api/workouts', 
            { workoutName, sets, reps, calories, timer }, 
            { headers: { 'x-access-token': token } });
            setWorkouts([...workouts, response.data]);
            setWorkoutName("");
            setSets("");
            setReps("");
            setCalories("");
            setTimer(0);
        } catch (error) {
            console.error('Error adding workout', error);
        }
    };

    const startTimer = () => {
        if (intervalId) return;
        const id = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000);
        setIntervalId(id);
    };

    const stopTimer = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    };

    const resetTimer = () => {
        clearInterval(intervalId);
        setIntervalId(null);
        setTimer(0);
    };

    return (
        <div className="workout-container">
            <h2>Add Workout</h2>
            <div className="form-group">
                <label>Workout Name:</label>
                <input type='text' value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Sets:</label>
                <input type='number' value={sets} onChange={(e) => setSets(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Reps:</label>
                <input type='number' value={reps} onChange={(e) => setReps(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Calories Burnt</label>
                <input type='number' value={calories} onChange={(e) => setCalories(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Timer: {timer}s</label>
                <div className="timer-buttons">
                    <button onClick={startTimer}>Start</button>
                    <button onClick={stopTimer}>Stop</button>
                    <button onClick={resetTimer}>Reset</button>
                </div>
            </div>
            <button onClick={addWorkout} className='add-button'>Add Workout</button>

            <h3>Workout List</h3>
            <ul>
                {workouts.map((workout, index) => (
                    <li key={index}>
                        <strong>{workout.workoutName}</strong>: {workout.sets} sets, {workout.reps} reps, {workout.calories} calories burnt, {workout.timer} seconds
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Workouts;
