import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdRestaurant, MdLocationOn, MdAttachMoney, MdPeople, MdSave } from 'react-icons/md';
import Button from '../components/Button';
import { providerAPI } from '../services/api';

const ProviderProfileEdit = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        displayName: '',
        bio: '',
        location: {
            address: '',
            area: '',
            city: '',
            state: '',
            pincode: ''
        },
        cuisineTypes: [],
        foodType: 'veg',
        priceRange: {
            min: '',
            max: ''
        },
        maxTenants: 5,
        mealsOffered: {
            breakfast: { available: false, time: '' },
            lunch: { available: true, time: '12:00 PM - 2:00 PM' },
            dinner: { available: true, time: '7:00 PM - 9:00 PM' }
        },
        sampleFoodAvailable: false,
        sampleFoodDetails: {
            description: '',
            availableDays: [],
            bookingRequired: true
        }
    });

    const cuisineOptions = [
        'North Indian', 'South Indian', 'Chinese', 'Continental',
        'Punjabi', 'Bengali', 'Gujarati', 'Maharashtrian',
        'Kerala', 'Tamil', 'Hyderabadi', 'Rajasthani'
    ];

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await providerAPI.getProfile();
            const profile = response.data.data.provider;
            setFormData({
                displayName: profile.displayName || '',
                bio: profile.bio || '',
                location: profile.location || {
                    address: '', area: '', city: '', state: '', pincode: ''
                },
                cuisineTypes: profile.cuisineTypes || [],
                foodType: profile.foodType || 'veg',
                priceRange: profile.priceRange || { min: '', max: '' },
                maxTenants: profile.maxTenants || 5,
                mealsOffered: profile.mealsOffered || {
                    breakfast: { available: false, time: '' },
                    lunch: { available: true, time: '12:00 PM - 2:00 PM' },
                    dinner: { available: true, time: '7:00 PM - 9:00 PM' }
                },
                sampleFoodAvailable: profile.sampleFoodAvailable || false,
                sampleFoodDetails: profile.sampleFoodDetails || {
                    description: '',
                    availableDays: [],
                    bookingRequired: true
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
            await providerAPI.updateProfile(formData);
            alert('Profile updated successfully!');
            navigate('/provider/dashboard');
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
            cuisineTypes: prev.cuisineTypes.includes(cuisine)
                ? prev.cuisineTypes.filter(c => c !== cuisine)
                : [...prev.cuisineTypes, cuisine]
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-2xl p-8"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-secondary-400 to-primary-500 rounded-2xl flex items-center justify-center">
                                <MdRestaurant className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold font-heading text-gray-800 mb-2">
                            Complete Your Provider Profile
                        </h1>
                        <p className="text-gray-600">
                            Add details to start receiving connection requests from tenants
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Info */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <MdRestaurant className="text-primary-500" />
                                Kitchen Details
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Display Name / Kitchen Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.displayName}
                                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                        placeholder="Priya's Home Kitchen"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Bio / Description
                                    </label>
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        placeholder="Tell tenants about your cooking style, specialties, and experience..."
                                        rows="4"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <MdLocationOn className="text-primary-500" />
                                Location Details
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

                        {/* Cuisine Types */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Cuisine Types</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {cuisineOptions.map(cuisine => (
                                    <button
                                        key={cuisine}
                                        type="button"
                                        onClick={() => toggleCuisine(cuisine)}
                                        className={`px-4 py-3 rounded-xl font-semibold transition-all ${formData.cuisineTypes.includes(cuisine)
                                            ? 'bg-primary-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {cuisine}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Food Type */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Food Type</h2>
                            <div className="flex gap-4">
                                {['veg', 'non-veg', 'both'].map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, foodType: type })}
                                        className={`flex-1 px-6 py-4 rounded-xl font-semibold transition-all ${formData.foodType === type
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {type === 'veg' ? '🥗 Veg Only' :
                                            type === 'non-veg' ? '🍗 Non-Veg Only' :
                                                '🍽️ Both'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Pricing */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <MdAttachMoney className="text-primary-500" />
                                Pricing
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Minimum Price (per meal)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.priceRange.min}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            priceRange: { ...formData.priceRange, min: e.target.value }
                                        })}
                                        placeholder="80"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Maximum Price (per meal)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.priceRange.max}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            priceRange: { ...formData.priceRange, max: e.target.value }
                                        })}
                                        placeholder="150"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Max Tenants */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <MdPeople className="text-primary-500" />
                                Maximum Tenants
                            </h2>
                            <input
                                type="number"
                                value={formData.maxTenants}
                                onChange={(e) => setFormData({ ...formData, maxTenants: e.target.value })}
                                min="1"
                                max="20"
                                className="w-full md:w-1/3 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                            />
                        </div>

                        {/* Meals Offered */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Meals Offered</h2>
                            <div className="space-y-4">
                                {['breakfast', 'lunch', 'dinner'].map(meal => (
                                    <div key={meal} className="flex items-center flex-wrap gap-4 p-4 bg-gray-50 rounded-xl">
                                        <input
                                            type="checkbox"
                                            checked={formData.mealsOffered[meal].available}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                mealsOffered: {
                                                    ...formData.mealsOffered,
                                                    [meal]: {
                                                        ...formData.mealsOffered[meal],
                                                        available: e.target.checked
                                                    }
                                                }
                                            })}
                                            className="w-5 h-5"
                                        />
                                        <span className="font-semibold capitalize">{meal}</span>
                                        {formData.mealsOffered[meal].available && (
                                            <input
                                                type="text"
                                                value={formData.mealsOffered[meal].time}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    mealsOffered: {
                                                        ...formData.mealsOffered,
                                                        [meal]: {
                                                            ...formData.mealsOffered[meal],
                                                            time: e.target.value
                                                        }
                                                    }
                                                })}
                                                placeholder="e.g., 12:00 PM - 2:00 PM"
                                                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 outline-none"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sample Food Offering */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                🍽️ Sample Food Offering (Optional)
                            </h2>

                            <div className="flex items-center gap-3 mb-4">
                                <input
                                    type="checkbox"
                                    id="sampleFood"
                                    checked={formData.sampleFoodAvailable}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        sampleFoodAvailable: e.target.checked
                                    })}
                                    className="w-5 h-5 text-primary-600 rounded"
                                />
                                <label htmlFor="sampleFood" className="font-semibold text-gray-700 cursor-pointer">
                                    I offer free sample food to new potential tenants
                                </label>
                            </div>

                            {formData.sampleFoodAvailable && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Sample Description
                                        </label>
                                        <textarea
                                            value={formData.sampleFoodDetails.description}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                sampleFoodDetails: {
                                                    ...formData.sampleFoodDetails,
                                                    description: e.target.value
                                                }
                                            })}
                                            placeholder="e.g., Try our signature Dal Makhani with rice and roti"
                                            rows="3"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none resize-none"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Describe what sample you'll provide
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Available Days for Sample
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                                <label key={day} className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-50 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.sampleFoodDetails.availableDays.includes(day)}
                                                        onChange={(e) => {
                                                            const days = formData.sampleFoodDetails.availableDays;
                                                            setFormData({
                                                                ...formData,
                                                                sampleFoodDetails: {
                                                                    ...formData.sampleFoodDetails,
                                                                    availableDays: e.target.checked
                                                                        ? [...days, day]
                                                                        : days.filter(d => d !== day)
                                                                }
                                                            });
                                                        }}
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm font-medium">{day.slice(0, 3)}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                                        <input
                                            type="checkbox"
                                            id="bookingRequired"
                                            checked={formData.sampleFoodDetails.bookingRequired}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                sampleFoodDetails: {
                                                    ...formData.sampleFoodDetails,
                                                    bookingRequired: e.target.checked
                                                }
                                            })}
                                            className="w-5 h-5"
                                        />
                                        <label htmlFor="bookingRequired" className="text-sm text-gray-700 cursor-pointer">
                                            <strong>Booking required</strong> - Tenant must book in advance for sample
                                        </label>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <p className="text-sm text-blue-800">
                                            💡 <strong>Tip:</strong> Offering free samples helps tenants try your food before committing to a subscription!
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/provider/dashboard')}
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

export default ProviderProfileEdit;

