import React, { useState, useEffect } from "react";
import { transactions as initialData } from "../data/transactions";
import { branches } from "../data/branches";
import { exportStyledExcel } from "../utils/exportExcel";

const Transactions = () => {
  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);

  const category = [...new Set(data.map((t) => t.category))];

  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "",
    branch: branches[0],
    date: "",
    remark: "",
  });

  const [filterType, setFilterType] = useState("all");
  const [filterBranch, setFilterBranch] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Add Transaction
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now().toString(),
      ...form,
      amount: Number(form.amount),
    };

    setData([newTransaction, ...data]);
    setShowModal(false);

    setForm({
      type: "income",
      amount: "",
      category: "",
      branch: branches[0],
      date: "",
      remark: "",
    });
  };

  // Filtering
  const filteredData = data.filter((t) => {
    return (
      (filterType === "all" || t.type === filterType) &&
      (filterBranch === "all" || t.branch === filterBranch) &&
      (filterCategory === "all" || t.category === filterCategory)
    );
  });

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, filterBranch, filterCategory]);

  return (
    <div className="space-y-6 p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
        >
          + Add
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border rounded-xl"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filterBranch}
          onChange={(e) => setFilterBranch(e.target.value)}
          className="px-3 py-2 border rounded-xl"
        >
          <option value="all">All Branches</option>
          {branches.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 border rounded-xl"
        >
          <option value="all">All Categories</option>
          {category.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
        {filteredData.length > 0 && <button
          onClick={() => exportStyledExcel(filteredData)}
          className="bg-green-600 text-white px-4 py-2 rounded-xl"
        >
          Export Excel
        </button>}

        <div className="ml-auto text-sm text-gray-500 self-center">
          {filteredData.length} results
        </div>

      </div>


      {/* Table */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="overflow-x-auto">
          <div className="max-h-[400px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Branch</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((t, index) => (
                    <tr key={t.id} className="border-b">
                      <td className="p-3">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="p-3">{t.date}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 text-xs rounded ${t.type === "income"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                        >
                          {t.type}
                        </span>
                      </td>
                      <td className="p-3 font-medium">
                        ₹{t.amount.toLocaleString()}
                      </td>
                      <td className="p-3">{t.category}</td>
                      <td className="p-3">{t.branch}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-400">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 border-t bg-gray-50">
            <p className="text-sm">
              Showing{" "}
              <b>{(currentPage - 1) * itemsPerPage + 1}</b> to{" "}
              <b>
                {Math.min(currentPage * itemsPerPage, filteredData.length)}
              </b>{" "}
              of <b>{filteredData.length}</b>
            </p>

            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${currentPage === i + 1
                    ? "bg-indigo-600 text-white"
                    : "border"
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal (unchanged) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
                className="w-full border p-2 rounded"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              <input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                placeholder="Category"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <select
                value={form.branch}
                onChange={(e) =>
                  setForm({ ...form, branch: e.target.value })
                }
                className="w-full border p-2 rounded"
              >
                {branches.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>

              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                placeholder="Remark"
                value={form.remark}
                onChange={(e) =>
                  setForm({ ...form, remark: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border px-3 py-1 rounded"
                >
                  Cancel
                </button>
                <button className="bg-indigo-600 text-white px-3 py-1 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;