import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../components/ui/Button";
import LogoutButton from "./ui/LogoutButton";
import { isLoggedIn } from "../storage/isLoggedIn";

function Header() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVenueManager, setVenueManager] = useState(false);

  useEffect(() => {
    const handleAuthChange = () => {
      const loggedInNow = isLoggedIn();
      console.log("🔄 authChange: isLoggedIn() =", loggedInNow);
      setLoggedIn(loggedInNow);
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user && user.venueManager) {
      setVenueManager(true);
    } else {
      setVenueManager(false);
    }
  }, [loggedIn]);

  useEffect(() => {
    // Check if screen width is under 600px
    const handleResize = () => {
      if (window.innerWidth <= 665) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Run the check initially

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#4E928A] px-6 py-4">
        <div className="flex justify-between items-center">
          <div className={`${isMobile ? "flex-1 flex justify-center" : ""}`}>
            <Link to="/">
              <h1 className="text-white text-xl font-bold">Holidaze</h1>
            </Link>
          </div>

          {isMobile ? (
            <button
              onClick={toggleMenu}
              className="text-white text-2xl md:hidden"
            >
              {isMenuOpen ? "×" : "☰"}
            </button>
          ) : (
            <div className="flex gap-2">
              {!loggedIn ? (
                <>
                  <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                    {({ isActive }) => (
                      <Button variant={isActive ? "active" : "inactive"}>
                        Login
                      </Button>
                    )}
                  </NavLink>
                  <NavLink
                    to="/register/Customer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {({ isActive }) => (
                      <Button variant={isActive ? "active" : "inactive"}>
                        Register
                      </Button>
                    )}
                  </NavLink>
                </>
              ) : (
                <>
                  {isVenueManager ? (
                    <>
                      <NavLink
                        to="/venueManager"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {({ isActive }) => (
                          <Button variant={isActive ? "active" : "inactive"}>
                            Venue Manager
                          </Button>
                        )}
                      </NavLink>
                      <NavLink
                        to="/createVenue"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {({ isActive }) => (
                          <Button variant={isActive ? "active" : "inactive"}>
                            Create Venue
                          </Button>
                        )}
                      </NavLink>
                    </>
                  ) : (
                    <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>
                      {({ isActive }) => (
                        <Button variant={isActive ? "active" : "inactive"}>
                          Profile
                        </Button>
                      )}
                    </NavLink>
                  )}
                  <LogoutButton />
                </>
              )}
            </div>
          )}
        </div>

        {isMobile && isMenuOpen && (
          <div className="fixed top-16 right-0 w-1/2  bg-[#4E928A] shadow-lg z-50 flex flex-col items-start gap-2 px-4 py-6 md:hidden">
            {!loggedIn ? (
              <>
                <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                  {({ isActive }) => (
                    <Button variant={isActive ? "active" : "inactive"}>
                      Login
                    </Button>
                  )}
                </NavLink>
                <NavLink
                  to="/register/Customer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <Button variant={isActive ? "active" : "inactive"}>
                      Register
                    </Button>
                  )}
                </NavLink>
              </>
            ) : (
              <>
                {isVenueManager ? (
                  <>
                    <NavLink
                      to="/venueManager"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {({ isActive }) => (
                        <Button variant={isActive ? "active" : "inactive"}>
                          Venue Manager
                        </Button>
                      )}
                    </NavLink>
                    <NavLink
                      to="/createVenue"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {({ isActive }) => (
                        <Button variant={isActive ? "active" : "inactive"}>
                          Create Venue
                        </Button>
                      )}
                    </NavLink>
                  </>
                ) : (
                  <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>
                    {({ isActive }) => (
                      <Button variant={isActive ? "active" : "inactive"}>
                        Profile
                      </Button>
                    )}
                  </NavLink>
                )}
                <LogoutButton />
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
