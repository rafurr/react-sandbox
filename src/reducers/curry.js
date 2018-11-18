export const TOGGLE_DESCRIPTION = "curry/TOGGLE_DESCRIPTION";

const initialState = {
  showDescription: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DESCRIPTION:
      return {
        ...state,
        showDescription: !state.showDescription
      };

    default:
      return state;
  }
};

export const toggleDescription = () => ({
  type: TOGGLE_DESCRIPTION
});
