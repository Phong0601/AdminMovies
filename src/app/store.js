import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "features/Admin/utils/adminSlice";
import autheSlice from "features/Authentication/utils/autheSlice";

const store = configureStore({
	reducer: {
		admin:adminSlice.reducer,
		authentication:autheSlice.reducer
	},
});
export default store;
