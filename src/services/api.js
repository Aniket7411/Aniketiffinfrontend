import axios from 'axios';

// API Base URL - Change this when backend is deployed
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add token to all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ==================== AUTH ENDPOINTS ====================

export const authAPI = {
    // User Login
    login: (data) => api.post('/auth/login', data),

    // User Signup
    signup: (data) => api.post('/auth/register', data),

    // Admin Login
    adminLogin: (data) => api.post('/auth/admin/login', data),

    // Get Current User
    getCurrentUser: () => api.get('/auth/me'),
};

// ==================== PROVIDER ENDPOINTS ====================

export const providerAPI = {
    // Register as Provider
    register: (data) => api.post('/provider/register', data),

    // Get Provider Profile
    getProfile: () => api.get('/provider/profile/me'),

    // Update Provider Profile
    updateProfile: (data) => api.put('/provider/profile/me', data),

    // Search Providers
    search: (params) => api.get('/provider/search', { params }),

    // Get Provider by ID
    getById: (providerId) => api.get(`/provider/${providerId}`),

    // Get Connection Requests
    getConnectionRequests: () => api.get('/provider/connection-requests'),
};

// ==================== TENANT ENDPOINTS ====================

export const tenantAPI = {
    // Register as Tenant
    register: (data) => api.post('/tenant/register', data),

    // Get Tenant Profile
    getProfile: () => api.get('/tenant/profile/me'),

    // Update Tenant Profile
    updateProfile: (data) => api.put('/tenant/profile/me', data),
};

// ==================== CONNECTION ENDPOINTS ====================

export const connectionAPI = {
    // Send Connection Request
    sendRequest: (data) => api.post('/connection/request', data),

    // Respond to Connection Request
    respondToRequest: (requestId, data) => api.put(`/connection/respond/${requestId}`, data),

    // Get My Connection Requests
    getMyRequests: () => api.get('/connection/my-requests'),
};

// ==================== SUBSCRIPTION ENDPOINTS ====================

export const subscriptionAPI = {
    // Create Subscription
    create: (data) => api.post('/subscription/create', data),

    // Get My Subscriptions
    getMySubscriptions: (params) => api.get('/subscription/my-subscriptions', { params }),

    // Update Subscription Status
    updateStatus: (subscriptionId, data) => api.put(`/subscription/${subscriptionId}/status`, data),

    // Pause Subscription
    pause: (subscriptionId, data) => api.put(`/subscription/${subscriptionId}/pause`, data),
};

// ==================== KYC ENDPOINTS ====================

export const kycAPI = {
    // Upload KYC Documents
    upload: (data) => api.post('/kyc/upload', data),

    // Get KYC Status
    getStatus: () => api.get('/kyc/status'),

    // Get KYC Documents
    getDocuments: () => api.get('/kyc/documents'),

    // Delete KYC Document
    deleteDocument: (docType) => api.delete(`/kyc/document/${docType}`),
};

// ==================== ADMIN ENDPOINTS ====================

export const adminAPI = {
    // Verify KYC
    verifyKYC: (profileId, data) => api.put(`/kyc/verify/${profileId}`, data),

    // Get Pending KYC
    getPendingKYC: () => api.get('/kyc/pending'),

    // Get Dashboard Stats
    getStats: () => api.get('/admin/stats'),

    // Get All Providers
    getAllProviders: (params) => api.get('/admin/providers', { params }),

    // Get All Tenants
    getAllTenants: (params) => api.get('/admin/tenants', { params }),

    // Toggle User Status
    toggleUserStatus: (userId, data) => api.put(`/admin/users/${userId}/status`, data),
};

// ==================== REVIEW ENDPOINTS ====================

export const reviewAPI = {
    // Add Review
    addReview: (data) => api.post('/reviews', data),

    // Get Provider Reviews
    getProviderReviews: (providerId, params) => api.get(`/provider/${providerId}/reviews`, { params }),
};

export default api;

