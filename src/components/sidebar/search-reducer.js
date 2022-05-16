
export const searchReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "SET_USER":
        return {
          ...state,
          users: payload.users,
        };
      case "SET_TEXT":
        return {
          ...state,
          searchString: payload.text,
        };
      case "RESET":
        return { users: [], searchString: "" };
      default:
        return state;
    }
  };