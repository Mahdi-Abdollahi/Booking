import React, { useEffect } from "react"
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPass from "./ForgotPass";
import NewBook from "./NewBook";
import EditBook from "./EditBook";
import PrivateRoute from "../utils/PrivateRoute";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { connect } from "react-redux";
import "../style/bootstrap.min.css"
import Home from "./Home"
import { checkLocalStorageTokens } from "../store/auth/actions"

function App({
  onCheckLocalStorageTokens
}) {

  useEffect(() => {
    onCheckLocalStorageTokens()
  }, [])
  
  return (
    <div>
        <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPass} />
              <Route path="/add-book" component={NewBook} />
              <Route path="/edit" component={EditBook} />
            </Switch>
        </Router>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckLocalStorageTokens: () => dispatch(checkLocalStorageTokens())
  }
}

export default connect(null, mapDispatchToProps)(App);
