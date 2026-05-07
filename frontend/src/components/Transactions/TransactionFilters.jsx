import { exportStyledExcel } from '../../utils/exportExcel'
import { useBranch } from '../../context/BranchContext'
const TransactionFilters = ({ data, filters, setFilters, setCurrentPage }) => {
  const categories = [...new Set(data.map(d => d.category))]
  const { branches } = useBranch()

  return (
    <div className="flex gap-2 flex-wrap">

      <select
        value={filters.type}
        onChange={(e) => {
          setFilters({ ...filters, type: e.target.value });
          setCurrentPage(1);
        }}
        className="px-2 py-1 border rounded text-sm"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        value={filters.branch}
        onChange={(e) => {
          setFilters({ ...filters, branch: e.target.value });
          setCurrentPage(1);
        }}
        className="px-2 py-1 border rounded text-sm"
      >
        <option value="all">All Branches</option>
        {branches.map((b) => (
          <option key={b} value={b._id}>{b.name}</option>
        ))}
      </select>

      <select
        value={filters.category}
        onChange={(e) => {
          setFilters({ ...filters, category: e.target.value });
          setCurrentPage(1);
        }}
        className="px-2 py-1 border rounded text-sm"
      >
        <option value="all">All Categories</option>
        {
          categories.map((c, i) => <option key={i} value={c} className="capitalize">{c}</option>)
        }

      </select>
      <button className="px-4 py-2 bg-orange-500 rounded-md text-white cursor-pointer" onClick={() => exportStyledExcel(data)}>
        Export To Excel
      </button>

    </div>
  );
};

export default TransactionFilters;