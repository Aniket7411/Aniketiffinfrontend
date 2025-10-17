import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdNotifications, MdCheck, MdDoneAll, MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';

const NotificationDropdown = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { notifications, unreadCount, loading, markAsRead, markAllAsRead } = useNotifications();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNotificationClick = (notification) => {
        markAsRead(notification.id);
        
        // Navigate based on notification type
        if (notification.type === 'connection_request') {
            navigate('/provider/dashboard');
        } else if (notification.type === 'request_accepted' || notification.type === 'request_rejected') {
            navigate('/tenant/dashboard');
        }
        
        setIsOpen(false);
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'connection_request':
                return '🔔';
            case 'request_accepted':
                return '✅';
            case 'request_rejected':
                return '❌';
            case 'premium_granted':
                return '👑';
            case 'kyc_verified':
                return '✓';
            default:
                return '📢';
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Notification Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
                <MdNotifications className="w-6 h-6" />
                
                {/* Badge */}
                {unreadCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-0 right-0 w-5 h-5 bg-accent-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                    >
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </motion.span>
                )}
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-white font-bold text-lg">
                                    Notifications
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    <MdClose className="w-5 h-5" />
                                </button>
                            </div>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="mt-2 text-white/90 hover:text-white text-sm flex items-center gap-1"
                                >
                                    <MdDoneAll className="w-4 h-4" />
                                    Mark all as read
                                </button>
                            )}
                        </div>

                        {/* Notifications List */}
                        <div className="max-h-96 overflow-y-auto">
                            {loading ? (
                                <div className="p-8 text-center">
                                    <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                </div>
                            ) : notifications.length === 0 ? (
                                <div className="p-8 text-center">
                                    <MdNotifications className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                                    <p className="text-gray-500">No notifications yet</p>
                                </div>
                            ) : (
                                notifications.map((notification) => (
                                    <motion.div
                                        key={notification.id}
                                        whileHover={{ backgroundColor: '#f9fafb' }}
                                        onClick={() => handleNotificationClick(notification)}
                                        className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                                            !notification.isRead ? 'bg-primary-50' : ''
                                        }`}
                                    >
                                        <div className="flex gap-3">
                                            {/* Icon */}
                                            <div className="text-2xl flex-shrink-0">
                                                {getNotificationIcon(notification.type)}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h4 className="font-semibold text-gray-800 text-sm">
                                                        {notification.title}
                                                    </h4>
                                                    {!notification.isRead && (
                                                        <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-1"></span>
                                                    )}
                                                </div>
                                                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                                    {notification.message}
                                                </p>
                                                <p className="text-gray-400 text-xs mt-2">
                                                    {formatTime(notification.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {notifications.length > 0 && (
                            <div className="p-3 bg-gray-50 text-center">
                                <button
                                    onClick={() => {
                                        navigate('/notifications');
                                        setIsOpen(false);
                                    }}
                                    className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
                                >
                                    View All Notifications
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationDropdown;

