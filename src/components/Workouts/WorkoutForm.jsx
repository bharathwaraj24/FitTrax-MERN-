import React, { useState } from 'react';
import './Workouts.css';

const WorkoutForm = ({ addWorkout }) => {
    const [exercise, setExercise] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addWorkout({ exercise, duration });
        setExercise('');
        setDuration('');
    };

    return(
        <form className="workout-form" onClick={handleSubmit}>
            <input type='text' placeholder='Exercise' value={exercise} onChange={(e) => setExercise(e.target.value)}/>
            <input type='number' placeholder='Duration (minutes)' value={duration} onChange={(e) => setDuration(e.target.value)}/>
            <button type='submit'>Add Workout</button>
        </form>
    );
};

export default WorkoutForm;