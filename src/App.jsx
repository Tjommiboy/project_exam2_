import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/MainLayout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import CustomerRegister from "./pages/register/CustomerRegister";
import Profile from "./pages/profile/Profile";
import ManagerRegister from "./pages/register/ManagerRegister";
import NotFound from "./pages/notFound/NotFound";
import VenueManager from "./pages/venueManager/VenueManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="CustomerRegister" element={<CustomerRegister />} />
          <Route path="ManagerRegister" element={<ManagerRegister />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="VenueManager" element={<VenueManager />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
