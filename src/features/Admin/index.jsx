import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
<<<<<<< HEAD
import { Breadcrumb, Layout, Menu, Spin } from "antd";
import React, { useEffect, useState } from "react";
=======
import { Breadcrumb, Layout, Menu } from "antd";
import logo from "../../assets/img/icon/logo-sonic.png";
import React, { useState } from "react";
>>>>>>> 1eccd6752d2ca2b60ea7bd9e54be9aa283cf6ff1
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Movies from "./Movies/Movies";
import User from "./User/User";
import "./admin.scss";
import ManageMovie from "./Movies/ManageMovie";
import AddMovie from "./Movies/AddMovie";
import EditMovie from "./Movies/EditMovie";
<<<<<<< HEAD
import instance from "api/instance";
=======
import { useHistory } from "react-router";
>>>>>>> 1eccd6752d2ca2b60ea7bd9e54be9aa283cf6ff1
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
//123@admin
//123123
const Admin = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [users, setUsers] = useState(null);
	
  const fetchUsers = async () => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/LayDanhSachNguoiDung",
        method: "GET",
        MaNhom: "GP00",
      });
	  setUsers(res.data.content)
    } catch (error) {}
  };
  
useEffect(()=>{
	// localStorage.setItem('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicGhvbmcwNjAxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoicGhvbmcwNjAxQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJRdWFuVHJpIiwicGhvbmcwNjAxQGdtYWlsLmNvbSIsIkdQMDAiXSwibmJmIjoxNjY0MTEzMDA1LCJleHAiOjE2NjQxMTY2MDV9.QgRTTMD7nJRo8TT8eR_aXdv-THGMiIStEXsJWjpQxoI')
	fetchUsers()
},[])
if (!users) return <Spin></Spin>
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
        <div className="logo" />
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
            <Route path="/users" element={<User users={users} />} />
            <Route path="/" element={<Movies />} />
            <Route path="/movies/manage" element={<ManageMovie />} />
            <Route path="/movies/edit/:id" element={<EditMovie />} />
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
