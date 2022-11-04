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

// Import App.css file:
import './App.css'

// Importing components to be used in this file:
import LoginComponent from "./components/loginComponent";
import SignupComponent from "./components/signupComponent";
//import SignupComponent from "./components/signupComponent";

function App() {
  return (
    // Router object:
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              PuzzledUp
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/dashboard'}>
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<LoginComponent />} />
              <Route path="/sign-in" element={<LoginComponent />} />
              <Route path="/sign-up" element={<SignupComponent />} />
              <Route path="/dashboard" element={<recommendedPuzzlesComponent />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App