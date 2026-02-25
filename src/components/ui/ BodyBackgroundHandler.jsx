import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BodyBackgroundHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.toLowerCase();

    const isLoginOrRegister =
      path.startsWith("/login") || path.startsWith("/register");

    if (!isLoginOrRegister) {
      document.body.classList.add("bg-home");
    } else {
      document.body.classList.remove("bg-home");
    }

    return () => {
      document.body.classList.remove("bg-home");
    };
  }, [location.pathname]);

  return null;
};

export default BodyBackgroundHandler;
