import axios from "../../utils/axiosInstance";
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

export const loginUser = (data) => {
  return async (dispatch) => {
    let res = await axios.post(
      "/graphql",
      {
        query: `mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          id
          username
          profile {
            id
            dob
            fullName
            gender
            fantasyTeams {
              id
              squad {
                id
                name
                matchName
                position
                photo
                score
                value
                team {
                  id
                  name
                  logo
                  homeKit
                  goalkeeperKit
                  __typename
                }
                pitchIndex
                __typename
              }
              playing11 {
                id
                name
                matchName
                position
                photo
                score
                value
                team {
                  id
                  name
                  logo
                  homeKit
                  goalkeeperKit
                  __typename
                }
                playing11Index
                __typename
              }
              substitutes {
                id
                matchName
                name
                position
                value
                team {
                  id
                  name
                  logo
                  homeKit
                  goalkeeperKit
                  __typename
                }
                substituteIndex
                __typename
              }
              captain {
                id
                playing11Index
                __typename
              }
              viceCaptain {
                id
                playing11Index
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
      }
      `,
        variables: { username: data.email, password: data.password },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Res", res);
    if (res && res.data && res.data.data && res.data.data.login != null) {
      //Store data for processing
      localStorage.setItem("user", JSON.stringify(res.data.data.login));
      dispatch({
        type: LOGIN_SUCCESS,
        loading: false,
        payload: res.data.data.login,
      });
    } else {
      dispatch({
        type: LOGIN_FAILED,
        loading: false,
        payload: res.data.errors[0].message,
      });
    }
  };
};

export const createUser = (data) => {
  return async (dispatch) => {
    const d = data.dob;
    let isoDate = d.toISOString();
    let res = await axios.post(
      "/graphql",
      {
        query: `mutation createProfile($data: CreateProfileInput!) {
          createProfile(data: $data) {
            id
            fullName
            accounts {
              id
              username
              __typename
            }
            __typename
          }
        }        
      `,
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
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Res", res);
    if (
      res &&
      res.data &&
      res.data.data &&
      res.data.data.createProfile != null
    ) {
      //Store data for processing
      localStorage.setItem("user", JSON.stringify(res.data.data.createProfile));
      dispatch({
        type: SIGNUP_SUCCESS,
        loading: false,
        payload: res.data.data.createProfile,
      });
    } else {
      dispatch({
        type: SIGNUP_FAILED,
        loading: false,
        payload: res.data.errors[0].message,
      });
    }
  };
};

export const emailConfirmation = (data) => {
  return async (dispatch) => {
    let res = await axios.post(
      "/graphql",
      {
        query: `mutation confirmAccount($data: ActivateAccountInput!) {
          confirmAccount(type: EMAIL, data: $data) {
            id
            username
            __typename
          }
        }       
      `,
        variables: {
          data: {
            id: data,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Res", res);
    if (
      res &&
      res.data &&
      res.data.data &&
      res.data.data.confirmAccount != null
    ) {
      dispatch({
        type: CONFIRMATION_SUCCESS,
        loading: false,
        payload: res.data.data.confirmAccount,
      });
    } else {
      dispatch({
        type: CONFIRMATION_FAILED,
        loading: false,
        payload: res.data.errors[0].message,
      });
    }
  };
};

export const resetPasswordRequest = (data) => {
  return async (dispatch) => {
    let res = await axios.post(
      "/graphql",
      {
        query: `mutation resetPassword($data: ResetPasswordInput!) {
          resetPassword(type: EMAIL, data: $data) {
            id
            username
            __typename
          }
        }      
      `,
        variables: {
          data: {
            username: data,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Res", res);
    if (
      res &&
      res.data &&
      res.data.data &&
      res.data.data.resetPassword != null
    ) {
      dispatch({
        type: RESET_PASSWORD_REQUEST_SUCCESS,
        loading: false,
        payload: res.data.data.resetPassword,
      });
    } else {
      dispatch({
        type: RESET_PASSWORD_REQUEST_FAILED,
        loading: false,
        payload: res.data.errors[0].message,
      });
    }
  };
};

export const updatePassword = (data) => {
  return async (dispatch) => {
    let res = await axios.post(
      "/graphql",
      {
        query: `mutation updatePassword($data: UpdatePasswordInput!) {
          updatePassword(type: EMAIL, data: $data) {
            id
            username
            __typename
          }
        }      
      `,
        variables: {
          data: {
            id: data.id,
            password: data.password,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Res", res);
    if (
      res &&
      res.data &&
      res.data.data &&
      res.data.data.updatePassword != null
    ) {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        loading: false,
        payload: res.data.data.updatePassword,
      });
    } else {
      dispatch({
        type: RESET_PASSWORD_FAILED,
        loading: false,
        payload: res.data.errors[0].message,
      });
    }
  };
};
