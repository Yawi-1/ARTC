export const calculateTotals = (transactions, branch = null) => {
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (!branch || t.branch === branch) {
      if (t.type === "income") income += t.amount;
      if (t.type === "expense") expense += t.amount;
    }
  });

  return {
    income,
    expense,
    profit: income - expense,
  };
};