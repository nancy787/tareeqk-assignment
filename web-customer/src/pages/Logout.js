import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ setIsLoggedIn, setRole }) {

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();

    setIsLoggedIn(false);
    setRole(null);

    navigate("/login");
  }, [navigate, setIsLoggedIn, setRole]);

  return <p>Logging out...</p>;
}
