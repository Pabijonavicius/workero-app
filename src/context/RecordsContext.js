import createDataContext from "./createDataContext";
import workeroApi from "../api/workero";
import { navigate } from "../navigationRef";
import { ToastAndroid } from "react-native";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "fetch_records":
      return { ...state, records: action.payload };
    case "fetch_by_username_and_date":
      return { ...state, records: action.payload };
    case "add_comment":
      return { ...state, errorMessage: "" };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "is_workday_started":
      return { ...state, isWorkdayStarted: action.payload };
    case "fetch_workplaces":
      return { ...state, workplaces: action.payload };
    case "photo_submission":
      return { ...state, isWorkdayStarted: undefined, records: [] };
    case "switch_screen":
      return { ...state, isSwitched: true };
    case "clear_state":
      return initialState;
    default:
      return state;
  }
};
const fetchRecords = dispatch => async ({ date, setLoading }) => {
  console.log(date);
  try {
    const response = await workeroApi.get(`photos/${date}`);
    console.log(response.status);
    dispatch({
      type: "fetch_records",
      payload: response.data.reverse()
    });
    setLoading(false);
  } catch (err) {
    // console.log(err);
    // dispatch({
    //   type: "add_error",
    //   payload: "Couldn't fetch records..."
    // });
    navigate(`Signin`);
  }
};

const isWorkdayStarted = dispatch => async setLoading => {
  try {
    const response = await workeroApi.get("workday/status");
    dispatch({
      type: "is_workday_started",
      payload: response.data
    });
    setLoading(false);
  } catch (err) {
    console.log("isWorkdayStarted!");
    console.log(err);
    navigate(`Signin`);
  }
};

const addComment = dispatch => async (data, setReload) => {
  if (data.comment === "") {
    dispatch({
      type: "add_error",
      payload: "Comment cannot be empty!"
    });
  } else {
    try {
      const response = await workeroApi.post("/photo-comments", data);
      dispatch({ type: "add_comment" });
      setReload(1);
      ToastAndroid.show("Comment Added!", ToastAndroid.LONG);
    } catch (err) {
      navigate("Signin");
    }
  }
};

const fetchPhotosByUsernameAndDate = dispatch => async (
  username,
  date,
  setLoadingPhotos
) => {
  //photos/${selectedUser}/${selectedDate}
  try {
    let response;
    if (!username) {
      response = await workeroApi.get(`photos/${date}`);
    } else {
      response = await workeroApi.get(`photos/${username}/${date}`);
    }
    dispatch({
      type: "fetch_by_username_and_date",
      payload: response.data.reverse()
    });
    setLoadingPhotos(false);
  } catch (err) {
    // dispatch({
    //   type: "add_error",
    //   payload: "Couldn't fetch records..."
    // });
    navigate(`Signin`);
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};

const endOrAdditionalPhoto = dispatch => async ({
  image,
  comment,
  setProgress,
  type
}) => {
  const data = new FormData();
  data.append("comment", comment);
  data.append("submisionType", type);
  data.append("file", {
    uri: image,
    name: "userProfile.jpg",
    type: "image/jpg"
  });
  submitPhotoApiCall({ setProgress, data, dispatch });
};

const submitPhotoApiCall = async ({ setProgress, data, dispatch }) => {
  try {
    setProgress(0);
    let config = axiosConfigHelper({ setProgress });
    await workeroApi.put("photos", data, config);
    dispatch({ type: "photo_submission" });
    navigate(`SubmitPhoto`);
  } catch (err) {
    const { status } = err.response;
    if (status === 406) {
      dispatch({
        type: "add_error",
        payload:
          "Workplace cannot be empty it should have atleast 5 characters!"
      });
      navigate("SubmitPhoto");
    } else {
      navigate(`Signin`);
    }
  }
};
const startWorkday = dispatch => async ({
  image,
  comment,
  setProgress,
  workplace
}) => {
  const data = new FormData();
  data.append("comment", comment);
  data.append("submisionType", "start");
  data.append("workplace", workplace);
  data.append("file", {
    uri: image,
    name: "userProfile.jpg",
    type: "image/jpg"
  });
  submitPhotoApiCall({ setProgress, data, dispatch });
};

const clearState = dispatch => () => {
  dispatch({ type: "clear_state" });
};

const fetchWorkplaces = dispatch => async () => {
  try {
    console.log("fetchWorkplaces");
    const response = await workeroApi.get("workplace/v2");
    dispatch({
      type: "fetch_workplaces",
      payload: response.data
    });
  } catch (err) {
    navigate(`Signin`);
  }
};

const switchScreen = dispatch => () => {
  dispatch({ type: "switch_screen" });
};

const axiosConfigHelper = ({ setProgress }) => ({
  onUploadProgress: function(progressEvent) {
    let percentCompleted = Math.round(
      (progressEvent.loaded * 99) / progressEvent.total
    );
    setProgress(percentCompleted);
  }
});

const mapActionsToContext = {
  fetchRecords,
  addComment,
  clearErrorMessage,
  fetchPhotosByUsernameAndDate,
  isWorkdayStarted,
  fetchWorkplaces,
  startWorkday,
  endOrAdditionalPhoto,
  clearState,
  switchScreen
};

const initialState = {
  errorMessage: "",
  records: [],
  isWorkdayStarted: undefined,
  workplaces: [],
  isSwitched: false
};

export const { Provider, Context } = createDataContext(
  authReducer,
  mapActionsToContext,
  initialState
);
