// This is where you actually create the front-end React app
// This is the main React app with the code that is going to be displayed
// This is basically the main entry point of the React app

import React, { useState } from 'react';

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
import HomePage from './pages/homePage';                                                                              //I uncapitalized the H
import DashboardPage from './pages/DashboardPage';
import GameplayPage from './pages/GameplayPage';

function App() {

  const [baseImage, setBaseImage] = useState("");

  const uploadImage = async (e)=> {

    //console.log(e.target.files);
    const file = e.target.files[0];
    const base64 = await convertBase64(file)
    setBaseImage(base64);

  };

  const convertBase64 = (file)=> {
    return new Promise((resolve, reject)=> {

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      }
    });

  };

  return (
    <>
      <NavbarComponent />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/gameplay" element={<GameplayPage />} />
        </Routes>
        
        <div> 
          
          <input type="file" onChange={((e)=> {
            uploadImage(e)
          })}/>

        </div>
      
      <br></br>
      
      <div>
          <img src={baseImage} height="200px"/>
      </div>
      
      </div>
    </>
    
    
  )
}

export default App