import { useState } from "react";
import useApi from "../../hooks/useApi";
import { branches } from "../../data/branches";

const TransactionModal = ({ onClose, onSuccess }) => {
  const { callApi } = useApi();

  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "",
    branch: branches[0],
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

      onSuccess(res.data || res);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-sm">

        <h2 className="text-sm font-semibold mb-3">Add Transaction</h2>

        <form onSubmit={handleSubmit} className="space-y-2">

          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="w-full border p-1 rounded text-sm"
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
            className="w-full border p-1 rounded text-sm"
          />

          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="w-full border p-1 rounded text-sm"
          />

          <select
            value={form.branch}
            onChange={(e) =>
              setForm({ ...form, branch: e.target.value })
            }
            className="w-full border p-1 rounded text-sm"
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
            className="w-full border p-1 rounded text-sm"
          />

          <input
            type="text"
            placeholder="Remark"
            value={form.remark}
            onChange={(e) =>
              setForm({ ...form, remark: e.target.value })
            }
            className="w-full border p-1 rounded text-sm"
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="border px-2 py-1 text-sm">
              Cancel
            </button>
            <button className="bg-indigo-600 text-white px-2 py-1 text-sm rounded">
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TransactionModal;