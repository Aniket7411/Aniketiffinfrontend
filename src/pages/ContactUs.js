import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdEmail, MdPhone, MdLocationOn, MdMessage, MdPerson, MdSend } from 'react-icons/md';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Button from '../components/Button';
import Input from '../components/Input';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // TODO: Implement contact form submission to backend
        console.log('Contact form:', formData);

        setTimeout(() => {
            alert('Thank you for contacting us! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl font-bold font-heading text-white mb-4">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                                    <div className="relative">
                                        <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="John Doe"
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <div className="relative">
                                        <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="your@email.com"
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        placeholder="How can we help?"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                    <div className="relative">
                                        <MdMessage className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
                                        <textarea
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell us more about your inquiry..."
                                            rows="5"
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none resize-none"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full"
                                    loading={loading}
                                    icon={MdSend}
                                >
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>
                            <p className="text-gray-600 mb-8">
                                We're here to help! Reach out to us through any of the following channels.
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="space-y-4">
                            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                                        <MdEmail className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">Email Us</h3>
                                        <a href="mailto:support@aniketiffin.com" className="text-primary-600 hover:text-primary-700">
                                            support@aniketiffin.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-secondary-400 to-primary-500 rounded-xl flex items-center justify-center">
                                        <MdPhone className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">Call Us</h3>
                                        <a href="tel:+919876543210" className="text-primary-600 hover:text-primary-700">
                                            +91 98765 43210
                                        </a>
                                        <p className="text-sm text-gray-500">Mon-Sat, 9 AM - 8 PM</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-700 rounded-xl flex items-center justify-center">
                                        <MdLocationOn className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">Visit Us</h3>
                                        <p className="text-gray-600">
                                            Koramangala, Bangalore<br />
                                            Karnataka - 560034, India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="font-bold text-gray-800 mb-4">Follow Us</h3>
                            <div className="flex gap-4">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
                                >
                                    <FaFacebook className="w-6 h-6 text-white" />
                                </a>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
                                >
                                    <FaTwitter className="w-6 h-6 text-white" />
                                </a>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
                                >
                                    <FaInstagram className="w-6 h-6 text-white" />
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center hover:scale-110 transition-transform"
                                >
                                    <FaLinkedin className="w-6 h-6 text-white" />
                                </a>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-gradient-to-r from-secondary-400 to-primary-500 rounded-xl shadow-lg p-6">
                            <h3 className="font-bold text-gray-800 mb-4">Business Hours</h3>
                            <div className="space-y-2 text-gray-800">
                                <p className="flex justify-between">
                                    <span>Monday - Friday:</span>
                                    <span className="font-semibold">9:00 AM - 8:00 PM</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Saturday:</span>
                                    <span className="font-semibold">10:00 AM - 6:00 PM</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Sunday:</span>
                                    <span className="font-semibold">Closed</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;


