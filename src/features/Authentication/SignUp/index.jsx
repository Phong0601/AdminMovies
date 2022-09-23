import {
	FileTextOutlined,
	LockOutlined,
	MailOutlined,
	PhoneOutlined,
	ToolOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import instance from "api/instance";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { signUpAction } from "../utils/authAction";

const schema = yup.object({
	taiKhoan: yup.string().required("*Trường này bắt buộc nhập !"),
	matKhau: yup
		.string()
		.required("*Trường này bắt buộc nhập !")
		.min(6, "*Mật khẩu phải từ 6 đến 14 kí tự"),
	hoTen: yup
		.string()
		.required("*Trường này bắt buộc nhập !")
		.matches(/^[A-Za-z ]+$/g, "*Họ tên không đúng"),
	email: yup
		.string()
		.required("*Trường này bắt buộc nhập !")
		.email("*Email không đúng định dạng"),
	soDt: yup
		.number()
		.typeError("*Số điện thoại không đúng !")
		.positive("*Số điện thoại không bắt đầu bằng dấu trừ (-) !")
		.integer("*Số điện thoại không được dùng số thập phân !")
		.min(8, "*Số điện thoại phải lớn hơn 8 kí tự !")
		.required("*Trường này bắt buộc nhập !"),
});

function SignUp() {
	// Set loading when click button submit (sign up)
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();

	//go to signIn
	const goToSignIn = () => {
		history.push("/signin");
	};

	// Setting modal
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Validation Form
	const formik = useFormik({
		initialValues: {
			taiKhoan: "",
			matKhau: "",
			hoTen: "",
			email: "",
			soDt: "",
		},
		onSubmit: (user) => {
			const newUser = { ...user, maNhom: "GP03" };
			signUp(newUser);
		},
		validationSchema: schema,
	});

	const signUp = async (user) => {
		setIsLoading(true); // show icon loading
		const data = await dispatch(signUpAction(user));

		if (!data.payload) {
			setIsLoading(false);
			return alert(
				"Tài khoản hoặc email đã tồn tại, vui lòng nhập lại !"
			);
		} else {
			setIsLoading(false);
			alert("Đăng kí thành công !");
			history.push("/signin");
		}
		setIsLoading(false);
	};

	// Setting modal

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div
			className="SignUp"
			style={{ backgroundImage: "url(/bg/bgSignup.jpg)" }}
		>
			<div className="container">
				<div className="content">
					<h2 className="title">Sign Up</h2>

					<form onSubmit={formik.handleSubmit} className="form">
						<Input
							name="taiKhoan"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="input"
							type="text"
							placeholder="Username"
							prefix={<UserOutlined style={{ marginRight: 8 }} />}
						/>
						{formik.touched.taiKhoan && formik.errors.taiKhoan && (
							<p className="errorText">
								{formik.errors.taiKhoan}
							</p>
						)}
						<Input
							name="matKhau"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="input"
							type="password"
							placeholder="Password"
							prefix={<LockOutlined style={{ marginRight: 8 }} />}
						/>
						{formik.touched.matKhau && formik.errors.matKhau && (
							<p className="errorText">{formik.errors.matKhau}</p>
						)}

						<Input
							name="hoTen"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="input"
							type="text"
							placeholder="FullName"
							prefix={
								<FileTextOutlined style={{ marginRight: 8 }} />
							}
						/>
						{formik.touched.hoTen && formik.errors.hoTen && (
							<p className="errorText">{formik.errors.hoTen}</p>
						)}
						<Input
							name="email"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="input"
							type="text"
							placeholder="Email"
							prefix={<MailOutlined style={{ marginRight: 8 }} />}
						/>
						{formik.touched.email && formik.errors.email && (
							<p className="errorText">{formik.errors.email}</p>
						)}
						<Input
							name="soDt"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className="input"
							type="text"
							placeholder="Phone"
							prefix={
								<PhoneOutlined style={{ marginRight: 8 }} />
							}
						/>
						{formik.touched.soDt && formik.errors.soDt && (
							<p className="errorText">{formik.errors.soDt}</p>
						)}

						<div className="term">
							<Checkbox>Chấp nhận các điều khoản</Checkbox>
							<span
								onClick={showModal}
								style={{ color: "blue", marginLeft: 20 }}
							>
								Điều khoản
							</span>
							<Modal
								title="Basic Modal"
								open={isModalOpen}
								onOk={handleOk}
								onCancel={handleCancel}
							>
								<p>Some contents...</p>
								<p>Some contents...</p>
								<p>Some contents...</p>
							</Modal>
						</div>

						<Button
							htmlType="submit"
							type="primary"
							className="btn-submit"
							loading={isLoading}
						>
							Sign Up
						</Button>
					</form>

					<div className="signin-tips">
						<p>You have a account ?</p>
						<Button
							type="primary"
							className="btn-signin"
							onClick={goToSignIn}
						>
							Sign In
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
