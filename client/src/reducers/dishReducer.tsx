
export const dishReducer = (state = {count: 0, showError: false, errorMessage: ''}, action: any) => {
    switch(action.type) {
        case 'ADD_DISHES':
            return {
                ...state,
                count: state.count + 1,
            }
        case 'SET_ERROR_FLAG':
            return {
                ...state,
                showError: action.payload.flag,
                errorMessage: action.payload.message,
            }
        default:
            return state;
    }
}
