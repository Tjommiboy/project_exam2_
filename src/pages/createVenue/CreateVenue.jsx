import React, { useState } from "react";
import CreateVenueForm from "../../components/ui/CreateVenueForm";
import { createVenue } from "../../api/CreateVenue";
import { toast, ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";

const CreateVenuePage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVenueSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const venue = await createVenue(formData);

      toast.success("Venue successfully created!", {
        onClose: () => {
          navigate(`/singleVenue/${venue.data.id}`);
        },
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Failed to create venue:", error.message);
      toast.error("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={100} />
      {isSubmitting && <p className="text-blue-600 mb-4">Creating venue...</p>}
      <CreateVenueForm onSubmit={handleVenueSubmit} />
    </div>
  );
};

export default CreateVenuePage;
