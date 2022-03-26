// Signup
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILED = "SIGNUP_FAILED";

// Login
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

// Me
export const ME_SUCCESS = "ME_FAILED";
export const ME_FAILED = "ME_FAILED";

// Confirmation
export const CONFIRMATION_SUCCESS = "CONFIRMATION_SUCCESS";
export const CONFIRMATION_FAILED = "CONFIRMATION_FAILED";

// Reset Pass
export const RESET_PASSWORD_REQUEST_SUCCESS = "RESET_PASSWORD_REQUEST_SUCCESS";
export const RESET_PASSWORD_REQUEST_FAILED = "RESET_PASSWORD_REQUEST_FAILED";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

// Reset Page
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

export const meSuccess = (payload) => {
    return {
        type: ME_SUCCESS,
        payload
    }
}

export const meFailed = (payload) => {
    return {
        type: ME_FAILED,
        payload
    }
}