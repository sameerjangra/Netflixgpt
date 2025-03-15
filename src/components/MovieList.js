import MovieCard from "./MovieCard";
import useMovieTrailer from "../hooks/useMovieTrailer";
import useMovieClip from "../hooks/useMovieClip";
import VideoModel from "./VideoModal";

const MovieList = ({ title, movies }) => {
 
  return (
    <div className="p-6">
      <h1 className="text-3xl py-2 text-white">{title}</h1>
      <div className="flex overflow-x-scroll scrollbar-hide">
        <div className="flex">
          {movies?.map((movie) => {
           useMovieClip(movie.id);
            useMovieTrailer(movie.id); // ✅ Fetch trailer for each movie
            return (
              <>
                <VideoModel key={movie.id} movieId={movie.id} />
                <MovieCard key={movie.id} movie={movie.id} />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
