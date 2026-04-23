export const transactions = Array.from({ length: 100 }, (_, i) => {
  const branches = ["Srinagar", "Jammu", "Anantnag", "Zirakpur"];
  const expenseCategories = ["fuel", "salary", "maintenance", "toll"];
  const incomeCategories = ["client payment"];

  const isIncome = Math.random() > 0.4;

  return {
    id: `t${i + 1}`,
    type: isIncome ? "income" : "expense",
    amount: Math.floor(Math.random() * 50000) + 5000,
    category: isIncome
      ? incomeCategories[0]
      : expenseCategories[Math.floor(Math.random() * expenseCategories.length)],
    branch: branches[Math.floor(Math.random() * branches.length)],
    client: isIncome ? `Client ${i + 1}` : undefined,
    billId: isIncome ? `b${i + 1}` : undefined,
    date: `2026-04-${String((i % 30) + 1).padStart(2, "0")}`,
    remark: isIncome ? "Payment received" : "Expense recorded",
  };
});