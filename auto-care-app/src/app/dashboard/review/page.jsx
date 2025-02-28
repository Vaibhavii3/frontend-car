"use client";
import { useState } from "react";
import API from "@/utils/api";

export default function ReviewPage() {
  const [bookingId, setBookingId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      await API.post("/reviews", { bookingId, rating, comment });
      setMessage("Review submitted!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Review & Feedback</h1>
      <form onSubmit={handleReview} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Booking ID"
          className="border p-2 w-full"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
        />
        <select
          className="border p-2 w-full"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <textarea
          placeholder="Comment"
          className="border p-2 w-full"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit Review
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
