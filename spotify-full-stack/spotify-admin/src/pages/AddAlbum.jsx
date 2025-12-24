import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { url } from '../App';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddAlbum = () => {
    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        bgColor: '#121212'
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast.error('Album name is required');
            return false;
        }
        if (!formData.desc.trim()) {
            toast.error('Album description is required');
            return false;
        }
        if (!image) {
            toast.error('Please select an album cover image');
            return false;
        }
        return true;
    };

    const resetForm = () => {
        setFormData({
            name: '',
            desc: '',
            bgColor: '#121212'
        });
        setImage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);

        try {
            const submitData = new FormData();
            submitData.append('name', formData.name.trim());
            submitData.append('desc', formData.desc.trim());
            submitData.append('bgColor', formData.bgColor);
            submitData.append('image', image);

            const response = await axios.post(`${url}/api/album/add`, submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success('Album added successfully!');
                resetForm();
            } else {
                toast.error(response.data.message || 'Failed to add album');
            }
        } catch (error) {
            console.error('Error adding album:', error);
            toast.error(error.response?.data?.message || 'Error occurred while adding album');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <ToastContainer />
            <div className="max-w-2xl mx-auto p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Album</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload */}
                    <div className="flex flex-col gap-4">
                        <label className="text-gray-700 font-medium">Album Cover Image *</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            required
                        />
                        <label htmlFor="image" className="cursor-pointer">
                            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-green-500 transition-colors">
                                {image ? (
                                    <img 
                                        src={URL.createObjectURL(image)} 
                                        alt="Album cover preview" 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <img src={assets.upload_area} alt="Upload image" className="w-16 h-16 opacity-60" />
                                    </div>
                                )}
                            </div>
                        </label>
                        {image && (
                            <p className="text-sm text-gray-600">Selected: {image.name}</p>
                        )}
                    </div>

                    {/* Album Details */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Album Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                                placeholder="Enter album name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Description *</label>
                            <textarea
                                name="desc"
                                value={formData.desc}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition-colors resize-none"
                                placeholder="Enter album description"
                                rows="3"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Background Color</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="color"
                                    name="bgColor"
                                    value={formData.bgColor}
                                    onChange={handleInputChange}
                                    className="w-12 h-12 border-2 border-gray-300 rounded-lg cursor-pointer"
                                />
                                <span className="text-sm text-gray-600">
                                    Choose a color for the album background
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        disabled={loading}
                    >
                        {loading ? 'Adding Album...' : 'Add Album'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddAlbum;