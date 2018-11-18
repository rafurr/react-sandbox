export const INCREMENT_REQUESTED = "counter/INCREMENT_REQUESTED";
export const INCREMENT = "counter/INCREMENT";
export const DECREMENT_REQUESTED = "counter/DECREMENT_REQUESTED";
export const DECREMENT = "counter/DECREMENT";
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
        count: state.count - 1,
        isDecrementing: !state.isDecrementing
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

export const toggleDescription = () => ({
  type: TOGGLE_DESCRIPTION
});
