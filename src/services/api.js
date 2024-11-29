import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Voeg CancelToken toe voor upload annuleren
API.CancelToken = axios.CancelToken;
API.isCancel = axios.isCancel;

// Token automatisch toevoegen
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
