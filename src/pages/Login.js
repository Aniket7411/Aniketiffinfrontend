import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { MdEmail, MdLock, MdRestaurant } from 'react-icons/md';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await authAPI.login({
                email: data.email,
                password: data.password
            });

            const { user, token } = response.data.data;
            login(user, token, user.role === 'admin');

            // Role-based redirect
            if (user.role === 'provider') {
                navigate('/provider/dashboard');
            } else if (user.role === 'tenant') {
                navigate('/tenant/dashboard');
            } else if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }

            setLoading(false);
        } catch (error) {
            console.error('Login error:', error);
            alert(error.response?.data?.message || 'Login failed. Please check your credentials.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 py-6 px-4 sm:px-6 lg:px-8">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -top-20 -left-20 w-96 h-96 bg-primary-200 rounded-full opacity-20 blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary-300 rounded-full opacity-20 blur-3xl"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-6 bg-white p-8 rounded-3xl shadow-2xl relative z-10"
            >
                {/* Logo and Title */}
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="flex justify-center mb-4"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <MdRestaurant className="w-10 h-10 text-white" />
                        </div>
                    </motion.div>
                    <h2 className="text-4xl font-bold font-heading bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                        AnikeTiffin
                    </h2>
                    <p className="mt-2 text-gray-600 font-medium">
                        Welcome back! Login to your account
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="your@email.com"
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
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <span className="ml-2 text-gray-600">Remember me</span>
                        </label>
                        <Link to="/forgot-password" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full"
                        loading={loading}
                    >
                        Sign In
                    </Button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                    </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        <FaGoogle className="w-5 h-5 text-red-500" />
                        <span className="font-semibold text-gray-700">Google</span>
                    </button>
                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        <FaFacebook className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-gray-700">Facebook</span>
                    </button>
                </div>

                {/* Sign Up Link */}
                <p className="text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-bold text-primary-600 hover:text-primary-700 transition-colors">
                        Sign Up
                    </Link>
                </p>

                {/* Admin Login Link */}
                <div className="pt-4 border-t border-gray-200">
                    <Link
                        to="/admin/login"
                        className="block text-center text-sm font-semibold text-accent-600 hover:text-accent-700 transition-colors"
                    >
                        🔒 Admin Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;

