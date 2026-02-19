import { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../components/ui/Button";
import LogoutButton from "./ui/LogoutButton";
import { isLoggedIn } from "../storage/isLoggedIn";

function Header() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVenueManager, setVenueManager] = useState(false);
  const menuRef = useRef(null);

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
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen && isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isMobile]);

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
      <div className=" bg-brand px-6 py-4 ">
        <div className="container mx-auto max-w-screen-xl">
          <div className=" flex justify-between items-center">
            <div
              className={`${
                isMobile ? "flex-1 flex justify-center" : ""
              } holidaze-logo-bg`}
            >
              <Link
                to="/"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  window.location.href = "/";
                }}
              >
                <h1 className="text-amber-50 text-xl font-bold transition-all duration-300 transform hover:-translate-x-1  image-text-hover hover:scale-110">
                  Holidaze
                </h1>
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
                      <NavLink
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                      >
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
            <div
              className="fixed top-16 right-0 w-1/2  bg-[#4E928A] rounded mt-8 shadow-lg z-50 flex flex-col items-start gap-2 px-4 py-6 md:hidden"
              ref={menuRef}
            >
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
      </div>
    </header>
  );
}

export default Header;
