import axios from "utils/axiosInstance";
import {
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  CONFIRMATION_FAILED,
  CONFIRMATION_SUCCESS,
  RESET_PASSWORD_REQUEST_FAILED,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
  RESET_PAGE,
} from "./actions";

import { createApolloClient } from "graphql/apollo";
import DO_LOGIN from "graphql/mutations/login";
import DO_SIGNUP from "graphql/mutations/createProfile";
import CONFIRM_EMAIL from "graphql/mutations/emailConfirmation";
import RESET_REQUEST from "graphql/mutations/resetPasswordRequest";
import UPDATE_PASSWORD from "graphql/mutations/updatePassword";
import ME from "graphql/queries/me";
import {signupSuccess, signupFailed, loginSuccess, loginFailed} from "./actionCreators";
import GET_ALL_TEAMS from "../../graphql/queries/teams";
import {GET_ALL_TEAMS_FAILED, GET_ALL_TEAMS_SUCCESS} from "../Teams/actions";

export const login = (data) => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: DO_LOGIN,
        variables: { username: data.email, password: data.password },
      });

      if (result && result.data.login != null) {
        //Store data for processing
        localStorage.setItem("user", JSON.stringify(result.data.login));
        return dispatch(loginSuccess(result.data.login));
      }

      dispatch(loginFailed(result.data.errors[0].message))

    } catch (e) {
      console.log(e.message);
      dispatch({
        type: LOGIN_FAILED,
        loading: false,
        payload: e.message,
      });

      //throw e;
    }
  };
};

export const signup = (data) => {
  return async (dispatch) => {
    try {
      const d = data.dob;
      let isoDate = d.toISOString();

      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: DO_SIGNUP,
        variables: {
          data: {
            dob: isoDate,
            favouriteTeamId: null,
            fullName: data.fullName,
            gender: data.gender,
            password: data.password,
            username: data.email,
          },
        },
      });
      if (result && result.data.createProfile !== null) {
       return  dispatch(signupSuccess(result.data.createProfile))
      }
      dispatch(signupFailed(result.data.errors[0].message))
    } catch (e) {
      dispatch(signupFailed(e.message))
    }
  };
};

export const emailConfirmation = (data) => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: CONFIRM_EMAIL,
        variables: {
          data: {
            id: data,
          },
        },
      });
      console.log(result);
      if (result && result.data.confirmAccount != null) {
        dispatch({
          type: CONFIRMATION_SUCCESS,
          loading: false,
          payload: result.data.confirmAccount,
        });
      } else {
        dispatch({
          type: CONFIRMATION_FAILED,
          loading: false,
          payload: result.data.errors[0].message,
        });
      }
    } catch (e) {
      console.log(e.message);
      dispatch({
        type: CONFIRMATION_FAILED,
        loading: false,
        payload: e.message,
      });
    }
  };
};

export const resetPasswordRequest = (data) => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: RESET_REQUEST,
        variables: {
          data: {
            username: data,
          },
        },
      });
      console.log(result);
      if (result && result.data.resetPassword != null) {
        dispatch({
          type: RESET_PASSWORD_REQUEST_SUCCESS,
          loading: false,
          payload: result.data.resetPassword,
        });
      } else {
        dispatch({
          type: RESET_PASSWORD_REQUEST_FAILED,
          loading: false,
          payload: result.data.errors[0].message,
        });
      }
    } catch (e) {
      console.log(e.message);
      dispatch({
        type: RESET_PASSWORD_REQUEST_FAILED,
        loading: false,
        payload: e.message,
      });
    }
  };
};

export const updatePassword = (data) => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: UPDATE_PASSWORD,
        variables: {
          data: {
            id: data.id,
            password: data.password,
          },
        },
      });
      console.log(result);
      if (result && result.data.updatePassword != null) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          loading: false,
          payload: result.data.updatePassword,
        });
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILED,
          loading: false,
          payload: result.data.errors[0].message,
        });
      }
    } catch (e) {
      console.log(e.message);
      dispatch({
        type: RESET_PASSWORD_FAILED,
        loading: false,
        payload: e.message,
      });
    }
  };
};

export const me = () => {
  console.log('3--------');
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.query({
        query: ME,
        variables: {},
      });
      console.log('2========== ME',result);
    } catch (e) {
      console.log("Response Error: ============", e.message);
    }
  };
};
