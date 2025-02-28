"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleDashboard = () => {
    // If user is logged in, navigate to /dashboard
    // or show a button to prompt them to log in first
    router.push("/dashboard");
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl text-black font-bold mb-4">CarCareApp</h1>
      <p className="mb-6 text-black">Your one-stop solution for car services!</p>
      <div className="space-x-4">
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
        <button onClick={handleRegister} className="bg-green-500 text-white px-4 py-2 rounded">
          Register
        </button>
        <button onClick={handleDashboard} className="bg-gray-500 text-white px-4 py-2 rounded">
          Dashboard
        </button>
      </div>
    </main>
  );
}
