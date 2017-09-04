export const OPEN_DRAWER = 'view/OPEN_DRAWER'
export const CLOSE_DRAWER = 'view/CLOSE_DRAWER'

const initialState = {
  sideDrawerOpen: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        ...state,
        sideDrawerOpen: true
      }

    case CLOSE_DRAWER:
      return {
        ...state,
        sideDrawerOpen: false
      }

    default:
      return state
  }
}

export const openDrawer = () => {
  return dispatch => {
    dispatch({
      type: OPEN_DRAWER
    })
  }
}

export const closeDrawer = () => {
  return dispatch => {
    dispatch({
      type: CLOSE_DRAWER
    })
  }
}
