import axios from "axios";
import { API_BASE_URL } from "../contants/api";

// GET: Lấy danh sách jobs
export const getJobs = async () => {
  try {
    const response = await axios.get(API_BASE_URL + "/jobs");
    return response.data;
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