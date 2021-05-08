import axios from "axios";
import { put, call, takeEvery, takeLatest } from "redux-saga/effects";

import * as actionsTypes from "./constance"
import * as actions from "./actions"


export function* initBooksSaga(action) {

    try {
        const response = yield call(axios.get, "https://auth-dev-aeabc-default-rtdb.asia-southeast1.firebasedatabase.app/books.json");
        yield put(actions.setBooks(response.data));
        yield put(actions.setError(null));
    } catch(err) {
        yield put(actions.setError("FAILD TO SHOW BOOKS"));
    }
}

export function * removeBookSaga(action) {
    try {
        const response = yield call(axios.delete, "https://auth-dev-aeabc-default-rtdb.asia-southeast1.firebasedatabase.app/books/" + action.bookId + ".json");
        yield call(initBooksSaga);
        yield put(actions.setError(null));
    }
    catch(err) {
        yield put(actions.setError("FAILD TO REMOVE BOOK"));
    }
}

export function* editBookSaga(action) {
    const editedBook = {
        name: action.bookName,
        auther: action.auther,
        text: action.text,
        id: action.bookId
    }
    try {
        const response = yield call( axios.put, `https://auth-dev-aeabc-default-rtdb.asia-southeast1.firebasedatabase.app/books/${action.bookId}.json`, editedBook)
        yield call(initBooksSaga);
        yield put(actions.updateBooks());
        yield put(actions.setError(null));
    } catch (error) {
        yield put(actions.setError("مشکل در ادیت کردن"));
    }
}

export function* addBookSaga(action) {
    try {
        const response = yield call( axios.post, "https://auth-dev-aeabc-default-rtdb.asia-southeast1.firebasedatabase.app/books.json", action.payload)
        yield put(actions.updateBooks());
        yield put(actions.setError(null));
    } catch (error) {
        yield put(actions.setError("مشکل در اضافه کردن کتاب"));
    }
}

export function* watchBooks(action) {
    yield takeLatest(actionsTypes.INIT_BOOKS, initBooksSaga);
    yield takeLatest(actionsTypes.REMOVE_BOOK, removeBookSaga);
    yield takeLatest(actionsTypes.EDIT_BOOK, editBookSaga);
    yield takeLatest(actionsTypes.ADD_BOOK, addBookSaga);
}
