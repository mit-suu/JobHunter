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
