import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Navigation.module.css";
import logo from "../../assets/kamion-white.webp";
import { Link } from "react-router-dom";

import { Menu } from "antd";
import {
  PlusCircleOutlined,
  LoginOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

const Navigation = (props) => {
  const [loggedIn, setLoggedIn] = useState({ ...props.isLoggedIn });

  useEffect(() => {
    setLoggedIn(props.isLoggedIn);
  }, [props.isLoggedIn]);

  return (
    <div className={styles.Navigation}>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item>
          <Link to="/">
            <img src={logo} alt="logo" className={styles.Menulogo} />
          </Link>
        </Menu.Item>

        <Menu.Item key="log" icon={<DashboardOutlined />} hidden={!loggedIn}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>

        <Menu.Item
          key="mail"
          icon={<PlusCircleOutlined />}
          className={styles.loginMenu}
          hidden={loggedIn}
        >
          <Link to="/register">Kayit Ol</Link>
        </Menu.Item>

        <Menu.Item
          key="app"
          icon={<LoginOutlined />}
          className={styles.loginMenu}
          hidden={loggedIn}
        >
          <Link to="/login">Giris Yap</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

Navigation.propTypes = {};

Navigation.defaultProps = {};

export default Navigation;
