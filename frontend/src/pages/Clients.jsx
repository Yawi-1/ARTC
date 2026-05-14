import React, { useState } from "react";
import { useClient } from "../context/ClientContext";
import useApi from "../hooks/useApi";
import { useBranch } from "../context/BranchContext";
import { useAuth } from '../context/AuthContext'

import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Plus,
  Pencil,
  Save,
  X,
} from "lucide-react";

const Clients = () => {
  const { clients, setClients } = useClient();
  const { callApi, loading } = useApi();
  const { branches } = useBranch();
  const { user } = useAuth()
  const [form, setForm] = useState({
    name: "",
    address: "",
    contact: "",
    email: "",
    branch: "",
  });

  // Edit States
  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    branch: "",
  });

  // Add Client
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      return alert("Please enter email and name!");
    }

    const res = await callApi({
      method: "POST",
      url: "/clients",
      data: form,
    });

    if (res?.data) {
      alert("Client added successfully");

      setClients((prev) => [res.data, ...prev]);

      setForm({
        name: "",
        address: "",
        contact: "",
        email: "",
        branch: "",
      });
    }
  };

  // Open Edit Mode
  const handleEdit = (client) => {
    setEditingId(client._id);

    setEditForm({
      name: client.name || "",
      email: client.email || "",
      contact: client.contact || "",
      address: client.address || "",
      branch: client?.branch?._id || "",
    });
  };

  // Update Client
  const handleUpdate = async (id) => {
    if (!editForm.branch) {
      return alert('Please select the branch')
    }
    try {
      const res = await callApi({
        method: "PUT",
        url: `/clients/${id}`,
        data: editForm,
      });

      if (res?.data) {
        setClients((prev) =>
          prev.map((c) => (c._id === id ? res.data : c))
        );

        setEditingId(null);

        alert("Client updated successfully");
      }
    } catch (error) {
      alert(error.response.data.message)
    }

  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Client Management
          </h1>

          <p className="text-gray-500 mt-1">
            Add and manage all your clients
          </p>
        </div>

        <div className="bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-lg">
          <p className="text-sm">Total Clients</p>

          <h2 className="text-2xl font-bold">{clients.length}</h2>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <Plus className="text-indigo-600" size={22} />

          <h2 className="text-xl font-semibold text-gray-800">
            Add New Client
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Client Name
            </label>

            <div className="flex items-center border border-gray-300 rounded-xl px-3 focus-within:ring-2 focus-within:ring-indigo-500 bg-gray-50">
              <User size={18} className="text-gray-400" />

              <input
                type="text"
                placeholder="Enter client name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full p-3 outline-none bg-transparent"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Email
            </label>

            <div className="flex items-center border border-gray-300 rounded-xl px-3 focus-within:ring-2 focus-within:ring-indigo-500 bg-gray-50">
              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full p-3 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Contact
            </label>

            <div className="flex items-center border border-gray-300 rounded-xl px-3 focus-within:ring-2 focus-within:ring-indigo-500 bg-gray-50">
              <Phone size={18} className="text-gray-400" />

              <input
                type="text"
                placeholder="Enter contact number"
                value={form.contact}
                onChange={(e) =>
                  setForm({ ...form, contact: e.target.value })
                }
                className="w-full p-3 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Address
            </label>

            <div className="flex items-center border border-gray-300 rounded-xl px-3 focus-within:ring-2 focus-within:ring-indigo-500 bg-gray-50">
              <MapPin size={18} className="text-gray-400" />

              <input
                type="text"
                placeholder="Enter address"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
                className="w-full p-3 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Branch */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              Branch
            </label>

            <div className="flex items-center border border-gray-300 rounded-xl px-3 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
              <Building2 size={18} className="text-gray-400" />

              <select
                value={form.branch}
                onChange={(e) =>
                  setForm({ ...form, branch: e.target.value })
                }
                className="w-full p-3 outline-none bg-transparent text-gray-700"
                required
              >
                <option value="">Select Branch</option>

                {branches?.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Button */}
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 text-white font-semibold py-3 rounded-xl shadow-md"
            >
              {loading ? "Adding..." : "Add Client"}
            </button>
          </div>
        </form>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients?.map((c) => (
          <div
            key={c._id}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border border-gray-100"
          >
            {/* Top */}
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 text-xl font-bold">
                {c?.name?.charAt(0)?.toUpperCase()}
              </div>
              {(user?.branch?.name === c.branch.name || user?.role === 'Admin') && <div>
                {editingId === c._id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(c._id)}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-xl"
                    >
                      <Save size={16} />
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit(c)}
                    className="bg-indigo-100 hover:bg-indigo-200 text-indigo-600 p-2 rounded-xl"
                  >
                    <Pencil size={16} />
                  </button>
                )}
              </div>}


            </div>


            {editingId === c._id ? (
              <div className="space-y-3 mt-5">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      name: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-3"
                  placeholder="Name"
                />

                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      email: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-3"
                  placeholder="Email"
                />

                <input
                  type="text"
                  value={editForm.contact}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      contact: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-3"
                  placeholder="Contact"
                />

                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      address: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-3"
                  placeholder="Address"
                />

                <select
                  value={editForm.branch}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      branch: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-3"
                >
                  <option value="">Select Branch</option>

                  {branches?.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-800 mt-4">
                  {c.name}
                </h2>

                <div className="space-y-2 mt-4 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <Mail size={16} />
                    {c.email || "No email"}
                  </p>

                  <p className="flex items-center gap-2">
                    <Phone size={16} />
                    {c.contact || "No contact"}
                  </p>

                  <p className="flex items-center gap-2">
                    <MapPin size={16} />
                    {c.address || "No address"}
                  </p>

                  <p className="flex items-center gap-2">
                    <Building2 size={16} />
                    {c?.branch?.name || "No branch"}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Empty */}
      {clients.length === 0 && (
        <div className="bg-white rounded-3xl shadow-md p-10 text-center mt-6">
          <h2 className="text-xl font-semibold text-gray-700">
            No Clients Found
          </h2>

          <p className="text-gray-500 mt-2">
            Add your first client to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default Clients;