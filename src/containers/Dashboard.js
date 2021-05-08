import React, { useEffect, useState } from "react"
import {Link, useHistory} from "react-router-dom"
import axios from 'axios';
import {connect} from 'react-redux';
import {removeBook, initBooks} from "../store/book/actions"
import { logout } from "../store/auth/actions"

function Dashboard( {
    books,
    email,
    onDeleteBook,
    onInitBooks,
    onLogOut,
    error
}) {

    useEffect(() => {
        onInitBooks();
    }, [])

    

    const handleLogOut = () => {
        onLogOut();
    }

    const deleteBookHandler = (id) => {
        onDeleteBook(id)
    }

    return(
        <>
        <div className="m-3 d-flex justify-content-between">
            <button onClick={handleLogOut} className="btn btn-primary"><i className="fa fa-sign-out" aria-hidden="true"></i></button>
            <div className="border rounded border-success p-1">{email}</div>
        </div>
        {error && <div>{error}</div>}
        <div className="py-5 text-right d-flex flex-wrap justify-content-center">
            {books && books[0] !== null && books.length &&
            books.map(book => (
                <div key={book.id} className="card w-25 m-1">
                    <div className="card-body d-flex flex-column">
                        <h3>{book.name}</h3>
                        <p 
                            style={{
                                marginBottom: 'auto',
                                textAlign: "right",
                                direction: "rtl"
                            }}
                        >
                            {book && book.text && book.text.slice(0, 30)+"..."}
                        </p>
                    </div>
                    <p className="pr-2"><strong>{book.auther}</strong></p>
                    <div className="card-footer d-flex justify-content-center">
                        <Link to={{pathname: "/edit", state: { id: book.id, name: book.name, auther: book.auther, text: book.text}}} className="btn btn-sm btn-primary"><i className="fa fa-edit"></i></Link>
                        <button 
                            onClick={() => deleteBookHandler(book.id)} 
                            className="btn btn-sm btn-danger mx-2"
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                        <button className="btn btn-sm btn-success"><i className="fa fa-bookmark" aria-hidden="true"></i></button>
                    </div>
                </div>
            ))
                }
        </div>

        <div className="w-100 text-center">
            <Link to="/add-book" className="btn btn-primary">افزودن کتاب<i className="fa fa-plus-square ml-2" aria-hidden="true"></i></Link>
        </div>
        <div className="w-100 text-center">
            <Link to="/" className="btn btn-primary my-3"><i className="fa fa-home mr-2" aria-hidden="true"></i>Home</Link>
        </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        books: state.bookReducer.books,
        email: state.authReducer.email,
        error: state.bookReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitBooks: () => dispatch(initBooks()),
        onLogOut: () => dispatch(logout()),
        onDeleteBook: (bookId) => dispatch(removeBook(bookId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)