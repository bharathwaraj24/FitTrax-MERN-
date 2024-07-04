const initialState = [];

export const goalReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_GOAL':
            return [...state, action.payload];
        default:
            return state;
    }
};