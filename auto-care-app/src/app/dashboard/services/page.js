"use client";
import React, { useEffect, useState } from "react";
import API from "@/utils/api";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // GET /api/services
    API.get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => setError(err.response?.data?.message || "Error fetching services"));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Services</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {services.map((service) => (
          <li key={service._id} className="border p-2 mb-2">
            <h2>{service.name}</h2>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
