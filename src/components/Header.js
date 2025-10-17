import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MdRestaurant, MdMenu, MdClose, MdDashboard, MdSearch, MdPerson, MdLogout, MdAdminPanelSettings } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import NotificationDropdown from './NotificationDropdown';

const Header = () => {
    const { isAuthenticated, user, logout, isAdmin } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
        navigate('/');
    };

    // Role-based navigation links
    const getNavigationLinks = () => {
        if (!isAuthenticated) {
            return [
                { name: 'Browse Providers', path: '/browse-providers', icon: MdSearch },
                { name: 'About', path: '/about', icon: MdRestaurant },
                { name: 'Contact', path: '/contact', icon: MdPerson },
            ];
        }

        if (isAdmin) {
            return [
                { name: 'Dashboard', path: '/admin/dashboard', icon: MdAdminPanelSettings },
            ];
        }

        // Check user role from user object
        const userRole = user?.role;

        if (userRole === 'provider') {
            return [
                { name: 'Dashboard', path: '/provider/dashboard', icon: MdDashboard },
                { name: 'Browse Providers', path: '/browse-providers', icon: MdSearch },
                { name: 'Contact', path: '/contact', icon: MdPerson },
            ];
        }

        if (userRole === 'tenant') {
            return [
                { name: 'Dashboard', path: '/tenant/dashboard', icon: MdDashboard },
                { name: 'Browse Providers', path: '/browse-providers', icon: MdSearch },
                { name: 'Contact', path: '/contact', icon: MdPerson },
            ];
        }

        // Default for authenticated users without specific role
        return [
            { name: 'Browse Providers', path: '/browse-providers', icon: MdSearch },
        ];
    };

    const navLinks = getNavigationLinks();

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
                            <MdRestaurant className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold font-heading bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                                AnikeTiffin
                            </h1>
                            <p className="text-xs text-gray-500 hidden sm:block">Homemade with Love</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="flex items-center gap-2 text-gray-700 hover:text-primary-600 font-semibold transition-colors"
                            >
                                <link.icon className="w-5 h-5" />
                                {link.name}
                            </Link>
                        ))}

                        {isAuthenticated ? (
                            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                                {/* Notification Bell */}
                                <NotificationDropdown />

                                <div className="text-right hidden lg:block">
                                    <p className="text-sm text-gray-600">Welcome,</p>
                                    <p className="font-semibold text-gray-800 text-sm">
                                        {user?.name || user?.email?.split('@')[0] || 'User'}
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={handleLogout}
                                    icon={MdLogout}
                                    className="text-sm"
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
                                <Link to="/provider/register">
                                    <Button variant="ghost" className="text-sm">
                                        Become Provider
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button variant="primary" className="text-sm">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {mobileMenuOpen ? (
                            <MdClose className="w-6 h-6 text-gray-800" />
                        ) : (
                            <MdMenu className="w-6 h-6 text-gray-800" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden border-t border-gray-200 bg-white overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {isAuthenticated && (
                                <div className="pb-4 mb-4 border-b border-gray-200">
                                    <p className="text-sm text-gray-600">Logged in as</p>
                                    <p className="font-bold text-gray-800">
                                        {user?.name || user?.email}
                                    </p>
                                    {user?.role && (
                                        <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${user.role === 'provider' ? 'bg-secondary-100 text-secondary-700' :
                                            user.role === 'tenant' ? 'bg-primary-100 text-primary-700' :
                                                'bg-accent-100 text-accent-700'
                                            }`}>
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    )}
                                </div>
                            )}

                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <link.icon className="w-5 h-5 text-primary-500" />
                                    <span className="font-semibold text-gray-800">{link.name}</span>
                                </Link>
                            ))}

                            {isAuthenticated ? (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors text-red-600 w-full"
                                >
                                    <MdLogout className="w-5 h-5" />
                                    <span className="font-semibold">Logout</span>
                                </button>
                            ) : (
                                <div className="space-y-2 pt-4 border-t border-gray-200">
                                    <Link
                                        to="/provider/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block"
                                    >
                                        <Button variant="outline" className="w-full">
                                            Become Provider
                                        </Button>
                                    </Link>
                                    <Link
                                        to="/tenant/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block"
                                    >
                                        <Button variant="outline" className="w-full">
                                            Find Tiffin Service
                                        </Button>
                                    </Link>
                                    <Link
                                        to="/signup"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block"
                                    >
                                        <Button variant="primary" className="w-full">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;

