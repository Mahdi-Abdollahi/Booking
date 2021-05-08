import * as actionsTypes from "./constance"

const initialState = {
    token: null,
    error: null,
    loading: false,
    message: null
};

const reducer = (state= initialState, action) => {
    switch(action.type) {
        case actionsTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true,
                message: null
            }
        
        case actionsTypes.AUTH_SUCCESS:
            return {
                ...state,
                email: action.email,
                token: action.token,
                userID: action.userID,
                error: null,
                loading: false,
                message: null
            }
        
        case actionsTypes.AUTH_FAIL: 
            return {
                ...state,
                error: action.error,
                loading: false,
                message: null
            }
        case actionsTypes.AUTH_LOGOUT: 
            return {
                ...state,
                token: null,
                userID: null,
                message: null
            }
        case actionsTypes.AUTH_SET_MESSAGE: 
            return {
                ...state,
                token: null,
                userID: null,
                loading: null,
                error: null,
                message: action.message
            }
        default: 
            return state;
    }
}
export default reducer;