import React, { useEffect, useRef, useContext } from 'react'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { PlayerContext } from '../context/PlayerContext'

const Display = ()=> {
  const displayref = useRef();
  const location = useLocation();
  const { albumData } = useContext(PlayerContext);
  const isAlbum = location.pathname.includes("album");
  
  const albumId = isAlbum ? location.pathname.split('/').pop() : "";
  const currentAlbum = albumData && albumData.find(album => album._id === albumId);
  const bgColor = currentAlbum ? currentAlbum.bgColor : "#121212";
  
   useEffect(()=>{
    if(isAlbum && currentAlbum){
      displayref.current.style.background = `linear-gradient(${bgColor},#121212)`;
    }else{
      displayref.current.style.background = `#121212`;

    }
   })
  
  return (
    <div ref={displayref} className=' w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
        <Routes>
            <Route path='/' element={<DisplayHome/>}/>
            <Route path='/album/:id' element={<DisplayAlbum/>}/>
        </Routes>
    </div>
  )
}

export default Display