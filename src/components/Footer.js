import React from 'react';
import { Link } from 'react-router-dom';
import { MdRestaurant, MdEmail, MdPhone, MdLocationOn, MdFacebook } from 'react-icons/md';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
                                <MdRestaurant className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold font-heading text-white">
                                AnikeTiffin
                            </h3>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Connecting home cooks with food lovers. Fresh, homemade, and delivered with love.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <MdFacebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-colors"
                            >
                                <FaLinkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* For Providers */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4">For Providers</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/provider/register" className="hover:text-primary-400 transition-colors">
                                    Register as Provider
                                </Link>
                            </li>
                            <li>
                                <Link to="/provider/dashboard" className="hover:text-primary-400 transition-colors">
                                    Provider Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/kyc/upload" className="hover:text-primary-400 transition-colors">
                                    KYC Verification
                                </Link>
                            </li>
                            <li>
                                <a href="#guidelines" className="hover:text-primary-400 transition-colors">
                                    Provider Guidelines
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* For Tenants */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4">For Tenants</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/tenant/register" className="hover:text-primary-400 transition-colors">
                                    Register as Tenant
                                </Link>
                            </li>
                            <li>
                                <Link to="/browse-providers" className="hover:text-primary-400 transition-colors">
                                    Browse Providers
                                </Link>
                            </li>
                            <li>
                                <Link to="/tenant/dashboard" className="hover:text-primary-400 transition-colors">
                                    My Subscriptions
                                </Link>
                            </li>
                            <li>
                                <a href="#how-it-works" className="hover:text-primary-400 transition-colors">
                                    How It Works
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Legal */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <MdEmail className="w-5 h-5 text-primary-400" />
                                <a href="mailto:support@aniketiffin.com" className="hover:text-primary-400 transition-colors">
                                    support@aniketiffin.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <MdPhone className="w-5 h-5 text-primary-400" />
                                <a href="tel:+919876543210" className="hover:text-primary-400 transition-colors">
                                    +91 98765 43210
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <MdLocationOn className="w-5 h-5 text-primary-400 mt-0.5" />
                                <span className="text-sm">
                                    Bangalore, Karnataka<br />India
                                </span>
                            </li>
                        </ul>

                        <div className="mt-6 space-y-2">
                            <Link to="/about" className="block hover:text-primary-400 transition-colors text-sm">
                                About Us
                            </Link>
                            <Link to="/contact" className="block hover:text-primary-400 transition-colors text-sm">
                                Contact Us
                            </Link>
                            <Link to="/terms" className="block hover:text-primary-400 transition-colors text-sm">
                                Terms of Service
                            </Link>
                            <Link to="/privacy" className="block hover:text-primary-400 transition-colors text-sm">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            © {currentYear} AnikeTiffin. All rights reserved. Made with ❤️ for food lovers.
                        </p>
                        <div className="flex items-center gap-6 text-sm">
                            <a href="#sitemap" className="hover:text-primary-400 transition-colors">
                                Sitemap
                            </a>
                            <Link to="/admin/login" className="hover:text-primary-400 transition-colors">
                                Admin
                            </Link>
                            <a href="#security" className="hover:text-primary-400 transition-colors">
                                Security
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-gray-950 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Verified Providers</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Secure Payments</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>Quality Assured</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

