import { useState } from "react";
import useApi from "../../hooks/useApi";
import { branches } from "../../data/branches";
import { useAuth } from "../../context/AuthContext";

const TransactionModal = ({ onClose, onSuccess }) => {
  const { callApi } = useApi();
  const { user } = useAuth()
  const { id, branch, role } = user;

  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "",
    branch: branch || "",
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
      console.log(res.data)
      onSuccess(res.data || res);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-5">

        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Add Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* Type */}
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 p-2 rounded-md text-sm"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Amount */}
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 p-2 rounded-md text-sm"
          />

          {/* Category */}
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 p-2 rounded-md text-sm"
          />
          {
            role === 'Admin' ? (<select
              value={form.branch}
              onChange={(e) =>
                setForm({ ...form, branch: e.target.value })
              }
              className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 p-2 rounded-md text-sm"
            >
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>) : (
              <div className="flex items-center gap-4 w-full border bg-gray-400 border-gray-300 p-2 rounded-md">
                 <p className="w-1/5">Branch : </p>
                <input className="" type="text" name="" value={branch} id="" readOnly />
              </div>
            )
          }


          {/* Date */}
          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 p-2 rounded-md text-sm"
          />

          {/* Remark */}
          <input
            type="text"
            placeholder="Remark"
            value={form.remark}
            onChange={(e) =>
              setForm({ ...form, remark: e.target.value })
            }
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 p-2 rounded-md text-sm"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TransactionModal;