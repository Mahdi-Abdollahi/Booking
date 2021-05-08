import axios from "axios"
import { takeEvery, put, call, delay } from "redux-saga/effects"
import * as actionsTypes from "./constance"
import * as actions from "./actions";


export function* userLoginSaga(action) {
    yield put(actions.authStart())
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCEOET2v1xp411MmUYEIDFEt6eZxj664UM";
    const userData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    try{
        const res = yield call(axios.post, url, userData);
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        yield localStorage.setItem("expirationDate", expirationDate);
        yield localStorage.setItem("token", res.data.idToken);
        yield put(actions.authSeccess(res.data.idToken, res.data.localId, res.data.email));
        yield put(actions.checkAuthTimeout(res.data.expiresIn))
        
    } catch(error) {
        yield put(actions.authFail("Faild to Login"));
    }
}

export function* userSignupSaga(action) {
    yield put(actions.authStart())
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCEOET2v1xp411MmUYEIDFEt6eZxj664UM";
    const userData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    try{
        const res = yield call(axios.post, url, userData);
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        
        yield localStorage.setItem("expirationDate", expirationDate);
        yield localStorage.setItem("token", res.data.idToken);
        yield put(actions.authSeccess(res.data.idToken, res.data.localId, res.data.email));
        yield put(actions.checkAuthTimeout(res.data.expiresIn))
        
    } catch(error) {
        yield put(actions.authFail("Faild to Sign up"));
    }
}

export function* userTokenHasExpireSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* userLogoutSaga(action) {
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("expirationDate");
}

export function* userHasLocalTokenSaga(action) {
    try {
        const token = yield localStorage.getItem("token");
        if(!token) {
            yield put(actions.logout());
        }
        else {
            const expirationDate = yield localStorage.getItem("expirationDate");
            if(new Date(expirationDate).getTime() > new Date().getTime()) {
                const res = yield call(axios.post, "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCEOET2v1xp411MmUYEIDFEt6eZxj664UM", {idToken: token})
                console.log("IN HERE");
                console.log(res.data);
                yield put(actions.authSeccess(token, res.data.localId, res.data.email))
                yield put(actions.checkAuthTimeout((new Date(expirationDate).getTime() - new Date().getTime()) / 1000))
            }
            else {
                yield put(actions.logout());
            }
        }
    }
    catch(err) {
        console.log(err)
    }
}

export function* userRestorePasswordSaga(action) {
    const userInfo = {
        requestType: "PASSWORD_RESET",
        email: action.email
    }
    try {
        const res = yield call(
            axios.post,
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCEOET2v1xp411MmUYEIDFEt6eZxj664UM",
            userInfo
        )
        console.log(res);
        yield put(actions.setMessage("EMAIL SEND, CHECK YOUR EMAIL."))
    } catch(err) {
        console.log(err)
        yield put(actions.authFail("FAILD TO SEND EMAIL."))
    }
}

export function* watchAuth(action) {
    yield takeEvery(actionsTypes.AUTH_SIGN_UP, userSignupSaga);
    yield takeEvery(actionsTypes.AUTH_LOG_IN, userLoginSaga);
    yield takeEvery(actionsTypes.AUTH_EXPIRE_TOKEN, userTokenHasExpireSaga);
    yield takeEvery(actionsTypes.AUTH_CHECK_LOCALSTORAGE, userHasLocalTokenSaga);
    yield takeEvery(actionsTypes.AUTH_RESTORE_PASS, userRestorePasswordSaga);
    yield takeEvery(actionsTypes.AUTH_LOGOUT, userLogoutSaga);
}