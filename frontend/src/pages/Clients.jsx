import React, { useState } from "react";

const Clients = () => {
  const [clients, setClients] = useState([
    { id: "c1", name: "ABC Logistics", phone: "9876543210", city: "Delhi" },
    { id: "c2", name: "XYZ Traders", phone: "9123456780", city: "Jammu" },
  ]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClient = {
      id: Date.now().toString(),
      ...form,
    };

    setClients([newClient, ...clients]);
    setForm({ name: "", phone: "", city: "" });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">Clients</h1>

      {/* Add Client */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl shadow flex gap-3 flex-wrap"
      >
        <input
          placeholder="Client Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="border p-2 rounded"
        />

        <button className="bg-indigo-600 text-white px-4 rounded">
          Add
        </button>
      </form>

      {/* Clients List */}
      <div className="grid md:grid-cols-3 gap-4">
        {clients.map((c) => (
          <div key={c.id} className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold text-lg">{c.name}</h2>
            <p className="text-sm text-gray-500">{c.phone}</p>
            <p className="text-sm text-gray-500">{c.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;