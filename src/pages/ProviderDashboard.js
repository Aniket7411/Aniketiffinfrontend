import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdPeople, MdStar, MdRestaurant, MdNotifications, MdCheck, MdClose, MdMessage, MdVerified } from 'react-icons/md';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { providerAPI, connectionAPI, subscriptionAPI } from '../services/api';
import { CiStar, CiBlocked } from 'react-icons/ci';

const ProviderDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('requests');
    const [stats, setStats] = useState(null);
    const [connectionRequests, setConnectionRequests] = useState([]);
    const [activeSubscriptions, setActiveSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [profileRes, requestsRes, subsRes] = await Promise.all([
                providerAPI.getProfile(),
                providerAPI.getConnectionRequests(),
                subscriptionAPI.getMySubscriptions()
            ]);

            const profile = profileRes.data.data.provider;
            const requests = requestsRes.data.data.requests || [];
            const subscriptions = subsRes.data.data.subscriptions || [];

            setStats({
                currentTenants: profile.currentTenants || 0,
                maxTenants: profile.maxTenants || 5,
                rating: profile.rating || 0,
                totalReviews: profile.totalReviews || 0,
                pendingRequests: requests.filter(r => r.status === 'pending').length,
                activeSubscriptions: subscriptions.filter(s => s.status === 'active').length
            });

            setConnectionRequests(requests);
            setActiveSubscriptions(subscriptions);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard:', error);
            // Set default stats on error
            setStats({
                currentTenants: 0,
                maxTenants: 5,
                rating: 0,
                totalReviews: 0,
                pendingRequests: 0,
                activeSubscriptions: 0
            });
            setLoading(false);
        }
    };

    const handleRespondToRequest = async (requestId, status) => {
        try {
            await connectionAPI.respondToRequest(requestId, {
                status,
                message: status === 'accepted' ? 'Happy to serve you!' : 'Sorry, currently at full capacity'
            });

            alert(`Request ${status}!`);
            fetchDashboardData(); // Refresh data
        } catch (error) {
            console.error('Error responding:', error);
            alert(error.response?.data?.message || 'Failed to respond to request');
        }
    };

    const mockConnectionRequests = [
        {
            id: 'req1',
            tenant: {
                id: 't1',
                displayName: 'Rahul K.',
                location: { area: 'Koramangala' },
                foodPreferences: { type: 'veg', tastePreference: 'medium' },
                mealsRequired: { lunch: { required: true }, dinner: { required: true } },
                budgetRange: { max: 120 }
            },
            message: 'Hi, I\'m looking for home-style veg food for lunch and dinner',
            status: 'pending',
            tenantKycVerified: true,
            createdAt: '2024-12-01T10:00:00Z'
        },
        {
            id: 'req2',
            tenant: {
                id: 't2',
                displayName: 'Priya S.',
                location: { area: 'HSR Layout' },
                foodPreferences: { type: 'veg', tastePreference: 'spicy' },
                mealsRequired: { dinner: { required: true } },
                budgetRange: { max: 100 }
            },
            message: 'Need dinner only, prefer spicy food',
            status: 'pending',
            tenantKycVerified: true,
            createdAt: '2024-11-30T15:00:00Z'
        }
    ];

    const mockSubscriptions = [
        {
            id: 'sub1',
            tenant: { displayName: 'Amit Kumar', location: { area: 'Koramangala' } },
            plan: 'monthly',
            mealsIncluded: { lunch: true, dinner: true },
            dailyPrice: 200,
            startDate: '2024-11-15',
            status: 'active'
        },
        {
            id: 'sub2',
            tenant: { displayName: 'Sneha M.', location: { area: 'Koramangala' } },
            plan: 'monthly',
            mealsIncluded: { dinner: true },
            dailyPrice: 100,
            startDate: '2024-11-10',
            status: 'active'
        }
    ];

    // Use fetched data or fallback to mock
    const displayRequests = connectionRequests.length > 0 ? connectionRequests : mockConnectionRequests;
    const displaySubscriptions = activeSubscriptions.length > 0 ? activeSubscriptions : mockSubscriptions;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-50 via-primary-50 to-accent-50">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50 to-accent-50">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-secondary-400 to-primary-500 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl font-bold font-heading text-gray-800 mb-2">Provider Dashboard</h1>
                        <p className="text-gray-700">Manage your tiffin service and tenants</p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <MdPeople className="w-8 h-8 text-primary-500" />
                            <span className="text-2xl font-bold text-gray-800">{stats.currentTenants}/{stats.maxTenants}</span>
                        </div>
                        <p className="text-gray-600 font-semibold">Current Capacity</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <CiStar className="w-8 h-8 text-yellow-500" />
                            <span className="text-2xl font-bold text-gray-800">{stats.rating}</span>
                        </div>
                        <p className="text-gray-600 font-semibold">Average Rating</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <MdNotifications className="w-8 h-8 text-accent-500" />
                            <span className="text-2xl font-bold text-gray-800">{stats.pendingRequests}</span>
                        </div>
                        <p className="text-gray-600 font-semibold">Pending Requests</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <MdRestaurant className="w-8 h-8 text-green-500" />
                            <span className="text-2xl font-bold text-gray-800">{stats.activeSubscriptions}</span>
                        </div>
                        <p className="text-gray-600 font-semibold">Active Subscriptions</p>
                    </motion.div>
                </div>

                {/* Complete Profile Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl shadow-lg p-6 mb-8 border-2 border-yellow-300"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <MdRestaurant className="text-primary-600" />
                                Complete Your Profile
                            </h3>
                            <p className="text-gray-700">
                                Add cuisine types, pricing, location, and menu details to start receiving connection requests!
                            </p>
                        </div>
                        <Button
                            variant="secondary"
                            onClick={() => navigate('/provider/profile/edit')}
                            className="whitespace-nowrap"
                        >
                            Edit Profile
                        </Button>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="bg-white rounded-t-2xl shadow-lg">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('requests')}
                            className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'requests'
                                ? 'text-primary-600 border-b-2 border-primary-600'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Connection Requests ({connectionRequests.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('subscriptions')}
                            className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'subscriptions'
                                ? 'text-primary-600 border-b-2 border-primary-600'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Active Subscriptions ({activeSubscriptions.length})
                        </button>
                    </div>

                    <div className="p-6">
                        {/* Connection Requests Tab */}
                        {activeTab === 'requests' && (
                            <div className="space-y-4">
                                {displayRequests.map((request) => (
                                    <motion.div
                                        key={request.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary-300 transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-xl font-bold text-gray-800">
                                                        {request.tenant.displayName}
                                                    </h3>
                                                    {request.tenantKycVerified && (
                                                        <MdVerified className="w-5 h-5 text-green-500" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {request.tenant.location.area} • {new Date(request.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                                                Pending
                                            </span>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                            <p className="text-gray-700 flex items-start gap-2">
                                                <MdMessage className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                                                {request.message}
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="p-3 bg-white rounded-lg border border-gray-200">
                                                <p className="text-sm text-gray-600 mb-1">Food Type</p>
                                                <p className="font-semibold text-gray-800 capitalize">
                                                    {request.tenant.foodPreferences.type === 'veg' ? '🥗 Veg' : '🍗 Non-Veg'}
                                                </p>
                                            </div>
                                            <div className="p-3 bg-white rounded-lg border border-gray-200">
                                                <p className="text-sm text-gray-600 mb-1">Spice Level</p>
                                                <p className="font-semibold text-gray-800 capitalize">
                                                    {request.tenant.foodPreferences.tastePreference}
                                                </p>
                                            </div>
                                            <div className="p-3 bg-white rounded-lg border border-gray-200">
                                                <p className="text-sm text-gray-600 mb-1">Budget</p>
                                                <p className="font-semibold text-gray-800">
                                                    ₹{request.tenant.budgetRange.max}/meal
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {request.tenant.mealsRequired.breakfast && (
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                                                    🌅 Breakfast
                                                </span>
                                            )}
                                            {request.tenant.mealsRequired.lunch?.required && (
                                                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                                                    🌞 Lunch
                                                </span>
                                            )}
                                            {request.tenant.mealsRequired.dinner?.required && (
                                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                                                    🌙 Dinner
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex gap-3">
                                            <Button
                                                variant="primary"
                                                icon={MdCheck}
                                                onClick={() => handleRespondToRequest(request.id, 'accepted')}
                                                className="flex-1"
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="outline"
                                                icon={MdClose}
                                                onClick={() => handleRespondToRequest(request.id, 'rejected')}
                                                className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                                            >
                                                Decline
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}

                                {displayRequests.length === 0 && (
                                    <div className="text-center py-12">
                                        <MdNotifications className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">No pending requests</h3>
                                        <p className="text-gray-600">New connection requests will appear here</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Active Subscriptions Tab */}
                        {activeTab === 'subscriptions' && (
                            <div className="space-y-4">
                                {displaySubscriptions.map((subscription) => (
                                    <motion.div
                                        key={subscription.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="border-2 border-gray-200 rounded-xl p-6"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-1">
                                                    {subscription.tenant.displayName}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {subscription.tenant.location.area} • Started {new Date(subscription.startDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                                Active
                                            </span>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-600 mb-1">Plan</p>
                                                <p className="font-semibold text-gray-800 capitalize">{subscription.plan}</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-600 mb-1">Daily Price</p>
                                                <p className="font-semibold text-gray-800">₹{subscription.dailyPrice}</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-600 mb-1">Meals</p>
                                                <div className="flex gap-1">
                                                    {subscription.mealsIncluded.lunch && <span>🌞</span>}
                                                    {subscription.mealsIncluded.dinner && <span>🌙</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <Button variant="ghost" className="w-full">
                                            View Details
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* KYC Alert */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mt-8"
                >
                    <div className="flex items-start gap-4">
                        <MdVerified className="w-6 h-6 text-yellow-600 mt-1" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Complete Your KYC</h3>
                            <p className="text-gray-700 mb-4">
                                Get verified to accept connection requests and build trust with tenants.
                            </p>
                            <Button variant="secondary" onClick={() => navigate('/kyc/upload')}>
                                Upload KYC Documents
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProviderDashboard;

