import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdHome, MdLocationOn, MdRestaurant, MdAttachMoney, MdSave } from 'react-icons/md';
import Button from '../components/Button';
import { tenantAPI } from '../services/api';

const TenantProfileEdit = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        displayName: '',
        accommodationType: 'pg',
        location: {
            address: '',
            area: '',
            city: '',
            state: '',
            pincode: ''
        },
        foodPreferences: {
            type: 'veg',
            cuisinePreferences: [],
            tastePreference: 'medium',
            allergies: [],
            avoidItems: []
        },
        mealsRequired: {
            breakfast: { required: false },
            lunch: { required: true },
            dinner: { required: true }
        },
        budgetRange: {
            min: '',
            max: '',
            perMeal: true
        }
    });

    const cuisineOptions = [
        'North Indian', 'South Indian', 'Chinese', 'Continental',
        'Punjabi', 'Bengali', 'Gujarati', 'Maharashtrian'
    ];

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await tenantAPI.getProfile();
            const profile = response.data.data.tenant;
            setFormData({
                displayName: profile.displayName || '',
                accommodationType: profile.accommodationType || 'pg',
                location: profile.location || {
                    address: '', area: '', city: '', state: '', pincode: ''
                },
                foodPreferences: profile.foodPreferences || {
                    type: 'veg',
                    cuisinePreferences: [],
                    tastePreference: 'medium',
                    allergies: [],
                    avoidItems: []
                },
                mealsRequired: profile.mealsRequired || {
                    breakfast: { required: false },
                    lunch: { required: true },
                    dinner: { required: true }
                },
                budgetRange: profile.budgetRange || {
                    min: '', max: '', perMeal: true
                }
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await tenantAPI.updateProfile(formData);
            alert('Profile updated successfully!');
            navigate('/tenant/dashboard');
        } catch (error) {
            console.error('Update error:', error);
            alert(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const toggleCuisine = (cuisine) => {
        setFormData(prev => ({
            ...prev,
            foodPreferences: {
                ...prev.foodPreferences,
                cuisinePreferences: prev.foodPreferences.cuisinePreferences.includes(cuisine)
                    ? prev.foodPreferences.cuisinePreferences.filter(c => c !== cuisine)
                    : [...prev.foodPreferences.cuisinePreferences, cuisine]
            }
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-2xl p-8"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
                                <MdHome className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold font-heading text-gray-800 mb-2">
                            Complete Your Tenant Profile
                        </h1>
                        <p className="text-gray-600">
                            Add preferences to help us find the perfect tiffin service for you
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Info */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <MdHome className="text-primary-500" />
                                Basic Details
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Display Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.displayName}
                                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                        placeholder="Your Name"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Accommodation Type
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['pg', 'hostel', 'flat'].map(type => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, accommodationType: type })}
                                                className={`px-4 py-3 rounded-xl font-semibold capitalize transition-all ${formData.accommodationType === type
                                                        ? 'bg-primary-500 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <MdLocationOn className="text-primary-500" />
                                Location
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location.address}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            location: { ...formData.location, address: e.target.value }
                                        })}
                                        placeholder="123 ABC Apartments"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Area</label>
                                    <input
                                        type="text"
                                        value={formData.location.area}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            location: { ...formData.location, area: e.target.value }
                                        })}
                                        placeholder="Koramangala"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        value={formData.location.city}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            location: { ...formData.location, city: e.target.value }
                                        })}
                                        placeholder="Bangalore"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                                    <input
                                        type="text"
                                        value={formData.location.state}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            location: { ...formData.location, state: e.target.value }
                                        })}
                                        placeholder="Karnataka"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                                    <input
                                        type="text"
                                        value={formData.location.pincode}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            location: { ...formData.location, pincode: e.target.value }
                                        })}
                                        placeholder="560034"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Food Preferences */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <MdRestaurant className="text-primary-500" />
                                Food Preferences
                            </h2>

                            {/* Food Type */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Food Type</label>
                                <div className="flex gap-3">
                                    {['veg', 'non-veg', 'both'].map(type => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setFormData({
                                                ...formData,
                                                foodPreferences: { ...formData.foodPreferences, type }
                                            })}
                                            className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all ${formData.foodPreferences.type === type
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {type === 'veg' ? '🥗 Veg' : type === 'non-veg' ? '🍗 Non-Veg' : '🍽️ Both'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Cuisine Preferences */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Preferred Cuisines
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {cuisineOptions.map(cuisine => (
                                        <button
                                            key={cuisine}
                                            type="button"
                                            onClick={() => toggleCuisine(cuisine)}
                                            className={`px-4 py-3 rounded-xl font-semibold transition-all ${formData.foodPreferences.cuisinePreferences.includes(cuisine)
                                                    ? 'bg-primary-500 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {cuisine}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Taste Preference */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Spice Level
                                </label>
                                <div className="flex gap-3">
                                    {['mild', 'medium', 'spicy'].map(taste => (
                                        <button
                                            key={taste}
                                            type="button"
                                            onClick={() => setFormData({
                                                ...formData,
                                                foodPreferences: { ...formData.foodPreferences, tastePreference: taste }
                                            })}
                                            className={`flex-1 px-4 py-3 rounded-xl font-semibold capitalize transition-all ${formData.foodPreferences.tastePreference === taste
                                                    ? 'bg-accent-500 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {taste}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Meals Required */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Meals Required</h2>
                            <div className="space-y-3">
                                {['breakfast', 'lunch', 'dinner'].map(meal => (
                                    <div key={meal} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                        <input
                                            type="checkbox"
                                            checked={formData.mealsRequired[meal].required}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                mealsRequired: {
                                                    ...formData.mealsRequired,
                                                    [meal]: { required: e.target.checked }
                                                }
                                            })}
                                            className="w-5 h-5"
                                        />
                                        <span className="font-semibold capitalize text-lg">{meal}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Budget */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <MdAttachMoney className="text-primary-500" />
                                Budget Range
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Minimum Budget (₹)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.budgetRange.min}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            budgetRange: { ...formData.budgetRange, min: e.target.value }
                                        })}
                                        placeholder="80"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Maximum Budget (₹)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.budgetRange.max}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            budgetRange: { ...formData.budgetRange, max: e.target.value }
                                        })}
                                        placeholder="150"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.budgetRange.perMeal}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        budgetRange: { ...formData.budgetRange, perMeal: e.target.checked }
                                    })}
                                    className="w-4 h-4"
                                />
                                <label className="text-sm text-gray-600">Per Meal (uncheck for monthly)</label>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/tenant/dashboard')}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                loading={loading}
                                icon={MdSave}
                                className="flex-1"
                            >
                                Save Profile
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default TenantProfileEdit;


