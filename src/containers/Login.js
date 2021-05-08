import React, {useEffect, useRef, useState} from "react"
import {Link, Redirect, useHistory} from "react-router-dom"
import {connect} from "react-redux";
import {authFail, logIn} from "../store/auth/actions"

function LogIn({ 
    onLogin,
    onError,
    isAuthenticated,
    loading,
    error
}) {

    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
    function handelSubmit(e) {
        e.preventDefault();
        onLogin(emailRef.current.value, passwordRef.current.value);
    }
    const nextPath = (path) => {
        onError(null);
        history.push(path);
    }

    return (
        <div style={{minHeight: "100vh"}} className="d-flex justify-content-center align-items-center">
        {isAuthenticated ? <Redirect to="/dashboard" /> : null}
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
                <button disabled={loading} type="submit" className="btn btn-primary w-100">Log In</button>
                </form>
                <div className="text-center mt-2">
                    <button className="btn btn-link" onClick={ () => nextPath("/forgot-password")}>Forgot password?</button>
                </div>
            </div>
            <div className="text-center mb-3">
                Don't have account? <button className="btn btn-link" onClick={ () => nextPath("/signup") }>Sign up</button>
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
        onLogin: (email, password) => dispatch(logIn(email, password)),
        onError: (err) => dispatch(authFail(err))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);