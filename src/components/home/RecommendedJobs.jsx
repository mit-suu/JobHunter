import FeaturedJobsItem from "./FeaturedJobsItem"; // Tận dụng component item đã có

// ✨ UPDATED: Thêm prop `searchInitiated` để quản lý trạng thái hiển thị ban đầu.
function RecommendedJobs({ jobs, isLoading, searchInitiated }) {
  // 1. Trạng thái đang tải sau khi người dùng tìm kiếm
  if (isLoading) {
    return (
      <div className="flex h-full min-h-[300px] items-center justify-center">
        <p className="text-center text-lg text-gray-500 dark:text-slate-400">AI is finding jobs for you...</p>
      </div>
    );
  }

  // 2. Trạng thái ban đầu, trước khi người dùng tìm kiếm bất cứ thứ gì.
  if (!searchInitiated) {
    return (
      <div className="group flex h-full min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 p-8 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="mb-4 h-16 w-16 text-white opacity-80 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <p className="text-2xl font-bold text-white">
          Tell us what type of job you want
        </p>
        <p className="mt-2 text-white/90">Let our AI assistant find the perfect role for you.</p>
      </div>
    );
  }

  // 3. Trạng thái sau khi tìm kiếm nhưng không có kết quả.
  if (jobs.length === 0) {
    return (
      <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center dark:border-gray-600 dark:bg-slate-800">
        <svg xmlns="http://www.w3.org/2000/svg" className="mb-4 h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z" />
        </svg>
        <p className="text-xl font-semibold text-gray-700 dark:text-slate-300">
          No jobs match your criteria
        </p>
        <p className="mt-2 text-gray-500 dark:text-slate-400">Try asking the AI assistant for something else!</p>
      </div>
    );
  }

  // 4. Trạng thái có kết quả và hiển thị danh sách jobs.
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {jobs.map((job) => (
        <FeaturedJobsItem key={job.id} job={job} />
      ))}
    </div>
  );
}

export default RecommendedJobs;
