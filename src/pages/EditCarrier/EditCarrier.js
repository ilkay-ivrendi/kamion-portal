import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./EditCarrier.module.css";
import { Form, Input, Button } from "antd";
import CarriersService from "../../services/CarriersService";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};

const EditCarrier = (props) => {
  const [form] = Form.useForm();
  const carrier = props.location.carrier;

  const onFinish = (values) => {
    console.log(values);
    CarriersService.updateCarrier(values, carrier.id).then((response) => {
      console.log(response);
    });
  };

  const fillForm = () => {
    form.setFieldsValue({
      first_name: carrier.first_name,
      last_name: carrier.last_name,
      email: carrier.email,
    });
  };

  fillForm();

  return (
    <Form {...layout} form={form} onFinish={onFinish}>
      <Form.Item name="first_name" label="Isim">
        <Input />
      </Form.Item>

      <Form.Item name="last_name" label="Soyisim">
        <Input />
      </Form.Item>

      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

EditCarrier.propTypes = {};

EditCarrier.defaultProps = {};

export default EditCarrier;
