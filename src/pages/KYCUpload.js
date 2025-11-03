import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MdUpload, MdCheckCircle, MdVerified, MdImage, MdDescription, MdDelete, MdCloudUpload } from 'react-icons/md';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { kycAPI } from '../services/api';

const KYCUpload = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [uploadingDocs, setUploadingDocs] = useState({});
    const [documents, setDocuments] = useState({
        aadharFront: null,
        aadharBack: null,
        photo: null,
        addressProof: null
    });
    const [uploadedUrls, setUploadedUrls] = useState({
        aadharFront: null,
        aadharBack: null,
        photo: null,
        addressProof: null
    });
    const [aadharNumber, setAadharNumber] = useState('');
    const [uploadStatus, setUploadStatus] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [objectUrls, setObjectUrls] = useState({});
    const objectUrlsRef = useRef({});

    // Cloudinary configuration
    const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'defgskoxv';
    const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || 'x01b8cid';
    const CLOUDINARY_IMAGE_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    const CLOUDINARY_RAW_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`;

    // Fetch existing KYC documents on component mount
    useEffect(() => {
        fetchExistingDocuments();

        // Cleanup object URLs on unmount
        return () => {
            Object.values(objectUrlsRef.current).forEach(url => {
                if (url && typeof url === 'string' && url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, []);

    const fetchExistingDocuments = async () => {
        try {
            const response = await kycAPI.getDocuments();
            if (response.data.success && response.data.data) {
                const kycData = response.data.data;
                setAadharNumber(kycData.aadharNumber || '');

                // Set uploaded URLs if they exist
                if (kycData.documents) {
                    setUploadedUrls({
                        aadharFront: kycData.documents.aadharFront || null,
                        aadharBack: kycData.documents.aadharBack || null,
                        photo: kycData.documents.photo || null,
                        addressProof: kycData.documents.addressProof || null
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching KYC documents:', error);
            // If endpoint doesn't exist or returns 404, continue without existing data
        } finally {
            setFetching(false);
        }
    };

    // Upload file to Cloudinary
    const uploadToCloudinary = async (file, docType) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', 'kyc-documents');

        // Use raw upload for PDFs, image upload for images
        const isPdf = file.type === 'application/pdf';
        const uploadUrl = isPdf ? CLOUDINARY_RAW_UPLOAD_URL : CLOUDINARY_IMAGE_UPLOAD_URL;

        try {
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error(`Error uploading ${docType}:`, error);
            throw error;
        }
    };

    const handleFileChange = async (docType, file) => {
        if (!file) {
            // If removing file, clean up object URL and clear both local file and URL
            if (objectUrlsRef.current[docType]) {
                URL.revokeObjectURL(objectUrlsRef.current[docType]);
                delete objectUrlsRef.current[docType];
            }
            setDocuments(prev => ({ ...prev, [docType]: null }));
            setUploadedUrls(prev => ({ ...prev, [docType]: null }));
            setObjectUrls(prev => {
                const newUrls = { ...prev };
                delete newUrls[docType];
                return newUrls;
            });
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a JPG, PNG, or PDF file');
            return;
        }

        // Set local file for preview
        setDocuments(prev => ({ ...prev, [docType]: file }));

        // Create object URL for preview (will be cleaned up)
        const objectUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
        if (objectUrl) {
            // Clean up previous URL if exists
            if (objectUrlsRef.current[docType]) {
                URL.revokeObjectURL(objectUrlsRef.current[docType]);
            }
            objectUrlsRef.current[docType] = objectUrl;
            setObjectUrls(prev => ({ ...prev, [docType]: objectUrl }));
        }

        // Upload to Cloudinary
        setUploadingDocs(prev => ({ ...prev, [docType]: true }));
        try {
            const url = await uploadToCloudinary(file, docType);
            setUploadedUrls(prev => ({ ...prev, [docType]: url }));
        } catch (error) {
            alert(`Failed to upload ${docType}. Please try again.`);
            setDocuments(prev => ({ ...prev, [docType]: null }));
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
                delete objectUrlsRef.current[docType];
                setObjectUrls(prev => {
                    const newUrls = { ...prev };
                    delete newUrls[docType];
                    return newUrls;
                });
            }
        } finally {
            setUploadingDocs(prev => ({ ...prev, [docType]: false }));
        }
    };

    const handleDeleteDocument = async (docType) => {
        if (!window.confirm(`Are you sure you want to delete this document?`)) {
            return;
        }

        try {
            // Delete from backend
            await kycAPI.deleteDocument(docType);
        } catch (error) {
            console.error('Error deleting document:', error);
            // Continue even if backend deletion fails
        } finally {
            // Clean up object URL if exists
            if (objectUrlsRef.current[docType]) {
                URL.revokeObjectURL(objectUrlsRef.current[docType]);
                delete objectUrlsRef.current[docType];
            }

            // Clear from state
            setDocuments(prev => ({ ...prev, [docType]: null }));
            setUploadedUrls(prev => ({ ...prev, [docType]: null }));
            setObjectUrls(prev => {
                const newUrls = { ...prev };
                delete newUrls[docType];
                return newUrls;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all documents - check if we have URLs (either newly uploaded or existing)
        const requiredDocs = ['aadharFront', 'aadharBack', 'photo'];
        const missingDocs = requiredDocs.filter(doc => !uploadedUrls[doc] && !documents[doc]);

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
            // Prepare data with Cloudinary URLs
            const kycData = {
                aadharNumber,
                documents: {
                    ...(uploadedUrls.aadharFront && { aadharFront: uploadedUrls.aadharFront }),
                    ...(uploadedUrls.aadharBack && { aadharBack: uploadedUrls.aadharBack }),
                    ...(uploadedUrls.photo && { photo: uploadedUrls.photo }),
                    ...(uploadedUrls.addressProof && { addressProof: uploadedUrls.addressProof })
                }
            };

            // Send to backend
            const response = await kycAPI.upload(kycData);

            if (response.data.success) {
                setUploadStatus('success');
                setTimeout(() => {
                    navigate(-1);
                }, 2000);
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to submit KYC documents. Please try again.');
            setUploadStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const FileUploadBox = ({ docType, label, icon: Icon, required = true }) => {
        const file = documents[docType];
        const uploadedUrl = uploadedUrls[docType];
        const isUploading = uploadingDocs[docType];
        const hasDocument = file || uploadedUrl;

        return (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-primary-400 transition-all">
                <div className="text-center">
                    <Icon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-800 mb-1">
                        {label} {required && <span className="text-red-500">*</span>}
                    </h3>

                    {hasDocument ? (
                        <div className="mt-3">
                            <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                                <MdCheckCircle className="w-5 h-5" />
                                <span className="font-semibold">Uploaded</span>
                            </div>

                            {/* Show preview for images */}
                            {uploadedUrl && (uploadedUrl.includes('.jpg') || uploadedUrl.includes('.jpeg') || uploadedUrl.includes('.png') || uploadedUrl.includes('/image/upload')) ? (
                                <div className="mb-3">
                                    <img
                                        src={uploadedUrl}
                                        alt={label}
                                        className="w-full max-h-48 object-contain rounded-lg border border-gray-200 mb-2"
                                    />
                                </div>
                            ) : file && file.type.startsWith('image/') && objectUrls[docType] ? (
                                <div className="mb-3">
                                    <img
                                        src={objectUrls[docType]}
                                        alt={label}
                                        className="w-full max-h-48 object-contain rounded-lg border border-gray-200 mb-2"
                                    />
                                </div>
                            ) : (
                                <div className="mb-3">
                                    <div className="w-full h-32 bg-gray-100 rounded-lg border border-gray-200 flex flex-col items-center justify-center p-2">
                                        <MdDescription className="w-12 h-12 text-gray-400 mb-1" />
                                        <p className="text-xs text-gray-500 text-center truncate w-full px-2">
                                            {file ? file.name : (uploadedUrl ? 'Previously uploaded PDF' : 'PDF Document')}
                                        </p>
                                        {uploadedUrl && (
                                            <a
                                                href={uploadedUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-primary-600 hover:text-primary-700 mt-1 underline"
                                            >
                                                View/Download
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            <p className="text-sm text-gray-600 truncate mb-2">
                                {file ? file.name : 'Previously uploaded'}
                            </p>

                            <div className="flex gap-2 justify-center">
                                <button
                                    type="button"
                                    onClick={() => handleFileChange(docType, null)}
                                    className="text-sm px-3 py-1 text-primary-600 hover:text-primary-700 border border-primary-300 rounded hover:bg-primary-50 transition-colors"
                                >
                                    Replace
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteDocument(docType)}
                                    className="text-sm px-3 py-1 text-red-600 hover:text-red-700 border border-red-300 rounded hover:bg-red-50 transition-colors flex items-center gap-1"
                                >
                                    <MdDelete className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="mt-3">
                            <label className="cursor-pointer">
                                <span className={`inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    {isUploading ? (
                                        <>
                                            <MdCloudUpload className="w-5 h-5 animate-pulse" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <MdUpload className="w-5 h-5" />
                                            Choose File
                                        </>
                                    )}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={(e) => handleFileChange(docType, e.target.files[0])}
                                    className="hidden"
                                    disabled={isUploading}
                                />
                            </label>
                            <p className="text-xs text-gray-500 mt-2">JPG, PNG or PDF (Max 5MB)</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    if (fetching) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-accent-50 via-primary-50 to-secondary-50 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading your KYC documents...</p>
                    </div>
                </div>
            </div>
        );
    }

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
                                    {loading ? 'Submitting Documents...' : 'Submit for Verification'}
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
