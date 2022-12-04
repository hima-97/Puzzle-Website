import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StrictNavOnAuth(props) {
  const { isLoggedIn, isAuth, page } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) return;

    if (isLoggedIn && page.toLowerCase() === "login") {
      navigate("/");
    }

    if (!isLoggedIn && page.toLowerCase() !== "login") {
      alert("Your session has expired. Move to Login page.");
      navigate("/sign-in");
    }
  }, [isLoggedIn, isAuth, page, navigate]);

  return <></>;
}
