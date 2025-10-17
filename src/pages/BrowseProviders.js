import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdSearch, MdLocationOn, MdStar, MdRestaurant, MdPeople, MdAttachMoney, MdFilterList } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { providerAPI } from '../services/api';
import { mockProviders } from '../services/mockData';
const BrowseProviders = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        area: '',
        city: '',
        cuisineType: '',
        foodType: 'all',
        maxPrice: 150,
        mealType: 'all'
    });
    const [showFilters, setShowFilters] = useState(false);
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProviders();
    }, []);

    const fetchProviders = async () => {
        setLoading(true);
        try {
            const params = {
                area: filters.area || undefined,
                city: filters.city || undefined,
                cuisineType: filters.cuisineType || undefined,
                foodType: filters.foodType !== 'all' ? filters.foodType : undefined,
                maxPrice: filters.maxPrice,
                mealType: filters.mealType !== 'all' ? filters.mealType : undefined
            };

            const response = await providerAPI.search(params);
            setProviders(response.data.data.providers || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching providers:', error);
            // Fallback to mock data in development
            if (process.env.REACT_APP_ENV === 'development') {
                setProviders(mockProviders);
            }
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchProviders();
    };

    const handleProviderClick = (providerId) => {
        navigate(`/provider/${providerId}`);
    };

    console.log("providersproviders", providers)

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold font-heading bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                        Browse Providers
                    </h1>
                    <Button
                        variant="outline"
                        icon={MdFilterList}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        Filters
                    </Button>
                </div>
                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-6 mb-8"
                >
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search by area, cuisine, or name..."
                                value={filters.area}
                                onChange={(e) => setFilters({ ...filters, area: e.target.value })}
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                            />
                        </div>
                        <Button variant="primary" icon={MdSearch} onClick={handleSearch}>
                            Search
                        </Button>
                    </div>

                    {/* Filters */}
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 pt-4 border-t border-gray-200"
                        >
                            <div className="grid Fa:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Food Type</label>
                                    <select
                                        value={filters.foodType}
                                        onChange={(e) => setFilters({ ...filters, foodType: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                                    >
                                        <option value="all">All</option>
                                        <option value="veg">Veg</option>
                                        <option value="non-veg">Non-Veg</option>
                                        <option value="both">Both</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Meal Type</label>
                                    <select
                                        value={filters.mealType}
                                        onChange={(e) => setFilters({ ...filters, mealType: e.target.value })}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                                    >
                                        <option value="all">All</option>
                                        <option value="breakfast">Breakfast</option>
                                        <option value="lunch">Lunch</option>
                                        <option value="dinner">Dinner</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Max Price: ₹{filters.maxPrice}
                                    </label>
                                    <input
                                        type="range"
                                        min="50"
                                        max="300"
                                        value={filters.maxPrice}
                                        onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                                        className="w-full h-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </motion.div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Found <span className="font-bold text-primary-600">{providers.length}</span> providers in your area
                    </p>
                </div>

                {/* Providers Grid */}
                {!loading && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {providers.map((provider, index) => (
                            <motion.div
                                key={provider._id || provider.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => handleProviderClick(provider._id || provider.id)}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
                            >
                                {/* Header */}
                                <div className="bg-gradient-to-r from-secondary-400 to-primary-500 p-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-1">{provider.displayName}</h3>
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <MdLocationOn className="w-4 h-4" />
                                                <span className="text-sm">{provider.location.area}, {provider.location.city}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full">
                                            <MdStar className="w-4 h-4 text-yellow-500" />
                                            <span className="font-bold text-gray-800">{provider.rating}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <p className="text-gray-600 mb-4 line-clamp-2">{provider.bio}</p>

                                    {/* Cuisine Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {provider.cuisineTypes.map((cuisine) => (
                                            <span
                                                key={cuisine}
                                                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold"
                                            >
                                                {cuisine}
                                            </span>
                                        ))}
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${provider.foodType === 'veg' ? 'bg-green-100 text-green-700' :
                                            provider.foodType === 'non-veg' ? 'bg-red-100 text-red-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                            {provider.foodType === 'veg' ? '🥗 Veg' :
                                                provider.foodType === 'non-veg' ? '🍗 Non-Veg' : '🍽️ Both'}
                                        </span>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                                            <MdAttachMoney className="w-5 h-5 text-primary-500 mx-auto mb-1" />
                                            <p className="text-xs text-gray-500">Price Range</p>
                                            <p className="font-bold text-gray-800">₹{provider.priceRange.min}-{provider.priceRange.max}</p>
                                        </div>
                                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                                            <MdPeople className="w-5 h-5 text-primary-500 mx-auto mb-1" />
                                            <p className="text-xs text-gray-500">Capacity</p>
                                            <p className="font-bold text-gray-800">{provider.currentTenants}/{provider.maxTenants}</p>
                                        </div>
                                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                                            <MdStar className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                                            <p className="text-xs text-gray-500">Reviews</p>
                                            <p className="font-bold text-gray-800">{provider.totalReviews}</p>
                                        </div>
                                    </div>

                                    {/* Meals Offered */}
                                    <div className="flex gap-2">
                                        {provider.mealsOffered.breakfast?.available && (
                                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">🌅 Breakfast</span>
                                        )}
                                        {provider.mealsOffered.lunch?.available && (
                                            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">🌞 Lunch</span>
                                        )}
                                        {provider.mealsOffered.dinner?.available && (
                                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">🌙 Dinner</span>
                                        )}
                                    </div>

                                    {/* Action Button */}
                                    <Link to={`/provider/${provider._id || provider.id}`}>
                                        <Button variant="primary" className="w-full mt-4">
                                            View Details
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && providers.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <MdRestaurant className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No providers found</h3>
                        <p className="text-gray-600">Try adjusting your filters or search in a different area</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default BrowseProviders;

