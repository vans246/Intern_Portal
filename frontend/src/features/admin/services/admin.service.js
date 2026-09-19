import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

const getError = (error) => error.response?.data || error;

export const createTemplate = async (data) => {
    try {
        const response = await apiClient.post('/api/admin/templates', data);
        return response.data;
    } catch (error) {
        throw getError(error);
    }
};

export const getAllTemplates = async () => {
    try {
        const response = await apiClient.get('/api/admin/templates');
        return response.data;
    } catch (error) {
        throw getError(error);
    }
};

export const updateTemplate = async (id, data) => {
    try {
        const response = await apiClient.patch(`/api/admin/templates/${id}`, data);
        return response.data;
    } catch (error) {
        throw getError(error);
    }
};

export const toggleTemplateActive = async (id) => {
    try {
        const response = await apiClient.patch(`/api/admin/templates/${id}/toggle`);
        return response.data;
    } catch (error) {
        throw getError(error);
    }
};
