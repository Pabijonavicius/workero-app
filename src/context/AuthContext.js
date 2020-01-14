import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import workeroApi from "../api/workero";
import { navigate } from "../navigationRef";
import jwtDecode from "jwt-decode";

import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

export async function getPushToken() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    return;
  }
  try {
    return await Notifications.getExpoPushTokenAsync();
  } catch (err) {
    console.log("pushtoken error");
    console.log(err);
    return undefined;
  }
}
export default async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  console.log(token);
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  try {
    const response = await workeroApi.post("pushtoken", {
      token
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
}

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin": {
      return {
        errorMessage: "",
        token: action.payload.token,
        user: action.payload.user
      };
    }
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "", user: null };
    case "remember_me": {
      return {
        ...state,
        inputUsername: action.payload.username,
        inputPassword: action.payload.password
      };
    }
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    try {
      const response = await workeroApi.post("auth/", {
        pushToken: await getPushToken()
      });
      const user = await jwtDecode(token);
      dispatch({
        type: "signin",
        payload: {
          token,
          user
        }
      });
      navigate(`${user.role}Flow`);
    } catch (err) {
      console.log("Session ended!");
      dispatch({
        type: "add_error",
        payload: "Session ended, sign in again."
      });
      navigate("Signin");
    }
  } else {
    console.log("No Token Found!");
    navigate("Signin");
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = dispatch => async ({ email, password }) => {};

const signin = dispatch => async ({ username, password }) => {
  try {
    const response = await workeroApi.post("/auth/signin", {
      username,
      password,
      pushToken: await getPushToken()
    });
    const token = response.data.accessToken;
    const user = jwtDecode(token);
    await AsyncStorage.setItem("token", token);
    dispatch({ type: "signin", payload: { token, user } });
    navigate(`${user.role}Flow`);
  } catch (err) {
    console.log("failed signin");
    console.log(err);
    const status = err.response.status;
    console.log(status);
    let payload = "Service is down, try again later.";
    if (status === 400 || status === 402 || status === 401) {
      payload = "Wrong username or password!";
    }
    dispatch({
      type: "add_error",
      payload: payload
    });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("Signin");
};

const rememberMe = dispatch => async ({ username, password }) => {
  console.log("rememberMe!");
  await AsyncStorage.setItem("inputUsername", username);
  await AsyncStorage.setItem("inputPassword", password);
};

const loadInputs = dispatch => async () => {
  const username = await AsyncStorage.getItem("inputUsername");
  const password = await AsyncStorage.getItem("inputPassword");
  return { username, password };
};

const mapActionsToContext = {
  signup,
  signin,
  signout,
  clearErrorMessage,
  tryLocalSignin,
  rememberMe,
  loadInputs
};

const mapStateToContext = {
  token: null,
  errorMessage: "",
  user: null,
  inputUsername: "",
  inputPassword: ""
};

export const { Provider, Context } = createDataContext(
  authReducer,
  mapActionsToContext,
  mapStateToContext
);
