const initialState = {
  user: {},
};

const ReducerSession = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SESSION":
      return {
        ...state,
        user: action.data,
      };

    case "DELETE_SESSION":
      return {
        ...state,
        user: initialState.user,
      };

    default:
      return state;
  }
};

export default ReducerSession;
