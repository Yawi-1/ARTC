import { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      console.log(err);
    }
  };

  // Find current branch name
  const currentBranch = branches.find(
    (b) => b._id === userBranch._id
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-5">

        {/* Header */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            Add Transaction
          </h2>
          <p className="text-sm text-gray-500">
            Fill transaction details below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Type
            </label>

            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none p-2.5 rounded-lg text-sm transition"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Amount
            </label>

            <input
              type="number"
              placeholder="Enter amount"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none p-2.5 rounded-lg text-sm transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>

            <input
              type="text"
              placeholder="Enter category"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none p-2.5 rounded-lg text-sm transition"
            />
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Branch
            </label>

            {role === "Admin" ? (
              <select
                value={form.branch}
                onChange={(e) =>
                  setForm({ ...form, branch: e.target.value })
                }
                className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none p-2.5 rounded-lg text-sm transition"
                required
              >
                <option value="">Select Branch</option>

                {branches.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={currentBranch?.name || ""}
                readOnly
                className="
                  w-full
                  rounded-lg
                  border border-indigo-200
                  bg-indigo-50
                  px-3 py-2.5
                  text-sm
                  font-medium
                  text-gray-700
                  shadow-sm
                  cursor-not-allowed
                  focus:outline-none
                "
              />
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Date
            </label>

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none p-2.5 rounded-lg text-sm transition"
            />
          </div>

          {/* Remark */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Remark
            </label>

            <input
              type="text"
              placeholder="Enter remark"
              value={form.remark}
              onChange={(e) =>
                setForm({ ...form, remark: e.target.value })
              }
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none p-2.5 rounded-lg text-sm transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-md transition"
            >
              Save Transaction
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default TransactionModal;