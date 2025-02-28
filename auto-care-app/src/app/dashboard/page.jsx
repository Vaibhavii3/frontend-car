"use client";
import { useState, useEffect } from "react";

import API from "@/utils/api";

export default function DashboardHome() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Example: fetch service categories or stats
    API.get("/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-black">Dashboard</h1>
      <p className="mb-4 text-black">Select a service category to proceed:</p>
      <div className="grid grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service._id} className="p-4 border border-black rounded shadow">
            <h2 className="text-lg text-black font-bold">{service.name}</h2>
            <p>{service.description}</p>
            <p className="text-blue-500 mt-2">${service.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
