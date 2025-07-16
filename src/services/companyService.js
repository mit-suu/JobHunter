
const API_URL = 'http://localhost:3001/jobs';

async function getCompanies() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    const jobs = await response.json();

    const companiesMap = new Map();
    jobs.forEach(job => {
      if (companiesMap.has(job.company)) {
        companiesMap.get(job.company).jobCount++;
      } else {
        companiesMap.set(job.company, {
          name: job.company,
          logo: job.logo,
          jobCount: 1, 
        });
      }
    });

    return Array.from(companiesMap.values());
  } catch (error) {
    console.error("Failed to fetch or process companies:", error);
    throw error;
  }
}

export const companyService = {
  getCompanies,
};