import axios from "axios";
import AuthHeader from "../helpers/AuthHeader";

const API_URL = process.env.REACT_APP_API_URL;

const getAllCarriers = () => {
  return axios.get(API_URL + "/api/shipper/carrier", { headers: AuthHeader() });
};

const addCarrier = (carrier) => {
  return axios.post(API_URL + "/api/shipper/carrier", carrier, {
    headers: AuthHeader(),
  });
};

const updateCarrier = (carrier, carrierID) => {
  return axios.post(
    API_URL + "/api/shipper/update-carrier/" + carrierID,
    carrier,
    {
      headers: AuthHeader(),
    }
  );
};

export default {
  getAllCarriers,
  addCarrier,
  updateCarrier,
};
