import axios from "axios";
export const server = axios.create({
  baseURL: `http://${document.location.hostname}:8080`,
  timeout: 5000,
});
