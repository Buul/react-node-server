const INITIAL_STATE = { token: "" };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_TOKEN":
      return {
        ...state,
        token: action.payload.token
      };

    default:
      return state;
  }
};
