import React, { useRef, useState } from "react"
import {Link, useHistory} from "react-router-dom";
import { connect } from "react-redux";
import { authFail, restorePassword } from "../store/auth/actions";

function ForgotPass({
    onRestorePass,
    onError,
    error,
    message,
    ...props
}){
    const emailRef = useRef()

    const history = useHistory();

    async function handelSubmit(e) {
        e.preventDefault();
        onRestorePass(emailRef.current.value);
        // try {
        //     setMessage("");
        //     setError("");
        //     setLoading(true);
        //     await resetPassword(emailRef.current.value)
        //     setMessage("Check your Email inbox");
        // } catch {
        //     setError("Faild to reset password");
        // }
        // setLoading(false)
    }

    const nextPath = (path) => {
        onError(null);
        history.push(path);
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
                    <button type="submit" className="btn btn-primary w-100">Sign In</button>
                </form>
            </div>
            <div className="text-center mb-3">
                    
                Already have an account? <button className="btn btn-link" onClick={ () => nextPath("/login") }>Log In</button>
            </div>
        </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        error: state.authReducer.error,
        message: state.authReducer.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRestorePass: (email) => dispatch(restorePassword(email)),
        onError: (err) => dispatch(authFail(err))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPass)