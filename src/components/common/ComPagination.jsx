function ComPagination({ currentPage, totalCount, pageSize, onPageChange }) {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-12 flex items-center justify-center" aria-label="Pagination">
      <ul className="inline-flex -space-x-px rounded-md shadow-sm">
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                page === currentPage
                  ? "z-10 border-blue-500 bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white"
                  : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default ComPagination;