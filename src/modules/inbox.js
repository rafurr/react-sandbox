export const SELECT_ITEM = 'inbox/SELECT_ITEM'
export const DESELECT_ITEM = 'inbox/DESELECT_ITEM'
export const SELECT_SUB_ITEM = 'inbox/SELECT_SUB_ITEM'
export const DESELECT_SUB_ITEM = 'inbox/DESELECT_SUB_ITEM'

const initialState = {
  selectedItem: {id: -1},
  selectedSubItem: {id: -1},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ITEM:
      return {
        ...state,
        selectedItem: action.payload,
      }

    case DESELECT_ITEM:
      return {
        ...state,
        selectedItem: {id: -1},
      }

    default:
      return state
  }
}

export const selectItem = item => {
  return dispatch => {
    dispatch({
      type: SELECT_ITEM,
      payload: item,
    })
  }
}

export const deselectItem = item => {
  return dispatch => {
    dispatch({
      type: DESELECT_ITEM,
      payload: item,
    })
  }
}
