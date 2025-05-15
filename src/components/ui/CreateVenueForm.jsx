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

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[900px] flex space-y-4 p-4 mx-auto bg-amber-50 gap-4 rounded"
    >
      <div>
        <h2 className="text-xl font-bold text-[#2b615b]">Create Venue</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Venue Name"
          required
          className="w-full border color-[#4E928A] text-[#2b615b] px-3 py-2 rounded m-1"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="w-full color-[#4E928A] text-[#2b615b] border px-3 py-2 rounded m-1"
        />

        <input
          name="media.url"
          value={formData.media[0].url}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full color-[#4E928A] text-[#2b615b] border px-3 py-2 rounded m-1"
        />
        <input
          name="media.alt"
          value={formData.media[0].alt}
          onChange={handleChange}
          placeholder="Image Alt Text"
          className="w-full color-[#4E928A] text-[#2b615b] border px-3 py-2 rounded m-1"
        />

        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="w-full color-[#4E928A] text-[#2b615b] border px-3 py-2 rounded m-1"
        />

        <input
          name="maxGuests"
          type="number"
          value={formData.maxGuests}
          onChange={handleChange}
          placeholder="Max Guests"
          required
          className="w-full color-[#4E928A] text-[#2b615b] border px-3 py-2 rounded m-1"
        />

        <input
          name="rating"
          type="number"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating (optional)"
          className="w-full color-[#4E928A] text-[#2b615b] border px-3 py-2 rounded m-1"
        />

        <fieldset className="border p-3 rounded color-[#4E928A] text-[#2b615b] m-1">
          <legend className="text-sm font-medium color-[#4E928A] text-[#2b615b]">
            Amenities
          </legend>
          {["wifi", "parking", "breakfast", "pets"].map((key) => (
            <label key={key} className="block color-[#4E928A] text-[#2b615b] ">
              <input
                type="checkbox"
                name={`meta.${key}`}
                checked={formData.meta[key]}
                onChange={handleChange}
                className="mr-2 color-[#4E928A] text-[#2b615b] m-1 "
              />
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
          ))}
        </fieldset>
      </div>
      <div>
        <fieldset className="border p-3 rounded color-[#4E928A] text-[#2b615b] mt-11">
          <legend className="text-sm font-medium">Location</legend>
          {["address", "city", "zip", "country", "continent", "lat", "lng"].map(
            (key) => (
              <input
                key={key}
                name={`location.${key}`}
                value={formData.location[key]}
                onChange={handleChange}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="w-full border px-3 py-2 rounded my-1 color-[#4E928A] text-[#2b615b]"
              />
            )
          )}
        </fieldset>

        <button
          type="submit"
          className="bg-[#4E928A] text-white px-4 py-2 rounded hover:bg-[#3d746e] m-2"
        >
          Submit Venue
        </button>
      </div>
    </form>
  );
};

export default CreateVenueForm;
