import {
	Button,
	Cascader,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Radio,
	Select,
	Switch,
	TreeSelect,
} from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import React, { useState } from "react";
import moment from "moment";
import { min } from "lodash";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createMovieAction } from "features/Admin/utils/adminAction";

const schema = yup.object({
	tenPhim: yup.string().required("*Bạn chưa nhập tên phim !"),
	trailer: yup.string().required("*Bạn chưa nhập trailer !"),
	moTa: yup.string().required("*Bạn chưa nhập mô tả !"),
	ngayKhoiChieu: yup.string().required("*Bạn chưa chọn ngày khởi chiếu !"),
});

function AddMovie() {
	const [img, setImg] = useState("");
	const dispatch = useDispatch();

	// Validation Form
	const formik = useFormik({
		initialValues: {
			tenPhim: "",
			trailer: "",
			moTa: "",
			ngayKhoiChieu: "",
			dangChieu: false,
			sapChieu: false,
			hot: false,
			danhGia: 0,
			hinhAnh: {},
		},
		onSubmit: (values) => {
			console.log(values);
			values.maNhom = "GP03";
			// 1) Create formData object
			const formData = new FormData();
			for (let key in values) {
				if (key !== "hinhAnh") {
					formData.append(key, values[key]);
				} else {
					// formData.append("custom name", object file, file name )
					formData.append(
						"File",
						values.hinhAnh,
						values.hinhAnh.name
					);
				}
			}
			// get hinhAnh
			// console.log(formData.get("File"));
			// console.log(formData.get("danhGia"));

			// 2) Call api
			dispatch(createMovieAction(formData));
		},

		// validationSchema: schema,
	});

	// setting form antd
	const [componentSize, setComponentSize] = useState("default");
	const onFormLayoutChange = ({ size }) => {
		setComponentSize(size);
	};

	const handleChangeDatePicker = (value) => {
		let date = moment(value).format("DD/MM/YYYY");
		formik.setFieldValue("ngayKhoiChieu", date);
		// formik.handleChange();
	};

	const handleChangeSwitch = (name) => {
		return (value) => formik.setFieldValue(name, value);
	};

	const handleChangeInputNumber = (name) => {
		return (value) => formik.setFieldValue(name, value);
	};

	const handleChangeFile = (e) => {
		//1) get file from e
		let file = e.target.files[0];
		//2) create object to read file
		if (
			file.type === "image/jpeg" ||
			file.type === "image/jpg" ||
			file.type === "image/gif" ||
			file.type === "image/png"
		) {
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				setImg(e.target.result);
			};

			formik.setFieldValue("hinhAnh", file);
		}
	};

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
				<h3>Thêm phim mới</h3>
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
					/>
					{formik.touched.moTa && formik.errors.moTa && (
						<p style={{ color: "red", margin: 0 }}>
							{formik.errors.moTa}
						</p>
					)}
				</Form.Item>

				<Form.Item label="Ngày khởi chiếu">
					<DatePicker
						name="ngayKhoiChieu"
						format={"DD/MM/YYYY"}
						onChange={handleChangeDatePicker}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.ngayKhoiChieu &&
						formik.errors.ngayKhoiChieu && (
							<p style={{ color: "red", margin: 0 }}>
								{formik.errors.ngayKhoiChieu}
							</p>
						)}
				</Form.Item>

				<Form.Item label="Đang chiếu" valuePropName="checked">
					<Switch onChange={handleChangeSwitch("dangChieu")} />
				</Form.Item>

				<Form.Item label="Sắp chiếu" valuePropName="checked">
					<Switch onChange={handleChangeSwitch("sapChieu")} />
				</Form.Item>

				<Form.Item label="Hot" valuePropName="checked">
					<Switch onChange={handleChangeSwitch("hot")} />
				</Form.Item>

				<Form.Item label="Số sao">
					<InputNumber
						onChange={handleChangeInputNumber("danhGia")}
						min={1}
						max={10}
					/>
				</Form.Item>

				<Form.Item label="Hình ảnh">
					<input type="file" onChange={handleChangeFile} />

					<img
						style={{ width: 100, height: 140, objectFit: "cover" }}
						src={img}
						alt="..."
					/>
				</Form.Item>

				<Form.Item label="Tác vụ">
					<button type="submit">Thêm phim</button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default AddMovie;
