// File for Navbar component

import "./navbarComponent.css";
import { useRef, useState } from "react";
import { Link, useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import SearchIcon from "@mui/icons-material/Search";
import HorizontalSplitIcon from "@mui/icons-material/HorizontalSplit";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { LoginService } from "../Services";
import Loading from "./Loading";

function UserDropdown(props) {
  const { setIsLoggedIn } = props;
  // Dropdown user: logout button, your last played
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleLogout = () => {
    setIsLoading(true);
    LoginService.logout().finally(() => {
      // Logout on client by remove token
      localStorage.removeItem("token");
      setIsLoading(false);
      setIsLoggedIn(false);
    });
  };

  return (
    <li ref={anchorRef} className="d-flex align-items-center">
      <Button
        className="d-block p-0 text-dark"
        style={{ minWidth: 0 }}
        aria-controls={open ? "split-button-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-label="select merge strategy"
        aria-haspopup="menu"
        onClick={handleToggle}
      >
        <AccountCircleIcon fontSize="large" />
      </Button>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {/* Animation of popper */}
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                {/* Popper content */}
                <div className="d-flex flex-column align-items-end p-3">
                  {/* History */}
                  <Button
                    className="p-1 mb-2"
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    href="/history"
                  >
                    History
                  </Button>
                  {/* Logout */}
                  <Button
                    className="text-dark p-1"
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleLogout}
                  >
                    <LogoutIcon className="pe-1" />
                    Logout
                  </Button>
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <Loading isLoading={isLoading} />
    </li>
  );
}

export default function NavbarComponent(props) {
  const { isLoggedIn, setIsLoggedIn } = props;
  const navigate = useNavigate();

  const [isCollapseNav, setIsCollapseNav] = useState(true);

  const handleSubmit = (evt) => {
    // Handle searching by navigate to search page with params
    evt.preventDefault();
    navigate("/search?q=" + evt.target.search.value);
  };

  return (
    <nav
      className={
        "nav navbar navbar-expand-md navbar-dark" +
        (!isCollapseNav ? " gap-0" : "")
      }
    >
      {/* Nav title */}
      <Link to="/" className="site-title col-3">
        PuzzledUp
      </Link>

      {/* Collapse button */}
      <button
        className="navbar-toggler text-dark p-0 m-2"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={() => setIsCollapseNav(!isCollapseNav)}
      >
        <HorizontalSplitIcon />
      </button>

      {/* Collapse container */}
      <div
        className={
          (isCollapseNav ? "collapse" : "") +
          " navbar-collapse justify-content-end"
        }
        id="navbarSupportedContent"
      >
        {/* Search box */}
        <form
          className="d-flex align-items-center position-relative pe-0 me-5"
          style={{ maxWidth: "50%", minWidth: "50%" }}
          onSubmit={handleSubmit}
        >
          <div className="form-outline w-100">
            <input
              id="search-focus"
              type="search"
              name="search"
              className="form-control"
              style={{ borderRadius: "1rem" }}
            />
          </div>
          <button
            type="submit"
            className="position-absolute btn px-2"
            style={{ left: "100%", borderRadius: "50%" }}
          >
            <SearchIcon />
          </button>
        </form>

        {/* Pages header */}
        <ul className="justify-content-between justify-content-md-end">
          <div className="d-flex gap-1">
            <CustomLink to="/gameplay">Gameplay</CustomLink>
          </div>
          {!isLoggedIn ? (
            <div className="d-flex gap-1">
              <CustomLink to="/sign-in">Sign In</CustomLink>
              <CustomLink to="/sign-up">Sign Up</CustomLink>
            </div>
          ) : (
            <div>
              <UserDropdown setIsLoggedIn={setIsLoggedIn} />
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
