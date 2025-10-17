import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdRestaurant, MdDeliveryDining, MdStar } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { CiStar } from 'react-icons/ci';

const Home = () => {
    const { isAuthenticated, user, logout, isAdmin } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h2 className="text-6xl font-bold font-heading mb-6">
                        <span className="bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent">
                            Delicious Tiffin
                        </span>
                        <br />
                        <span className="text-gray-800">
                            Delivered to Your Door
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        Experience homemade quality meals from multiple vendors. Fresh, tasty, and delivered hot!
                    </p>

                    {!isAuthenticated ? (
                        <div className="space-y-6">
                            <div className="flex gap-4 justify-center">
                                <Link to="/signup">
                                    <Button variant="primary" className="text-lg px-8 py-4">
                                        Get Started
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button variant="secondary" className="text-lg px-8 py-4">
                                        Sign In
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex gap-4 justify-center">
                                <Link to="/provider/register">
                                    <Button variant="outline" className="text-base px-6 py-3">
                                        Register as Provider
                                    </Button>
                                </Link>
                                <Link to="/tenant/register">
                                    <Button variant="outline" className="text-base px-6 py-3">
                                        Register as Tenant
                                    </Button>
                                </Link>
                            </div>
                            <div className="text-center">
                                <Link to="/browse-providers" className="text-primary-600 font-semibold hover:text-primary-700">
                                    Browse Providers →
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-4 justify-center">
                            <Link to="/browse-providers">
                                <Button variant="primary" className="text-lg px-8 py-4">
                                    Browse Providers
                                </Button>
                            </Link>
                        </div>
                    )}
                </motion.div>

                {/* Features */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-24 grid md:grid-cols-3 gap-8"
                >
                    {[
                        {
                            icon: MdRestaurant,
                            title: 'Multiple Vendors',
                            description: 'Choose from a variety of home chefs and tiffin services',
                            color: 'from-primary-500 to-primary-600',
                        },
                        {
                            icon: MdDeliveryDining,
                            title: 'Fast Delivery',
                            description: 'Get your tiffin delivered hot and fresh to your doorstep',
                            color: 'from-secondary-400 to-primary-500',
                        },
                        {
                            icon: CiStar,
                            title: 'Quality Food',
                            description: 'Homemade quality meals prepared with love and care',
                            color: 'from-accent-500 to-accent-600',
                        },
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
                        >
                            <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                                <feature.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Home;

