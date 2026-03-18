import API_BASE_URL from '../config/api.js';

//ตรวจสอบรหัสผ่าน
export const loginUser = (user, password) =>
  axios.post(`${API_BASE_URL}/login`, { user, password });

//เพิ่มผู้ใช้ใหม่
export const registerUser = (userData) =>
  axios.post(`${API_BASE_URL}/register`, userData);

//เรียก assets
export const fetchMainAssets = () =>
  fetch(`${API_BASE_URL}/main`).then((r) => r.json());

export const fetchAllAssets = () =>
  fetch(`${API_BASE_URL}/assets`).then((r) => r.json());

export const fetchAssetById = (id) =>
  fetch(`${API_BASE_URL}/assets/${id}`).then((r) => r.json());

export const createAsset = (data) =>
  axios.post(`${API_BASE_URL}/assets`, data);

export const updateAsset = (id, data) =>
  axios.put(`${API_BASE_URL}/edit/${id}`, data);

export const deleteAsset = (id) =>
  axios.delete(`${API_BASE_URL}/assets/${id}`);

//ยืม คืน 
export const fetchAvailableAssets = () =>
  fetch(`${API_BASE_URL}/borrow`).then((r) => r.json());

export const borrowAsset = (id, user_id) =>
  axios.put(`${API_BASE_URL}/assets/${id}`, { user_id });

export const fetchBorrowedAssets = (user_id) =>
  fetch(`${API_BASE_URL}/return?user_id=${user_id}`).then((r) => r.json());

export const returnAsset = (id) =>
  axios.put(`${API_BASE_URL}/return/${id}`);

//ดูข้อมูล info
export const fetchInformation = () =>
  fetch(`${API_BASE_URL}/information`).then((r) => r.json());
