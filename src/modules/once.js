export const TOGGLE_DESCRIPTION = 'once/TOGGLE_DESCRIPTION'

const initialState = {
  showDescription: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DESCRIPTION:
      return {
        ...state,
        showDescription: !state.showDescription
      }
    default:
      return state
  }
}

export const toggleDescription = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_DESCRIPTION,
    })
  }
}
