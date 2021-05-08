import React, {useEffect, useRef, useState} from "react"
import {Link, Redirect, useHistory} from "react-router-dom"
import {connect} from "react-redux"
import { authFail, signUp } from "../store/auth/actions"

function SignUp({
    onSignUp,
    onError,
    isAuthenticated,
    loading,
    error
}) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const history = useHistory();
    
    const nextPath = (path) => {
        onError(null);
        history.push(path);
    }

    function handelSubmit(e) {
        e.preventDefault();
        if( passwordRef.current.value !== passwordConfirmRef.current.value) {
            onError("PASSWORD DO NOT MATCH!!!");
            return null;
        }
        onSignUp(emailRef.current.value, passwordRef.current.value);
    }
    return (
        <div style={{minHeight: "100vh"}} className="d-flex justify-content-center align-items-center">
        {isAuthenticated ? <Redirect to="/dashboard" /> : null}
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
                Already have an account? <button className="btn btn-link" onClick={() => nextPath("/login")}>Log In</button>
            </div>
        </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null,
        error: state.authReducer.error,
        loading: state.authReducer.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (email, password) => dispatch(signUp(email, password)),
        onError: (error) => dispatch(authFail(error)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);