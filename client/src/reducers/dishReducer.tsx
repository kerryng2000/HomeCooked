
export const dishReducer = (state = 0, action: any) => {
    switch(action.type) {
        case 'ADD_DISHES':
            return state + 1;
        default:
            return state;
    }
}
