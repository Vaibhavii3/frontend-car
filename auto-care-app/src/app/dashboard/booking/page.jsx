"use client";
import { useState } from "react";
import API from "@/utils/api";

export default function BookingPage() {
  const [serviceId, setServiceId] = useState("");
  const [carModel, setCarModel] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/bookings", {
        serviceId,
        carModel,
        preferredDate,
        address
      });
      setMessage("Booking created successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Schedule Booking</h1>
      <form onSubmit={handleBooking} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Service ID"
          className="border p-2 w-full"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Car Model"
          className="border p-2 w-full"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 w-full"
          value={preferredDate}
          onChange={(e) => setPreferredDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          className="border p-2 w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Book Now
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
