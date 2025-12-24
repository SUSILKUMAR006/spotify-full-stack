import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.albums || []); 
      }
    } catch (error) {
      toast.error(`Error fetching albums: ${error.message}`);
      console.error('Fetch error:', error);
    }
  };

  const deleteAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums(); // Fixed: Changed from fetchSongs to fetchAlbums
      }
    } catch (error) {
      toast.error(`Error deleting album: ${error.response?.data?.message || error.message}`);
      console.error('Delete error:', error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Albums List</h1>
      
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
            <b>Image</b>
            <b>Name</b>
            <b>Description</b>
            <b>Album Color</b>
            <b>Action</b>
          </div>
          
          {data.length > 0 ? (
            data.map((item) => (
              <div 
                key={item._id}
                className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 hover:bg-gray-50'
              > 
                <img 
                  className='w-12 h-12 object-cover rounded' 
                  src={item.image || 'https://via.placeholder.com/50'} 
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50';
                  }}
                />
                <p className="truncate">{item.name}</p>
                <p className="truncate">{item.desc}</p>
                <div className="flex items-center gap-2">
                  <input 
                    type="color" 
                    value={item.bgColor || '#cccccc'} 
                    readOnly
                    className="w-6 h-6 cursor-pointer"
                  />
                  <span>{item.bgColor || 'No color'}</span>
                </div>
                <button 
                  onClick={() => deleteAlbum(item._id)}
                  className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                >
                  X
                </button>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No albums found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListAlbum;