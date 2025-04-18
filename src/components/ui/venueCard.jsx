function VenueCard({ venue }) {
  return (
    <div className="border bg-white rounded-md p-4 shadow-sm">
      <img
        src={
          venue.media?.[0]?.url ||
          "https://images.unsplash.com/photo-1678225105802-01949b1dff0d?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt={venue.media?.[0]?.alt || venue.name}
        className="w-full h-48 object-cover  mb-2"
      />
      <h2 className="text-lg text-gray-500 font-semibold">{venue.name}</h2>
      <p className="text-sm text-gray-500">
        {venue.location.city}, {venue.location.country}
      </p>
      <p className="text-sm mt-1">{venue.description?.slice(0, 80)}...</p>
      <div className="mt-2 text-sm  text-gray-500 ">
        $ ${venue.price} • 👥 {venue.maxGuests} guests
      </div>
    </div>
  );
}

export default VenueCard;
