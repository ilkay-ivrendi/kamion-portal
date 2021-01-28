import React, { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import UserDashboardPage from "./pages/UserDashboardPage/UserDashboardPage";
import AuthService from "./services/AuthService";
import EditCarrier from "./pages/EditCarrier/EditCarrier";

function App(props) {
  const user = AuthService.getCurrentUser();
  const [isAuthenticated, setAuthentication] = useState(user ? true : false);

  return (
    <div className="App">
      <Navigation isLoggedIn={isAuthenticated} />

      <Switch>
        <Route exact path={["/", "/home"]} component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/dashboard" component={UserDashboardPage} />
        <Route path="/carrier/:id" children={EditCarrier} />
      </Switch>
    </div>
  );
}

export default App;
