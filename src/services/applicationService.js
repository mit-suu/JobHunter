import axios from "axios";
import { API_BASE_URL } from "../contants/api";

export const submitApplication = async (applicationData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/applications`, applicationData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi nộp đơn ứng tuyển:", error);
        return null;
    }
};

export const getApplicationsByJobId = async (jobId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/applications?jobId=${jobId}&_expand=user`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách ứng viên:", error);
        return [];
    }
};
