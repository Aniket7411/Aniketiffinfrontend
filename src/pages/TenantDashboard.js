import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdRestaurant, MdSearch, MdSubscriptions, MdStar, MdLocationOn, MdCheck, MdPending, MdCancel } from 'react-icons/md';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { tenantAPI, subscriptionAPI, connectionAPI } from '../services/api';
import { CiStar, CiCancel } from 'react-icons/ci';

const TenantDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('subscriptions');
    const [stats, setStats] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);
    const [connectionRequests, setConnectionRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [subsRes, requestsRes] = await Promise.all([
                subscriptionAPI.getMySubscriptions(),
                connectionAPI.getMyRequests()
            ]);

            const subs = subsRes.data.data.subscriptions || [];
            const requests = requestsRes.data.data.requests || [];

            setStats({
                activeSubscriptions: subs.filter(s => s.status === 'active').length,
                pendingRequests: requests.filter(r => r.status === 'pending').length,
                totalSpent: subs.reduce((sum, s) => sum + (s.totalPrice || 0), 0),
                providersConnected: new Set(subs.map(s => s.providerId)).size
            });

            setSubscriptions(subs);
            setConnectionRequests(requests);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard:', error);
            // Set default stats
            setStats({
                activeSubscriptions: 0,
                pendingRequests: 0,
                totalSpent: 0,
                providersConnected: 0
            });
            setLoading(false);
        }
    };

    const handlePauseSubscription = (subscriptionId) => {
        navigate(`/subscription/${subscriptionId}/pause`);
    };

    const handleReview = (subscriptionId) => {
        navigate(`/subscription/${subscriptionId}/review`);
    };

    const mockSubscriptions = [
        {
            id: 'sub1',
            provider: {
                displayName: "Priya's Home Kitchen",
                location: { area: 'Koramangala' },
                rating: 4.8
            },
            plan: 'monthly',
            mealsIncluded: { lunch: true, dinner: true },
            dailyPrice: 200,
            startDate: '2024-11-15',
            endDate: '2025-12-15',
            status: 'active'
        },
        {
            id: 'sub2',
            provider: {
                displayName: "Amma's Kitchen",
                location: { area: 'Indiranagar' },
                rating: 4.9
            },
            plan: 'weekly',
            mealsIncluded: { breakfast: true },
            dailyPrice: 80,
            startDate: '2024-12-01',
            endDate: '2024-12-07',
            status: 'active'
        }
    ];

    const mockConnectionRequests = [
        {
            id: 'req1',
            provider: {
                displayName: "Home Tiffin Service",
                location: { area: 'Whitefield' },
                rating: 4.6
            },
            message: 'Looking for home-style veg food',
            status: 'pending',
            sentAt: '2024-11-28T10:00:00Z'
        }
    ];

    // Use fetched data or fallback to mock
    const displaySubscriptions = subscriptions.length > 0 ? subscriptions : mockSubscriptions;
    const displayRequests = connectionRequests.length > 0 ? connectionRequests : mockConnectionRequests;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl font-bold font-heading text-white mb-2">Tenant Dashboard</h1>
                        <p className="text-white/90">Manage your tiffin subscriptions</p>
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
                            <MdSubscriptions className="w-8 h-8 text-primary-500" />
                            <span className="text-2xl font-bold text-gray-800">{stats.activeSubscriptions}</span>
                        </div>
                        <p className="text-gray-600 font-semibold">Active Subscriptions</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <MdPending className="w-8 h-8 text-yellow-500" />
                            <span className="text-2xl font-bold text-gray-800">{stats.pendingRequests}</span>
                        </div>
                        <p className="text-gray-600 font-semibold">Pending Requests</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <MdRestaurant className="w-8 h-8 text-accent-500" />
                            <span className="text-2xl font-bold text-gray-800">{stats.providersConnected}</span>
                        </div>
                        <p className="text-gray-600 font-semibold">Providers Connected</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl">₹</span>
                            <span className="text-2xl font-bold text-gray-800">{stats.totalSpent}</span>
                        </div>
                        <p className="text-gray-600 font-semibold">Total Spent</p>
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gradient-to-r from-secondary-400 to-primary-500 rounded-2xl p-6 shadow-lg"
                    >
                        <MdSearch className="w-12 h-12 text-white mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Find New Providers</h3>
                        <p className="text-gray-700 mb-4">Discover home cooks in your area serving delicious meals</p>
                        <Button
                            variant="secondary"
                            onClick={() => navigate('/browse-providers')}
                            className="bg-white text-primary-600 hover:bg-gray-50"
                        >
                            Browse Providers
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-6 shadow-lg"
                    >
                        <MdRestaurant className="w-12 h-12 text-white mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Update Your Preferences</h3>
                        <p className="text-white/90 mb-4">Add location, food preferences, and budget to find perfect tiffin service</p>
                        <Button
                            variant="secondary"
                            onClick={() => navigate('/tenant/profile/edit')}
                            className="bg-white text-accent-600 hover:bg-gray-50"
                        >
                            Edit Preferences
                        </Button>
                    </motion.div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-t-2xl shadow-lg">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('subscriptions')}
                            className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'subscriptions'
                                ? 'text-primary-600 border-b-2 border-primary-600'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            My Subscriptions ({subscriptions.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('requests')}
                            className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'requests'
                                ? 'text-primary-600 border-b-2 border-primary-600'
                                : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            Connection Requests ({connectionRequests.length})
                        </button>
                    </div>

                    <div className="p-6">
                        {/* Subscriptions Tab */}
                        {activeTab === 'subscriptions' && (
                            <div className="space-y-4">
                                {displaySubscriptions.map((subscription) => (
                                    <motion.div
                                        key={subscription.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary-300 transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-bold text-gray-800">
                                                        {subscription.provider.displayName}
                                                    </h3>
                                                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                                                        <CiStar className="w-4 h-4 text-yellow-500" />
                                                        <span className="text-sm font-bold text-gray-800">{subscription.provider.rating}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600 mb-2">
                                                    <MdLocationOn className="w-4 h-4" />
                                                    <span className="text-sm">{subscription.provider.location.area}</span>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${subscription.status === 'active' ? 'bg-green-100 text-green-700' :
                                                subscription.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                                            </span>
                                        </div>

                                        <div className="grid md:grid-cols-4 gap-4 mb-4">
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-600 mb-1">Plan</p>
                                                <p className="font-semibold text-gray-800 capitalize">{subscription.plan}</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-600 mb-1">Daily Price</p>
                                                <p className="font-semibold text-gray-800">₹{subscription.dailyPrice}</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-600 mb-1">Start Date</p>
                                                <p className="font-semibold text-gray-800">{new Date(subscription.startDate).toLocaleDateString()}</p>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm text-gray-600 mb-1">End Date</p>
                                                <p className="font-semibold text-gray-800">{new Date(subscription.endDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {subscription.mealsIncluded.breakfast && (
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                                                    🌅 Breakfast
                                                </span>
                                            )}
                                            {subscription.mealsIncluded.lunch && (
                                                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                                                    🌞 Lunch
                                                </span>
                                            )}
                                            {subscription.mealsIncluded.dinner && (
                                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                                                    🌙 Dinner
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex gap-3">
                                            <Button
                                                variant="outline"
                                                onClick={() => handlePauseSubscription(subscription.id)}
                                                className="flex-1"
                                            >
                                                Pause
                                            </Button>
                                            <Button
                                                variant="primary"
                                                icon={CiStar}
                                                onClick={() => handleReview(subscription.id)}
                                                className="flex-1"
                                            >
                                                Write Review
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}

                                {displaySubscriptions.length === 0 && (
                                    <div className="text-center py-12">
                                        <MdSubscriptions className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">No active subscriptions</h3>
                                        <p className="text-gray-600 mb-4">Start by finding providers in your area</p>
                                        <Button variant="primary" onClick={() => navigate('/browse-providers')}>
                                            Browse Providers
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Connection Requests Tab */}
                        {activeTab === 'requests' && (
                            <div className="space-y-4">
                                {displayRequests.map((request) => (
                                    <motion.div
                                        key={request.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="border-2 border-gray-200 rounded-xl p-6"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-1">
                                                    {request.provider.displayName}
                                                </h3>
                                                <div className="flex items-center gap-4 text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <MdLocationOn className="w-4 h-4" />
                                                        <span className="text-sm">{request.provider.location.area}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <CiStar className="w-4 h-4 text-yellow-500" />
                                                        <span className="text-sm font-bold">{request.provider.rating}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                                                Pending
                                            </span>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                            <p className="text-sm text-gray-600 mb-1">Your Message</p>
                                            <p className="text-gray-700">{request.message}</p>
                                        </div>

                                        <p className="text-sm text-gray-500">
                                            Sent on {new Date(request.sentAt).toLocaleDateString()}
                                        </p>
                                    </motion.div>
                                ))}

                                {displayRequests.length === 0 && (
                                    <div className="text-center py-12">
                                        <MdPending className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">No pending requests</h3>
                                        <p className="text-gray-600">Your connection requests will appear here</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TenantDashboard;

