import * as actionTypes from "./constance"

export const removeBook = (bookId) => {
    return {
        type: actionTypes.REMOVE_BOOK,
        bookId: bookId
    }
}

export const editBook = (bookId, bookName, auther, text) => {
    return {
        type: actionTypes.EDIT_BOOK,
        bookId: bookId,
        bookName: bookName,
        auther: auther,
        text: text
    }
}

export const addBook = (newBook) => {
    return {
        type: actionTypes.ADD_BOOK,
        payload: newBook
    }
}

export const setError = (err) => {
    return {
        type: actionTypes.SET_ERROR,
        error: err
    }
}

export const setBooks = books => {
    if(books) {
        const booksArray = Object.values(books);
        const booksIds = Object.keys(books);
        const updatedBooks = booksArray.map( (book, index) => {
            return {
                ...book,
                id: booksIds[index]
            }
        })
        return {
            type: actionTypes.SET_BOOK,
            books : updatedBooks
        }
    }
    return {
        type: actionTypes.SET_BOOK,
        books : null
    }
}

export const updateBooks = () => {
    return {
        type: actionTypes.UPDATE_BOOKS
    }
}

export const initBooks = () => {
    return {
        type: actionTypes.INIT_BOOKS
    }
}