export const BEGIN_SORTING = 'sort/BEGIN_SORTING'
export const ADD_STEP = 'sort/ADD_STEP'
export const SET_SORTED_ARRAY = 'sort/SET_SORTED_ARRAY'
export const END_SORTING = 'sort/END_SORTING'
export const TOGGLE_STEPS = 'sort/TOGGLE_STEPS'
export const TOGGLE_DESCRIPTION = 'sort/TOGGLE_DESCRIPTION'
export const RESET = 'sort/RESET'

const initialState = {
  sortedArray: null,
  sorting: false,
  steps: null,
  showSteps: false,
  showDescription: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case BEGIN_SORTING:
      return {
        ...state,
        steps: [],
        sorting: true
      }
    case END_SORTING:
      return {
        ...state,
        sorting: false
      }
    case ADD_STEP:
      return {
        ...state,
        steps: state.steps.concat([action.payload])
      }
    case RESET:
      return {
        ...state,
        steps: null,
        sortedArray: null,
        sorting: false,
        showSteps: false
      }
    case SET_SORTED_ARRAY:
      return {
        ...state,
        sortedArray: action.payload
      }
    case TOGGLE_STEPS:
      return {
        ...state,
        showSteps: !state.showSteps
      }
    case TOGGLE_DESCRIPTION:
      return {
        ...state,
        showDescription: !state.showDescription
      }
    default:
      return state
  }
}

export const beginSorting = () => {
  return dispatch => {
    dispatch({
      type: BEGIN_SORTING
    })
  }
}

export const endSorting = () => {
  return dispatch => {
    dispatch({
      type: END_SORTING
    })
  }
}

export const addStep = (step) => {
  return dispatch => {
    dispatch({
      type: ADD_STEP,
      payload: step
    })
  }
}

export const reset = () => {
  return dispatch => {
    dispatch({
      type: RESET
    })
  }
}

export const toggleSteps = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_STEPS
    })
  }
}

export const setSortedArray = (arr) => {
  return dispatch => {
    dispatch({
      type: SET_SORTED_ARRAY,
      payload: arr
    })
  }
}

export const toggleDescription = () => {
  return dispatch => {
    dispatch({
      type: TOGGLE_DESCRIPTION,
    })
  }
}
