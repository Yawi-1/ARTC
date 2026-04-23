import React from "react";
import { transactions } from "../data/transactions";
import { branches } from "../data/branches";
import { calculateTotals } from "../utils/calculations";


const Card = ({ title, income, expense, profit }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-150 overflow-hidden">
      <div className="px-5 pt-4 pb-2 border-b border-gray-50">
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-gray-500">Income</span>
          <span className="text-lg font-semibold text-emerald-600">₹{income.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-gray-500">Expense</span>
          <span className="text-lg font-semibold text-rose-600">₹{expense.toLocaleString()}</span>
        </div>
        <div className="pt-2 border-t border-gray-100 flex justify-between items-baseline">
          <span className="text-sm font-medium text-gray-600">Net Profit</span>
          <span className={`text-lg font-bold ${profit >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
            ₹{profit.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-150">
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );
};

const Dashboard = () => {
  const overall = calculateTotals(transactions);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const totalTransactions = transactions.length;
  const incomeCount = transactions.filter(t => t.type === "income").length;
  const expenseCount = transactions.filter(t => t.type === "expense").length;

  return (
    <div className="space-y-8 p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Quick Stats Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard label="Total Transactions" value={totalTransactions} />
          <StatCard label="Income Entries" value={incomeCount} />
          <StatCard label="Expense Entries" value={expenseCount} />
        </div>
      </div>

     
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Overall Summary</h2>
        <Card
          title="All Branches Combined"
          income={overall.income}
          expense={overall.expense}
          profit={overall.profit}
        />
      </div>

     
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Branch Performance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {branches.map((branch) => {
            const data = calculateTotals(transactions, branch);
            return (
              <Card
                key={branch}
                title={branch}
                income={data.income}
                expense={data.expense}
                profit={data.profit}
              />
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Recent Transactions</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
            Last 5 entries
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left p-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Type</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Amount</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Branch</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((t) => (
                  <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors duration-100">
                    <td className="p-4 text-gray-700">{t.date}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        t.type === "income"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      }`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-gray-800">₹{t.amount.toLocaleString()}</td>
                    <td className="p-4 text-gray-600">{t.branch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;