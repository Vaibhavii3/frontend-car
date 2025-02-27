"use client";
import { useState } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`w-64 bg-gray-900 text-white p-5 ${menuOpen ? "block" : "hidden"} md:block`}>
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <nav className="mt-5">
          <ul>
            <li className="py-2 px-4 rounded hover:bg-gray-700">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="py-2 px-4 rounded hover:bg-gray-700">
              <Link href="/dashboard/users">Users</Link>
            </li>
            <li className="py-2 px-4 rounded hover:bg-gray-700">
              <Link href="/dashboard/services">Services</Link>
            </li>
            <li className="py-2 px-4 rounded hover:bg-gray-700">
              <Link href="/dashboard/orders">Orders</Link>
            </li>
            <li className="py-2 px-4 rounded hover:bg-gray-700">
              <Link href="/dashboard/payments">Payments</Link>
            </li>
            <li className="py-2 px-4 rounded hover:bg-gray-700">
              <Link href="/dashboard/analytics">Reports</Link>
            </li>
            <li className="py-2 px-4 rounded hover:bg-gray-700">
              <Link href="/dashboard/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5">
        <header className="mb-5 bg-white shadow p-4 rounded flex justify-between">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <button className="md:hidden p-2 bg-gray-700 text-white rounded" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </header>
        {children}
      </main>
    </div>
  );
}
