export const BEGIN_SORTING = 'sort/BEGIN_SORTING'
export const ADD_STEP = 'sort/ADD_STEP'
export const SET_SORTED_ARRAY = 'sort/SET_SORTED_ARRAY'
export const END_SORTING = 'sort/END_SORTING'
export const PLAY_STEPS = 'sort/PLAY_STEPS'
export const RESET = 'sort/RESET'

const initialState = {
  sortedArray: null,
  sorting: false,
  steps: null,
  play: false
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
        play: false
      }

    case SET_SORTED_ARRAY:
      return {
        ...state,
        sortedArray: action.payload
      }

    case PLAY_STEPS:
      return {
        ...state,
        play: true
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

export const playSteps = () => {
  return dispatch => {
    dispatch({
      type: PLAY_STEPS
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
