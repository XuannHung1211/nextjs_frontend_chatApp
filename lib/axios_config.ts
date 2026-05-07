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
axiosClient.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "accessToken"
      );

    const isAuthRoute =

      config.url?.includes("/signin") ||

      config.url?.includes("/signup") ||

      config.url?.includes("/refresh-token");

    // Chỉ attach Bearer cho API protected
    if (token && !isAuthRoute) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }
);
export default axiosClient;