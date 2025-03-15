import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTION } from "../utils/constant";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const getMovieTrailer = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTION);
            const json = await response.json();

            if (!json.results || json.results.length === 0) {
                console.error("No trailers found for movie:", movieId);
                return;
            }

            const clips = json.results.filter(video => video.type === "Clip");
            const trailer = clips.length ? clips : json.results; // Store all trailers

            dispatch(addTrailerVideo({ movieId, trailer })); // Store trailers with movieId key
        } catch (error) {
            console.error("Error fetching movie trailer:", error);
        }
    };

    useEffect(() => {
        if (!movieId) return;
        getMovieTrailer();
    }, [movieId]);
};

export default useMovieTrailer;
