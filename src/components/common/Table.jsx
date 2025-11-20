const Table = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No data available",
  onRowClick = null,
  className = "",
}) => {
  if (loading) {
    return (
      <div className="w-full">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton h-12 mb-2" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-dark-400">{emptyMessage}</div>
    );
  }

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-dark-800">
            {columns.map((column, index) => (
              <th
                key={index}
                className="text-left py-3 px-4 text-sm font-medium text-dark-400 uppercase tracking-wider"
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`border-b border-dark-800 transition-colors ${
                onRowClick ? "hover:bg-dark-800 cursor-pointer" : ""
              }`}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-3 px-4 text-sm text-dark-200">
                  {column.render
                    ? column.render(row, rowIndex)
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
