import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import HomePage from './components/HomePage'; // Placeholder for Home Page


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />

        {/* Protected Route (Home Page) - Requires JWT token for access */}
        <Route path="/home" element={<HomePage />} />
        {/* 
        Error Handling for Unauthorized Access
        <Route path="*" element={<div>Unauthorized access!</div>} /> */}
      </Routes>
    </Router>
  );
};
export default App;