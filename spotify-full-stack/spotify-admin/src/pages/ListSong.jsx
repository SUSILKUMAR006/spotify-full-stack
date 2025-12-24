import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListSong = () => {

    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
 
    const fetchSongs = async()=>{
        setLoading(true);
        try {
            const response = await axios.get(`${url}/api/song/list`);
            console.log('API Response:', response.data);
            if(response.data.success){
                console.log('Songs data received:', response.data.songs);
                setData(response.data.songs)
            } else {
                console.error('API returned error:', response.data);
                toast.error(response.data.message || "Failed to fetch songs");
            }
        } catch (error) {
            console.error('Error fetching songs:', error);
            toast.error("Error occurred while fetching songs");
        } finally {
            setLoading(false);
        }
    }


    const removeSong = async (id) =>{
        try {
            const  response = await axios.post(`${url}/api/song/remove`,{id});
            if(response.data.success)
            {
                toast.success(response.data.message);
                await fetchSongs();
            }
        } catch (error) {
            toast.error("Error occured");
        }
    }
    useEffect(()=>{
        console.log('ListSong component mounted');
        fetchSongs();
    },[])

    useEffect(() => {
        console.log('Data state updated:', data);
    }, [data]);
  return (
    <div>
        <p>All Song List</p>
        <br />
        {loading ? (
            <div className="text-center py-8">
                <p>Loading songs...</p>
            </div>
        ) : data.length === 0 ? (
            <div className="text-center py-8">
                <p>No songs found. Add some songs first!</p>
            </div>
        ) : (
            <>
                <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Album</b>
                    <b>Duration</b>
                    <b>Action</b>
                </div>

                { data.map ((item,index) => {
                    return (
                        <div key={index} className=' grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 '>
                            <img 
                                className='w-12 h-12 object-cover' 
                                src={item.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyNEMyNi4yMDkxIDI0IDI4IDIyLjIwOTEgMjggMjBDMjggMTcuNzkwOSAyNi4yMDkxIDE2IDI0IDE2QzIxLjc5MDkgMTYgMjAgMTcuNzkwOSAyMCAyMEMyMCAyMi4yMDkxIDIxLjc5MDkgMjQgMjQgMjRaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo='} 
                                alt={item.name}
                                onError={(e) => {
                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyNEMyNi4yMDkxIDI0IDI4IDIyLjIwOTEgMjggMjBDMjggMTcuNzkwOSAyNi4yMDkxIDE2IDI0IDE2QzIxLjc5MDkgMTYgMjAgMTcuNzkwOSAyMCAyMEMyMCAyMi4yMDkxIDIxLjc5MDkgMjQgMjQgMjRaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo=';
                                    console.log('Image failed to load for:', item.name);
                                }}
                            />
                            <p>{item.name}</p>
                            <p>{item.album ? (typeof item.album === 'string' ? item.album : item.album.name) : 'No Album'}</p>
                            <p>{item.duration}</p>
                            <p onClick={()=>removeSong(item._id)} className=' cursor-pointer'>X</p>
                        </div>
                    )
                } )}
            </>
        )}
    </div>
  )
}

export default ListSong