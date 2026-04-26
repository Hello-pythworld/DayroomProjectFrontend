import axios from 'axios';

const API_URL = 'http://localhost:8080/api/schedules';

const getHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});

// 일정 목록 조회
export const getSchedules = () => {
    return axios.get(API_URL, getHeaders());
};

// 일정 등록
export const createSchedule = (data) => {
    return axios.post(API_URL, data, getHeaders());
};

// 일정 수정
export const updateSchedule = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data, getHeaders());
};

// 일정 삭제
export const deleteSchedule = (id) => {
    return axios.delete(`${API_URL}/${id}`, getHeaders());
};