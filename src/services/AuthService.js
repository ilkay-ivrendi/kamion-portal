import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const register = (username, password, firstName, lastName, phone, email) => {
  return axios.post(`${API_URL}/api/shipper/register`, {
    username,
    password,
    firstName,
    lastName,
    phone,
    email,
  });
};

const login = (credentials) => {
  return axios
    .post(`${API_URL}/api/shipper/login`, credentials)
    .then((response) => {
      localStorage.setItem("currentUser", JSON.stringify(response.data.data));
      return response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const logout = () => {
  localStorage.removeItem("currentUser");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
