import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

function Header() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register/Customer");
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  const handleCreateVenue = () => {
    navigate("/createVenue");
  };

  return (
    <header>
      <div className="  bg-[#4E928A] px-6 py-4">
        <div className=" flex justify-between items-center">
          <Link to="/">
            <h1 className="text-white text-xl font-bold">Holidaze</h1>
          </Link>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleCreateVenue}>
              Create Venue
            </Button>
            <Button onClick={handleProfile}>Profile</Button>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleRegister}>Register</Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
