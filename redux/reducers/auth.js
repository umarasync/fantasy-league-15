import {
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
  RESET_PAGE,
} from "../actions/auth";

function authReducer(
  state = {
    loading: false,
    loginSuccess: "",
    loginError: "",
    signUpSuccess: "",
    signUpError: "",
    user: {},
  },
  action
) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loginSuccess: action.payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        loginError: action.payload,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        signUpSuccess: action.payload,
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        signUpError: action.payload,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message:
          action.payload && action.payload.message
            ? action.payload.message
            : "",
      };
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_PAGE:
      return {
        loading: false,
        loginSuccess: "",
        loginError: "",
        signUpSuccess: "",
        signUpError: "",
        user: {},
      };
    default:
      return state;
  }
}

export default authReducer;
