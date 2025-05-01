import React, { useState } from "react";

const CreateVenueForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    media: [{ url: "", alt: "" }],
    price: "",
    maxGuests: "",
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: "",
      lng: "",
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("meta.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        meta: {
          ...prev.meta,
          [key]: checked,
        },
      }));
    } else if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [key]: value,
        },
      }));
    } else if (name.startsWith("media.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        media: [{ ...prev.media[0], [key]: value }],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert strings to numbers where needed
    const payload = {
      ...formData,
      price: Number(formData.price),
      maxGuests: Number(formData.maxGuests),
      rating: Number(formData.rating),
      location: {
        ...formData.location,
        lat: Number(formData.location.lat),
        lng: Number(formData.location.lng),
      },
    };

    onSubmit(payload); // Send this to your API handler
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-[#4E928A]">Create Venue</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Venue Name"
        required
        className="w-full border px-3 py-2 rounded"
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="media.url"
        value={formData.media[0].url}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        name="media.alt"
        value={formData.media[0].alt}
        onChange={handleChange}
        placeholder="Image Alt Text"
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="maxGuests"
        type="number"
        value={formData.maxGuests}
        onChange={handleChange}
        placeholder="Max Guests"
        required
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="rating"
        type="number"
        value={formData.rating}
        onChange={handleChange}
        placeholder="Rating (optional)"
        className="w-full border px-3 py-2 rounded"
      />

      <fieldset className="border p-3 rounded">
        <legend className="text-sm font-medium">Amenities</legend>
        {["wifi", "parking", "breakfast", "pets"].map((key) => (
          <label key={key} className="block">
            <input
              type="checkbox"
              name={`meta.${key}`}
              checked={formData.meta[key]}
              onChange={handleChange}
              className="mr-2"
            />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        ))}
      </fieldset>

      <fieldset className="border p-3 rounded">
        <legend className="text-sm font-medium">Location</legend>
        {["address", "city", "zip", "country", "continent", "lat", "lng"].map(
          (key) => (
            <input
              key={key}
              name={`location.${key}`}
              value={formData.location[key]}
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="w-full border px-3 py-2 rounded my-1"
            />
          )
        )}
      </fieldset>

      <button
        type="submit"
        className="bg-[#4E928A] text-white px-4 py-2 rounded hover:bg-[#3d746e]"
      >
        Submit Venue
      </button>
    </form>
  );
};

export default CreateVenueForm;
