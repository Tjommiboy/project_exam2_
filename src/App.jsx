import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/MainLayout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Customer from "./pages/register/Customer";
import Profile from "./pages/profile/Profile";
import Manager from "./pages/register/Manager";
import NotFound from "./pages/notFound/NotFound";
import VenueManager from "./pages/profile/VenueManager";
import CreateVenuePage from "./pages/createVenue/CreateVenue";
import SingleVenue from "./pages/singleVenue/SingleVenue";
import EditVenuePage from "./pages/editVenue/EditVenuePage";
import BodyBackgroundHandler from "./components/ui/ BodyBackgroundHandler";

function App() {
  return (
    <BrowserRouter>
      <BodyBackgroundHandler />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="/register/Customer" element={<Customer />} />
          <Route path="/register/Manager" element={<Manager />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="VenueManager" element={<VenueManager />} />
          <Route path="createVenue" element={<CreateVenuePage />} />
          <Route path="/venues/:id/edit" element={<EditVenuePage />} />
          <Route path="singleVenue/:id" element={<SingleVenue />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
