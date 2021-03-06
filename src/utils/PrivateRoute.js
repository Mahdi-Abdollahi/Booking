import React from "react"
import {Route, Redirect} from "react-router-dom"
import { connect } from "react-redux";

function PrivateRoute({component: Component, isAuthenticated, ...rest}) {
    return (
        <Route
            {...rest}
            render={props => (
                isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            )}
        />
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null
    }
}

export default connect(mapStateToProps)(PrivateRoute);