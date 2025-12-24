import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { audioRef, track, songData } = useContext(PlayerContext);
  return (
    <div className='h-screen bg-black'>

      {
        songData && songData.length > 0
          ? <>
            <div className='h-[90%] flex'>
              <Sidebar />
              <Display />
            </div>
            <Player />
          </> : 
          <div className='h-screen bg-black flex items-center justify-center'>
            <div className='text-white text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4'></div>
              <p>Loading your music...</p>
            </div>
          </div>
      }

      <audio ref={audioRef} src={track ? track.file : ""} preload='auto'></audio>
      
    </div>
  )
}

export default App