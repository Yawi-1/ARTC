import React, { useState } from "react";

const Payments = () => {
  const [payments, setPayments] = useState([
    {
      id: "p1",
      client: "ABC Logistics",
      amount: 50000,
      paid: 30000,
      status: "partial",
      date: "2026-04-01",
    },
    {
      id: "p2",
      client: "XYZ Traders",
      amount: 30000,
      paid: 30000,
      status: "paid",
      date: "2026-04-02",
    },
  ]);

  const [filterClient, setFilterClient] = useState("all");

  const clients = [...new Set(payments.map((p) => p.client))];

  const filtered = payments.filter(
    (p) => filterClient === "all" || p.client === filterClient
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">Payments</h1>

      {/* Filter */}
      <select
        value={filterClient}
        onChange={(e) => setFilterClient(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="all">All Clients</option>
        {clients.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Paid</th>
              <th className="p-3 text-left">Pending</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="p-3">{p.client}</td>
                  <td className="p-3">₹{p.amount}</td>
                  <td className="p-3 text-green-600">₹{p.paid}</td>
                  <td className="p-3 text-red-500">
                    ₹{p.amount - p.paid}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        p.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : p.status === "partial"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;