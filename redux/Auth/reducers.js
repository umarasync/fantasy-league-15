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
} from "./actionCreators";

function authReducer(
  state = {
    loading: false,
    loginError: "",
    signUpSuccess: "",
    signUpError: "",
    confirmationError:"",
    confirmationSuccess:"",
    resetRequestSuccess:"",
    resetRequestError:"",
    resetPasswordSuccess:"",
    resetPasswordError:"",
    user: null,
  },
  action
) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: { ...action.payload },
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        loginError: action.payload,
        user: null,
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
    case CONFIRMATION_SUCCESS:
      return {
        ...state,
        loading: false,
        confirmationSuccess: action.payload,
      };
    case CONFIRMATION_FAILED:
      return {
        ...state,
        loading: false,
        confirmationError: action.payload,
      };
    case RESET_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        resetRequestSuccess: action.payload,
      };
    case RESET_PASSWORD_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        resetRequestError: action.payload,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        resetPasswordSuccess: action.payload,
      };
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        resetPasswordError: action.payload,
      };
    case RESET_PAGE:
      return {
        loading: false,
        loginError: "",
        signUpSuccess: "",
        signUpError: "",
        confirmationError:"",
        confirmationSuccess:"",
        resetRequestSuccess:"",
        resetRequestError:"",
        resetPasswordSuccess:"",
        resetPasswordError:"",
        user: null,
      };
    default:
      return state;
  }
}

export default authReducer;
