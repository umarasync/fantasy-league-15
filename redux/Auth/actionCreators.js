export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILED = "SIGNUP_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const ME_SUCCESS = "ME_FAILED";
export const ME_FAILED = "ME_FAILED";
export const CONFIRMATION_SUCCESS = "CONFIRMATION_SUCCESS";
export const CONFIRMATION_FAILED = "CONFIRMATION_FAILED";
export const RESET_PASSWORD_REQUEST_SUCCESS = "RESET_PASSWORD_REQUEST_SUCCESS";
export const RESET_PASSWORD_REQUEST_FAILED = "RESET_PASSWORD_REQUEST_FAILED";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const RESET_PAGE = "RESET_PAGE";

export const signupSuccess = (payload) => {
    return {
        type: SIGNUP_SUCCESS,
        payload
    }
}

export const signupFailed = (payload) => {
    return {
        type: SIGNUP_FAILED,
        payload
    }
}

export const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload
    }
}

export const loginFailed = (payload) => {
    return {
        type: LOGIN_FAILED,
        payload
    }
}