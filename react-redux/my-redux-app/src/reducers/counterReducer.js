import { INCREMENT, DECREMENT, SET_COUNT} from '../actions/counterAction'

const initialState = {
    count: 0,
};

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1,
            };
        case DECREMENT:
            return {
                ...state,
                count: state.count - 1,
            };
        case SET_COUNT:
            return {
                ...state,
                count: action.payload, // Set the count directly from the action's payload
            };
        default:
            return state;
    }
};

export default counterReducer;