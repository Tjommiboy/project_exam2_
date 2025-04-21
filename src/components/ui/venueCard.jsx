import { Link } from "react-router-dom";

function VenueCard({ venue }) {
  return (
    <div className="flex flex-col border bg-white rounded-md p-4 shadow-sm h-96">
      <Link to={`/singleVenue/${venue.id}`}>
        <img
          src={
            venue.media?.[0]?.url ||
            "https://images.unsplash.com/photo-1678225105802-01949b1dff0d?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={venue.media?.[0]?.alt || venue.name}
          className="w-full h-48 object-cover mb-2 rounded"
        />
        <h2 className="text-xl text-gray-500 font-medium">{venue.name}</h2>
        <p className="text-sm text-gray-500">
          {venue.location.city}, {venue.location.country}
        </p>
        <p className="text-base text-gray-500 mt-1">
          {venue.description?.slice(0, 40)}...
        </p>
      </Link>
      {/* Bottom section pushed to bottom */}
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
