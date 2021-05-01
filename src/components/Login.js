import React, {useRef, useState} from "react"
import {useAuth} from '../contexts/AuthContext'
import {Link, useHistory} from "react-router-dom"

export default function SignUp() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth()
    const history = useHistory();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handelSubmit(e) {
        e.preventDefault();
        console.log("submited yes")

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Faild to Log in");
        }
        setLoading(false)
    }

    return (
        <div style={{minHeight: "100vh"}} className="d-flex justify-content-center align-items-center">
        <div className="card w-75">
            <div className="card-body">
                <h1 className="text-primary mb-4">Log In</h1>
                {error && <h4 className="alert alert-danger">{error}</h4>}
                <form className="mt-3" onSubmit={handelSubmit} >
                    <div className="form-group" id="email">
                        <label>Email:</label>
                        <input type="email" ref={emailRef} className="form-control" required />
                    </div>
                    <div className="form-group" id="password">
                        <label>Password:</label>
                        <input type="password" ref={passwordRef} className="form-control" required />
                    </div>
                <button type="submit" disabled={loading} className="btn btn-primary w-100">Log In</button>
                </form>
                <div className="text-center mt-2">
                    <Link to="/forgot-password">Forgot password?</Link>
                </div>
            </div>
            <div className="text-center mb-3">
                Don't have account? <Link to="/signup">Sign up</Link>
            </div>
        </div>
        </div>
    );
}