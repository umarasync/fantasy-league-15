import axios from "../../utils/axiosInstance";
import {
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  CONFIRMATION_FAILED,
  CONFIRMATION_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
  RESET_PAGE,
} from "../actions/auth";

export const loginUser = (data) => {
  return async (dispatch) => {
    let res = await axios.post("/api", {
      query: `query {
        mysql_getUser(input: { Email: "${data.email}", Password: "${data.password}" }) {
          code
          message
          user{
            FullName
            Email
            Gender
            DOB
            Status
          }
        }
      }`,
    });
    if (res && res.status == 200) {
      if (
        res.data &&
        res.data.data.mysql_getUser &&
        res.data.data.mysql_getUser.code == 200
      ) {
        dispatch({
          type: LOGIN_SUCCESS,
          loading: false,
          payload: res.data.data.mysql_getUser.message,
        });
      } else {
        dispatch({
          type: LOGIN_FAILED,
          loading: false,
          payload: res.data.data.mysql_getUser.message,
        });
      }
    } else {
      dispatch({
        type: LOGIN_FAILED,
        loading: false,
        payload: "",
      });
    }
  };
};

export const createUser = (data) => {
  return async (dispatch) => {
    let res = await axios.post("/api", {
      query: `mutation {
      mysql_createUser(
        input: {
          FullName: "${data.fullName}"
          Email: "${data.email}"
          Gender: "${data.gender}"
          DOB: "${data.dob}"
          Password: "${data.password}"
        }
      ) {
        code
        message
      }
    }`,
    });
    if (res && res.status == 200) {
      if (
        res.data &&
        res.data.data.mysql_createUser &&
        res.data.data.mysql_createUser.code == 200
      ) {
        dispatch({
          type: SIGNUP_SUCCESS,
          loading: false,
          payload: res.data.data.mysql_createUser.message,
        });
      } else {
        dispatch({
          type: SIGNUP_FAILED,
          loading: false,
          payload: res.data.data.mysql_createUser.message,
        });
      }
    } else {
      dispatch({
        type: SIGNUP_FAILED,
        loading: false,
        payload: "",
      });
    }
  };
};

export const emailConfirmation = (data) => {
  return async (dispatch) => {
    let res = await axios.post("/api", {
      query: `mutation {
        activateUser(
        input: {
          confirmationID: "${data}"
        }
      ) {
        code
        message
      }
    }`,
    });
    if (res && res.status == 200) {
      if (
        res.data &&
        res.data.data.activateUser &&
        res.data.data.activateUser.code == 200
      ) {
        dispatch({
          type: CONFIRMATION_SUCCESS,
          loading: false,
          payload: res.data.data.activateUser.message,
        });
      } else {
        dispatch({
          type: CONFIRMATION_FAILED,
          loading: false,
          payload: res.data.data.activateUser.message,
        });
      }
    } else {
      dispatch({
        type: CONFIRMATION_FAILED,
        loading: false,
        payload: "",
      });
    }
  };
};
