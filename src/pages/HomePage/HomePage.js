import React from "react";
import PropTypes from "prop-types";
import styles from "./HomePage.module.css";
import logo from "../../assets/kamion-black.webp";

const HomePage = () => (
  <div className={styles.HomePage}>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Kamiona Hosgeldiniz!</h1>

      <p>Kara Yollari Taşımacılık İş ve İşçi Platformu</p>

      <p>Luften Giris Yapin yada Kayit Ol un.</p>
    </header>
  </div>
);

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default HomePage;
