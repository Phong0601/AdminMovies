import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
	LoginOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Movies from "./Movies/Movies";
import User from "./User/User";
import "./admin.scss";
import ManageMovie from "./Movies/ManageMovie";
import AddMovie from "./Movies/AddMovie";
import EditMovie from "./Movies/EditMovie";
import instance from "api/instance";

import SignUp from "features/Authentication/SignUp/SignUp";
import ShowTime from "./Movies/ShowTime";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

const items = [
	getItem("Movies", "/movies", <DesktopOutlined />, [
		getItem("Manage movie", "/movies/manage"),
		getItem("Add movie", "/movies/add"),
	]),
	getItem("User", "/users", <UserOutlined />),
	getItem("Đăng Xuất", "/signin", <LoginOutlined />),
];
//123@admin
//123123
const Admin = (props) => {
	const location = useLocation();
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(false);
	const [users, setUsers] = useState(null);
	const login = props.getUser;
	const fetchUsers = async () => {
		try {
			const res = await instance.request({
				url: "/api/QuanLyNguoiDung/LayDanhSachNguoiDung",
				method: "GET",
				MaNhom: "GP01",
			});
			setUsers(res.data.content);
			console.log(res.data.content);
		} catch (error) {}
	};

	useEffect(() => {
		fetchUsers();
	}, []);
	if (!users) return <Spin></Spin>;
	return (
		<Layout
			style={{
				minHeight: "100vh",
			}}
		>
			<Sider
				className="sider"
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<div style={{ display: "inline-block" }} className="logo">
					{login ? (
						<h1 style={{ color: "#fff" }}>
							Hi <UserOutlined /> , {login?.taiKhoan}
						</h1>
					) : null}
				</div>
				<Menu
					onClick={({ key }) => {
						navigate(key);
						if (key === "/signin") {
							localStorage.removeItem("token");
						}
					}}
					theme="dark"
					defaultSelectedKeys={["/"]}
					mode="inline"
					items={items}
				/>
			</Sider>
			<Layout className="site-layout">
				<Header
					className="site-layout-background"
					style={{
						padding: 0,
					}}
				/>
				<Content
					style={{
						margin: "0 16px",
					}}
				>
					<div
						className="site-layout-background"
						style={{
							padding: 24,
							minHeight: 360,
						}}
					>
						<Routes>
							<Route
								path="/users"
								element={
									<User
										fetchUsers={fetchUsers}
										users={users}
									/>
								}
							/>
							<Route path="/" element={<Movies />} />
							<Route
								path="/movies/manage"
								element={<ManageMovie />}
							/>
							<Route
								path="/movies/edit/:id"
								element={<EditMovie />}
							/>
							<Route path="/movies/add" element={<AddMovie />} />
							<Route
								path="/movies/showtime/:id"
								element={<ShowTime />}
							/>
							<Route
								path="/signup"
								element={<SignUp fetchUsers={fetchUsers} />}
							></Route>
						</Routes>
					</div>
				</Content>
				<Footer
					style={{
						textAlign: "center",
					}}
				>
					Ant Design ©2018 Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	);
};

export default Admin;
