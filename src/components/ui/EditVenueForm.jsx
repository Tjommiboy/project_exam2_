import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateVenueForm from "./CreateVenueForm";
import { ALLVENUES } from "../../api/constants";

const EditVenuePage = () => {
  const { id } = useParams();
  const [venueData, setVenueData] = useState(null);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const res = await fetch(`${ALLVENUES}/${id}`);

        const data = await res.json();
        console.log("Fetched venue data:", data);
        setVenueData(data.data);
      } catch (error) {
        console.error("Failed to fetch venue:", error);
      }
    };

    fetchVenue();
  }, [id]);

  const handleUpdateVenue = async (updatedData) => {
    try {
      const res = await fetch(`${ALLVENUES}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add Authorization header if required
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        throw new Error("Failed to update venue");
      }

      const updatedVenue = await res.json();
      console.log("Venue updated successfully:", updatedVenue);
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  if (!venueData) return <div>Loading venue...</div>;

  return (
    <CreateVenueForm
      initialData={venueData}
      isEditMode={true}
      onSubmit={handleUpdateVenue}
    />
  );
};

export default EditVenuePage;
