// File for Navbar component

import "./navbarComponent.css";
import { useRef, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { LoginService } from "../Services";
import Loading from "./Loading";

function UserDropdown(props) {
  const { setIsLoggedIn } = props;
  // Dropdown user: logout button
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
        className="p-0 text-dark"
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
                <div className="p-3">
                  <Button
                    className="p-0"
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleLogout}
                  >
                    Logout
                    <LogoutIcon />
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

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        PuzzledUp
      </Link>
      <ul>
        <CustomLink to="/dashboard">Dashboard</CustomLink>
        <CustomLink to="/gameplay">Gameplay</CustomLink>
        {!isLoggedIn ? (
          <>
            <CustomLink to="/sign-in">Sign In</CustomLink>
            <CustomLink to="/sign-up">Sign Up</CustomLink>
          </>
        ) : (
          <>
            <UserDropdown setIsLoggedIn={setIsLoggedIn} />
          </>
        )}
      </ul>
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
