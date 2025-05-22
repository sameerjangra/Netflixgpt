import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";
import {
  FaPlay,
  FaPause,
  FaBackward,
  FaForward,
  FaArrowLeft,
  FaExpand,
  FaCompress
} from "react-icons/fa";
import { resetSelectedMovie } from "../utils/movieSlice";
import { useNavigate } from "react-router-dom";

const VideoModel = ({ selectedMovieId, onBack }) => {
  const trailer = useSelector((store) => store.movies?.trailerVideo?.trailer[0]);
  useMovieTrailer(selectedMovieId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const videoContainerRef = useRef(null);
  const iframeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(100);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const hideControlsTimeout = useRef(null);

  useEffect(() => {
    const handleMouseMove = () => {
      setIsControlsVisible(true);
      if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
      hideControlsTimeout.current = setTimeout(() => setIsControlsVisible(false), 3000);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
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

  const toggleFullscreen = () => {
    const el = videoContainerRef.current;
    if (!document.fullscreenElement) {
      el.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={videoContainerRef}
      className={`relative w-full bg-black overflow-hidden flex flex-col ${
        isFullscreen
          ? "fixed top-0 left-0 w-screen h-screen z-50"
          : "h-[500px] sm:h-[600px] md:h-[720px] -mt-24 md:mt-0"
      }`}
    >
      {/* Back Button */}
      {isControlsVisible && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 z-10 bg-gray-800 p-2 rounded-full text-white"
        >
          <FaArrowLeft size={20} onClick={handleLogoClick} />
        </button>
      )}

      {/* Video */}
      <div className="relative w-full h-full flex items-center justify-center">
        <iframe
          ref={iframeRef}
          className={`w-full h-full ${
            isFullscreen ? "object-cover" : "md:scale-150 md:origin-center"
          }`}
          src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&loop=1&playlist=${trailer?.key}&enablejsapi=1&modestbranding=1&rel=0&controls=0&showinfo=0&disablekb=1&vq=hd1080`}
          title="YouTube video player"
          allow="autoplay; encrypted-media;"
        ></iframe>
      </div>

      {/* Controls */}
      {isControlsVisible && (
        <div className="absolute md:bottom-0 bottom-24 left-0 right-0 flex flex-col items-center bg-gray-900 bg-opacity-80 px-4 py-3 sm:px-6 transition-opacity duration-300">
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
          <div className="flex items-center justify-between w-full mt-3 text-white">
            <div className="flex items-center space-x-10 text-sm sm:text-xl ml-24  md:ml-[600px]">
              <button onClick={() => seekVideo(-10)}>
                <FaBackward />
              </button>
              <button onClick={togglePlayPause}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={() => seekVideo(10)}>
                <FaForward />
              </button>
            </div>

            {/* Fullscreen Button */}
            <button onClick={toggleFullscreen} className="text-xl">
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoModel;
