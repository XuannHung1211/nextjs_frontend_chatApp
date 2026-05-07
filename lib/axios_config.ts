import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  // BẮT BUỘC: Để trình duyệt tự động đính kèm accessToken và refreshToken từ Cookie
  withCredentials: true,
});

// =========================
// RESPONSE INTERCEPTOR
// Tự động Refresh Token khi gặp lỗi 401
// =========================
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 1. Kiểm tra nếu lỗi 401 (Unauthorized)
    // 2. Đảm bảo request này chưa được "thử lại" (_retry) để tránh vòng lặp vô tận
    // 3. Không thử refresh nếu chính request đó là request gọi API login/refresh
    if (
      error.response?.status === 401 && 
      !originalRequest._retry &&
      !originalRequest.url?.includes("/api/auth/signin") &&
      !originalRequest.url?.includes("/api/auth/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        console.log("Access Token hết hạn, đang gọi Refresh Token...");
        
        // Gọi API refresh. BE sẽ đọc Refresh Cookie và trả về Set-Cookie cho Access Token mới
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/refresh-token`,
          {},
          { withCredentials: true } // Phải có cái này ở đây để gửi kèm Refresh Cookie
        );

        // Sau khi refresh thành công, trình duyệt đã có Access Cookie mới.
        // Thực hiện lại yêu cầu ban đầu.
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Nếu ngay cả Refresh Token cũng hết hạn (403 hoặc 401 tùy BE trả về)
        console.error("Refresh Token đã chết, yêu cầu đăng nhập lại.");
        
        // Chỉ chạy lệnh redirect nếu đang ở môi trường trình duyệt (Client Side)
        if (typeof window !== "undefined") {
          // Xóa các thông tin user cũ nếu cần và đẩy về trang signin
          window.location.href = "/signin";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;