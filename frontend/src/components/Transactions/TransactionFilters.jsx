import { branches } from "../../data/branches";

const TransactionFilters = ({ data, filters, setFilters }) => {
  const categories = [...new Set(data.map((t) => t.category))];

  return (
    <div className="flex gap-2 flex-wrap">

      <select
        value={filters.type}
        onChange={(e) =>
          setFilters({ ...filters, type: e.target.value })
        }
        className="px-2 py-1 border rounded text-sm"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={filters.branch}
        onChange={(e) =>
          setFilters({ ...filters, branch: e.target.value })
        }
        className="px-2 py-1 border rounded text-sm"
      >
        <option value="all">All Branches</option>
        {branches.map((b) => (
          <option key={b}>{b}</option>
        ))}
      </select>

      <select
        value={filters.category}
        onChange={(e) =>
          setFilters({ ...filters, category: e.target.value })
        }
        className="px-2 py-1 border rounded text-sm"
      >
        <option value="all">All Categories</option>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
    </div>
  );
};

export default TransactionFilters;