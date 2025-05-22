  import { useSelector } from "react-redux";
  import useMovieTrailer from "../hooks/useMovieTrailer";

  const VideoBackground = ({ movieId }) => {
    const trailerVideo = useSelector(
      (store) => store.movies?.trailerVideo?.trailer[0]
    );

    useMovieTrailer(movieId);

    return (
      <div className="w-full flex justify-center items-center px-4 overflow-hidden">
        <div
          className={`
            relative w-full  scale-[2] -mt-28  md:mt-0 md:scale-100
            max-w-[400px] aspect-[9/16] 
            sm:max-w-full sm:aspect-video 
            overflow-hidden rounded-lg shadow-lg
          `}
        >
          {trailerVideo && (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&loop=1&mute=1&playlist=${trailerVideo.key}&vq=hd1080`}
              title="YouTube Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          )}
        </div>
      </div>
    );
  };

  export default VideoBackground;
