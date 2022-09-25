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
			const res = await instance.request({
				url: "/api/QuanLyPhim/ThemPhimUploadHinh",
				method: "POST",
				data: formData,
			});
			alert("Thêm phim thành công !");
			// console.log(res.data.content);
			return res.data.content;
		} catch (err) {
			alert("Không thành công: " + err.response.data.content);
			console.log(err.response.data.content);
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

// Update movie
export const updateMovieAction = createAsyncThunk(
	"admin/updateMovie",
	async (formData) => {
		try {
			const res = await instance.request({
				url: "/api/QuanLyPhim/CapNhatPhimUpload",
				method: "POST",
				data: formData,
			});
			alert("Cập nhật phim thành công!");
		} catch (err) {
			alert("Không thành công: " + err.response.data.content);
			console.log(err);
		}
	}
);

// remove movie
export const removeMovieAction = createAsyncThunk(
	"admin/removeMovie",
	async (movieId) => {
		try {
			const res = await instance.request({
				url: "/api/QuanLyPhim/XoaPhim",
				method: "DELETE",
				params: {
					maPhim: movieId,
				},
			});
			alert("Xóa phim thành công!");
		} catch (err) {
			alert("Không thành công: " + err.response.data.content);
			console.log(err);
		}
	}
);
