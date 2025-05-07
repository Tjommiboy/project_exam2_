import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../components/ui/Button";
import LogoutButton from "./ui/LogoutButton";
import { isLoggedIn } from "../storage/isLoggedIn";

function Header() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    const handleAuthChange = () => {
      const loggedInNow = isLoggedIn();
      console.log("🔄 authChange: isLoggedIn() =", loggedInNow);
      setLoggedIn(loggedInNow); // ✅ make sure this is being called
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  console.log("Logged in:", loggedIn);

  return (
    <header>
      <div className="bg-[#4E928A] px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/">
            <h1 className="text-white text-xl font-bold">Holidaze</h1>
          </Link>
          <div className="flex gap-2">
            {!loggedIn ? (
              <>
                <NavLink to="/login">
                  <Button>Login</Button>
                </NavLink>
                <NavLink to="/register/Customer">
                  <Button>Register</Button>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/createVenue">
                  <Button variant="ghost">Create Venue</Button>
                </NavLink>
                <NavLink to="/profile">
                  <Button>Profile</Button>
                </NavLink>
                <LogoutButton />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
