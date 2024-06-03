import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div>
            <h1>Fit & Fun</h1>
            <p>Get fit and stay motivated with personalized workouts.</p>
            <Link to="/login">Login</Link>
            <br></br>
            <Link to="/register">Create Account</Link>
        </div>
    );
};

export default LandingPage;