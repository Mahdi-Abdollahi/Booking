import * as actionTypes from "./constance"
import axios from "axios";


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSeccess = (userToken, userID, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: userToken,
        userID: userID,
        email
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = ( expirationTime ) => {
    return {
        type: actionTypes.AUTH_EXPIRE_TOKEN,
        expirationTime
    }
}

export const signUp = (email, password) => {
    return {
        type: actionTypes.AUTH_SIGN_UP,
        email: email,
        password: password
    }
}

export const logIn = (email, password) => {
    return {
        type: actionTypes.AUTH_LOG_IN,
        email: email,
        password: password
    }
}

export const restorePassword = email => {
    return {
        type: actionTypes.AUTH_RESTORE_PASS,
        email: email
    }
}

export const setMessage = (message) => {
    return {
        type: actionTypes.AUTH_SET_MESSAGE,
        message: message
    }
}

export const checkLocalStorageTokens = () => {
    return {
        type: actionTypes.AUTH_CHECK_LOCALSTORAGE
    }
}

export const getUserInfo = (token) => {
    return  {
        type: actionTypes.AUTH_GET_USER_INFO,
        token: token
    }
}