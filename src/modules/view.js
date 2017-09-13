export const OPEN_LEFT_DRAWER = 'view/OPEN_LEFT_DRAWER'
export const CLOSE_LEFT_DRAWER = 'view/CLOSE_LEFT_DRAWER'

const initialState = {
  leftDrawerOpen: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LEFT_DRAWER:
      return {
        ...state,
        leftDrawerOpen: true,
      }

    case CLOSE_LEFT_DRAWER:
      return {
        ...state,
        leftDrawerOpen: false,
      }

    default:
      return state
  }
}

export const openLeftDrawer = () => {
  return dispatch => {
    dispatch({
      type: OPEN_LEFT_DRAWER,
    })
  }
}

export const closeLeftDrawer = () => {
  return dispatch => {
    dispatch({
      type: CLOSE_LEFT_DRAWER,
    })
  }
}
