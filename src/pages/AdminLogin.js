import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { MdEmail, MdLock, MdAdminPanelSettings, MdSecurity } from 'react-icons/md';
import { RiShieldKeyholeFill } from 'react-icons/ri';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    adminCode: yup.string().required('Admin code is required'),
}).required();

const AdminLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await authAPI.adminLogin({
                email: data.email,
                password: data.password,
                adminCode: data.adminCode
            });

            const { user, token } = response.data.data;
            login(user, token, true);
            navigate('/admin/dashboard');
            setLoading(false);
        } catch (error) {
            console.error('Admin login error:', error);
            alert(error.response?.data?.message || 'Invalid admin credentials or security code.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-accent-900 to-gray-900 py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-20 left-20 w-96 h-96 bg-accent-500 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.1, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute bottom-20 right-20 w-96 h-96 bg-primary-500 rounded-full blur-3xl"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-6 bg-gray-800 p-8 rounded-3xl shadow-2xl border-2 border-accent-600 relative z-10"
            >
                {/* Security Badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="bg-accent-600 px-6 py-2 rounded-full flex items-center gap-2 shadow-lg"
                    >
                        <MdSecurity className="w-5 h-5 text-white" />
                        <span className="text-white font-bold text-sm">ADMIN ACCESS</span>
                    </motion.div>
                </div>

                {/* Logo and Title */}
                <div className="text-center pt-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="flex justify-center mb-4"
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-accent-500 to-accent-700 rounded-2xl flex items-center justify-center shadow-lg shadow-accent-500/50">
                            <MdAdminPanelSettings className="w-14 h-14 text-white" />
                        </div>
                    </motion.div>
                    <h2 className="text-4xl font-bold font-heading text-white">
                        Admin Portal
                    </h2>
                    <p className="mt-2 text-gray-400 font-medium">
                        Secure access for administrators only
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            label="Admin Email"
                            type="email"
                            placeholder="admin@aniketiffin.com"
                            icon={MdEmail}
                            register={register('email')}
                            error={errors.email?.message}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            icon={MdLock}
                            register={register('password')}
                            error={errors.password?.message}
                        />

                        <Input
                            label="Admin Security Code"
                            type="password"
                            placeholder="Enter admin code"
                            icon={RiShieldKeyholeFill}
                            register={register('adminCode')}
                            error={errors.adminCode?.message}
                        />
                    </div>

                    <div className="bg-accent-900/30 border border-accent-600/30 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <MdSecurity className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-300">
                                This is a secure admin area. All login attempts are monitored and logged for security purposes.
                            </p>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800"
                        loading={loading}
                        icon={MdAdminPanelSettings}
                    >
                        Access Admin Panel
                    </Button>
                </form>

                {/* Back to User Login */}
                <div className="pt-6 border-t border-gray-700">
                    <Link
                        to="/login"
                        className="block text-center text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                    >
                        ← Back to User Login
                    </Link>
                </div>

                {/* Footer Note */}
                <div className="text-center text-xs text-gray-500">
                    AnikeTiffin Admin Panel v1.0
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;

