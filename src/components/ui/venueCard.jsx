import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteVenue } from "../../api/deleteVenue";
import { toast, ToastContainer } from "react-toastify";

function VenueCard({ venue, showActions, onDelete }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = venue.description;
  if (!showFullDescription) {
    description = description.substring(0, 70) + "...";
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this venue?"
    );
    if (!confirmed) return;

    try {
      await deleteVenue(venue.id);
      toast.success("Venue deleted successfully");
      if (onDelete) {
        onDelete(venue.id); // Let the parent know to refresh
      }
    } catch (error) {
      console.error("Failed to delete venue", error);
      toast.error("Failed to delete venue");
    }
  };

  return (
    <div className="flex flex-col border bg-white rounded-md p-4 shadow-sm">
      <ToastContainer position="top-center" autoClose={1000} />
      <Link to={`/singleVenue/${venue.id}`}>
        <img
          src={
            venue.media?.[0]?.url ||
            "https://images.unsplash.com/photo-1678225105802-01949b1dff0d?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={venue.media?.[0]?.alt || venue.name}
          className="w-full h-48 object-cover mb-2 rounded "
        />
        <h2 className="text-xl text-gray-500 font-medium break-words">
          {" "}
          {venue.name.length > 16
            ? venue.name.slice(0, 16) + "..."
            : venue.name}
        </h2>
        <p className="text-sm text-gray-500">
          {venue.location.city}, {venue.location.country}
        </p>
        <p className="text-base text-gray-500 mt-1 break-words">
          {description}
        </p>
      </Link>

      <div className="self-start mt-1">
        <span
          role="button"
          tabIndex={0}
          onClick={() => setShowFullDescription((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setShowFullDescription((prev) => !prev);
            }
          }}
          className="text-indigo-500 hover:text-indigo-600 cursor-pointer"
        >
          See {showFullDescription ? "less" : "more"}
        </span>
      </div>
      {showActions && (
        <div className="mt-1 flex gap-2 w-full">
          <button
            className="bg-[#4E928A] text-white rounded hover:bg-[#3d746e] "
            onClick={() => console.log("Edit", venue.id)}
          >
            Edit
          </button>
          <button
            className="bg-[#4E928A] text-white rounded hover:bg-[#3d746e]"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
      <div className="flex justify-between mt-auto pt-4">
        <div className="text-sm mr-4 text-gray-500">
          ⭐ {venue.rating} • {venue.reviews} reviews
          <span className="mx-3">👥 {venue.maxGuests} guests</span>
        </div>
        <div className="text-sm text-gray-500">
          <span>${venue.price}</span>
        </div>
      </div>
    </div>
  );
}
export default VenueCard;
