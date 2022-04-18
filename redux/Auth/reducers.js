import {
  SIGNUP_FAILED,
  SIGNUP_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  ME_SUCCESS,
  ME_FAILED,
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
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loginError: action.payload,
        user: null,
      };
    case ME_SUCCESS:
      return {
        ...state,
        user: { ...action.payload },
      };
    case ME_FAILED:
      return {
        ...state,
        user: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signUpSuccess: action.payload,
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        signUpError: action.payload,
      };
    case CONFIRMATION_SUCCESS:
      return {
        ...state,
        confirmationSuccess: action.payload,
      };
    case CONFIRMATION_FAILED:
      return {
        ...state,
        confirmationError: action.payload,
      };
    case RESET_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        resetRequestSuccess: action.payload,
      };
    case RESET_PASSWORD_REQUEST_FAILED:
      return {
        ...state,
        resetRequestError: action.payload,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
      };
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        resetPasswordError: action.payload,
      };
    case RESET_PAGE:
      return {
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
