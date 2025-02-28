"use client";
import { useState } from "react";
import API from "@/utils/api";

export default function ConfirmationPage() {
  const [bookingId, setBookingId] = useState("");
  const [booking, setBooking] = useState(null);

  const handleGetBooking = async (e) => {
    e.preventDefault();
    try {
      const res = await API.get(`/bookings/${bookingId}`);
      setBooking(res.data);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to fetch booking");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Booking Confirmation</h1>
      <form onSubmit={handleGetBooking} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Booking ID"
          className="border p-2 w-full"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Fetch Booking
        </button>
      </form>

      {booking && (
        <div className="mt-4 border p-4 rounded">
          <p><strong>Service:</strong> {booking.service?.name}</p>
          <p><strong>Car Model:</strong> {booking.carModel}</p>
          <p><strong>Date:</strong> {booking.preferredDate}</p>
          <p><strong>Status:</strong> {booking.status}</p>
        </div>
      )}
    </div>
  );
}
