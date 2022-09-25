import { Button, Checkbox, Form, Input } from "antd";
import instance from "api/instance";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router/cjs/react-router";
import "./SignIn.scss";
const SignIn = ({setGetUser}) => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    fetchUsers(values)
    console.log("Success:", values);
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const fetchUsers = async (acount) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: acount,
      });
      if (res.data.content.maLoaiNguoiDung === "QuanTri") {
        localStorage.setItem("token", res.data.content.accessToken);
        delete res.data.content.accessToken;
        setGetUser(res.data.content);
        navigate('/users')
        return
      }
      return alert ('Bạn Không Đủ Quyền Truy Cập')
    } catch (error) {
        alert ('Sai Tên Tài Khoản Hoặc Mật Khẩu')
    }
  };

  return (
      <div className="signIn">
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Tài Khoản"
        name="taiKhoan"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mật Khẩu"
        name="matKhau"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default SignIn;
