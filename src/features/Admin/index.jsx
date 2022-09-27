import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
	LoginOutlined,
	UserSwitchOutlined,
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
import { fetchUsersListAction } from "./utils/adminAction";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}



const Admin = (props) => {
	const location = useLocation();
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(false);
	const [users, setUsers] = useState(null);
	const login = props.getUser;
	const items = [
		getItem("Movies", "/movies", <DesktopOutlined />, [
			getItem("Manage movie", "/movies/manage"),
			getItem("Add movie", "/movies/add"),
		]),
		getItem("User", "/users", <UserOutlined />),
		getItem("Đăng Xuất", "/signin", <LoginOutlined />),
	];
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
				<div className="logo">
					{login ? (
						<div style={{ color: "#fff", textAlign: "center" }}>
							<div
								style={{
									display: "inline-block",
									border: "3px solid white",
									borderRadius: "50%",
								}}
							>
								<UserOutlined style={{ fontSize: 30 }} />
							</div>
							<div style={{ marginTop: 10, fontSize: 16 }}>
								Hi, {login?.taiKhoan}
							</div>
						</div>
					) : (
						<h1
							onClick={navigate("/signin")}
							style={{
								color: "#fff",
								display: "inline-block",
								
							}}
						>
							Chọn Icon Bất Kì <br/> Để Đăng Nhập
						</h1>
					)}
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
									// fetchUsers={fetchUsers}
									// users={users}
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
								element={
									<SignUp
									// fetchUsers={fetchUsers}
									/>
								}
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
