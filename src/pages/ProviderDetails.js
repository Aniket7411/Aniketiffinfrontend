import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdLocationOn, MdPeople, MdAttachMoney, MdRestaurant, MdVerified, MdMessage } from 'react-icons/md';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { CiStar } from 'react-icons/ci';
import { providerAPI, connectionAPI } from '../services/api';
import { mockProviderDetail } from '../services/mockData';

const ProviderDetails = () => {
    const { providerId } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();
    const [showConnectionModal, setShowConnectionModal] = useState(false);
    const [connectionMessage, setConnectionMessage] = useState('');
    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProviderDetails();
    }, [providerId]);

    const fetchProviderDetails = async () => {
        try {
            const response = await providerAPI.getById(providerId);
            setProvider(response.data.data.provider);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching provider:', error);
            // Fallback to mock data
            setProvider(mockProviderDetail);
            setLoading(false);
        }
    };

    const handleSendConnection = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        if (user?.role !== 'tenant') {
            alert('Only tenants can send connection requests');
            return;
        }

        try {
            await connectionAPI.sendRequest({
                providerId,
                message: connectionMessage
            });

            alert('Connection request sent successfully!');
            setShowConnectionModal(false);
            setConnectionMessage('');
        } catch (error) {
            console.error('Error sending connection:', error);
            alert(error.response?.data?.message || 'Failed to send request');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!provider) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Provider not found</p>
            </div>
        );
    }

    // Use fetched provider data
    const providerData = provider || {
        id: providerId,
        displayName: "Provider",
        bio: "Serving authentic North Indian home-style food with love and care. Using fresh ingredients and traditional recipes passed down through generations.",
        location: {
            address: '123, ABC Apartments',
            area: 'Koramangala',
            city: 'Bangalore',
            pincode: '560034'
        },
        cuisineTypes: ['North Indian', 'Punjabi', 'Rajasthani'],
        specialties: ['Homemade Parathas', 'Dal Tadka', 'Rajma Chawal', 'Paneer Butter Masala'],
        foodType: 'veg',
        cookingStyle: 'home-style',
        mealsOffered: {
            lunch: { available: true, time: '12:00 PM - 2:00 PM' },
            dinner: { available: true, time: '7:00 PM - 9:00 PM' }
        },
        menuItems: [
            {
                mealType: 'lunch',
                items: ['4 Roti', 'Dal', 'Rice', 'Sabji', 'Salad'],
                description: 'Complete home-style lunch',
                price: 100,
                isVeg: true
            },
            {
                mealType: 'dinner',
                items: ['4 Roti/2 Paratha', 'Dal/Curry', 'Rice', 'Sabji', 'Pickle'],
                description: 'Wholesome dinner meal',
                price: 110,
                isVeg: true
            }
        ],
        priceRange: { min: 80, max: 150 },
        maxTenants: 5,
        currentTenants: 3,
        kycStatus: 'verified',
        rating: 4.8,
        totalReviews: 24,
        totalSubscriptions: 35,
        isActive: true,
        isAvailable: true,
        reviews: [
            {
                id: 'r1',
                tenantName: 'Rahul K.',
                rating: 5,
                comment: 'Excellent food quality! Tastes just like home-cooked meals. Highly recommended!',
                date: '2024-11-15',
                aspects: { foodQuality: 5, hygiene: 5, punctuality: 5, behavior: 5 }
            },
            {
                id: 'r2',
                tenantName: 'Sneha M.',
                rating: 4,
                comment: 'Great food and on-time delivery. The parathas are amazing!',
                date: '2024-11-10',
                aspects: { foodQuality: 5, hygiene: 4, punctuality: 4, behavior: 5 }
            }
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 pb-12">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-secondary-400 to-primary-500 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl font-bold font-heading text-gray-800">
                                    {providerData.displayName}
                                </h1>
                                {providerData.kycStatus === 'verified' && (
                                    <div className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full">
                                        <MdVerified className="w-4 h-4" />
                                        <span className="text-sm font-semibold">Verified</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-4 text-gray-700 mb-4">
                                <div className="flex items-center gap-2">
                                    <MdLocationOn className="w-5 h-5" />
                                    <span>{providerData.location.area}, {providerData.location.city}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full">
                                    <CiStar className="w-5 h-5 text-yellow-500" />
                                    <span className="font-bold">{providerData.rating}</span>
                                    <span className="text-gray-600">({providerData.totalReviews} reviews)</span>
                                </div>
                            </div>
                            <p className="text-gray-700 text-lg max-w-2xl">{providerData.bio}</p>
                        </div>
                        <Button
                            variant="primary"
                            icon={MdMessage}
                            onClick={() => setShowConnectionModal(true)}
                            className="bg-white text-primary-600 hover:bg-gray-50"
                        >
                            Send Connection Request
                        </Button>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Stats</h2>
                            <div className="grid grid-cols-4 gap-4">
                                <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                                    <MdPeople className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-gray-800">{providerData.currentTenants}/{providerData.maxTenants}</p>
                                    <p className="text-sm text-gray-600">Capacity</p>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                                    <CiStar className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-gray-800">{providerData.rating}</p>
                                    <p className="text-sm text-gray-600">Rating</p>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                                    <MdVerified className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-gray-800">{providerData.totalSubscriptions || 0}</p>
                                    <p className="text-sm text-gray-600">Total Served</p>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl">
                                    <MdAttachMoney className="w-8 h-8 text-secondary-600 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-gray-800">₹{providerData.priceRange.min}-{providerData.priceRange.max}</p>
                                    <p className="text-sm text-gray-600">Price Range</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Menu */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <MdRestaurant className="text-primary-500" />
                                Menu
                            </h2>
                            <div className="space-y-4">
                                {providerData.menuItems?.map((item, index) => (
                                    <div key={index} className="border-2 border-gray-100 rounded-xl p-4 hover:border-primary-300 transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-800 capitalize">{item.mealType}</h3>
                                                <p className="text-gray-600 text-sm">{item.description}</p>
                                            </div>
                                            <span className="text-2xl font-bold text-primary-600">₹{item.price}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {item.items.map((food, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                                    🥗 {food}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Reviews */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews ({providerData.totalReviews})</h2>
                            <div className="space-y-4">
                                {providerData.reviews?.map((review) => (
                                    <div key={review.id} className="border-2 border-gray-100 rounded-xl p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-gray-800">{review.tenantName}</h4>
                                                <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                                                <CiStar className="w-4 h-4 text-yellow-500" />
                                                <span className="font-bold text-gray-800">{review.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-3">{review.comment}</p>
                                        <div className="grid grid-cols-4 gap-2">
                                            {Object.entries(review.aspects).map(([key, value]) => (
                                                <div key={key} className="text-center p-2 bg-gray-50 rounded-lg">
                                                    <p className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                                                    <p className="font-bold text-gray-800">{value}/5</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Cuisine & Specialties */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Cuisines</h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {providerData.cuisineTypes?.map((cuisine) => (
                                    <span key={cuisine} className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full text-sm font-semibold">
                                        {cuisine}
                                    </span>
                                ))}
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mb-4">Specialties</h3>
                            <div className="space-y-2">
                                {providerData.specialties?.map((specialty, index) => (
                                    <div key={index} className="flex items-center gap-2 text-gray-700">
                                        <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                                        {specialty}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Availability */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Meal Timings</h3>
                            <div className="space-y-3">
                                {providerData.mealsOffered?.breakfast?.available && (
                                    <div className="p-3 bg-yellow-50 rounded-lg">
                                        <p className="font-semibold text-gray-800">🌅 Breakfast</p>
                                        <p className="text-sm text-gray-600">{providerData.mealsOffered.breakfast.time}</p>
                                    </div>
                                )}
                                {providerData.mealsOffered?.lunch?.available && (
                                    <div className="p-3 bg-orange-50 rounded-lg">
                                        <p className="font-semibold text-gray-800">🌞 Lunch</p>
                                        <p className="text-sm text-gray-600">{providerData.mealsOffered.lunch.time}</p>
                                    </div>
                                )}
                                {providerData.mealsOffered?.dinner?.available && (
                                    <div className="p-3 bg-purple-50 rounded-lg">
                                        <p className="font-semibold text-gray-800">🌙 Dinner</p>
                                        <p className="text-sm text-gray-600">{providerData.mealsOffered.dinner.time}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Location */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-lg p-6"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Location</h3>
                            <div className="space-y-2 text-gray-700">
                                <p>{providerData.location.address}</p>
                                <p>{providerData.location.area}</p>
                                <p>{providerData.location.city} - {providerData.location.pincode}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Connection Modal */}
            {showConnectionModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl p-8 max-w-md w-full"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Send Connection Request</h2>
                        <p className="text-gray-600 mb-4">
                            Introduce yourself and let {providerData.displayName} know about your requirements.
                        </p>
                        <textarea
                            value={connectionMessage}
                            onChange={(e) => setConnectionMessage(e.target.value)}
                            placeholder="Hi, I'm looking for home-style veg food for lunch and dinner..."
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none mb-4 min-h-[120px]"
                        />
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => setShowConnectionModal(false)} className="flex-1">
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleSendConnection} className="flex-1">
                                Send Request
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ProviderDetails;

