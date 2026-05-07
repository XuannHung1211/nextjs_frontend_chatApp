import axios from "axios"

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

let isRefreshing = false
let queue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
  queue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  queue = []
}

axiosClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config

    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({ resolve, reject })
        }).then(() => axiosClient(originalRequest))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await axiosClient.post("/api/auth/refresh")

        processQueue(null)

        return axiosClient(originalRequest)
      } catch (e) {
        processQueue(e, null)

        window.location.href = "/signin"
        return Promise.reject(e)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(err)
  }
)

export default axiosClient