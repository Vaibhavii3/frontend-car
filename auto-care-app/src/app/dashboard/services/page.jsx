"use client";

import { useState, useEffect } from "react";
import API from "@/utils/api";

export default function AdminDashboard() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    provider: "",
    image: "",
  });
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Remove the window check
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await API.get("/services", { withCredentials: true });
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching services:", err.response?.data || err.message);
      setError("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async () => {
    try {
      const res = await API.post("/services", newService, { withCredentials: true });
      setServices([...services, res.data]);
      setNewService({ name: "", description: "", price: "", category: "", provider: "", image: "" });
    } catch (err) {
      console.error("Error adding service:", err.response?.data || err.message);
      setError("Failed to add service. Check permissions.");
    }
  };

  const handleDeleteService = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await API.delete(`/services/${id}`, { withCredentials: true });
      setServices(services.filter(service => service._id !== id));
    } catch (err) {
      console.error("Error deleting service:", err.response?.data || err.message);
      setError("Failed to delete service.");
    }
  };

  const handleEditService = async () => {
    try {
      const res = await API.put(`/services/${editingService._id}`, editingService, { withCredentials: true });
      setServices(services.map(service => (service._id === res.data._id ? res.data : service)));
      setEditingService(null);
    } catch (err) {
      console.error("Error updating service:", err.response?.data || err.message);
      setError("Failed to update service.");
    }
  };

  // Use this for the loading state instead of an early return
  if (loading) return <div className="p-5"><p>Loading services...</p></div>;
  if (error) return <div className="p-5"><p className="text-red-500">{error}</p></div>;

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4 text-black">Admin Dashboard</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-black">Add Service</h3>
        <div className="flex flex-col space-y-2">
          <input type="text" placeholder="Name" className="p-2 border rounded text-black" value={newService.name} onChange={e => setNewService({ ...newService, name: e.target.value })} />
          <input type="text" placeholder="Description" className="p-2 border rounded text-black" value={newService.description} onChange={e => setNewService({ ...newService, description: e.target.value })} />
          <input type="number" placeholder="Price" className="p-2 border rounded text-black" value={newService.price} onChange={e => setNewService({ ...newService, price: e.target.value })} />
          <input type="text" placeholder="Category" className="p-2 border rounded text-black" value={newService.category} onChange={e => setNewService({ ...newService, category: e.target.value })} />
          <input type="text" placeholder="Provider" className="p-2 border rounded text-black" value={newService.provider} onChange={e => setNewService({ ...newService, provider: e.target.value })} />
          <input type="text" placeholder="Image URL" className="p-2 border rounded text-black" value={newService.image} onChange={e => setNewService({ ...newService, image: e.target.value })} />
          <button onClick={handleAddService} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Service</button>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">Services List</h3>
      {services.length === 0 ? <p>No services available.</p> : (
        <div className="space-y-4">
          {services.map(service => (
            <div key={service._id} className="border p-4 rounded">
              <h4 className="font-semibold text-black">{service.name}</h4>
              <p className="text-black">{service.description}</p>
              <p className="text-black">Price: ${service.price}</p>
              <p className="text-black">Provider: {service.provider}</p>
              <div className="mt-2 space-x-2">
                <button onClick={() => setEditingService(service)} className="px-3 py-1 bg-gray-200 text-black rounded hover:bg-gray-300">Edit</button>
                <button onClick={() => handleDeleteService(service._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4 text-black">Edit Service</h3>
            <div className="flex flex-col space-y-2">
              <input type="text" className="p-2 border rounded text-black" value={editingService.name} onChange={e => setEditingService({ ...editingService, name: e.target.value })} />
              <input type="text" className="p-2 border rounded text-black" value={editingService.description} onChange={e => setEditingService({ ...editingService, description: e.target.value })} />
              <input type="number" className="p-2 border rounded text-black" value={editingService.price} onChange={e => setEditingService({ ...editingService, price: e.target.value })} />
              <input type="text" className="p-2 border rounded text-black" value={editingService.category} onChange={e => setEditingService({ ...editingService, category: e.target.value })} />
              <input type="text" className="p-2 border rounded text-black" value={editingService.provider} onChange={e => setEditingService({ ...editingService, provider: e.target.value })} />
              <input type="text" className="p-2 border rounded text-black" value={editingService.image} onChange={e => setEditingService({ ...editingService, image: e.target.value })} />
              <div className="flex space-x-2">
                <button onClick={handleEditService} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save Changes</button>
                <button onClick={() => setEditingService(null)} className="p-2 bg-gray-300 text-black rounded hover:bg-gray-400">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}