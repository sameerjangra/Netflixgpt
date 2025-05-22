import { useDispatch } from "react-redux";
import { setSelectedMovie } from "../utils/movieSlice"; // ✅ Import action
import { IMG_CDN_URL } from "../utils/constant";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="relative  min-w-28 h-44   md:min-w-[200px] md:h-72 pr-4 cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ease-in-out z-50 "
      onClick={() => dispatch(setSelectedMovie(movie.id))} // ✅ Redux store update karega
    >
      <img
        alt="Movie Poster"
        src={IMG_CDN_URL + movie.poster_path}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
};

export default MovieCard;
