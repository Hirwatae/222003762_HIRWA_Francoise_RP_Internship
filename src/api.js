// src/api.js
import axios from 'axios';

// Match your backend port
const API_BASE_URL = 'http://localhost:5000';

// Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- Authentication Endpoints ---
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/api/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/api/register', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const resetPassword = async (email) => {
    try {
        const response = await api.post('/api/reset-password', { email });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// --- General Course/Content Endpoints ---
export const fetchAvailableCourses = async () => {
    try {
        const response = await api.get('/api/courses');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const fetchCourseById = async (courseId) => {
    try {
        const response = await api.get(`/api/courses/${courseId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const fetchCourseNotes = async (courseTitle, pageNumber) => {
    try {
        const response = await api.get(`/api/courses/${courseTitle}/notes/${pageNumber}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const fetchAssessmentQuestions = async (courseName) => {
    try {
        const response = await api.get(`/api/assessments/${courseName}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// --- Admin Specific Endpoints ---
export const fetchAdminModules = async () => {
    try {
        const response = await api.get('/api/admin/modules');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const addAdminModule = async (moduleData) => {
    try {
        const response = await api.post('/api/admin/modules', moduleData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateAdminModule = async (moduleId, moduleData) => {
    try {
        const response = await api.put(`/api/admin/modules/${moduleId}`, moduleData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteAdminModule = async (moduleId) => {
    try {
        const response = await api.delete(`/api/admin/modules/${moduleId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const publishAdminModule = async (moduleId, isPublished) => {
    try {
        const response = await api.put(`/api/admin/modules/${moduleId}/publish`, { is_published: isPublished });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const assignInstructorToModule = async (moduleId, lecturerId) => {
    try {
        const response = await api.put(`/api/admin/modules/${moduleId}/assign-instructor`, { lecturer_id: lecturerId });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const fetchAdminUsers = async () => {
    try {
        const response = await api.get('/api/admin/users');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateAdminUserRole = async (userId, role) => {
    try {
        const response = await api.put(`/api/admin/users/${userId}/promote`, { role });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateAdminUserStatus = async (userId, status) => {
    try {
        const response = await api.put(`/api/admin/users/${userId}/status`, { status });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteAdminUser = async (userId) => {
    try {
        const response = await api.delete(`/api/admin/users/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const fetchEnrollmentReports = async () => {
    try {
        const response = await api.get('/api/admin/reports/enrollments');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const fetchCompletionReports = async () => {
    try {
        const response = await api.get('/api/admin/reports/completion-rates');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const fetchRevenueReports = async () => {
    try {
        const response = await api.get('/api/admin/reports/revenue');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// --- File Upload Endpoint ---
export const uploadFiles = async (formData) => {
    try {
        const response = await api.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
