import React, { useState } from "react";
import api from "../api";

export default function RequestForm() {
  const [form, setForm] = useState({
    customer_name: "",
    location: "",
    note: "",
    latitude: null,
    longitude: null
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📍 Get current location via backend (NO CORS ISSUES)
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      try {
        const res = await api.get(
          `/reverse-geocode?lat=${lat}&lng=${lng}`
        );

        const data = res.data;

        const address = data.display_name || "Location found";

        setForm(prev => ({
          ...prev,
          location: address,
          latitude: lat,
          longitude: lng
        }));

      } catch (error) {
        console.error(error);

        setForm(prev => ({
          ...prev,
          location: `Lat: ${lat}, Lng: ${lng}`,
          latitude: lat,
          longitude: lng
        }));
      }

    }, () => alert("Location permission denied"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/requests", form);

      setMsg("Request submitted successfully");

      setForm({
        customer_name: "",
        location: "",
        note: "",
        latitude: null,
        longitude: null
      });

    } catch {
      setMsg("Error submitting request");
    }
  };

  return (
  <div className="form-wrapper">
    <div className="form-card">
      <h2>Create Towing Request</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="customer_name"
          placeholder="Customer Name"
          value={form.customer_name}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <button
          type="button"
          className="location-btn"
          onClick={getCurrentLocation}
        >
          📍 Use Current Address
        </button>

        <textarea
          name="note"
          placeholder="Additional Notes"
          value={form.note}
          onChange={handleChange}
        />

        <button type="submit" className="submit-btn">
          Submit Request
        </button>
      </form>

      {msg && (
        <div className={
          msg.includes("successfully")
            ? "success-msg"
            : "error-msg"
        }>
          {msg}
        </div>
      )}
    </div>
  </div>
);

}
