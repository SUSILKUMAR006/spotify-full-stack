import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { url } from '../App';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddSong = () => {
    const [formData, setFormData] = useState({
        name: '',
        desc: '',
        album: 'none'
    });
    const [files, setFiles] = useState({
        image: null,
        audio: null
    });
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load albums on component mount
    useEffect(() => {
        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            if (response.data.success) {
                setAlbums(response.data.albums || []);
            }
        } catch (error) {
            console.error('Error fetching albums:', error);
            toast.error('Failed to load albums');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFiles(prev => ({
            ...prev,
            [name]: files[0]
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast.error('Song name is required');
            return false;
        }
        if (!files.audio) {
            toast.error('Audio file is required');
            return false;
        }
        return true;
    };

    const resetForm = () => {
        setFormData({
            name: '',
            desc: '',
            album: 'none'
        });
        setFiles({
            image: null,
            audio: null
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setLoading(true);

        try {
            const submitData = new FormData();
            submitData.append('name', formData.name.trim());
            submitData.append('desc', formData.desc.trim());
            submitData.append('album', formData.album);
            
            if (files.audio) {
                submitData.append('audio', files.audio);
            }
            if (files.image) {
                submitData.append('image', files.image);
            }

            const response = await axios.post(`${url}/api/song/add`, submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success('Song added successfully!');
                resetForm();
            } else {
                toast.error(response.data.message || 'Failed to add song');
            }
        } catch (error) {
            console.error('Error adding song:', error);
            toast.error(error.response?.data?.message || 'Error occurred while adding song');
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
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Song</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* File Upload Section */}
                    <div className="flex gap-8">
                        {/* Audio Upload */}
                        <div className="flex flex-col gap-4">
                            <label className="text-gray-700 font-medium">Upload Song *</label>
                            <input
                                type="file"
                                id="audio"
                                name="audio"
                                accept="audio/*"
                                onChange={handleFileChange}
                                className="hidden"
                                required
                            />
                            <label htmlFor="audio" className="cursor-pointer">
                                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-green-500 transition-colors">
                                    {files.audio ? (
                                        <div className="text-center">
                                            <img src={assets.upload_added} alt="Uploaded" className="w-12 h-12 mx-auto mb-2" />
                                            <p className="text-xs text-gray-600 truncate w-20">{files.audio.name}</p>
                                        </div>
                                    ) : (
                                        <img src={assets.upload_song} alt="Upload song" className="w-12 h-12" />
                                    )}
                                </div>
                            </label>
                        </div>

                        {/* Image Upload */}
                        <div className="flex flex-col gap-4">
                            <label className="text-gray-700 font-medium">Upload Cover Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <label htmlFor="image" className="cursor-pointer">
                                <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden hover:border-green-500 transition-colors">
                                    {files.image ? (
                                        <img 
                                            src={URL.createObjectURL(files.image)} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <img src={assets.upload_area} alt="Upload image" className="w-full h-full object-cover" />
                                    )}
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Song Details */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Song Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                                placeholder="Enter song name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Description</label>
                            <input
                                type="text"
                                name="desc"
                                value={formData.desc}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                                placeholder="Enter song description"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Album</label>
                            <select
                                name="album"
                                value={formData.album}
                                onChange={handleInputChange}
                                className="w-full bg-transparent border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                            >
                                <option value="none">No Album</option>
                                {albums.map((album) => (
                                    <option key={album._id} value={album._id}>
                                        {album.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        disabled={loading}
                    >
                        {loading ? 'Adding Song...' : 'Add Song'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddSong;