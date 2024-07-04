const initialState = [];

export const workoutReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_WORKOUT':
            return [...state, action.payload];
        default:
            return state;
    }
};