import axios from "axios";

const API_URL = "http://localhost:5000";

export const signup = (data) =>
  axios.post(`${API_URL}/auth/signup`, data);

export const login = (data) =>
  axios.post(`${API_URL}/auth/login`, data);
