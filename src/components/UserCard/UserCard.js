import React from "react";
import PropTypes from "prop-types";
import styles from "./UserCard.module.css";
import { Skeleton, Switch, Card, Avatar } from "antd";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import AuthService from "../../services/AuthService";
import { useHistory } from "react-router-dom";

const { Meta } = Card;

const UserCard = (props) => {
  let currentUser = { ...props.user };
  let history = useHistory();

  function handleLogout() {
    history.push("/login");
    window.location.reload();
    AuthService.logout();
  }

  if (currentUser === null || currentUser === undefined) {
    history.push("/login");
    return {};
  }

  return (
    <div className={styles.UserCard}>
      <Card
        style={{ width: 300, marginTop: 20 }}
        actions={[
          <SettingOutlined key="edit" />,
          <LogoutOutlined key="setting" onClick={handleLogout} />,
        ]}
      >
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={currentUser.username}
            description={currentUser.email}
          />
        </Skeleton>
      </Card>
    </div>
  );
};

UserCard.propTypes = {};

UserCard.defaultProps = {};

export default UserCard;
