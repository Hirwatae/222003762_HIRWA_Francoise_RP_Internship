import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Use your actual backend port
    withCredentials: true, // if you're using cookies/session (though JWTs typically don't rely on this for auth)
});

// === Interceptor to attach JWT token to every request ===
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add it to the Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// === API functions ===

export const registerUser = (userData) => api.post('/registration', userData);

export const loginUser = (credentials) => api.post('/login', credentials);

export const resetPassword = (email) => api.post('/reset-password', { email });

// You'll also use this 'api' instance for your admin routes, e.g.:
export const getModules = () => api.get('/admin/modules');
export const addModule = (moduleData) => api.post('/admin/modules', moduleData);
export const updateModule = (id, moduleData) => api.put(`/admin/modules/${id}`, moduleData);
export const deleteModule = (id) => api.delete(`/admin/modules/${id}`);
export const toggleModulePublishStatus = (id, isPublished) => api.put(`/admin/modules/${id}/publish`, { is_published: isPublished });
export const assignInstructor = (id, lecturerId) => api.put(`/admin/modules/${id}/assign-instructor`, { lecturer_id: lecturerId });


export const getUsers = () => api.get('/admin/users');
export const updateUserRole = (id, role) => api.put(`/admin/users/${id}/promote`, { role });
export const updateUserStatus = (id, status) => api.put(`/admin/users/${id}/status`, { status });
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);

export const getEnrollmentReports = () => api.get('/admin/reports/enrollments');
export const getCompletionRatesReports = () => api.get('/admin/reports/completion-rates');
export const getRevenueReport = () => api.get('/admin/reports/revenue');


export default api; // Export the configured axios instance as default