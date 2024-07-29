import axios from "axios";
import { BASE_URL } from "../constants/apiConstants";

export const fetchUsers = async (url) => {
  const response = await axios.get(`${BASE_URL}/${url}`);
  return response.data;
};

export const addUser = async (url, user) => {
  const response = await axios.post(`${BASE_URL}/${url}`, user);
  return response.data;
};
