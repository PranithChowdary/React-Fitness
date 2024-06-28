import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile'
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import '/Users/pranith/Desktop/React-Fitness/client/src/App.css'
import ForgotPassword from './components/forgotPassword';
import ExerciseDetail from './pages/ExerciseDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
