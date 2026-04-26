import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

// 회원가입
export const register = (data) => {
    return axios.post(`${API_URL}/register`, data);
};

// 로그인
export const login = (data) => {
    return axios.post(`${API_URL}/login`, data);
};