export const sortReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: action.payload,
      };

    default:
      return state;
  }
};
