import Button from "./Button";
import { removeToken } from "../../storage/remove";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("profile");

    // Notify this tab and others
    window.dispatchEvent(new Event("authChange"));

    navigate("/login");
  };

  return (
    <Button onClick={handleLogout} variant="ghost">
      Log out
    </Button>
  );
};

export default LogoutButton;
