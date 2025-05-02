import Button from "./Button";
import { removeToken } from "../../storage/remove";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("profile"); // optionally clear profile info too
    navigate("/login"); // redirect to login page
  };

  return (
    <Button onClick={handleLogout} variant="ghost">
      Log out
    </Button>
  );
};

export default LogoutButton;
