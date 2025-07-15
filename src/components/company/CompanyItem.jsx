import React from "react";
import { useNavigate } from "react-router-dom";

function CompanyItem({ logo, name, jobCount }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/companies/${name}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-blue-500 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-900">
        <img src={logo} alt={`${name} logo`} className="h-8 w-8 object-contain" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {jobCount} jobs available →
      </p>
    </div>
  );
}

export default CompanyItem;