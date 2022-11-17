// This is where you actually create the front-end React app
// This is the main React app with the code that is going to be displayed
// This is basically the main entry point of the React app

import React from 'react';

// Used for routing URLs to different routes for the app:
// The "react-router-dom" is used to make it easier to route different URLs to different React components:
// With this, you will be able to have a router element for each route of the application
// You need to put everything you want to be used with the router inside the router element
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Importing bootstrap:
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing components and pages to be used in this file:
import NavbarComponent from './components/navbarComponent';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <>
      <NavbarComponent />
      <div className="container" >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </>
    
    
  )
}

export default App