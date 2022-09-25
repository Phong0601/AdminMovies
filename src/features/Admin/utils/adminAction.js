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
	"admin/createMovie",
	async (formData) => {
		try {
			console.log(formData.get("File"));
			const res = await instance.request({
				url: "/api/QuanLyPhim/ThemPhimUploadHinh",
				method: "POST",
				body: formData,
			});

			alert("thanh cong");
			console.log(res.data.content);
			return res.data.content;
		} catch (err) {
			console.log(err);
		}
	}
);

// get 1 movie to edit
export const fetchMovieDetailAction = createAsyncThunk(
	"admin/fetchMovieDetail",
	async (movieId) => {
		try {
			const res = await instance.request({
				url: "/api/QuanLyPhim/LayThongTinPhim",
				method: "GET",
				params: {
					maPhim: movieId,
				},
			});

			// console.log(res.data.content);
			return res.data.content;
		} catch (err) {
			console.log(err);
		}
	}
);


//get users 