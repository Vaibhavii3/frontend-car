"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold mb-4">CarCare Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-2"><a href="/dashboard" className="hover:underline">Home</a></li>
            <li className="mb-2"><a href="/dashboard/services" className="hover:underline">Services</a></li>
            <li className="mb-2"><a href="/dashboard/booking" className="hover:underline">Booking</a></li>
            <li className="mb-2"><a href="/dashboard/payment" className="hover:underline">Payment</a></li>
            <li className="mb-2"><a href="/dashboard/confirmation" className="hover:underline">Confirmation</a></li>
            <li className="mb-2"><a href="/dashboard/tracking" className="hover:underline">Tracking</a></li>
            <li className="mb-2"><a href="/dashboard/review" className="hover:underline">Review</a></li>
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-5">{children}</main>
    </div>
  );
}
