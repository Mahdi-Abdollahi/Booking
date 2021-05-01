import React, { useRef, useState } from "react"
import {Link} from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPass(){
    const emailRef = useRef()
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const [message, setMessage] = useState("");
    const {resetPassword} = useAuth();

    async function handelSubmit(e) {
        e.preventDefault();
        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value)
            setMessage("Check your Email inbox");
        } catch {
            setError("Faild to reset password");
        }
        setLoading(false)
    }
    
    return (
        <div style={{minHeight: "100vh"}} className="d-flex justify-content-center align-items-center">
        <div className="card w-75">
            <div className="card-body">
                <h1 className="text-primary mb-4">Reset Password</h1>
                {message && <h4 className="alert alert-success">{message}</h4>}
                {error && <h4 className="alert alert-danger">{error}</h4>}
                <form className="mt-3" onSubmit={handelSubmit}>
                    <div className="form-group" id="email">
                        <label>Email:</label>
                        <input type="email" ref={emailRef} className="form-control" required />
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