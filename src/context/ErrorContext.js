import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};
const setError = dispatch => ({ error }) => {
  dispatch({ type: "add_error", payload: error });
};

const mapActionsToContext = {
  clearErrorMessage,
  setError
};

const mapStateToContext = {
  errorMessage: ""
};

export const { Provider, Context } = createDataContext(
  authReducer,
  mapActionsToContext,
  mapStateToContext
);
