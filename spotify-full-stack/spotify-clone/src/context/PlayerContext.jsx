import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PlayerContext = createContext();
const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef()

    const url = 'https://spotify-full-stack-ca77.onrender.com';

    const [songData ,setSongData] = useState([]);
    const [albumData , setAlbumData] =  useState([]);

    const [track, setTrack] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })

    const play = () => {
        if (audioRef.current && track) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    }

    const playWithId = async (songId) => {
        try {
            // Find song by database ID
            const song = songData.find(song => song._id === songId);
            if (song) {
                setTrack(song);
                // Wait for track to be set before playing
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.play();
                        setPlayStatus(true);
                        toast.success(`Now playing: ${song.name}`);
                    }
                }, 100);
            } else {
                toast.error("Song not found");
            }
        } catch (error) {
            console.error("Error playing song:", error);
            toast.error("Error playing song");
        }
    }

    const previous = async () => {
        if (track && songData.length > 0) {
            const currentIndex = songData.findIndex(song => song._id === track._id);
            if (currentIndex > 0) {
                const prevSong = songData[currentIndex - 1];
                setTrack(prevSong);
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.play();
                        setPlayStatus(true);
                        toast.success(`Now playing: ${prevSong.name}`);
                    }
                }, 100);
            }
        }
    }

    const next = async () => {
        if (track && songData.length > 0) {
            const currentIndex = songData.findIndex(song => song._id === track._id);
            if (currentIndex < songData.length - 1) {
                const nextSong = songData[currentIndex + 1];
                setTrack(nextSong);
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.play();
                        setPlayStatus(true);
                        toast.success(`Now playing: ${nextSong.name}`);
                    }
                }, 100);
            }
        }
    }

    const seekSong = async (e) => {
        if (audioRef.current && seekBg.current) {
            audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
        }
    }

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            if (response.data.success && response.data.songs.length > 0) {
                setSongData(response.data.songs);
                setTrack(response.data.songs[0]);
                toast.success(`Loaded ${response.data.songs.length} songs`);
            } else {
                toast.info("No songs available");
            }
        } catch (error) {
            console.error("Error fetching songs:", error);
            toast.error("Failed to load songs");
        }
    }

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            if (response.data.success && response.data.albums.length > 0) {
                setAlbumData(response.data.albums);
                toast.success(`Loaded ${response.data.albums.length} albums`);
            } else {
                toast.info("No albums available");
            }
        } catch (error) {
            console.error("Error fetching albums:", error);
            toast.error("Failed to load albums");
        }
    }

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.ontimeupdate = () => {
                if (seekBar.current && audioRef.current) {
                    const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
                    seekBar.current.style.width = `${progress}%`;
                    setTime({
                        currentTime: {
                            second: Math.floor(audioRef.current.currentTime % 60),
                            minute: Math.floor(audioRef.current.currentTime / 60)
                        },
                        totalTime: {
                            second: Math.floor(audioRef.current.duration % 60),
                            minute: Math.floor(audioRef.current.duration / 60)
                        }
                    })
                }
            }
        }
    }, [audioRef])

    useEffect(() => {
        getSongsData();
        getAlbumsData();
    }, [])

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous,
        next, seekSong,
        songData, albumData
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;
