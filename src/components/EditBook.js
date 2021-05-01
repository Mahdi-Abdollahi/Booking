import React, { useRef, useState } from "react";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";

const EditBook = (props) => {
    const history = useHistory();
    const {id, name, auther, text} = props.location.state;

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
            name: bookNameRef.current.value || name,
            auther: autherRef.current.value || auther,
            text: bookTextRef.current.value || text,
            id: id
        }
        axios.put(`https://auth-dev-aeabc-default-rtdb.asia-southeast1.firebasedatabase.app/books/${id}.json`, newBook)
        .then(res => {
            console.log(res);
            setMessage("کتاب تغییر کرد");
            setLoading(false);
            history.push("/");
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
                <h1 className="text-primary mb-4">Editing Book</h1>
                {error && <h4 className="alert alert-danger">{error}</h4>}
                {message && <h4 className="alert alert-success">{message}</h4>}
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

export default EditBook;