// Packages
import { createApolloClient } from "graphql/apollo";

// Actions
import {
  CONFIRMATION_FAILED,
  CONFIRMATION_SUCCESS,
  loginFailed,
  loginSuccess,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST_FAILED,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  signupFailed,
  signupSuccess,
} from "./actionCreators";

// GraphQL
import DO_LOGIN from "graphql/mutations/login";
import DO_SIGNUP from "graphql/mutations/createProfile";
import CONFIRM_EMAIL from "graphql/mutations/emailConfirmation";
import RESET_REQUEST from "graphql/mutations/resetPasswordRequest";
import UPDATE_PASSWORD from "graphql/mutations/updatePassword";
import ME from "graphql/queries/me";

// Helpers
import { responseFailed, responseSuccess } from "utils/helpers";

// Login
export const login = (data) => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const result = await apolloClient.mutate({
        mutation: DO_LOGIN,
        variables: { username: data.email, password: data.password },
      });

      if (result && result.data.login !== null) {
        dispatch(loginSuccess(result.data.login));
        return responseSuccess("Login successfully! Redirecting...");
      }

      let errorMsg = result.data.errors[0].message;
      dispatch(loginFailed(errorMsg));
      return responseFailed(errorMsg);
    } catch (e) {
      dispatch(loginFailed(e.message));
      return responseFailed(e.message);
    }
  };
};

// Signup
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
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            password: data.password,
            username: data.email,
          },
        },
      });
      if (result && result.data.createProfile !== null) {
        dispatch(signupSuccess(result.data.createProfile));
        return responseSuccess("Signed Up successfully!");
      }

      let errMsg = result.data.errors[0].message;
      dispatch(signupFailed(errMsg));
      return responseFailed(errMsg);
    } catch (e) {
      dispatch(signupFailed(e.message));
      return responseFailed(e.message);
    }
  };
};

// Email Confirmation
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
      dispatch({
        type: CONFIRMATION_FAILED,
        loading: false,
        payload: e.message,
      });
    }
  };
};

// Reset Password Request
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
      dispatch({
        type: RESET_PASSWORD_REQUEST_FAILED,
        loading: false,
        payload: e.message,
      });
    }
  };
};

// Updated Password
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
      dispatch({
        type: RESET_PASSWORD_FAILED,
        loading: false,
        payload: e.message,
      });
    }
  };
};

// ME
export const me = () => {
  return async (dispatch) => {
    try {
      const apolloClient = createApolloClient();
      const res = await apolloClient.query({
        query: ME,
        variables: {},
      });

      if (res && res.data.me) {
        return res.data.me;
      }
      return false;
    } catch (e) {
      return false;
    }
  };
};
