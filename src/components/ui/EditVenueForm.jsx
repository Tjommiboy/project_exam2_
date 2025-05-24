import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CreateVenueForm from "./CreateVenueForm";
import { ALLVENUES } from "../../api/constants";
import { editVenue } from "../../api/VenueEdit";
import Spinner from "../../components/ui/Spinner";
import { toast, ToastContainer } from "react-toastify";

const EditVenuePage = () => {
  const { id } = useParams();
  const [venueData, setVenueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenue = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${ALLVENUES}/${id}`);
        const data = await res.json();
        console.log("Fetched venue data:", data);
        setVenueData(data.data);
      } catch (error) {
        console.error("Failed to fetch venue:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  const handleEditVenue = async (formData) => {
    try {
      const updatedData = await editVenue(id, formData);
      console.log("Venue updated successfully:", updatedData);
      toast.success("Venue updated successfully!");
      setTimeout(() => {
        navigate(`/singleVenue/${id}`);
      }, 1300);
    } catch (error) {
      console.error("Error updating venue:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!venueData) {
    return (
      <div className="text-center mt-10 text-red-500">Venue not found.</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <ToastContainer position="top-center" autoClose={1000} />
      <CreateVenueForm
        initialData={venueData}
        isEditMode={true}
        onSubmit={handleEditVenue}
      />
    </div>
  );
};

export default EditVenuePage;
