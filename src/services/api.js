import axios from "axios";


const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  withCredentials: true,
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

// Favorieten functies
export const addFavorite = (videoId) => API.post(`/favorites/${videoId}`);
export const removeFavorite = (videoId) => API.delete(`/favorites/${videoId}`);
export const getFavorites = () => API.get("/favorites");




export default API;
