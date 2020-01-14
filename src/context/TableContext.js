import createDataContext from "./createDataContext";
import workeroApi from "../api/workero";
import moment from "moment";
import { navigate } from "../navigationRef";

const TableReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "sort_records":
      return { ...state, records: action.payload };
    case "fetch_workplaces":
      return { ...state, workplaces: action.payload };
    case "fetch_records":
      return { ...state, records: action.payload };
    case "fetch_users":
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

const fetchAvailableUsers = dispatch => async () => {
  console.log("fetching...");
  try {
    const response = await workeroApi.get("users/test/users");
    dispatch({ type: "fetch_users", payload: response.data });
  } catch (err) {
    console.log(err);
    console.log("failed to fetch!");
    navigate("Signin");
  }
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
    console.log(err);
  }
};

const fetchRecords = dispatch => async ({
  selectedDate,
  workplace,
  monthly
}) => {
  try {
    let endpoint = "/workday?";
    if (monthly) {
      endpoint += `workday=${moment(selectedDate).format("YYYY-MM")}`;
    } else {
      endpoint += `workday=${moment(selectedDate).format("YYYY-MM-DD")}`;
    }
    if (workplace) {
      endpoint += `&workplace=${workplace}`;
    }

    console.log(endpoint);
    const response = await workeroApi.get(endpoint);
    dispatch({
      type: "fetch_records",
      payload: response.data
    });
  } catch (err) {
    console.log(err);
    console.log("fetchRecords error");
  }
};

const fetchRecordsByAdmin = dispatch => async ({
  selectedDate,
  workplace,
  monthly,
  username
}) => {
  try {
    let endpoint = "/workday/admin?";
    if (monthly) {
      endpoint += `workday=${moment(selectedDate).format("YYYY-MM")}`;
    } else {
      endpoint += `workday=${moment(selectedDate).format("YYYY-MM-DD")}`;
    }
    if (workplace) {
      endpoint += `&workplace=${workplace}`;
    }
    if (username) {
      endpoint += `&username=${username}`;
    }

    console.log(endpoint);
    const response = await workeroApi.get(endpoint);
    dispatch({
      type: "fetch_records",
      payload: response.data
    });
  } catch (err) {
    console.log(err);
    console.log("fetchRecords error");
  }
};

const filterRecords = dispatch => ({ records }) => {
  dispatch({
    type: "sort_records",
    payload: records
  });
};

const mapActionsToContext = {
  fetchRecords,
  filterRecords,
  fetchWorkplaces,
  fetchRecordsByAdmin,
  fetchAvailableUsers
};

const mapStateToContext = {
  records: [],
  workplaces: [],
  users: []
};

export const { Provider, Context } = createDataContext(
  TableReducer,
  mapActionsToContext,
  mapStateToContext
);
