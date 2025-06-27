// Đếm theo type: Full-time, Part-time, Freelance
export const countByType = (jobs, type) =>
  jobs.filter((job) => job.type === type).length;

// Đếm theo category: Design, Marketing, etc.
export const countByCategory = (jobs, category) =>
  jobs.filter((job) => job.categories.includes(category)).length;

// Đếm theo level: Entry, Mid, Senior
export const countByLevel = (jobs, level) =>
  jobs.filter((job) => job.level === level).length;

// Đếm theo salary range: "$1000-$2000", etc.
export const countBySalary = (jobs, range) =>
  jobs.filter((job) => job.salaryRange === range).length;
