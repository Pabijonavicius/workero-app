import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import workeroApi from "../api/workero";
import { navigate } from "../navigationRef";
import { ToastAndroid } from "react-native";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_user":
      return { ...state };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "fetch_users":
      return { ...state, users: action.payload };
    case "fetch_user":
      return { ...state, user: action.payload };
    case "update_user":
      return { ...state, user: null };
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};
const fetchAvailableUsers = dispatch => async setLoadingUsers => {
  console.log("fetching...");
  try {
    const response = await workeroApi.get("users/test/users");
    dispatch({ type: "fetch_users", payload: response.data });
    setLoadingUsers(false);
  } catch (err) {
    console.log(err);
    console.log("failed to fetch!");
    navigate("Signin");
  }
};

function reduceErrorMessages(messages) {
  let m = [];
  messages.map(message => {
    const errors = message.constraints;
    Object.keys(errors).map(key => {
      let t = errors[key].charAt(0).toUpperCase() + errors[key].slice(1);
      m.push(t);
    });
  });
  return m.length === 0 ? "" : m[0];
}

const changeBlockStatus = dispatch => async ({ userid, setLoading }) => {
  console.log(userid);
  setLoading(true);
  try {
    const response = await workeroApi.patch(`users/${userid}`);
    console.log(response);
    setLoading(false);
  } catch (err) {
    console.log(err.response);
    console.log("Suspend User Error");
    setLoading(false);
  }
};

const addUser = dispatch => async ({
  username,
  password,
  firstName,
  lastName,
  setLoading,
  setSubmitBtnDisabled
}) => {
  try {
    const response = await workeroApi.post("users", {
      username,
      password,
      firstName,
      lastName
    });
    setLoading(false);
    ToastAndroid.show("User added successfully!", ToastAndroid.LONG);
    setSubmitBtnDisabled(true);
  } catch (err) {
    const status = err.response.status;
    if (status === 400) {
      let message = reduceErrorMessages(err.response.data.message);
      dispatch({ type: "add_error", payload: message });
      setTimeout(() => {
        dispatch({ type: "add_error", payload: "" });
      }, 5000);
      setLoading(false);
    } else {
      navigate("Signin");
    }
  }
};

const fetchUser = dispatch => async ({ userId, setLoading }) => {
  setLoading(true);
  try {
    const response = await workeroApi.get(`users/${userId}`);
    dispatch({ type: "fetch_user", payload: response.data });
  } catch (err) {
    console.log(err);
    console.log("fetchUsere rrrorr");
    if (status === 400) {
      let message = reduceErrorMessages(err.response.data.message);
      dispatch({ type: "add_error", payload: message });
      setTimeout(() => {
        dispatch({ type: "add_error", payload: "" });
      }, 5000);
    } else {
      navigate("Signin");
    }
  } finally {
    setLoading(false);
  }
};

const updateUser = dispatch => async ({
  username,
  firstName,
  lastName,
  password,
  setLoading
}) => {
  setLoading(true);
  try {
    const response = await workeroApi.put(`users/${username}`, {
      firstName,
      lastName,
      password
    });
    dispatch({ type: "update_user" });
    ToastAndroid.show("User updated successfully!", ToastAndroid.LONG);
    navigate("UserManagment");
  } catch (err) {
    console.log(err.response);
    console.log("updateUser rrrorr");
    if (status === 400) {
      let message = reduceErrorMessages(err.response.data.message);
      dispatch({ type: "add_error", payload: message });
      setTimeout(() => {
        dispatch({ type: "add_error", payload: "" });
      }, 5000);
    } else {
      navigate("Signin");
    }
  } finally {
    setLoading(false);
  }
};

const fetchByBlockStatus = dispatch => async ({ setLoading, isBlocked }) => {
  console.log("fetching...");
  setLoading(true);
  try {
    const response = await workeroApi.get(
      `users/v2/suspend?isBlocked=${isBlocked}`
    );
    dispatch({ type: "fetch_users", payload: response.data });
    setLoading(false);
  } catch (err) {
    console.log(err);
    console.log("failed to fetch!");
    setLoading(false);
    navigate("Signin");
  }
};

const mapActionsToContext = {
  fetchAvailableUsers,
  clearErrorMessage,
  addUser,
  changeBlockStatus,
  fetchUser,
  updateUser,
  fetchByBlockStatus
};

const mapStateToContext = {
  errorMessage: "",
  records: [],
  users: [],
  user: null
};

export const { Provider, Context } = createDataContext(
  authReducer,
  mapActionsToContext,
  mapStateToContext
);
