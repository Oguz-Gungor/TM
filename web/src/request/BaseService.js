import Axios from "axios";
import { toast } from "react-toastify";
const StatusCode = {
  Forbidden: 403,
};

const authTokenKey = "token";

export default class BaseService {
  baseURL = "http://localhost:8084";
  static logoutCallback;

  failureInterceptor = (error) => {
    if (error.response.status === StatusCode.Forbidden) {
      if (BaseService.logoutCallback) BaseService.logoutCallback();
    }

    if (error.response.status >= 400) {
      if (error.errorMessage) {
        toast.error(error.errorMessage);
      }
    }
    return Promise.reject(error);
  };

  createAxiosInstance = () => {
    const token = localStorage.getItem(authTokenKey);
    const instance = Axios.create({
      headers: token
        ? {
            Authorization: `Bearer ${token}`
          }
        : null,

      validateStatus: (status) =>
        status >= 200 && status <= 500 && status !== 401 && status !== 400,

      baseURL: this.baseURL,
    });

    instance.interceptors.response.use(
      (response) => response,
      this.failureInterceptor
    );

    return instance;
  };
  get = (url = "", ...params) => {
    const axiosInstance = this.createAxiosInstance();
    return axiosInstance.get(url, ...params);
  };

  post(url = "", ...params) {
    const axiosInstance = this.createAxiosInstance();
    return axiosInstance.post(url, ...params);
  }

  put(url = "", ...params) {
    const axiosInstance = this.createAxiosInstance();
    return axiosInstance.put(url, ...params);
  }

  delete(url = "", ...params) {
    const axiosInstance = this.createAxiosInstance();
    return axiosInstance.delete(url, ...params);
  }

  patch(url = "", ...params) {
    const axiosInstance = this.createAxiosInstance();
    return axiosInstance.patch(url, ...params);
  }
}
