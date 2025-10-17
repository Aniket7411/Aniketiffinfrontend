import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import ProviderRegister from './pages/SimpleProviderRegister';
import TenantRegister from './pages/SimpleTenantRegister';
import BrowseProviders from './pages/BrowseProviders';
import ProviderDetails from './pages/ProviderDetails';
import ProviderDashboard from './pages/ProviderDashboard';
import TenantDashboard from './pages/TenantDashboard';
import KYCUpload from './pages/KYCUpload';
import AdminDashboard from './pages/AdminDashboard';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import ProviderProfileEdit from './pages/ProviderProfileEdit';
import TenantProfileEdit from './pages/TenantProfileEdit';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

// Public Route (redirect if already logged in)
const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <NotificationProvider>
                    <Routes>
                        {/* Public Routes with Layout */}
                        <Route path="/" element={<Layout><Home /></Layout>} />
                        <Route
                            path="/login"
                            element={
                                <PublicRoute>
                                    <Layout showFooter={false}>
                                        <Login />
                                    </Layout>
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <PublicRoute>
                                    <Layout showFooter={false}>
                                        <Signup />
                                    </Layout>
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/admin/login"
                            element={
                                <PublicRoute>
                                    <Layout showFooter={false}>
                                        <AdminLogin />
                                    </Layout>
                                </PublicRoute>
                            }
                        />

                        {/* P2P Registration Routes */}
                        <Route
                            path="/provider/register"
                            element={
                                <PublicRoute>
                                    <Layout>
                                        <ProviderRegister />
                                    </Layout>
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/tenant/register"
                            element={
                                <PublicRoute>
                                    <Layout>
                                        <TenantRegister />
                                    </Layout>
                                </PublicRoute>
                            }
                        />

                        {/* Browse & Search */}
                        <Route path="/browse-providers" element={<Layout><BrowseProviders /></Layout>} />
                        <Route path="/provider/:providerId" element={<Layout><ProviderDetails /></Layout>} />

                        {/* Info Pages */}
                        <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
                        <Route path="/about" element={<Layout><AboutUs /></Layout>} />

                        {/* Protected Routes - Provider Dashboard */}
                        <Route
                            path="/provider/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <ProviderDashboard />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />

                        {/* Provider Profile Edit */}
                        <Route
                            path="/provider/profile/edit"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <ProviderProfileEdit />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />

                        {/* Protected Routes - Tenant Dashboard */}
                        <Route
                            path="/tenant/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <TenantDashboard />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />

                        {/* Tenant Profile Edit */}
                        <Route
                            path="/tenant/profile/edit"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <TenantProfileEdit />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />

                        {/* KYC Upload */}
                        <Route
                            path="/kyc/upload"
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <KYCUpload />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />

                        {/* Admin Dashboard */}
                        <Route
                            path="/admin/dashboard"
                            element={
                                <ProtectedRoute adminOnly={true}>
                                    <Layout>
                                        <AdminDashboard />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />

                        {/* 404 Route */}
                        <Route
                            path="*"
                            element={
                                <Layout showFooter={false}>
                                    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50">
                                        <div className="text-center">
                                            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                                            <p className="text-xl text-gray-600 mb-8">Page not found</p>
                                            <a href="/" className="text-primary-600 hover:text-primary-700 font-semibold">
                                                Go back home
                                            </a>
                                        </div>
                                    </div>
                                </Layout>
                            }
                        />
                    </Routes>
                </NotificationProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
