import Button from "./Button";
import { removeToken } from "../../storage/remove";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("profile");

    // Notify other tabs/components
    window.dispatchEvent(new Event("storage"));

    navigate("/login");
  };

  return (
    <Button onClick={handleLogout} variant="ghost">
      Log out
    </Button>
  );
};

export default LogoutButton;
