import React, { useRef, useState } from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import uniqid from 'uniqid';
const NewBook = () => {

    const history = useHistory()

    const bookNameRef = useRef();
    const autherRef = useRef();
    const bookTextRef = useRef();

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const newBook = {
            name: bookNameRef.current.value,
            auther: autherRef.current.value,
            text: bookTextRef.current.value,
            id: uniqid()
        }
        axios.post("https://auth-dev-aeabc-default-rtdb.asia-southeast1.firebasedatabase.app/books.json", newBook)
        .then(res => {
            console.log(res);
            setMessage("کتاب جدید اضافه شد");
            setLoading(false);
            history.push('/');
        })
        .catch( err => {
            console.log(err);
            setError("مشکلی در برقراری ارتباط");
            setLoading(false);
        })
    }
    
    return(
        <div style={{minHeight: "100vh"}} className="d-flex justify-content-center align-items-center">
        <div className="card w-75">
            <div className="card-body">
                <h1 className="text-primary mb-4">Adding New Book</h1>
                {error && <h4 className="alert alert-danger">{error}</h4>}
                {message && <h4 className="alert alert-success">{message}</h4>}
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
                <button type="submit" disabled={loading} className="btn btn-primary w-100">افزودن</button>
                </form>
            </div>
            <div className="text-center mb-3">
                بازگشت به صفحه اصلی <Link to="/">Dashboard</Link>
            </div>
        </div>
        </div>
    );
}

export default NewBook;