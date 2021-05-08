import * as actionsType from "./constance";

const initialState = {
    books: [null],
    error: null,
    edited: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.EDIT_BOOK: 
            return {
                ...state,
                error: null,
                edited: true,
            }
        case actionsType.SET_BOOK: 
            return {
                ...state,
                books: action.books,
                error: null,
                edited: false
            }

        case actionsType.SET_ERROR: 
            return {
                ...state,
                error: action.error,
                edited: false
            }

        case actionsType.UPDATE_BOOKS: 
            return {
                ...state,
                error: null,
                edited: true
            }

        default:
            return state;
    }
}

export default reducer;