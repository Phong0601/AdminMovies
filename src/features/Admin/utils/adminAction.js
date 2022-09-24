import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "api/instance";

// get movie list
export const fetchMovieListAction = createAsyncThunk(
	"hone/fetchMovieList",
	async () => {
		try {
			const res = instance.request({
				url: "/api/QuanLyPhim/LayDanhSachPhim",
				method: "GET",
				params: {
					maNhom: "GP03",
				},
			});
			// console.log((await res).data.content);
			return (await res).data.content;
		} catch (err) {
			console.log(err);
		}
	}
);

// Create movie
export const createMovieAction = createAsyncThunk(
	"home/createMovie",
	async () => {
		try {
			const res = await instance.request({
				url: "/api/QuanLyPhim/ThemPhimUploadHinh",
				method: "POST",
			});
			alert("thanh cong");
			console.log(res.data.content);
			return res.data.content;
		} catch (err) {
			console.log(err);
		}
	}
);
