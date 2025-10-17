import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdUpload, MdCheckCircle, MdVerified, MdImage, MdDescription } from 'react-icons/md';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const KYCUpload = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [documents, setDocuments] = useState({
        aadharFront: null,
        aadharBack: null,
        photo: null,
        addressProof: null
    });
    const [aadharNumber, setAadharNumber] = useState('');
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleFileChange = (docType, file) => {
        setDocuments(prev => ({ ...prev, [docType]: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate all documents
        const requiredDocs = ['aadharFront', 'aadharBack', 'photo'];
        const missingDocs = requiredDocs.filter(doc => !documents[doc]);
        
        if (missingDocs.length > 0) {
            alert('Please upload all required documents');
            return;
        }

        if (!aadharNumber || aadharNumber.length !== 12) {
            alert('Please enter a valid 12-digit Aadhar number');
            return;
        }

        setLoading(true);
        
        try {
            // TODO: Implement actual file upload to Cloudinary/S3
            // For now, simulating upload
            const formData = new FormData();
            formData.append('aadharNumber', aadharNumber);
            Object.keys(documents).forEach(key => {
                if (documents[key]) {
                    formData.append(key, documents[key]);
                }
            });

            console.log('Uploading KYC documents:', {
                aadharNumber,
                documents: Object.keys(documents).filter(k => documents[k])
            });

            // Simulate API call
            setTimeout(() => {
                setUploadStatus('success');
                setLoading(false);
                setTimeout(() => {
                    navigate(-1); // Go back to previous page
                }, 2000);
            }, 2000);
        } catch (error) {
            console.error('Upload error:', error);
            setLoading(false);
            setUploadStatus('error');
        }
    };

    const FileUploadBox = ({ docType, label, icon: Icon, required = true }) => {
        const file = documents[docType];
        
        return (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-primary-400 transition-all">
                <div className="text-center">
                    <Icon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-1">
                        {label} {required && <span className="text-red-500">*</span>}
                    </h3>
                    
                    {file ? (
                        <div className="mt-3">
                            <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                                <MdCheckCircle className="w-5 h-5" />
                                <span className="font-semibold">Uploaded</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{file.name}</p>
                            <button
                                type="button"
                                onClick={() => handleFileChange(docType, null)}
                                className="mt-2 text-sm text-red-600 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div className="mt-3">
                            <label className="cursor-pointer">
                                <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors">
                                    Choose File
                                </span>
                                <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={(e) => handleFileChange(docType, e.target.files[0])}
                                    className="hidden"
                                />
                            </label>
                            <p className="text-xs text-gray-500 mt-2">JPG, PNG or PDF (Max 5MB)</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-accent-50 via-primary-50 to-secondary-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
                >
                    {uploadStatus === 'success' ? (
                        <div className="text-center py-12">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                            >
                                <MdCheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
                            </motion.div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">KYC Submitted Successfully!</h2>
                            <p className="text-gray-600 mb-4">
                                Your documents have been submitted for verification.
                                You'll be notified within 24-48 hours.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Button variant="outline" onClick={() => navigate(-1)}>
                                    Go Back
                                </Button>
                                <Button variant="primary" onClick={() => navigate('/')}>
                                    Go to Dashboard
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="flex justify-center mb-4">
                                    <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-700 rounded-2xl flex items-center justify-center shadow-lg">
                                        <MdVerified className="w-10 h-10 text-white" />
                                    </div>
                                </div>
                                <h1 className="text-4xl font-bold font-heading bg-gradient-to-r from-accent-600 to-primary-600 bg-clip-text text-transparent mb-2">
                                    KYC Verification
                                </h1>
                                <p className="text-gray-600 text-lg">
                                    Complete your KYC to build trust and connect with providers/tenants
                                </p>
                            </div>

                            {/* Info Alert */}
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <MdVerified className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-blue-900 mb-1">Why KYC?</h3>
                                        <p className="text-sm text-blue-800">
                                            KYC verification ensures safety and builds trust in our community.
                                            All documents are securely stored and used only for verification purposes.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Aadhar Number */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Aadhar Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={aadharNumber}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            if (value.length <= 12) {
                                                setAadharNumber(value);
                                            }
                                        }}
                                        placeholder="1234 5678 9012"
                                        maxLength="12"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Enter 12-digit Aadhar number</p>
                                </div>

                                {/* Document Uploads */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Upload Documents</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <FileUploadBox
                                            docType="aadharFront"
                                            label="Aadhar Front"
                                            icon={MdImage}
                                            required
                                        />
                                        <FileUploadBox
                                            docType="aadharBack"
                                            label="Aadhar Back"
                                            icon={MdImage}
                                            required
                                        />
                                        <FileUploadBox
                                            docType="photo"
                                            label="Your Photo"
                                            icon={MdImage}
                                            required
                                        />
                                        <FileUploadBox
                                            docType="addressProof"
                                            label="Address Proof"
                                            icon={MdDescription}
                                            required={false}
                                        />
                                    </div>
                                </div>

                                {/* Important Notes */}
                                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                                    <h4 className="font-semibold text-yellow-900 mb-2">Important Notes:</h4>
                                    <ul className="text-sm text-yellow-800 space-y-1">
                                        <li>• Ensure all documents are clear and readable</li>
                                        <li>• Maximum file size: 5MB per document</li>
                                        <li>• Accepted formats: JPG, PNG, PDF</li>
                                        <li>• Your documents will be kept confidential</li>
                                        <li>• Verification typically takes 24-48 hours</li>
                                    </ul>
                                </div>

                                {/* Terms */}
                                <div className="flex items-start">
                                    <input
                                        type="checkbox"
                                        required
                                        className="w-4 h-4 mt-1 text-primary-600 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 text-sm text-gray-600">
                                        I confirm that all the information provided is accurate and I consent to the verification process.
                                        I understand that providing false information may result in account suspension.
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full text-lg py-4"
                                    loading={loading}
                                    icon={MdUpload}
                                >
                                    {loading ? 'Uploading Documents...' : 'Submit for Verification'}
                                </Button>
                            </form>

                            {/* Help Section */}
                            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                                <p className="text-gray-600">
                                    Need help? Contact us at{' '}
                                    <a href="mailto:support@aniketiffin.com" className="text-primary-600 font-semibold hover:text-primary-700">
                                        support@aniketiffin.com
                                    </a>
                                </p>
                            </div>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default KYCUpload;

