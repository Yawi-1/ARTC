// TransactionFilters.jsx
import { Filter, Download, ChevronDown, X } from 'lucide-react';
import { exportStyledExcel } from '../../utils/exportExcel';
import { useBranch } from '../../context/BranchContext';

const TransactionFilters = ({ data, filters, setFilters, setCurrentPage }) => {
  const categories = [...new Set(data.map(d => d.category))];
  const { branches } = useBranch();

  const resetFilters = () => {
    setFilters({ type: 'all', branch: 'all', category: 'all' });
    setCurrentPage(1);
  };

  const hasActiveFilters = filters.type !== 'all' || filters.branch !== 'all' || filters.category !== 'all';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filters</span>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="ml-auto text-xs text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <select
            value={filters.type}
            onChange={(e) => {
              setFilters({ ...filters, type: e.target.value });
              setCurrentPage(1);
            }}
            className="appearance-none px-4 py-2 pr-8 border border-gray-200 rounded-xl text-sm bg-white hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={filters.branch}
            onChange={(e) => {
              setFilters({ ...filters, branch: e.target.value });
              setCurrentPage(1);
            }}
            className="appearance-none px-4 py-2 pr-8 border border-gray-200 rounded-xl text-sm bg-white hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all"
          >
            <option value="all">All Branches</option>
            {branches.map((b) => (
              <option key={b._id} value={b._id}>{b.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={filters.category}
            onChange={(e) => {
              setFilters({ ...filters, category: e.target.value });
              setCurrentPage(1);
            }}
            className="appearance-none px-4 py-2 pr-8 border border-gray-200 rounded-xl text-sm bg-white hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all"
          >
            <option value="all">All Categories</option>
            {categories.map((c, i) => (
              <option key={i} value={c} className="capitalize">{c}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <button 
          onClick={() => exportStyledExcel(data)}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Export To Excel
        </button>
      </div>
    </div>
  );
};

export default TransactionFilters;