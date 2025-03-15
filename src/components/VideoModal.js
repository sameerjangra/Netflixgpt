import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { FaPlay, FaPause, FaBackward, FaForward, FaArrowLeft } from "react-icons/fa";
import { resetSelectedMovie } from "../utils/movieSlice";
import { useNavigate } from "react-router-dom";

const VideoModel = ({ selectedMovieId, onBack }) => {
  const trailer = useSelector((store) => store.movies?.trailerVideo?.trailer[0]);
  useMovieTrailer(selectedMovieId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const iframeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [isControlsVisible, setIsControlsVisible] = useState(true); // ✅ Controls visibility state
  const hideControlsTimeout = useRef(null);

  useEffect(() => {
    const handleMouseMove = () => {
      setIsControlsVisible(true); // ✅ Show controls when mouse moves
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
      hideControlsTimeout.current = setTimeout(() => {
        setIsControlsVisible(false); // ✅ Hide controls after 3 seconds of inactivity
      }, 3000);
    };

    document.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, []);

  const handleLogoClick = () => {
    dispatch(resetSelectedMovie());
    navigate("/browse");
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    iframeRef.current?.contentWindow?.postMessage(
      `{ "event": "command", "func": "${isPlaying ? "pauseVideo" : "playVideo"}", "args": "" }`,
      "*"
    );
  };

  const seekVideo = (seconds) => {
    iframeRef.current?.contentWindow?.postMessage(
      `{ "event": "command", "func": "seekTo", "args": [${currentTime + seconds}, true] }`,
      "*"
    );
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    setCurrentTime(newTime);
    seekVideo(newTime - currentTime);
  };

  return (
    <div className="relative w-full h-[720px] overflow-hidden bg-black flex flex-col">
      {/* Back Button */}
      {isControlsVisible && (
        <button onClick={onBack} className="absolute top-4 left-4 z-10 bg-gray-800 p-2 rounded-full text-white">
          <FaArrowLeft size={20} onClick={handleLogoClick} />
        </button>
      )}

      {/* Video */}
      <iframe
        ref={iframeRef}
        className="w-full h-full scale-150"
        src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&loop=1&playlist=${trailer?.key}&enablejsapi=1&modestbranding=1&rel=0&controls=0&showinfo=0&disablekb=1&vq=hd1080`}
        title="YouTube video player"
        allow="autoplay; encrypted-media;"
      ></iframe>

      {/* Controls */}
      {isControlsVisible && (
        <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center bg-gray-900 bg-opacity-80 p-4 transition-opacity duration-300">
          {/* Seek Bar */}
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer"
          />

          {/* Buttons */}
          <div className="flex items-center mt-3 space-x-6">
            <button onClick={() => seekVideo(-10)} className="text-white text-2xl">
              <FaBackward />
            </button>
            <button onClick={togglePlayPause} className="text-white text-3xl">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={() => seekVideo(10)} className="text-white text-2xl">
              <FaForward />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoModel;
