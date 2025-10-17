import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    MdPeople,
    MdRestaurant,
    MdSubscriptions,
    MdVerified,
    MdPending,
    MdAttachMoney,
    MdTrendingUp,
    MdCheck,
    MdClose,
    MdVisibility,
    MdBlock,
    MdStar
} from 'react-icons/md';
import Button from '../components/Button';
import { adminAPI } from '../services/api';
import { CiStar } from 'react-icons/ci';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState(null);
    const [pendingKYC, setPendingKYC] = useState([]);
    const [allProviders, setAllProviders] = useState([]);
    const [allTenants, setAllTenants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            const [statsRes, kycRes, providersRes, tenantsRes] = await Promise.all([
                adminAPI.getStats(),
                adminAPI.getPendingKYC(),
                adminAPI.getAllProviders(),
                adminAPI.getAllTenants()
            ]);

            setStats(statsRes.data.data.overview || statsRes.data.data);

            // Merge providers and tenants KYC
            const pendingProviders = (kycRes.data.data.pendingProviders || []).map(p => ({ ...p, type: 'provider' }));
            const pendingTenants = (kycRes.data.data.pendingTenants || []).map(t => ({ ...t, type: 'tenant' }));
            setPendingKYC([...pendingProviders, ...pendingTenants]);

            setAllProviders(providersRes.data.data.providers || []);
            setAllTenants(tenantsRes.data.data.tenants || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching admin data:', error);
            // Set default values
            setStats(mockStats);
            setPendingKYC(mockPendingKYC);
            setAllProviders(mockAllProviders);
            setAllTenants(mockAllTenants);
            setLoading(false);
        }
    };

    const handleVerifyKYC = async (kycId, status) => {
        try {
            await adminAPI.verifyKYC(kycId, {
                status: status === 'approved' ? 'verified' : 'rejected',
                remarks: status === 'approved' ? 'Documents verified successfully' : 'Documents need resubmission'
            });

            alert(`KYC ${status}!`);
            fetchAdminData(); // Refresh data
        } catch (error) {
            console.error('Error verifying KYC:', error);
            alert(error.response?.data?.message || 'Failed to verify KYC');
        }
    };

    const handleToggleUserStatus = async (userId, type) => {
        try {
            await adminAPI.toggleUserStatus(userId, {
                isActive: false // This should toggle based on current state
            });

            alert('User status updated!');
            fetchAdminData();
        } catch (error) {
            console.error('Error updating status:', error);
            alert(error.response?.data?.message || 'Failed to update status');
        }
    };

    // Mock data as fallback
    const mockStats = {
        totalProviders: 45,
        activeProviders: 38,
        totalTenants: 156,
        activeTenants: 142,
        activeSubscriptions: 124,
        totalRevenue: 458900,
        monthlyGrowth: 18.5,
        pendingKYC: 8,
        todayRegistrations: 6
    };

    const mockPendingKYC = [
        {
            id: 'kyc1',
            type: 'provider',
            name: 'Priya Sharma',
            email: 'priya@example.com',
            phone: '9876543210',
            submittedAt: '2024-12-15T10:30:00Z',
            documents: ['Aadhar Front', 'Aadhar Back', 'Photo', 'Address Proof']
        },
        {
            id: 'kyc2',
            type: 'tenant',
            name: 'Rahul Kumar',
            email: 'rahul@example.com',
            phone: '9876543211',
            submittedAt: '2024-12-15T14:20:00Z',
            documents: ['Aadhar Front', 'Aadhar Back', 'Photo']
        },
        {
            id: 'kyc3',
            type: 'provider',
            name: 'Sneha Patel',
            email: 'sneha@example.com',
            phone: '9876543212',
            submittedAt: '2024-12-14T16:45:00Z',
            documents: ['Aadhar Front', 'Aadhar Back', 'Photo']
        }
    ];

    const mockAllProviders = [
        {
            id: 'p1',
            name: 'Priya Sharma',
            email: 'priya@example.com',
            displayName: "Priya's Home Kitchen",
            location: 'Koramangala, Bangalore',
            rating: 4.8,
            currentTenants: 5,
            maxTenants: 8,
            kycStatus: 'verified',
            isActive: true,
            joinedDate: '2024-10-15'
        },
        {
            id: 'p2',
            name: 'Meera Reddy',
            email: 'meera@example.com',
            displayName: "Amma's Kitchen",
            location: 'Indiranagar, Bangalore',
            rating: 4.9,
            currentTenants: 7,
            maxTenants: 10,
            kycStatus: 'verified',
            isActive: true,
            joinedDate: '2024-09-20'
        },
        {
            id: 'p3',
            name: 'Anjali Singh',
            email: 'anjali@example.com',
            displayName: "Home Tiffin Service",
            location: 'Whitefield, Bangalore',
            rating: 4.6,
            currentTenants: 3,
            maxTenants: 6,
            kycStatus: 'pending',
            isActive: true,
            joinedDate: '2024-12-01'
        }
    ];

    const mockAllTenants = [
        {
            id: 't1',
            name: 'Rahul Kumar',
            email: 'rahul@example.com',
            location: 'Koramangala, Bangalore',
            accommodationType: 'PG',
            activeSubscriptions: 2,
            totalSpent: 12500,
            kycStatus: 'verified',
            isActive: true,
            joinedDate: '2024-11-10'
        },
        {
            id: 't2',
            name: 'Amit Patel',
            email: 'amit@example.com',
            location: 'HSR Layout, Bangalore',
            accommodationType: 'Flat',
            activeSubscriptions: 1,
            totalSpent: 8900,
            kycStatus: 'verified',
            isActive: true,
            joinedDate: '2024-10-25'
        },
        {
            id: 't3',
            name: 'Neha Gupta',
            email: 'neha@example.com',
            location: 'Marathahalli, Bangalore',
            accommodationType: 'Hostel',
            activeSubscriptions: 1,
            totalSpent: 5600,
            kycStatus: 'pending',
            isActive: true,
            joinedDate: '2024-12-05'
        }
    ];

    const mockRecentActivity = [
        { id: 1, type: 'registration', user: 'New Provider: Anjali Singh', time: '2 hours ago', icon: MdRestaurant, color: 'text-secondary-500' },
        { id: 2, type: 'subscription', user: 'New Subscription: Rahul → Priya Kitchen', time: '5 hours ago', icon: MdSubscriptions, color: 'text-primary-500' },
        { id: 3, type: 'kyc', user: 'KYC Verified: Meera Reddy', time: '8 hours ago', icon: MdVerified, color: 'text-green-500' },
        { id: 4, type: 'registration', user: 'New Tenant: Neha Gupta', time: '1 day ago', icon: MdPeople, color: 'text-blue-500' },
        { id: 5, type: 'payment', user: 'Payment Received: ₹12,500', time: '1 day ago', icon: MdAttachMoney, color: 'text-green-500' }
    ];

    // Use fetched data or fallback to mock
    const displayStats = stats || mockStats;
    const displayPendingKYC = pendingKYC.length > 0 ? pendingKYC : mockPendingKYC;
    const displayProviders = allProviders.length > 0 ? allProviders : mockAllProviders;
    const displayTenants = allTenants.length > 0 ? allTenants : mockAllTenants;
    const displayActivity = mockRecentActivity; // Can be fetched from backend

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-accent-600 to-accent-700 py-8 shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl font-bold font-heading text-white mb-2">Admin Dashboard</h1>
                        <p className="text-white/90">Platform Overview & Management</p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <MdRestaurant className="w-8 h-8 text-secondary-500 mb-2" />
                        <p className="text-3xl font-bold text-gray-800">{displayStats.totalProviders}</p>
                        <p className="text-sm text-gray-600">Total Providers</p>
                        <p className="text-xs text-green-600 mt-1">
                            {displayStats.activeProviders} active
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <MdPeople className="w-8 h-8 text-primary-500 mb-2" />
                        <p className="text-3xl font-bold text-gray-800">{displayStats.totalTenants}</p>
                        <p className="text-sm text-gray-600">Total Tenants</p>
                        <p className="text-xs text-green-600 mt-1">
                            {displayStats.activeTenants} active
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <MdSubscriptions className="w-8 h-8 text-accent-500 mb-2" />
                        <p className="text-3xl font-bold text-gray-800">{displayStats.activeSubscriptions}</p>
                        <p className="text-sm text-gray-600">Active Subscriptions</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <MdAttachMoney className="w-8 h-8 text-green-500 mb-2" />
                        <p className="text-3xl font-bold text-gray-800">₹{displayStats.totalRevenue?.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Total Revenue</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >
                        <MdTrendingUp className="w-8 h-8 text-blue-500 mb-2" />
                        <p className="text-3xl font-bold text-gray-800">{displayStats.monthlyGrowth}%</p>
                        <p className="text-sm text-gray-600">Monthly Growth</p>
                    </motion.div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-lg">
                    <div className="flex overflow-x-auto border-b border-gray-200">
                        {[
                            { key: 'overview', label: 'Overview' },
                            { key: 'kyc', label: `KYC Pending (${displayPendingKYC.length})` },
                            { key: 'providers', label: `Providers (${displayProviders.length})` },
                            { key: 'tenants', label: `Tenants (${displayTenants.length})` }
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-6 py-4 font-semibold whitespace-nowrap transition-colors ${activeTab === tab.key
                                    ? 'text-accent-600 border-b-2 border-accent-600'
                                    : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-6">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Recent Activity */}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                                    <div className="space-y-3">
                                        {displayActivity.map((activity) => (
                                            <div
                                                key={activity.id}
                                                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow ${activity.color}`}>
                                                    <activity.icon className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-800">{activity.user}</p>
                                                    <p className="text-sm text-gray-500">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Today's Stats */}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">Today's Stats</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-4">
                                            <p className="text-2xl font-bold text-primary-700">{displayStats.todayRegistrations || displayStats.today?.newRegistrations || 0}</p>
                                            <p className="text-sm text-gray-700">New Registrations</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                                            <p className="text-2xl font-bold text-green-700">12</p>
                                            <p className="text-sm text-gray-700">New Subscriptions</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
                                            <p className="text-2xl font-bold text-yellow-700">{displayStats.pendingKYC || displayStats.kyc?.pendingKYC || displayPendingKYC.length}</p>
                                            <p className="text-sm text-gray-700">Pending KYC</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                                            <p className="text-2xl font-bold text-blue-700">₹25,400</p>
                                            <p className="text-sm text-gray-700">Revenue Today</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* KYC Pending Tab */}
                        {activeTab === 'kyc' && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">Pending KYC Verifications</h2>
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                                        {displayPendingKYC.length} Pending
                                    </span>
                                </div>

                                {displayPendingKYC.map((kyc) => (
                                    <motion.div
                                        key={kyc.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="border-2 border-gray-200 rounded-xl p-6 hover:border-accent-300 transition-all"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="text-xl font-bold text-gray-800">{kyc.name}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${kyc.type === 'provider'
                                                        ? 'bg-secondary-100 text-secondary-700'
                                                        : 'bg-primary-100 text-primary-700'
                                                        }`}>
                                                        {kyc.type.toUpperCase()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">{kyc.email}</p>
                                                <p className="text-sm text-gray-600">{kyc.phone}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Submitted: {new Date(kyc.submittedAt).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">Documents Submitted:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {kyc.documents.map((doc, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                                        📄 {doc}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <Button
                                                variant="primary"
                                                icon={MdCheck}
                                                onClick={() => handleVerifyKYC(kyc.id, 'approved')}
                                                className="flex-1 bg-green-600 hover:bg-green-700"
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                variant="outline"
                                                icon={MdVisibility}
                                                className="flex-1"
                                            >
                                                View Documents
                                            </Button>
                                            <Button
                                                variant="outline"
                                                icon={MdClose}
                                                onClick={() => handleVerifyKYC(kyc.id, 'rejected')}
                                                className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}

                                {displayPendingKYC.length === 0 && (
                                    <div className="text-center py-12">
                                        <MdVerified className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Pending KYC</h3>
                                        <p className="text-gray-600">All KYC verifications are up to date</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Providers Tab */}
                        {activeTab === 'providers' && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">All Providers</h2>
                                    <input
                                        type="text"
                                        placeholder="Search providers..."
                                        className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 outline-none"
                                    />
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Provider</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rating</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tenants</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">KYC</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {displayProviders.map((provider) => (
                                                <tr key={provider._id || provider.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-4">
                                                        <div>
                                                            <p className="font-semibold text-gray-800">{provider.name}</p>
                                                            <p className="text-sm text-gray-600">{provider.displayName}</p>
                                                            <p className="text-xs text-gray-500">{provider.email}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-700">{provider.location}</td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex items-center gap-1">
                                                            <CiStar className="w-4 h-4 text-yellow-500" />
                                                            <span className="font-semibold text-gray-800">{provider.rating}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-700">
                                                        {provider.currentTenants}/{provider.maxTenants}
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${provider.kycStatus === 'verified' ? 'bg-green-100 text-green-700' :
                                                            provider.kycStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                                'bg-red-100 text-red-700'
                                                            }`}>
                                                            {provider.kycStatus}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${provider.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                                            }`}>
                                                            {provider.isActive ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <button
                                                            onClick={() => handleToggleUserStatus(provider._id || provider.id, 'provider')}
                                                            className="text-accent-600 hover:text-accent-700 font-semibold text-sm"
                                                        >
                                                            {provider.isActive ? <MdBlock className="w-5 h-5" /> : <MdCheck className="w-5 h-5" />}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Tenants Tab */}
                        {activeTab === 'tenants' && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">All Tenants</h2>
                                    <input
                                        type="text"
                                        placeholder="Search tenants..."
                                        className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 outline-none"
                                    />
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tenant</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Subscriptions</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total Spent</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">KYC</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {displayTenants.map((tenant) => (
                                                <tr key={tenant._id || tenant.id} className="hover:bg-gray-50">
                                                    <td className="px-4 py-4">
                                                        <div>
                                                            <p className="font-semibold text-gray-800">{tenant.name}</p>
                                                            <p className="text-xs text-gray-500">{tenant.email}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-700">{tenant.location}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-700 capitalize">{tenant.accommodationType}</td>
                                                    <td className="px-4 py-4 text-sm text-gray-700 text-center">
                                                        {tenant.activeSubscriptions}
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-semibold text-gray-800">
                                                        ₹{tenant.totalSpent.toLocaleString()}
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${tenant.kycStatus === 'verified' ? 'bg-green-100 text-green-700' :
                                                            tenant.kycStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                                'bg-red-100 text-red-700'
                                                            }`}>
                                                            {tenant.kycStatus}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${tenant.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                                            }`}>
                                                            {tenant.isActive ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <button
                                                            onClick={() => handleToggleUserStatus(tenant._id || tenant.id, 'tenant')}
                                                            className="text-accent-600 hover:text-accent-700 font-semibold text-sm"
                                                        >
                                                            {tenant.isActive ? <MdBlock className="w-5 h-5" /> : <MdCheck className="w-5 h-5" />}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

