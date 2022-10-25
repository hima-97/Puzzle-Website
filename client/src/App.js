// This is where you actually create the front-end React app
// This is the main React app with the code that is going to be displayed
// This is basically the main entry point of the React app

import React from "react";
// Used for routing URLs to different routes for the app:
// The "react-router-dom" is used to make it easier to route different URLs to different React components:
// With this, you will be able to have a router element for each route of the application
// You need to put everything you want to be used with the router inside the router element
//import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import './App.css';

// Importing components to be used in this file:
import loginComponent from "./components/loginComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello World
        </a>
      </header>
    </div>
  );
}

export default App;

