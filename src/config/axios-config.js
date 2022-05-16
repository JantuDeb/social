export const axiosConfig = {
  baseURL:
    window.location.protocol === "http:"
      ? "http://localhost:4000/api/v1/"
      : "https://social-media-backendapi.herokuapp.com/api/v1/",
  withCredentials: true,
};
