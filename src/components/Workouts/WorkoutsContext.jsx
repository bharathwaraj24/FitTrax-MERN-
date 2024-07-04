import React, { createContext, useState } from 'react';

export const WorkoutsContext = createContext();

export const WorkoutsProvider = ({ children }) => {
    const [workouts, setWorkouts] = useState([]);

    return (
        <WorkoutsContext.Provider value={{ workouts, setWorkouts }}>
            {children}
        </WorkoutsContext.Provider>
    );
};
