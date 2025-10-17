import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { MdEmail, MdLock, MdPerson, MdPhone, MdRestaurant } from 'react-icons/md';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { tenantAPI } from '../services/api';

const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits').required('Phone is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Required'),
}).required();

const SimpleTenantRegister = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await tenantAPI.register({
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password
            });

            const { user, token } = response.data.data;
            login(user, token, false);
            navigate('/tenant/dashboard');
            setLoading(false);
        } catch (error) {
            console.error('Registration error:', error);
            alert(error.response?.data?.message || 'Registration failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50 py-12 px-4">
            <div className="max-w-md mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-2xl p-8"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <MdRestaurant className="w-10 h-10 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold font-heading bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
                            Find Your Tiffin
                        </h1>
                        <p className="text-gray-600">
                            Quick signup - Set preferences later
                        </p>
                    </div>

                    {/* Info Banner */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                        <p className="text-sm text-blue-800">
                            ✨ <strong>Just 4 fields!</strong> You can add food preferences, location, and budget details later from your dashboard.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="Aniket Sharma"
                            icon={MdPerson}
                            register={register('name')}
                            error={errors.name?.message}
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="sharma11aniket@gmail.com"
                            icon={MdEmail}
                            register={register('email')}
                            error={errors.email?.message}
                        />

                        <Input
                            label="Phone Number"
                            type="tel"
                            placeholder="7275061192"
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

                        {/* Terms */}
                        <div className="flex items-start">
                            <input type="checkbox" required className="w-4 h-4 mt-1 text-primary-600 border-gray-300 rounded" />
                            <label className="ml-2 text-sm text-gray-600">
                                I agree to the{' '}
                                <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-semibold">
                                    Terms of Service
                                </Link>
                                {' '}and understand that I can complete my profile details later.
                            </label>
                        </div>

                        {/* Submit */}
                        <Button type="submit" variant="primary" className="w-full text-lg py-4" loading={loading}>
                            Create Tenant Account
                        </Button>
                    </form>

                    {/* Next Steps */}
                    <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
                        <p className="text-sm text-gray-700">
                            <strong>After signup:</strong> Complete your profile with food preferences, location, and budget to start finding providers.
                        </p>
                    </div>

                    {/* Login Link */}
                    <p className="text-center mt-6 text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-primary-600 hover:text-primary-700">
                            Sign In
                        </Link>
                    </p>

                    {/* Provider Registration */}
                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <p className="text-gray-600 mb-2">Want to provide tiffin service?</p>
                        <Link to="/provider/register" className="text-primary-600 font-semibold hover:text-primary-700">
                            Register as Provider →
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SimpleTenantRegister;


