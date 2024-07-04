import React from 'react';
import './Workouts.css';

const WorkoutList = ({ workouts }) => {
    return(
        <div className="workout-list">
            <h3>Logged Workouts</h3>
            <ul>
                {workouts.map((workout, index) => {
                    <li key={index}>
                        {workout.exercise} - {workout.duration} minutes
                    </li>
                })}
            </ul>
        </div>
    );
};

export default WorkoutList;