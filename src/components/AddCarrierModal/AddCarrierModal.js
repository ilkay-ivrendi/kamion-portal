import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./AddCarrierModal.module.css";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import CarriersService from "../../services/CarriersService";

const AddCarrierModal = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log("Kamyoncu Formu: ", values);
    setConfirmLoading(true);
    CarriersService.addCarrier(values).then((response) => {
      setVisible(false);
      setConfirmLoading(false);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <div className={styles.AddCarrierModal}>
      <Button type="primary" onClick={showModal}>
        Guvenilir Kamyoncu Ekle
      </Button>
      <Modal
        title="Guvenilir Kamyoncu Ekleme Formu"
        visible={visible}
        onOk={form.submit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name="basic"
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Kamyoncu Adi"
            name="first_name"
            rules={[
              {
                required: true,
                message: "Lutfen Isim Giriniz!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Kamyoncu Soyadi"
            name="last_name"
            rules={[
              {
                required: true,
                message: "Lutfen Soyisim Giriniz!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email Adresi"
            name="email"
            rules={[
              {
                required: true,
                message: "Lutfen Email Giriniz!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Avatar Resmi"
            name="photo"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

AddCarrierModal.propTypes = {};

AddCarrierModal.defaultProps = {};

export default AddCarrierModal;
