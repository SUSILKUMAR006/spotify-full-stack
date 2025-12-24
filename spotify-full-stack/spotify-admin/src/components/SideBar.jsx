import React from 'react'
import {assets} from '../assets/assets.js'
import { NavLink } from 'react-router-dom'
const SideBar = () => {
  return (
    <div className=' bg-blue-600 min-h-screen pl-[4vw]' >
        <h1 className=' mt-5 w-[max(10vw,100px)]  text-2xl text-white font-bold'>Music Player</h1>
        <div className=' flex flex-col gap-5 mt-10'>
            <NavLink to={'/add-song'} className=' flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] text-sm font-medium'>
                <img src={assets.add_song} className='w-5' alt="" />
                <p className=' hidden sm:block'>Add Song</p>
            </NavLink>
            <NavLink to={'/list-song'} className=' flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)]  text-sm font-medium'>
                <img src={assets.song_icon} className='w-5' alt="" />
                <p className=' hidden sm:block'>List Song</p>
            </NavLink>
            <NavLink to={'/add-album'} className=' flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] text-sm font-medium'>
                <img src={assets.add_album} className='w-5' alt="" />
                <p className=' hidden sm:block'>Add Album</p>
            </NavLink>
            <NavLink to={'/list-album'} className=' flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)]  text-sm font-medium'>
                <img src={assets.album_icon} className='w-5' alt="" />
                <p className=' hidden sm:block'>List Album</p>
            </NavLink>
        </div>
    </div>
  )
}

export default SideBar