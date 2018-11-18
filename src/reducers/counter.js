export const INCREMENT_REQUESTED = "counter/INCREMENT_REQUESTED";
export const INCREMENT = "counter/INCREMENT";
export const DECREMENT_REQUESTED = "counter/DECREMENT_REQUESTED";
export const DECREMENT = "counter/DECREMENT";
export const SET_COUNT = "counter/SET_COUNT";
export const TOGGLE_DESCRIPTION = "counter/TOGGLE_DESCRIPTION";

const initialState = {
  count: 0,
  isIncrementing: false,
  isDecrementing: false,
  showDescription: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return {
        ...state,
        isIncrementing: true
      };

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
        isIncrementing: !state.isIncrementing
      };

    case DECREMENT_REQUESTED:
      return {
        ...state,
        isDecrementing: true
      };

    case DECREMENT:
      return {
        ...state,
        count: Math.max(0, state.count - 1),
        isDecrementing: !state.isDecrementing
      };

    case SET_COUNT:
      return {
        ...state,
        count: action.payload
      };

    case TOGGLE_DESCRIPTION:
      return {
        ...state,
        showDescription: !state.showDescription
      };

    default:
      return state;
  }
};

export const increment = () => ({
  type: INCREMENT
});

export const decrement = () => ({
  type: DECREMENT
});

export const setCount = count => ({
  type: SET_COUNT,
  payload: count
});

export const toggleDescription = () => ({
  type: TOGGLE_DESCRIPTION
});
