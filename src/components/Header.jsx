import { Link, NavLink } from "react-router-dom";
import Button from "../components/ui/Button";

function Header() {
  return (
    <header>
      <div className="bg-[#4E928A] px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/">
            <h1 className="text-white text-xl font-bold">Holidaze</h1>
          </Link>
          <div className="flex gap-2">
            <NavLink to="/createVenue">
              <Button variant="ghost">Create Venue</Button>
            </NavLink>
            <NavLink to="/profile">
              <Button>Profile</Button>
            </NavLink>
            <NavLink to="/login">
              <Button>Login</Button>
            </NavLink>
            <NavLink to="/register/Customer">
              <Button>Register</Button>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
