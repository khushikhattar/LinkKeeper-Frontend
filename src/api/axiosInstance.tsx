import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://linkkeeper-backend.onrender.com/api/v1",
  withCredentials: true,
});
/*This pattern avoids multiple refresh calls 
flooding your server and ensures all requests proceed once tokens are refreshed. */
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (error: any) => void;
  originalRequest: any;
}[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(axiosInstance(prom.originalRequest));
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If refresh is ongoing, queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          await axiosInstance.post(
            "/auth/refresh",
            {},
            { withCredentials: true }
          );

          processQueue(null);
          resolve(axiosInstance(originalRequest));
        } catch (err) {
          processQueue(err, null);
          window.location.href = "/login";
          reject(err);
        } finally {
          isRefreshing = false;
        }
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
