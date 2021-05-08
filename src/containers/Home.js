import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1 className="text-center mt-5">Hi, Your Not Log in or Sign Up</h1>
            <div className="text-center my-5">
                <Link to="/login">Log In</Link>
            </div>
            <div className="text-center">
                <Link to="/signup">Sign Up</Link>
            </div>
            <div className="text-center mt-5">
                <Link to="/dashboard">Dashboard</Link>
            </div>
            
        </div>

    );
}

export default Home;