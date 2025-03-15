import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import MainContainer from "./MainContainer";
import VideoModal from "./VideoModal";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import MovieCategory from "./MovieCategory"; // New Component for Movie Sections

const Browse = () => {
  // const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const movies = useSelector((store) => store.movies);
  const selectedMovieId = useSelector((store) => store.movies.selectedMovieId); // ✅ Redux se selectedMovieId le rahe hain



  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ✅ 1. Header */}
      <Header />

      {/* ✅ 2. MainContainer (Only Show If No Movie is Selected) */}
      {!selectedMovieId && <MainContainer />}

      {/* ✅ 3. Show VideoModal if a Movie is Selected */}
      {selectedMovieId && (
        <VideoModal selectedMovieId={selectedMovieId}/>
      )}

      

        {/* ✅ 5. Movie Categories with Titles */}
        <MovieCategory title="Now Playing Movies" movies={movies?.nowPlayingMovies} />
        <MovieCategory title="Popular Movies" movies={movies?.popularMovies}  />
        <MovieCategory title="Top Rated Movies" movies={movies?.topRatedMovies}  />
        <MovieCategory title="Upcoming Movies" movies={movies?.upcomingMovies}  />
      </div>
    
  );
};

export default Browse;
