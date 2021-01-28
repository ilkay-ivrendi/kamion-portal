import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import logo from "../../assets/kamion-black.webp";
import AuthService from "../../services/AuthService";
import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 6,
  },
};

const tailLayout = {
  wrapperCol: {
    xs: {
      span: 12,
      offset: 0,
    },
    sm: {
      span: 6,
      offset: 9,
    },
  },
};

const LoginPage = (props) => {
  const [form] = Form.useForm();
  
  const onFinish = (values) => {
    console.log("Giris Formu Gonderildi: ", values);
    AuthService.login(values).then((response) => {
      if (response) {
        console.log(response);
        message.success("Giris Basarili!")
        props.history.push("/dashboard");
        window.location.reload();
      } else {
        console.log("Login Error!");
        message.error("Giris Yapilamadi!");
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <h3 className={styles.formTitle}>Giris Yapin</h3>

      <Form
        {...layout}
        form={form}
        className={styles.loginForm}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          {...tailLayout}
          name="username"
          rules={[
            {
              required: true,
              message: "Lutfen Kullanici Adinizi Girin!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Kullanici Adi" />
        </Form.Item>
        <Form.Item
          {...tailLayout}
          name="password"
          rules={[
            {
              required: true,
              message: "Lutfen Parolanizi Girin",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Parola"
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Beni Hatirla!</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Giris Yap
          </Button>
        </Form.Item>
        <br />
        Yada <Link to="/register">Kayit Ol</Link>
        <br />
        <Link to="/password-reset">Parolami Unuttum!</Link>
      </Form>
    </div>
  );
};

LoginPage.propTypes = {};

LoginPage.defaultProps = {};

export default LoginPage;
