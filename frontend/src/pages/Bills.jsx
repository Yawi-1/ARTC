import React, { useState } from "react";
import { bills as initialBills } from "../data/bills";
import { transactions as initialTransactions } from "../data/transactions";
import { branches } from "../data/branches";

const Bills = () => {
  const [bills, setBills] = useState(initialBills);
  const [transactions, setTransactions] = useState(initialTransactions);

  const [showBillModal, setShowBillModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const [billForm, setBillForm] = useState({
    client: "",
    branch: branches[0],
    totalAmount: "",
    month: "",
  });

  const [paymentAmount, setPaymentAmount] = useState("");

  // 🔹 Calculate bill data
  const getBillData = (bill) => {
    const payments = transactions.filter(t => t.billId === bill.id);
    const paid = payments.reduce((sum, t) => sum + t.amount, 0);
    const pending = bill.totalAmount - paid;

    let status = "Pending";
    if (paid > 0 && paid < bill.totalAmount) status = "Partial";
    if (paid >= bill.totalAmount) status = "Paid";

    return { paid, pending, status };
  };

  // 🔹 Create Bill
  const handleCreateBill = (e) => {
    e.preventDefault();

    const newBill = {
      id: Date.now().toString(),
      ...billForm,
      totalAmount: Number(billForm.totalAmount),
    };

    setBills([newBill, ...bills]);
    setShowBillModal(false);

    setBillForm({
      client: "",
      branch: branches[0],
      totalAmount: "",
      month: "",
    });
  };

  // 🔹 Add Payment (creates transaction)
  const handleAddPayment = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now().toString(),
      type: "income",
      amount: Number(paymentAmount),
      branch: selectedBill.branch,
      client: selectedBill.client,
      billId: selectedBill.id,
      date: new Date().toISOString().split("T")[0],
      category: "client payment",
    };

    setTransactions([newTransaction, ...transactions]);
    setShowPaymentModal(false);
    setPaymentAmount("");
  };

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Bills</h1>
        <button
          onClick={() => setShowBillModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Bill
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Branch</th>
              <th className="p-3 text-left">Month</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Paid</th>
              <th className="p-3 text-left">Pending</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {bills.map((bill) => {
              const { paid, pending, status } = getBillData(bill);

              return (
                <tr key={bill.id} className="border-t">
                  <td className="p-3">{bill.client}</td>
                  <td className="p-3">{bill.branch}</td>
                  <td className="p-3">{bill.month}</td>
                  <td className="p-3">₹{bill.totalAmount}</td>
                  <td className="p-3 text-green-600">₹{paid}</td>
                  <td className="p-3 text-red-500">₹{pending}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        status === "Paid"
                          ? "bg-green-100 text-green-600"
                          : status === "Partial"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {status}
                    </span>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => {
                        setSelectedBill(bill);
                        setShowPaymentModal(true);
                      }}
                      className="text-blue-600"
                    >
                      Add Payment
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 🔹 Create Bill Modal */}
      {showBillModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-full max-w-md">
            <h2 className="text-lg font-semibold mb-3">Create Bill</h2>

            <form onSubmit={handleCreateBill} className="space-y-3">
              <input
                type="text"
                placeholder="Client Name"
                value={billForm.client}
                onChange={(e) =>
                  setBillForm({ ...billForm, client: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />

              <select
                value={billForm.branch}
                onChange={(e) =>
                  setBillForm({ ...billForm, branch: e.target.value })
                }
                className="w-full border p-2 rounded"
              >
                {branches.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>

              <input
                type="month"
                value={billForm.month}
                onChange={(e) =>
                  setBillForm({ ...billForm, month: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="number"
                placeholder="Total Amount"
                value={billForm.totalAmount}
                onChange={(e) =>
                  setBillForm({ ...billForm, totalAmount: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowBillModal(false)}
                  className="border px-3 py-2 rounded"
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-3 py-2 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔹 Payment Modal */}
      {showPaymentModal && selectedBill && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded-xl w-full max-w-md">
            <h2 className="text-lg font-semibold mb-3">
              Add Payment - {selectedBill.client}
            </h2>

            <form onSubmit={handleAddPayment} className="space-y-3">
              <input
                type="number"
                placeholder="Amount"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="border px-3 py-2 rounded"
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-3 py-2 rounded">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bills;