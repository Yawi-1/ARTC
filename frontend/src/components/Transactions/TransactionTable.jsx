// TransactionTable.jsx
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Building2, CalendarDays, Tag, DollarSign, Loader2 } from 'lucide-react';

const TransactionTable = ({
  data,
  loading,
  currentPage,
  setCurrentPage,
  totalPages,
  itemsPerPage
}) => {
  const getTypeStyles = (type) => {
    if (type === "income") {
      return "bg-green-100 text-green-700 border-green-200";
    }
    return "bg-red-100 text-red-700 border-red-200";
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" />
                  Date
                </span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  Type
                </span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  Amount
                </span>
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  Branch
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="6" className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    <p className="text-gray-400 text-sm">Loading transactions...</p>
                  </div>
                </td>
              </tr>
            ) : data?.length > 0 ? (
              data.map((t, i) => (
                <tr
                  key={t._id}
                  className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all duration-150 group"
                >
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                    {(currentPage - 1) * itemsPerPage + i + 1}
                  </td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                    {new Date(t.date).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getTypeStyles(t.type)}`}>
                      {t.type === "income" ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {t.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    <span className={t.type === "income" ? "text-green-600" : "text-red-600"}>
                      ₹{Number(t.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3 capitalize text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-sm">
                    {t.branch?.name || "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Tag className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-400 font-medium">No transactions found</p>
                    <p className="text-gray-300 text-sm">Try adjusting your filters</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && data?.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            Showing <span className="font-medium text-gray-700">{((currentPage - 1) * 20) + 1}</span> to{' '}
            <span className="font-medium text-gray-700">{Math.min(currentPage * 20, data.length)}</span> of{' '}
            <span className="font-medium text-gray-700">{data.length}</span> entries
          </p>
          <div className="flex items-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>
            <div className="flex items-center gap-1">
              {[...Array(Math.min(totalPages, 5))].map((_, idx) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = idx + 1;
                } else if (currentPage <= 3) {
                  pageNum = idx + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + idx;
                } else {
                  pageNum = currentPage - 2 + idx;
                }
                
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                      currentPage === pageNum
                        ? "bg-blue-500 text-white shadow-md shadow-blue-200"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionTable;