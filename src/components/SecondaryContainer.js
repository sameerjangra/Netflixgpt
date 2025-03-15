import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const SecondaryContainer = ({ onMovieSelect }) => {
  const movies = useSelector((store) => store.movies?.popularMovies);
  
  return (
    <div className="flex overflow-x-scroll p-4">
      {movies?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onMovieSelect={onMovieSelect} />
       
      ))}
    </div>
  );
};

export default SecondaryContainer;
