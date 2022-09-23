import { createSlice } from "@reduxjs/toolkit";
import {} from 'features/Admin/utils/adminAction'
const adminSlice = createSlice({
	name: "admin",
	initialState: {
		
	},
	reducers: {},
	extraReducers: (builder) => {
		// Demo
		// builder.addCase(fetchMovieListAction.fulfilled, (state, action) => {
		// 	state.movieList = action.payload;
		// });

	
	},
});
export default adminSlice;
