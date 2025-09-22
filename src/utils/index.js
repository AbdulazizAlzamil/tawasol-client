import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: `${serverUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    document.cookie = `token=${token}; path=/;`;
  } else {
    delete api.defaults.headers.common.Authorization;
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  }
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
  }).format(new Date(date));
};

export const getProfileImageUrl = (userId) => `${serverUrl}/images/${userId}`;
