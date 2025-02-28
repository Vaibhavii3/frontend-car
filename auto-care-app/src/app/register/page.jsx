"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/utils/api";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", formData);
      // Redirect to login or directly log them in
      router.push("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center text-black">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="border p-2 mb-4 w-full text-black"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 mb-4 w-full text-black"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 mb-4 w-full text-black"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          name="phone"
          type="text"
          placeholder="Phone"
          className="border p-2 mb-4 w-full text-black"
          value={formData.phone}
          onChange={handleChange}
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
          Register
        </button>
      </form>
    </main>
  );
}
