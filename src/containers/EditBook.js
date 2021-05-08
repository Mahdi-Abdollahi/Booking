import React, { useRef, useState } from "react";
import {Link, Redirect, useHistory} from "react-router-dom";
import axios from "axios";
import {connect} from "react-redux"
import { editBook } from "../store/book/actions"

const EditBook = ({
    onEditBook,
    error,
    bookHasEdit,
    ...props
}) => {
    const history = useHistory();
    const {id, name, auther, text} = props.location.state;

    const bookNameRef = useRef();
    const autherRef = useRef();
    const bookTextRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        // setLoading(true);
        const editedBook = {
            name: bookNameRef.current.value || name,
            auther: autherRef.current.value || auther,
            text: bookTextRef.current.value || text,
            id: id
        }
        onEditBook(id, editedBook.name, editedBook.auther, editedBook.text );
        // axios.put(`https://auth-dev-aeabc-default-rtdb.asia-southeast1.firebasedatabase.app/books/${id}.json`, editedBook)
        // .then(res => {
        //     setMessage("کتاب تغییر کرد");
        //     setLoading(false);
        //     history.push("/");
        // })
        // .catch( err => {
        //     setError("مشکلی در برقراری ارتباط");
        //     setLoading(false);
        // })
    }
    
    return(
        <div style={{minHeight: "100vh"}} className="d-flex justify-content-center align-items-center">
        {bookHasEdit ? <Redirect to="/dashboard" /> : null}
        <div className="card w-75">
            <div className="card-body">
                <h1 className="text-primary mb-4">Editing Book</h1>
                {error && <h4 className="alert alert-danger">{error}</h4>}
                {/* {message && <h4 className="alert alert-success">{message}</h4>} */}
                <form className="mt-3" onSubmit={handleSubmit} >
                    <div className="form-group" id="bookName">
                        <label>New Book Name:</label>
                        <input placeholder={name} type="text" ref={bookNameRef} className="form-control" />
                    </div>
                    <div className="form-group" id="auther">
                        <label>New Auther:</label>
                        <input placeholder={auther} type="text" ref={autherRef} className="form-control" />
                    </div>
                    <div className="form-group" id="passwordConfirm">
                        <label>New Part of Book:</label>
                        <textarea placeholder={text} ref={bookTextRef} className="form-control" rows="3" />
                    </div>
                <button type="submit" className="btn btn-primary w-100">افزودن</button>
                </form>
            </div>
            <div className="text-center mb-3">
                بازگشت به صفحه اصلی <Link to="/">Dashboard</Link>
            </div>
        </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        error: state.authReducer.error,
        bookHasEdit: state.bookReducer.edited,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEditBook: ( bookId, bookName, auther, text ) => dispatch(editBook(bookId, bookName, auther, text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBook);