import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow mt-4 mb-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
