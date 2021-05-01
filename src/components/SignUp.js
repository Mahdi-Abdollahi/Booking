import React, {useRef, useState} from "react"
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from "react-router-dom"

export default function SignUp() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup} = useAuth()
    const history = useHistory();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    async function handelSubmit(e) {
        e.preventDefault();
        console.log("submited yes")
        console.log(emailRef.current.value)

        if( passwordRef.current.value !== passwordConfirmRef.current.value) {
            console.log("pass error")
            return setError("PASSWORD DO NOT MATCH!!!")
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/");
        } catch {
            setError("Faild to create an acount");
        }
        setLoading(false)
    }

    return (
        <div style={{minHeight: "100vh"}} className="d-flex justify-content-center align-items-center">
        <div className="card w-75">
            <div className="card-body">
                <h1 className="text-primary mb-4">Sign Up</h1>
                {error && <h4 className="alert alert-danger">{error}</h4>}
                <form className="mt-3" onSubmit={handelSubmit}>
                    <div className="form-group" id="email">
                        <label>Email:</label>
                        <input type="email" ref={emailRef} className="form-control" required />
                    </div>
                    <div className="form-group" id="password">
                        <label>Password:</label>
                        <input type="password" ref={passwordRef} className="form-control" required />
                    </div>
                    <div className="form-group" id="passwordConfirm">
                        <label>Password Confirmation:</label>
                        <input type="password" ref={passwordConfirmRef} className="form-control" required />
                    </div>
                <button type="submit" disabled={loading} className="btn btn-primary w-100">Sign In</button>
                </form>
            </div>
            <div className="text-center mb-3">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </div>
        </div>
    );
}