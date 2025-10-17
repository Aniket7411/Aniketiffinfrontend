import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { MdEmail, MdLock, MdPerson, MdPhone, MdRestaurant } from 'react-icons/md';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string()
        .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
        .required('Phone number is required'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
}).required();

const Signup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await authAPI.signup({
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password,
                // Optional address - can be updated later in profile
                address: {
                    street: '',
                    city: '',
                    state: '',
                    pincode: ''
                }
            });

            const { user, token } = response.data.data;
            login(user, token, false);
            navigate('/');
            setLoading(false);
        } catch (error) {
            console.error('Signup error:', error);
            alert(error.response?.data?.message || 'Signup failed. Please try again.');
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
                    className="absolute -top-20 -left-20 w-96 h-96 bg-secondary-300 rounded-full opacity-20 blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary-200 rounded-full opacity-20 blur-3xl"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full space-y-5 bg-white p-8 rounded-3xl shadow-2xl relative z-10"
            >
                {/* Logo and Title */}
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="flex justify-center mb-4"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-secondary-400 to-primary-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <MdRestaurant className="w-10 h-10 text-white" />
                        </div>
                    </motion.div>
                    <h2 className="text-4xl font-bold font-heading bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                        AnikeTiffin
                    </h2>
                    <p className="mt-2 text-gray-600 font-medium">
                        Create your account and start ordering!
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            icon={MdPerson}
                            register={register('name')}
                            error={errors.name?.message}
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="your@email.com"
                            icon={MdEmail}
                            register={register('email')}
                            error={errors.email?.message}
                        />

                        <Input
                            label="Phone Number"
                            type="tel"
                            placeholder="9876543210"
                            icon={MdPhone}
                            register={register('phone')}
                            error={errors.phone?.message}
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
                            label="Confirm Password"
                            type="password"
                            placeholder="••••••••"
                            icon={MdLock}
                            register={register('confirmPassword')}
                            error={errors.confirmPassword?.message}
                        />
                    </div>

                    <div className="flex items-start">
                        <input
                            type="checkbox"
                            className="w-4 h-4 mt-1 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            required
                        />
                        <label className="ml-2 text-sm text-gray-600">
                            I agree to the{' '}
                            <Link to="/terms" className="font-semibold text-primary-600 hover:text-primary-700">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link to="/privacy" className="font-semibold text-primary-600 hover:text-primary-700">
                                Privacy Policy
                            </Link>
                        </label>
                    </div>

                    <Button
                        type="submit"
                        variant="secondary"
                        className="w-full"
                        loading={loading}
                    >
                        Create Account
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

                {/* Sign In Link */}
                <p className="text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-primary-600 hover:text-primary-700 transition-colors">
                        Sign In
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;

