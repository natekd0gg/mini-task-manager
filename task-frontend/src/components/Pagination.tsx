import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-lg border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-pink-100 hover:bg-pink-200 text-pink-800 cursor-pointer"
      >
        ← Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1.5 rounded-lg border text-sm font-medium cursor-pointer ${
            currentPage === page
              ? "bg-pink-500 text-white border-pink-500"
              : "bg-pink-100 text-pink-800 hover:bg-pink-200"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-lg border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed bg-pink-100 hover:bg-pink-200 text-pink-800 cursor-pointer"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
