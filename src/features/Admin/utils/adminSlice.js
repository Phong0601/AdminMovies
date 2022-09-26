import { createSlice } from "@reduxjs/toolkit";
import {
	fetchMovieDetailAction,
	fetchMovieListAction,
} from "features/Admin/utils/adminAction";

const initialState = {
	movieList: null,
	movieDetail: null,
	cinemasGroup: null,
};

const adminSlice = createSlice({
	name: "admin",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Movie list
		builder.addCase(fetchMovieListAction.fulfilled, (state, action) => {
			state.movieList = action.payload;
		});

		// Movie detail (to edit)
		builder.addCase(fetchMovieDetailAction.fulfilled, (state, action) => {
			state.movieDetail = action.payload;
		});
	},
});
export default adminSlice;
