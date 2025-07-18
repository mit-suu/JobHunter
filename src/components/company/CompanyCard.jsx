import { useNavigate } from "react-router-dom";

function CompanyCard({ company }) {
  const { logo, name, jobCount } = company;
  const navigate = useNavigate();

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 inline-block rounded-md bg-gray-100 p-3 ">
        <img src={logo} alt={`${name} logo`} className="h-10 w-10 object-contain" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {jobCount} jobs available
      </p>

      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button
          onClick={() => navigate(`/companies/${name}`)}
          className="transform rounded-md bg-blue-600 px-6 py-2 font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          View Jobs
        </button>
      </div>
    </div>
  );
}
export default CompanyCard;