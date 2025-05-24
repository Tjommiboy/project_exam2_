import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { VenueDelete } from "../../api/VenueDelete";
import { bookingDelete } from "../../api/bookingDelete";
import { toast } from "react-toastify";

function VenueCard({
  venue,
  showActions,
  onDelete,
  onClick,
  disableLink = false,
  cardType = "venue",
  booking,
}) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  const DESCRIPTION_LIMIT = 70;
  const fullDescription = venue.description || "";
  const isLongDescription = fullDescription.length > DESCRIPTION_LIMIT;
  const description =
    !showFullDescription && isLongDescription
      ? fullDescription.substring(0, DESCRIPTION_LIMIT) + "..."
      : fullDescription;

  const handleEdit = (e) => {
    e.stopPropagation();
    if (cardType === "venue") {
      navigate(`/venues/${venue.id}/edit`);
    } else if (cardType === "booking") {
      navigate(`/bookings/${booking.id}/edit`);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${cardType}?`
    );
    if (!confirmed) return;

    try {
      if (cardType === "venue") {
        await VenueDelete(venue.id);
        toast.success("Venue deleted successfully");
        onDelete?.(venue.id);
      } else if (cardType === "booking") {
        await bookingDelete(booking.id);
        toast.success("Booking deleted successfully");
        onDelete?.(booking.id);
      }
    } catch (error) {
      console.error(`Failed to delete ${cardType}`, error);
      toast.error(`Failed to delete ${cardType}`);
    }
  };

  const cardContent = (
    <>
      <img
        src={
          venue.media?.[0]?.url ||
          "https://images.unsplash.com/photo-1678225105802-01949b1dff0d?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt={venue.media?.[0]?.alt || venue.name}
        className="w-full h-48 object-cover mb-2 rounded"
      />
      <h2 className="text-xl text-gray-500 font-medium break-words">
        {venue.name.length > 16 ? venue.name.slice(0, 16) + "..." : venue.name}
      </h2>
      <p className="text-sm text-gray-500">
        {venue.location?.city ?? "Unknown City"},{" "}
        {venue.location?.country ?? "Unknown Country"}
      </p>
      <p className="text-base text-gray-500 mt-1 break-words">{description}</p>
    </>
  );

  return (
    <div
      onClick={() => onClick?.(venue)}
      className="flex flex-col border bg-white rounded-md p-4 shadow-sm hover:shadow-lg transition-shadow duration-300 hover:bg-amber-50"
    >
      {disableLink ? (
        cardContent
      ) : (
        <Link to={`/singleVenue/${venue.id}`}>{cardContent}</Link>
      )}

      {isLongDescription && (
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
      )}

      {showActions && (
        <div className="mt-1 flex gap-2 w-full">
          <button
            className="bg-[#4E928A] text-white px-3 py-1 rounded hover:bg-[#3d746e]"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-[#4E928A] text-white px-3 py-1 rounded hover:bg-[#3d746e]"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}

      <div className="flex justify-between mt-auto pt-4 text-sm text-gray-500">
        <div>
          ⭐ {venue.rating ?? 0} • {venue.reviews ?? 0} reviews
          <span className="mx-3">👥 {venue.maxGuests ?? 1} guests</span>
        </div>
        <div>${venue.price ?? 0}</div>
      </div>
    </div>
  );
}

export default VenueCard;
