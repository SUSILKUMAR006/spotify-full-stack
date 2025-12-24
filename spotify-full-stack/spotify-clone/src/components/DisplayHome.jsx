import React, { useContext } from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import { PlayerContext } from '../context/PlayerContext'

const DisplayHome = () => {
    const { albumData, songData } = useContext(PlayerContext);

    return (
        <>
            <Navbar />
            <div className=' mb-4'>
                <h1 className=' my-5 font-bold text-2xl'>Featured Charts</h1>
                <div className=' flex overflow-auto'>
                    {albumData && albumData.length > 0 ? 
                        albumData.map((item, index) => (
                            <AlbumItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />
                        )) : 
                        <p className="text-gray-400">No albums available</p>
                    }
                </div>
            </div>
            <div className=' mb-4'>
                <h1 className=' my-5 font-bold text-2xl'>Today's biggest hits</h1>
                <div className=' flex w-[100%] overflow-auto'>
                    {songData && songData.length > 0 ? 
                        songData.map((item, index) => (
                            <SongItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />
                        )) : 
                        <p className="text-gray-400">No songs available</p>
                    }
                </div>
            </div>
        </>
    )
}

export default DisplayHome