import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./RegisterPage.module.css";
import logo from "../../assets/kamion-black.webp";
import { Form, Input, Tooltip, Select, Row, Col, Checkbox, Button } from "antd";
import {
  QuestionCircleOutlined,
  MailOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import AuthService from "../../services/AuthService";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 6,
      offset: 3,
    },
  },
  wrapperCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 6,
      offset: 0,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 12,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 6,
    },
  },
};

const RegisterPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    values.email = "user@test.com";
    values.phone = "5xx-xxx-xx-xx";
    console.log("Received values of form: ", values);
    AuthService.register(
      values.username,
      values.password,
      values.first_name,
      values.last_name,
      values.phone,
      values.email
    ).then((response) => {
      console.log("KayitOl Response!", response);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.RegisterPage}>
      <img src={logo} className="App-logo" alt="logo" />
      <h3 className={styles.formTitle}>Kayit Olun</h3>

      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          prefix: "90",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label={
            <Tooltip title="Diger Kullanicilar Seni Nasil Gorsun?">
              <QuestionCircleOutlined />
            </Tooltip>
          }
          rules={[
            {
              required: true,
              message: "Lutfen Kullanici Adini Giriniz!",
              whitespace: true,
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Kullanici Adiniz" />
        </Form.Item>

        <Form.Item
          label={
            <Tooltip title="Lutfen Isim Soyisim belirtiniz">
              <QuestionCircleOutlined />
            </Tooltip>
          }
        >
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="first_name"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Lutfen Adinizi Giriniz!",
                  },
                ]}
              >
                <Input placeholder="Adiniz" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="last_name"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Lutfen Soyadinizi Giriniz!",
                  },
                ]}
              >
                <Input placeholder="Soyadiniz" />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="password"
          label={
            <Tooltip title="Guvenilir bir parola secin">
              <QuestionCircleOutlined />
            </Tooltip>
          }
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Parola" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label={
            <Tooltip title="Sectiginiz parolayi lutfen tekrar girin">
              <QuestionCircleOutlined />
            </Tooltip>
          }
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Parola Dogrulama"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label={
            <Tooltip title="Telefon Numaraniz 5xx-xxx-xx-xx formatinda">
              <QuestionCircleOutlined />
            </Tooltip>
          }
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            addonBefore="+90"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={
            <Tooltip title="Aktif Olarak Kullandiginiz Email Adresiniz?">
              <QuestionCircleOutlined />
            </Tooltip>
          }
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
          <Input prefix={<MailOutlined />} placeholder="Email Addresi" />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("Should accept agreement"),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            <a href="">Kullanici Kosullarini</a> Onayliyorum
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Kayit Ol!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

RegisterPage.propTypes = {};

RegisterPage.defaultProps = {};

export default RegisterPage;
