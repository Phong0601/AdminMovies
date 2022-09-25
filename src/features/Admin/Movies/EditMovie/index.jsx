import {
	Button,
	Cascader,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Radio,
	Select,
	Spin,
	Switch,
	TreeSelect,
} from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	createMovieAction,
	fetchMovieDetailAction,
	updateMovieAction,
} from "features/Admin/utils/adminAction";
import { useLocation, useRouteMatch } from "react-router-dom";
import moment from "moment";
import { useHistory } from "react-router";

const schema = yup.object({
	tenPhim: yup.string().required("*Bạn chưa nhập tên phim !"),
	trailer: yup.string().required("*Bạn chưa nhập trailer !"),
	moTa: yup.string().required("*Bạn chưa nhập mô tả !"),
});

function EditMovie() {
	const [img, setImg] = useState("");
	const dispatch = useDispatch();

	const match = useLocation();
	const index = match.pathname.lastIndexOf("/");
	const movieId = match.pathname.slice(index + 1, match.pathname.length);
	// console.log(movieId);

	// get movie to fill form
	const fetchMovieDetail = () => {
		dispatch(fetchMovieDetailAction(movieId));
	};

	// token Admin
	const setToken = () => {
		localStorage.setItem(
			"token",
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWJjMTIzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2hhbmg2NjZAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJraGFuaDY2NkBnbWFpbC5jb20iLCJHUDAxIl0sIm5iZiI6MTY2NDA5MzU1NCwiZXhwIjoxNjY0MDk3MTU0fQ.QpWBnFcK9d0YGqMzRzz7bP62QZWKu0lOIhEVLyx4_S8"
		);
	};

	useEffect(() => {
		fetchMovieDetail();
		setToken();
	}, []);

	const movieDetail = useSelector((state) => state.admin.movieDetail);

	// Validation Form
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			maPhim: movieDetail?.maPhim,
			tenPhim: movieDetail?.tenPhim,
			trailer: movieDetail?.trailer,
			moTa: movieDetail?.moTa,
			dangChieu: movieDetail?.dangChieu,
			sapChieu: movieDetail?.sapChieu,
			hot: movieDetail?.hot,
			danhGia: movieDetail?.danhGia,
			ngayKhoiChieu: movieDetail?.ngayKhoiChieu,
			hinhAnh: null,
		},
		onSubmit: (values) => {
			console.log(values);
			values.maNhom = "GP03";
			// // 1) Create formData object
			let formData = new FormData();
			for (let key in values) {
				if (key !== "hinhAnh") {
					formData.append(key, values[key]);
				} else {
					// formData.append("custom name", object file, file name )
					if (values.hinhAnh !== null) {
						formData.append(
							"File",
							values.hinhAnh,
							values.hinhAnh.name
						);
					}
				}
			}
			// get hinhAnh
			// console.log(formData.get("File").name);

			// 2) Call api
			dispatch(updateMovieAction(formData));
		},

		// validationSchema: schema,
	});

	// setting form antd
	const [componentSize, setComponentSize] = useState("default");
	const onFormLayoutChange = ({ size }) => {
		setComponentSize(size);
	};

	const handleChangeDatePicker = (value) => {
		let date = moment(value);
		formik.setFieldValue("ngayKhoiChieu", date);
	};

	const handleChangeSwitch = (name) => {
		return (value) => formik.setFieldValue(name, value);
	};

	const handleChangeInputNumber = (name) => {
		return (value) => formik.setFieldValue(name, value);
	};

	const handleChangeFile = async (e) => {
		//1) get file from e
		let file = e.target.files[0];
		//2) create object to read file
		if (
			file.type === "image/jpeg" ||
			file.type === "image/jpg" ||
			file.type === "image/gif" ||
			file.type === "image/png"
		) {
			// Save file data to formik. Notice: setFieldValue is async func
			await formik.setFieldValue("hinhAnh", file);
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				setImg(e.target.result);
			};
		}
	};

	if (!movieDetail) {
		return (
			<div>
				<Spin size="large" />
			</div>
		);
	}

	return (
		<div>
			<Form
				onSubmitCapture={formik.handleSubmit}
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 14,
				}}
				layout="horizontal"
				initialValues={{
					size: componentSize,
				}}
				onValuesChange={onFormLayoutChange}
				size={componentSize}
			>
				<h1>Chỉnh sửa phim</h1>
				<Form.Item label="Kích cỡ form" name="size">
					<Radio.Group>
						<Radio.Button value="small">Nhỏ</Radio.Button>
						<Radio.Button value="default">Bình thường</Radio.Button>
						<Radio.Button value="large">Lớn</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item label="Tên phim">
					<Input
						name="tenPhim"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.tenPhim}
					/>

					{formik.touched.tenPhim && formik.errors.tenPhim && (
						<p style={{ color: "red", margin: 0 }}>
							{formik.errors.tenPhim}
						</p>
					)}
				</Form.Item>
				<Form.Item label="Trailer">
					<Input
						name="trailer"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.trailer}
					/>
					{formik.touched.trailer && formik.errors.trailer && (
						<p style={{ color: "red", margin: 0 }}>
							{formik.errors.trailer}
						</p>
					)}
				</Form.Item>

				<Form.Item label="Mô tả">
					<Input
						name="moTa"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.moTa}
					/>
					{formik.touched.moTa && formik.errors.moTa && (
						<p style={{ color: "red", margin: 0 }}>
							{formik.errors.moTa}
						</p>
					)}
				</Form.Item>

				<Form.Item label="Ngày khởi chiếu">
					<DatePicker
						onChange={handleChangeDatePicker}
						format={"DD/MM/YYYY"}
						value={moment(formik.values.ngayKhoiChieu)}
					/>

					{formik.touched.ngayKhoiChieu &&
						formik.errors.ngayKhoiChieu && (
							<p style={{ color: "red", margin: 0 }}>
								{formik.errors.ngayKhoiChieu}
							</p>
						)}
				</Form.Item>

				<Form.Item label="Đang chiếu" valuePropName="checked">
					<Switch
						onChange={handleChangeSwitch("dangChieu")}
						checked={formik.values.dangChieu}
					/>
				</Form.Item>

				<Form.Item label="Sắp chiếu" valuePropName="checked">
					<Switch
						onChange={handleChangeSwitch("sapChieu")}
						checked={formik.values.sapChieu}
					/>
				</Form.Item>

				<Form.Item label="Hot" valuePropName="checked">
					<Switch
						onChange={handleChangeSwitch("hot")}
						checked={formik.values.hot}
					/>
				</Form.Item>

				<Form.Item label="Số sao">
					<InputNumber
						onChange={handleChangeInputNumber("danhGia")}
						min={1}
						max={10}
						value={formik.values.danhGia}
					/>
				</Form.Item>

				<Form.Item label="Hình ảnh">
					<input
						type="file"
						onChange={handleChangeFile}
						style={{ marginBottom: 20 }}
					/>

					<img
						style={{ width: 100, height: 140, objectFit: "cover" }}
						src={img === "" ? movieDetail?.hinhAnh : img}
						alt="..."
					/>
				</Form.Item>

				<Form.Item label="Hành động">
					<button type="submit" style={{ cursor: "pointer" }}>
						Cập nhật
					</button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default EditMovie;
