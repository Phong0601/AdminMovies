import {
	Button,
	Cascader,
	DatePicker,
	Form,
	InputNumber,
	Select,
	Spin,
} from "antd";
import {
	createMovieScheduleAction,
	fetchCinemasAction,
	fetchCinemasGroupAction,
} from "features/Admin/utils/adminAction";
import { useFormik } from "formik";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object({
	maRap: yup.string().required("*Bạn chưa chọn rạp chiếu !"),
	ngayChieuGioChieu: yup.string().required("*Bạn chưa chọn ngày chiếu !"),
	giaVe: yup.string().required("*Bạn chưa nhập giá vé !"),
});

function ShowTime() {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const url = window.location.pathname;
	const index = url.lastIndexOf("/");
	const movieId = url.slice(index + 1, url.length);
	// console.log(movieId);

	const [state, setState] = useState({
		cinemasGroup: [],
		cinemas: [],
	});

	const fetchCinemasGroup = async () => {
		const data = await dispatch(fetchCinemasGroupAction());
		setState({ ...state, cinemasGroup: data.payload });
	};

	const createMovieSchedule = (movieSchedule) => {
		dispatch(createMovieScheduleAction(movieSchedule));
	};

	useEffect(() => {
		fetchCinemasGroup();
	}, []);

	const formik = useFormik({
		initialValues: {
			maPhim: movieId,
			ngayChieuGioChieu: "",
			maRap: "",
			giaVe: "",
		},
		onSubmit: (values) => {
			// console.log(values);
			createMovieSchedule(values);
			alert("Thêm lịch chiếu thành công!");
			setTimeout(navigate("/movies/manage"), 2000);
		},

		validationSchema: schema,
	});

	// ---- setting onchange ------
	// cinemas group
	const handleChangeCinemasGroup = async (value) => {
		// console.log(values);
		const data = await dispatch(fetchCinemasAction(value));
		setState({ ...state, cinemas: data.payload });
	};
	// cinemas
	const handleChangeCinemas = (value) => {
		formik.setFieldValue("maRap", value);
	};

	// date-time for schedule
	const onOk = (value) => {
		formik.setFieldValue(
			"ngayChieuGioChieu",
			moment(value).format("DD/MM/YYYY hh:mm:ss")
		);
		// console.log(moment(value).format("DD/MM/YYYY hh:mm:ss"));
	};
	const onChangeDate = (value) => {
		formik.setFieldValue(
			"ngayChieuGioChieu",
			moment(value).format("DD/MM/YYYY hh:mm:ss")
		);
		// console.log("values", moment(value).format("DD/MM/YYYY hh:mm:ss"));
	};

	const onChangeInputNumber = (value) => {
		formik.setFieldValue("giaVe", value);
	};

	// convert select cinemas group
	const convertSelectCinemasGroup = () => {
		return state.cinemasGroup?.map((item, index) => {
			return {
				label: item.tenHeThongRap,
				value: item.maHeThongRap,
				key: index,
			};
		});
	};
	// convert select cinemas
	const convertSelectCinemas = () => {
		return state.cinemas?.map((item, index) => {
			return {
				label: item.tenCumRap,
				value: item.maCumRap,
				key: index,
			};
		});
	};

	if (!state.cinemasGroup) {
		return (
			<>
				<Spin size="large" />
			</>
		);
	}

	return (
		<div className="ShowTime">
			{/* {console.log(state.cinemas)} */}
			<h1>Tạo lịch chiếu</h1>
			<Form
				name="basic"
				labelCol={{
					span: 6,
				}}
				wrapperCol={{
					span: 10,
				}}
				initialValues={{
					remember: true,
				}}
				onSubmitCapture={formik.handleSubmit}
			>
				<Form.Item label="Hệ thống rạp">
					<Select
						name="maHeThongRap"
						options={convertSelectCinemasGroup()}
						placeholder="Chọn hệ thống rạp"
						onChange={handleChangeCinemasGroup}
					></Select>
				</Form.Item>
				<Form.Item label="Cụm rạp">
					<Select
						name="maRap"
						options={convertSelectCinemas()}
						placeholder="Chọn cụm rạp"
						onChange={handleChangeCinemas}
						onBlur={formik.handleBlur}
					></Select>
					{formik.touched.maRap && formik.errors.maRap && (
						<p style={{ color: "red", margin: 0 }}>
							{formik.errors.maRap}
						</p>
					)}
				</Form.Item>

				<Form.Item label="Ngày chiếu giờ chiếu">
					<DatePicker
						name="ngayChieuGioChieu"
						format="DD/MM/YYYY hh:mm:ss"
						showTime
						onChange={onChangeDate}
						onBlur={formik.handleBlur}
						onOk={onOk}
					/>
					{formik.touched.ngayChieuGioChieu &&
						formik.errors.ngayChieuGioChieu && (
							<p style={{ color: "red", margin: 0 }}>
								{formik.errors.ngayChieuGioChieu}
							</p>
						)}
				</Form.Item>

				<Form.Item label="Giá vé">
					<InputNumber
						name="giaVe"
						min={75000}
						max={200000}
						onChange={onChangeInputNumber}
						onBlur={formik.handleBlur}
					/>
					<span style={{ marginLeft: 20 }}>
						*Giá vé tối thiểu là 75.000 VND và tối đa là 200000 VND
					</span>
					{formik.touched.giaVe && formik.errors.giaVe && (
						<p style={{ color: "red", margin: 0 }}>
							{formik.errors.giaVe}
						</p>
					)}
				</Form.Item>

				<Form.Item label="Hành động">
					<Button htmlType="submit" type="primary">
						Tạo lịch chiếu
					</Button>
					<Button
						style={{ marginLeft: 20 }}
						onClick={() => {
							navigate("/movies/manage");
						}}
					>
						Trở về
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default ShowTime;
