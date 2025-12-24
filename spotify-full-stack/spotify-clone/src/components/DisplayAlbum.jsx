import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = () => {
    const {id} = useParams();
    const { albumData, songData, playWithId } = useContext(PlayerContext);
    
    // Find album by ID instead of using array index
    const currentAlbum = albumData && albumData.find(album => album._id === id);
    
    // Filter songs that belong to this album
    const albumSongs = songData && songData.filter(song => song.album && song.album._id === id);
    
    return (
    <>
    <Navbar/>
    {currentAlbum ? (
        <div className=' mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
            <img className=' w-60 h-55 object-cover rounded' src={currentAlbum.image} alt=""  />
            <div className=' flex flex-col'>
                <p>Playlist</p>
                <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{currentAlbum.name}</h2>
                <h4>{currentAlbum.desc}</h4>
                <p className='mt-1'>
                    • 1,323,154 likes
                    • <b> {albumSongs ? albumSongs.length : 0} Songs, </b>
                    about 2 hr 30 min
                </p>
            </div>
        </div>
    ) : (
        <div className='mt-10 text-center'>
            <p className='text-gray-400'>Album not found</p>
        </div>
    )}
    <div className=' grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
        <p> <b className=' mr-4'>#</b>Title</p>
        <p>Album</p>
        <p className=' hidden sm:block'>Date Added</p>
        <img className=' m-auto w-4' src={assets.clock_icon} alt="" />
    </div>
        <hr />
        {albumSongs && albumSongs.length > 0 ? (
            albumSongs.map((item,index)=>(
                <div onClick={()=>playWithId(item._id)} key={index} className=' grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-poiter'>
                    <p className=' text-white'>
                        <b className=' mr-4 text-[#a7a7a7]'>{index+1}</b>
                        <img className=' inline w-10 h-10 object-cover mr-5 ' src={item.image} alt="" srcset="" />
                        {item.name}
                    </p>
                    <p className='text-[15px] '>{currentAlbum ? currentAlbum.name : 'Unknown Album'}</p>
                    <p className='text-[15px] hidden sm:block'>5 Days ago</p>
                    <p className=' text-[15px] text-center '>{item.duration}</p>
                </div>
                 
            ))
        ) : (
            <div className='text-center py-8'>
                <p className='text-gray-400'>No songs available in this album</p>
            </div>
        )}
    </>
  )
}

export default DisplayAlbum