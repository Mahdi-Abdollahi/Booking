import React from "react"
import SignUp from "../components/SignUp";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import ForgotPass from "../components/ForgotPass";
import NewBook from "../components/NewBook";
import EditBook from "../components/EditBook";
import PrivateRoute from "../components/PrivateRoute";
import { AuthProvider } from "../contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import "../style/bootstrap.min.css"
// import {}
function App() {
  return (
    <div>
        <Router>
          <AuthProvider >
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPass} />
              <Route path="/add-book" component={NewBook} />
              <Route path="/edit" component={EditBook} />
            </Switch>

          </AuthProvider>
        </Router>
    </div>
  );
}

export default App;
