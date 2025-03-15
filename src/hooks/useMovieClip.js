import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTION } from "../utils/constant";
import { addMovieClip } from "../utils/movieSlice";
 
const useMovieClip = (movieId) => {
    const dispatch = useDispatch();

    const getMovieClip = async () => {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTION);
            const json = await data.json();
            console.log("API Response for Movie ID:", movieId, json);
            if (!json.results) {
              console.error("API did not return results for movie:", movieId);
              return;
            }
            
            if (!json.results || json.results.length === 0) {
                console.error("No clips found for movie:", movieId);
                return;
            }

            const filterData = json.results.filter(video => video.type === "Clip");
            const clip = filterData.length ? filterData[0] : json.results[0];
        
            
            dispatch(addMovieClip(clip));

        } catch (error) {
            console.error("Error fetching movie clip:", error);
        }
    };

    useEffect(() => {
        console.log("Fetching clip for movie:", movieId);
        if (!movieId) return;
        getMovieClip();
      }, [movieId]);
      
};


export default useMovieClip;
