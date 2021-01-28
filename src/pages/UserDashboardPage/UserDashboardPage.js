import React from "react";
import PropTypes from "prop-types";
import styles from "./UserDashboardPage.module.css";
import UserCard from "../../components/UserCard/UserCard";
import AuthService from "../../services/AuthService";
import AddCarrierModal from "../../components/AddCarrierModal/AddCarrierModal";
import CarriersList from "../../components/CarriersList/CarriersList";
import { Row, Col } from "antd";

const currentUser = AuthService.getCurrentUser();

const UserDashboardPage = (props) => {
  return (
    <div className={styles.UserDashboardPage}>
      <Row gutter={[48, 24]} justify="center">
        <Col>
          <UserCard user={currentUser} />
          <AddCarrierModal />
        </Col>
        <Col>
          <CarriersList />
        </Col>
      </Row>
    </div>
  );
};

UserDashboardPage.propTypes = {};

UserDashboardPage.defaultProps = {};

export default UserDashboardPage;
