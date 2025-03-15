import MovieCard from "./MovieCard";

const MovieCategory = ({ title, movies, onMovieSelect }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className=" mt-2 pl-8">
      <h2 className=" relative text-2xl font-bold mb-4 z-50">{title}</h2>
      
      {/* ✅ Horizontal Scroll Added */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onMovieSelect={onMovieSelect} />
        ))}
      </div>
    </div>
  );
};

export default MovieCategory;
