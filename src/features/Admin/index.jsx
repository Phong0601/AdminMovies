import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import logo from "../../assets/img/icon/logo-sonic.png";
import React, { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Movies from "./Movies/Movies";
import User from "./User/User";
import "./admin.scss";
import ManageMovie from "./Movies/ManageMovie";
import AddMovie from "./Movies/AddMovie";
import EditMovie from "./Movies/EditMovie";
import { useHistory } from "react-router";
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
];

const Admin = (props) => {
	const location = useLocation();

	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(false);

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
					<img src={logo} alt="" />
				</div>
				<Menu
					onClick={({ key }) => {
						navigate(key);
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
					<Routes>
						<Route path="/users" element={<User />} />
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
					</Routes>
					<div
						className="site-layout-background"
						style={{
							padding: 24,
							minHeight: 360,
						}}
					></div>
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
