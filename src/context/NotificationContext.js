import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);

    // Fetch notifications when user is authenticated
    useEffect(() => {
        if (isAuthenticated) {
            fetchNotifications();
            fetchUnreadCount();

            // Poll for new notifications every 30 seconds
            const interval = setInterval(() => {
                fetchUnreadCount();
            }, 30000);

            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    const fetchNotifications = async () => {
        if (!isAuthenticated) return;

        setLoading(true);
        try {
            // TODO: Replace with actual API call
            // const response = await notificationAPI.getNotifications();
            // setNotifications(response.data.data.notifications);

            // Mock data for now
            const mockNotifications = [
                {
                    id: '1',
                    type: 'connection_request',
                    title: 'New Connection Request',
                    message: 'Rahul Kumar sent you a connection request',
                    isRead: false,
                    createdAt: new Date().toISOString()
                },
                {
                    id: '2',
                    type: 'request_accepted',
                    title: 'Request Accepted',
                    message: "Priya's Kitchen accepted your connection request",
                    isRead: false,
                    createdAt: new Date(Date.now() - 3600000).toISOString()
                }
            ];
            setNotifications(mockNotifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUnreadCount = async () => {
        if (!isAuthenticated) return;

        try {
            // TODO: Replace with actual API call
            // const response = await notificationAPI.getUnreadCount();
            // setUnreadCount(response.data.data.unreadCount);

            // Mock count for now
            setUnreadCount(notifications.filter(n => !n.isRead).length);
        } catch (error) {
            console.error('Error fetching unread count:', error);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            // TODO: Replace with actual API call
            // await notificationAPI.markAsRead(notificationId);

            setNotifications(prev =>
                prev.map(notif =>
                    notif.id === notificationId
                        ? { ...notif, isRead: true }
                        : notif
                )
            );
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            // TODO: Replace with actual API call
            // await notificationAPI.markAllAsRead();

            setNotifications(prev =>
                prev.map(notif => ({ ...notif, isRead: true }))
            );
            setUnreadCount(0);
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    const addNotification = (notification) => {
        setNotifications(prev => [notification, ...prev]);
        setUnreadCount(prev => prev + 1);
    };

    const value = {
        notifications,
        unreadCount,
        loading,
        fetchNotifications,
        fetchUnreadCount,
        markAsRead,
        markAllAsRead,
        addNotification
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};


