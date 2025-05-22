import React from "react";

interface FilterProps {
  fromDate: string;
  toDate: string;
  onFromDateChange: (value: string) => void;
  onToDateChange: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}) => {
  return (
    <div className="mb-4 flex gap-6 items-end justify-center bg-[#1a1a1a] p-4 rounded-2xl max-w-3xl mx-auto">
      <div>
        <label
          htmlFor="fromDate"
          className="block text-sm font-semibold mb-1 text-gray-300 uppercase tracking-wide"
        >
          From Date
        </label>
        <input
          id="fromDate"
          type="date"
          value={fromDate}
          onChange={(e) => onFromDateChange(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
      </div>
      <div>
        <label
          htmlFor="toDate"
          className="block text-sm font-semibold mb-1 text-gray-300 uppercase tracking-wide"
        >
          To Date
        </label>
        <input
          id="toDate"
          type="date"
          value={toDate}
          onChange={(e) => onToDateChange(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        />
      </div>
    </div>
  );
};

export default Filter;
