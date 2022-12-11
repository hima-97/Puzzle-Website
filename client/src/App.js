// This is where you actually create the front-end React app
// This is the main React app with the code that is going to be displayed
// This is basically the main entry point of the React app

import { useEffect, useState } from "react";

// Used for routing URLs to different routes for the app:
// The "react-router-dom" is used to make it easier to route different URLs to different React components:
// With this, you will be able to have a router element for each route of the application
// You need to put everything you want to be used with the router inside the router element
import { Routes, Route } from "react-router-dom";

// Importing bootstrap:
import "bootstrap/dist/css/bootstrap.min.css";

// Importing components and pages to be used in this file:
import NavbarComponent from "./components/navbarComponent";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import GameplayPage from "./pages/GameplayPage";
import { LoginService } from "./Services";
import Loading from "./components/Loading";
import ListPuzzlePage from "./pages/ListPuzzlePage";
import HistoryPage from "./pages/HistoryPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Check user is logged in after render the first time
    LoginService.checkAuth()
      .then((isAuth) => setIsLoggedIn(isAuth))
      .catch((_) => setIsLoggedIn(false))
      .finally(() => {
        setIsAuth(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <NavbarComponent isLoggedIn={isLoggedIn} isAuth={isAuth} setIsLoggedIn={setIsLoggedIn} />

      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<HomePage isLoggedIn={isLoggedIn} isAuth={isAuth} />} />
          <Route
            path="/sign-up"
            element={<SignUpPage isLoggedIn={isLoggedIn} isAuth={isAuth} />}
          />
          <Route
            path="/sign-in"
            element={<SignInPage isLoggedIn={isLoggedIn} isAuth={isAuth} />}
          />
          <Route
            path="/gameplay"
            element={<GameplayPage isLoggedIn={isLoggedIn} isAuth={isAuth} />}
          />
          <Route
            path="/search"
            element={<ListPuzzlePage isLoggedIn={isLoggedIn} isAuth={isAuth} />}
          />
          <Route
            path="/history"
            element={<HistoryPage isLoggedIn={isLoggedIn} isAuth={isAuth} />}
          />
          {/* <Route path="/404" element={<div>Page not found!</div>} />
          <Route path="*" element={<Navigate replace to="/404" />} /> */}
        </Routes>
      </div>

      <Loading isLoading={isLoading} />
    </>
  );
}

export default App;
