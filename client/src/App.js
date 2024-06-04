import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import HomePage from './components/HomePage'; // Placeholder for Home Page


const App = () => {
  const handleLoginSuccess = (token) => {
    localStorage.setItem('fitfun-token', token);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<RegistrationForm/>} />

        {/* Protected Route (Home Page) - Requires JWT token for access */}
        <Route path="/home" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />

        {/* Error Handling for Unauthorized Access */}
        <Route path="*" element={<div>Unauthorized access!</div>} />
      </Routes>
    </Router>
  );
};

// Private Route component (with JWT token verification)
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('fitfun-token');

  if (!token) {
    return <Navigate to="/home" replace />; // Redirect to login if no token
  }

  return children;
};

export default App;