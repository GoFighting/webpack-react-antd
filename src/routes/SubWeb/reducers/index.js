import { combineReducers } from 'redux'
const timeReducer = (state = 10, action = {}) => {
    switch (action.type) {
        case 'SUBWEB-TIME':
            return action.time
        default:
            return state
    }
}
const rootReducer = combineReducers({
    timeReducer
})
export default rootReducer
