import axios from "axios";
import { API_BASE_URL } from "../contants/api";

export const getJobs = async (criteria = {}) => {
  try {
    console.log("[Job Service] Fetching all jobs for client-side filtering. Criteria:", criteria);
    
    const response = await axios.get(`${API_BASE_URL}/jobs`);
    let jobs = response.data;
    if (Object.keys(criteria).length === 0) {
      return jobs;
    }

    for (const key in criteria) {
      const criteriaValue = criteria[key];
      if (criteriaValue === undefined || criteriaValue === null) continue;

      jobs = jobs.filter(job => {
        const jobValue = job[key];
        if (jobValue === undefined || jobValue === null) return false;

        if (Array.isArray(jobValue) && Array.isArray(criteriaValue)) {
          const lowerCaseJobValue = jobValue.map(v => v.toLowerCase());
          return criteriaValue.some(item => lowerCaseJobValue.includes(item.toLowerCase()));
        }
        if (typeof criteriaValue === 'boolean') {
          return jobValue === criteriaValue;
        }

        if (typeof criteriaValue === 'string') {
          return jobValue.toLowerCase().includes(criteriaValue.toLowerCase());
        }
        return false;
      });
    }
    return jobs;
    
  } catch (error) {
    console.error("Lỗi khi lấy danh sách jobs:", error);
    return [];
  }
};


export const getJobById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/jobs/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi lấy job ID ${id}:`, error);
        return null;
    }
};

export const updateJob = async (id, updatedFields) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/jobs/${id}`, updatedFields);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi cập nhật job ID ${id}:`, error);
        return null;
    }
};