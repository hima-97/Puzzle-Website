import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StrictNavOnAuth(props) {
  const { isLoggedIn, page } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && page.toLowerCase() === "login") {
      navigate("/");
    }

    if (!isLoggedIn && page.toLowerCase() !== "login") {
      navigate("/sign-in");
    }
  }, [isLoggedIn, page, navigate]);

  return <></>;
}
