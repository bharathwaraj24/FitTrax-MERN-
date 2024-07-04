import React from 'react';
import './Exercises.css';
import benchpress from '../../assets/benchpress.jpg';
import Dumbbellfly from '../../assets/dumbbell-fly.jpg';
import pullups from '../../assets/pullups.jpg';
import latpulldown from  '../../assets/latpulldown.jpg';
import squat from '../../assets/squat.jpg';
import legpress from '../../assets/legpress.jpg'; 

const exerciseData = [
    {
        category: "Chest",
        exercises: [
            { name: "Bench Press", equipment: "Barbell", image: benchpress },
            { name: "Dumbbell Flyes", equipment: "Dumbbells", image: Dumbbellfly }
        ]
    },
    {
        category: "Back",
        exercises: [
            { name: "Pull Up", equipment: "Bodyweight", image: pullups },
            { name: "Lat Pulldown", equipment: "Cable", image: latpulldown }
        ]
    },
    {
        category: "Legs",
        exercises: [
            { name: "Squat", equipment: "Barbell", image: squat },
            { name: "Leg Press", equipment: "Machine", image: legpress }
        ]
    }
];

const Exercises = () => {
    return (
        <div className="exercises-container">
            <h2>Exercise List</h2>
            {exerciseData.map((category, index) => (
                <div key={index} className="exercise-category">
                    <h3>{category.category}</h3>
                    <div className="exercise-list">
                        {category.exercises.map((exercise, idx) => (
                            <div key={idx} className="exercise-item">
                                <img src={exercise.image} alt={exercise.name} />
                                <div className="exercise-info">
                                    <h4>{exercise.name}</h4>
                                    <p>Equipment: {exercise.equipment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Exercises;
