import MovieCard from "./MovieCard";

const MovieCategory = ({ title, movies, onMovieSelect }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="-mt-24 pl-4 md:mt-2 md:pl-8">
      <h2 className=" relative text-lg  md:text-2xl font-bold mb-5 md:mb-4 z-50">{title}</h2>
      
      {/* ✅ Horizontal Scroll Added */}
      <div className="flex gap-1 md:gap-4 overflow-x-auto scrollbar-hide md:mb-0 mb-28 ">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onMovieSelect={onMovieSelect} />
        ))}
      </div>
    </div>
  );
};

export default MovieCategory;
