import React from 'react';
import { motion } from 'framer-motion';
import { MdRestaurant, MdVerified, MdPeople, MdStar, MdTrendingUp, MdSecurity } from 'react-icons/md';

const AboutUs = () => {
    const features = [
        {
            icon: MdRestaurant,
            title: 'Authentic Home Food',
            description: 'Connect with verified home cooks who prepare food with love and care, just like home.',
            color: 'from-primary-500 to-primary-600'
        },
        {
            icon: MdVerified,
            title: 'Verified Providers',
            description: 'All our providers undergo strict KYC verification to ensure trust and safety.',
            color: 'from-green-500 to-green-600'
        },
        {
            icon: MdPeople,
            title: 'Community Driven',
            description: 'A peer-to-peer platform connecting local home cooks with students and professionals.',
            color: 'from-secondary-400 to-primary-500'
        },
        {
            icon: MdStar,
            title: 'Quality Assured',
            description: 'Transparent reviews and ratings help you make informed decisions.',
            color: 'from-yellow-500 to-yellow-600'
        },
        {
            icon: MdTrendingUp,
            title: 'Fair Pricing',
            description: 'Direct connection means no middlemen markups. Fair prices for everyone.',
            color: 'from-blue-500 to-blue-600'
        },
        {
            icon: MdSecurity,
            title: 'Safe & Secure',
            description: 'End-to-end security with encrypted payments and secure data handling.',
            color: 'from-accent-500 to-accent-600'
        }
    ];

    const stats = [
        { number: '150+', label: 'Home Cooks' },
        { number: '500+', label: 'Happy Customers' },
        { number: '10,000+', label: 'Meals Served' },
        { number: '4.8', label: 'Average Rating' }
    ];

    const team = [
        { role: 'For Home Cooks', description: 'Earn by sharing your cooking passion. Turn your kitchen into a business.' },
        { role: 'For Students', description: 'Get homemade food at affordable prices. No more mess food!' },
        { role: 'For Professionals', description: 'Enjoy healthy, homemade meals delivered to your doorstep.' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-secondary-400 to-primary-500 py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold font-heading text-gray-800 mb-6">
                            About AnikeTiffin
                        </h1>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Connecting hearts through homemade food. We believe everyone deserves access to healthy,
                            delicious, home-cooked meals, and every home cook deserves the opportunity to share their passion.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 -mt-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                            <p className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                                {stat.number}
                            </p>
                            <p className="text-gray-600 font-semibold">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Our Story */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            <p>
                                AnikeTiffin was born from a simple observation: students and professionals living away from home
                                craved homemade food, while talented home cooks had the passion and skills to provide it.
                            </p>
                            <p>
                                We created a platform that bridges this gap - a peer-to-peer marketplace where home cooks
                                (mostly homemakers and families) can connect directly with people seeking authentic,
                                homemade tiffin services.
                            </p>
                            <p>
                                Unlike traditional food delivery platforms, we focus on building long-term relationships
                                through subscription-based tiffin services. This ensures consistency, trust, and fair
                                pricing for both providers and customers.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-2xl shadow-2xl p-8"
                    >
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-3 h-3 bg-primary-500 rounded-full mt-2"></div>
                                <p className="text-gray-700">
                                    <strong>Empower Home Cooks:</strong> Provide a platform for home cooks to monetize their skills.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-3 h-3 bg-secondary-500 rounded-full mt-2"></div>
                                <p className="text-gray-700">
                                    <strong>Quality Food Access:</strong> Make healthy, homemade food accessible to everyone.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-3 h-3 bg-accent-500 rounded-full mt-2"></div>
                                <p className="text-gray-700">
                                    <strong>Build Community:</strong> Foster connections between food lovers and home chefs.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                                <p className="text-gray-700">
                                    <strong>Trust & Safety:</strong> Ensure verified, safe transactions for all users.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We're more than just a platform - we're a community of food lovers.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all"
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Who We Serve */}
            <div className="max-w-7xl mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Who We Serve</h2>
                    <p className="text-xl text-gray-600">
                        Building connections across our community
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {team.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * index }}
                            className="bg-white rounded-2xl shadow-lg p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">
                                    {index === 0 ? '👨‍🍳' : index === 1 ? '🎓' : '💼'}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.role}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Join our growing community of food lovers and home chefs today!
                        </p>
                        <div className="flex gap-4 justify-center">
                            <a href="/provider/register">
                                <button className="px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:shadow-lg transition-all">
                                    Become a Provider
                                </button>
                            </a>
                            <a href="/tenant/register">
                                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-all">
                                    Find Tiffin Service
                                </button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;


