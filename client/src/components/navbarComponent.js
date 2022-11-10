// File for Navbar component

import './navbarComponent.css';
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function NavbarComponent() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        PuzzledUp
      </Link>
      <ul>
        <CustomLink to="/sign-in">Sign In</CustomLink>
        <CustomLink to="/sign-up">Sign Up</CustomLink>
        <CustomLink to="/dashboard">Dashboard</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}