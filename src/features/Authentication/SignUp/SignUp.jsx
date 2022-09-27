import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import instance from "api/instance";
import { fetchUsersListAction } from "features/Admin/utils/adminAction";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./_signUp.scss";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUp = ({ fetchUsers }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [contentError, setContentErro] = useState("");
  const navigate = useNavigate()
  const ditpatch = useDispatch()
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="+84">+84</Option>
        <Option value="0">+0084</Option>
      </Select>
    </Form.Item>
  );
  const addUsersApi = async (user) => {
    try {
      setLoading(true);
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/ThemNguoiDung",
        method: "POST",
        data: user,
      });
      setLoading(false);
      setContentErro("");
      // fetchUser();
	  navigate('/users')
    } catch (error) {
      setLoading(false);
      setContentErro(error.response.data.content);
    } finally {
      setLoading(false);
    }
  };
  const fetchUser = ()=>{
    ditpatch(fetchUsersListAction())
  }
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={(values) => {
        addUsersApi({ ...values, maNhom: "GP01" });
      }}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "+84",
      }}
      scrollToFirstError
    >
      <Form.Item
        name="hoTen"
        label="Họ và Tên"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="taiKhoan"
        label="Tài Khoản"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="matKhau"
        label="Mật Khẩu"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Xác Nhận Lại Mật Khẩu"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("matKhau") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="soDt"
        label="Số Điện Thoại"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        name="maLoaiNguoiDung"
        label="Phân Quyền"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select placeholder="Phân Quyền">
          <Option value="KhachHang">Khách Hàng</Option>
          <Option value="QuanTri">Quản Trị</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button loading={loading} type="primary" htmlType="submit">
          Register
        </Button>
        {contentError ? <h3 style={{ color: "red" }}>{contentError}</h3> : null}
      </Form.Item>
    </Form>
  );
};

export default SignUp;
