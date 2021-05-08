import React, { useRef, useState } from "react";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import uniqid from 'uniqid';
import {addBook} from "../store/book/actions";
import {connect} from "react-redux";

const NewBook = ({ 
    onBookAdd,
    bookHasAdd,
    error,
    ...props
}) => {
    const bookNameRef = useRef();
    const autherRef = useRef();
    const bookTextRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBook = {
            name: bookNameRef.current.value,
            auther: autherRef.current.value,
            text: bookTextRef.current.value,
            id: uniqid()
        }
        onBookAdd(newBook);

        // axios.post("https://auth-dev-aeabc-default-rtdb.asia-southeast1.firebasedatabase.app/books.json", newBook)
        // .then(res => {
        //     setMessage("کتاب جدید اضافه شد");
        //     setLoading(false);
        //     history.push('/');
        // })
        // .catch( err => {
        //     setError("مشکلی در برقراری ارتباط");
        //     setLoading(false);
        // })
    }
    return(
        <div style={{minHeight: "100vh"}} className="d-flex justify-content-center align-items-center">
        {bookHasAdd ? <Redirect to="/dashboard" /> : null}
        <div className="card w-75">
            <div className="card-body">
                <h1 className="text-primary mb-4">Adding New Book</h1>
                {error && <h4 className="alert alert-danger">{error}</h4>}
                <form className="mt-3" onSubmit={handleSubmit} >
                    <div className="form-group" id="bookName">
                        <label>Book Name:</label>
                        <input type="text" ref={bookNameRef} className="form-control" required />
                    </div>
                    <div className="form-group" id="auther">
                        <label>Auther:</label>
                        <input type="text" ref={autherRef} className="form-control" required />
                    </div>
                    <div className="form-group" id="passwordConfirm">
                        <label>Part of Book:</label>
                        <textarea ref={bookTextRef} className="form-control" rows="3" />
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
        bookHasAdd: state.bookReducer.edited,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onBookAdd: (newBook) => dispatch(addBook(newBook))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBook);