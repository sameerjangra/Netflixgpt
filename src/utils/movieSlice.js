import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        trailerVideo: null,
        movieClip: null, // ✅ Added movieClip state
        popularMovies: null,
        upcomingMovies: null,
        topRatedMovies: null,
        selectedMovieId: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        addMovieClip: (state, action) => { // ✅ New reducer for movieClip
            state.movieClip = action.payload;
        },
        setSelectedMovie: (state, action) => {
            state.selectedMovieId = action.payload; // ✅ Movie ID ko update karo
          },
        resetSelectedMovie: (state) => {
            state.selectedMovieId = null;
        }
        
    }
});

// Exporting actions
export const {
    addNowPlayingMovies,
    addTrailerVideo,
    addPopularMovies,
    addTopRatedMovies,
    addUpcomingMovies,
    addMovieClip,
    setSelectedMovie ,
    resetSelectedMovie// ✅ Exporting new action
} = movieSlice.actions;

export default movieSlice.reducer;
