"use client";
import React, { useEffect, useState } from "react";
import API from "@/utils/api";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // For Admin: GET /api/admin/bookings
    API.get("/admin/bookings")
      .then((res) => setOrders(res.data))
      .catch((err) => setError(err.response?.data?.message || "Error fetching orders"));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {orders.map((order) => (
          <li key={order._id} className="border p-2 mb-2">
            <p>Service Type: {order.serviceType}</p>
            <p>Status: {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
