export const axiosConfig = {
  baseURL:
    window.location.protocol === "http:"
      ? "http://localhost:4000/api/v1/"
      : "https://api.ionvu.online/api/v1/",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
