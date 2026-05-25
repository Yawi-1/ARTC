// TransactionModal.jsx
import { useState } from "react";
import { X, DollarSign, Tag, Calendar, FileText, Building2, TrendingUp, TrendingDown } from "lucide-react";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../context/AuthContext";
import { useBranch } from "../../context/BranchContext";

const TransactionModal = ({ onClose, onSuccess }) => {
  const { callApi } = useApi();
  const { user } = useAuth();
  const { branches } = useBranch();
  const { branch: userBranch, role } = user;

  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    branch: role === "Admin" ? "" : userBranch,
    date: "",
    remark: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await callApi({
        method: "POST",
        url: "/transactions",
        data: {
          ...form,
          amount: Number(form.amount),
        },
      });
      onSuccess(res.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create transaction");
    } finally {
      setLoading(false);
    }
  };

  const currentBranch = branches.find((b) => b._id === userBranch?._id);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Add Transaction</h2>
            <p className="text-indigo-100 text-sm mt-0.5">Fill transaction details below</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Type
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, type: "income" })}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  form.type === "income"
                    ? "bg-green-500 text-white shadow-md shadow-green-200 scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Income
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, type: "expense" })}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  form.type === "expense"
                    ? "bg-red-500 text-white shadow-md shadow-red-200 scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <TrendingDown className="w-4 h-4" />
                Expense
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Amount
              </span>
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none p-3 rounded-xl text-sm transition-all"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Category
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none p-3 rounded-xl text-sm transition-all"
              required
            />
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Branch
              </span>
            </label>
            {role === "Admin" ? (
              <select
                value={form.branch}
                onChange={(e) => setForm({ ...form, branch: e.target.value })}
                className="w-full border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none p-3 rounded-xl text-sm transition-all cursor-pointer"
                required
              >
                <option value="">Select Branch</option>
                {branches.map((b) => (
                  <option key={b._id} value={b._id}>{b.name}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={currentBranch?.name || ""}
                readOnly
                className="w-full rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-3 text-sm font-medium text-gray-700 shadow-sm cursor-not-allowed"
              />
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date
              </span>
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none p-3 rounded-xl text-sm transition-all"
              required
            />
          </div>

          {/* Remark */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Remark
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter remark (optional)"
              value={form.remark}
              onChange={(e) => setForm({ ...form, remark: e.target.value })}
              className="w-full border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none p-3 rounded-xl text-sm transition-all"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Save Transaction"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;