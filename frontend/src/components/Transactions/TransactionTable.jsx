const TransactionTable = ({
  data,
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  return (
    <>
      <div className="overflow-x-auto bg-white rounded-lg border">
        <table className="w-full text-xs border-collapse">

          <thead className="bg-gray-100 text-[11px] uppercase">
            <tr>
              <th className="px-2 py-2 border text-left">#</th>
              <th className="px-2 py-2 border text-left">Date</th>
              <th className="px-2 py-2 border text-left">Type</th>
              <th className="px-2 py-2 border text-left">Amount</th>
              <th className="px-2 py-2 border text-left">Category</th>
              <th className="px-2 py-2 border text-left">Branch</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((t, i) => (
                <tr key={t._id} className="hover:bg-gray-50">
                  <td className="px-2 py-1.5 border">{i + 1}</td>

                  <td className="px-2 py-1.5 border">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-2 py-1.5 border">
                    <span
                      className={`px-2 py-[2px] text-[10px] rounded ${
                        t.type === "income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>

                  <td className="px-2 py-1.5 border font-semibold">
                    ₹{Number(t.amount).toLocaleString()}
                  </td>

                  <td className="px-2 py-1.5 border capitalize">
                    {t.category}
                  </td>

                  <td className="px-2 py-1.5 border">
                    {t.branch}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-3 flex justify-between items-center text-sm">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-2 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span>{currentPage} / {totalPages}</span>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-2 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default TransactionTable;