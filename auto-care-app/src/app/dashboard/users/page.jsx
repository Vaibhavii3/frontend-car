"use client"; 

import React, { useEffect, useState } from "react";
import API from "@/utils/api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    
    API.get("/admin/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Error fetching users");
      });
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {users.map((user) => (
        <div key={user._id} className="p-2 border-b">
          <p>{user.name} — {user.email}</p>
        </div>
      ))}
    </div>
  );
}
