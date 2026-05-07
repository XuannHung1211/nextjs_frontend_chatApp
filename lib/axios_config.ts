import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});



// =========================
// REQUEST INTERCEPTOR
// Tự gắn Bearer Token
// =========================

axiosClient.interceptors.request.use(

  (config) => {

    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {

      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);



// =========================
// RESPONSE INTERCEPTOR
// Auto Refresh Token
// =========================
axiosClient.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (

      error.response?.status === 401 &&

      !originalRequest._retry &&

      !originalRequest.url.includes("/signin") &&

      !originalRequest.url.includes("/signup") &&

      !originalRequest.url.includes("/refresh-token")

    ) {

      originalRequest._retry = true;

      try {

        const response = await axios.post(

          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh-token`,

          {},

          {
            withCredentials: true
          }
        );

        const newAccessToken =
          response.data.accessToken;

        localStorage.setItem(
          "accessToken",
          newAccessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return axiosClient(originalRequest);

      } catch (refreshError) {

        localStorage.removeItem(
          "accessToken"
        );

        if (
          window.location.pathname !==
          "/signin"
        ) {

          window.location.href =
            "/signin";
        }

        return Promise.reject(
          refreshError
        );
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;