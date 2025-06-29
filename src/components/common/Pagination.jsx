function Pagination({ totalPages, currentPage, setCurrentPage }) {
  const maxVisible = 5;

  const scrollToList = () => {
    const element = document.getElementById("job-list");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    setTimeout(() => {
      const el = document.getElementById("job-list");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50); // đợi JobList render lại rồi scroll
  };

  const renderPages = () => {
    const pages = [];

    const showLeftDots = currentPage > 3;
    const showRightDots = currentPage < totalPages - 2;

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      start = 2;
      end = Math.min(5, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      start = Math.max(totalPages - 4, 2);
      end = totalPages - 1;
    }

    // Always show first page
    pages.push(
      <button
        key={1}
        onClick={() => handlePageClick(1)}
        className={`rounded px-3 py-1 font-medium transition ${
          currentPage === 1
            ? "bg-[#4640DE] text-white"
            : "bg-white hover:text-[#4640DE]"
        }`}
      >
        1
      </button>,
    );

    if (showLeftDots) {
      pages.push(
        <span key="left-dots" className="px-2">
          ...
        </span>,
      );
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`rounded px-3 py-1 font-medium transition ${
            currentPage === i
              ? "bg-[#4640DE] text-white"
              : "bg-white hover:text-[#4640DE]"
          }`}
        >
          {i}
        </button>,
      );
    }

    if (showRightDots) {
      pages.push(
        <span key="right-dots" className="px-2">
          ...
        </span>,
      );
    }

    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={`rounded px-3 py-1 font-medium transition ${
            currentPage === totalPages
              ? "bg-[#4640DE] text-white"
              : "bg-white hover:text-[#4640DE]"
          }`}
        >
          {totalPages}
        </button>,
      );
    }

    return pages;
  };

  return (
    totalPages > 1 && (
      <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-[#515B6F]">
        {/* Prev Button */}
        <button
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage((prev) => {
                const newPage = Math.max(prev - 1, 1);
                scrollToList();
                return newPage;
              });
            }
          }}
          disabled={currentPage === 1}
          className="p-2 hover:text-[#4640DE]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Page Numbers */}
        {renderPages()}

        {/* Next Button */}
        <button
          onClick={() => {
            if (currentPage < totalPages) {
              setCurrentPage((prev) => {
                const newPage = Math.min(prev + 1, totalPages);
                scrollToList();
                return newPage;
              });
            }
          }}
          disabled={currentPage === totalPages}
          className="p-2 hover:text-[#4640DE]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    )
  );
}

export default Pagination;
