export const LOCATION_CHANGE = 'LOCATION_CHANGE'
export const locationChange = (location = '/') => ({
    type: LOCATION_CHANGE,
    payload: location
})

export const updateLocation = ({ dispatch }) => {
    return (nextLocation) => dispatch(locationChange(nextLocation))
}

export default (state = null, action) => action.type === LOCATION_CHANGE ? action.payload : state