import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieListAction } from "features/Admin/utils/adminAction";

const initialState = {
	movieList: null,
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
	},
});
export default adminSlice;
