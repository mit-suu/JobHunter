// src/services/userService.js
import axios from 'axios';

import {API_BASE_URL} from '../contants/api'

// GET: Lấy danh sách users
export const getUsers = async () => {
  try {
    const response = await axios.get(API_BASE_URL+"/users");
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách users:', error);
    return [];
  }
};

// POST: Thêm user mới
export const addUser = async (newUser) => {
  try {
    const response = await axios.post(API_BASE_URL+"/users", newUser);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm user:', error);
    return null;
  }
};
