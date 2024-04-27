import axios from "axios";

const DEFAULT_TIME_OUT = 10 * 1000;
axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL || 'https://9df8cfb798c648318c33629b38c43452.api.mockbin.io';
const defaults = {
  headers: {
    "Content-Type": "application/json",
  },
  error: {
    code: "INTERNAL_ERROR",
    message: "Oops, xin lỗi vì hệ thống gián đoạn, vui lòng thử lại sau ít phút! Rất xin lỗi vì đã làm gián đoạn trải nghiệm của bạn!",
    status: 503,
    data: {},
  },
};

const forceLogout = () => {
  localStorage.clear();
  axios.defaults.headers.common["Authorization"] = "";
};

const api = (method: any, url: any, variables: any) => {
  const accessToken = localStorage.getItem("access_token") || "";
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method,
      headers: { ...defaults.headers, Authorization: accessToken },
      params: method === "get" ? variables : undefined,
      data: method !== "get" ? variables : undefined,
      timeout: DEFAULT_TIME_OUT,
    })
      .then((response: any) => {
        if (response && response.status === STATUS_CODE.AUTHENTICATE) {
          forceLogout();
        }
        resolve(response.data);
      })
      .catch((error: any) => {
        if (error.response) {
          if (error.response.status === STATUS_CODE.AUTHENTICATE) {
            forceLogout();
          }
          reject(error);
        } else {
          reject(defaults.error);
        }
      });
  });
};

export const STATUS_CODE = {
  AUTHENTICATE: 401,
  NOT_FOUND: 404,
};

export const initApi = (token: any) => {
  axios.defaults.headers.common["Authorization"] = `${token}`;
  axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;
};

export const Api = {
  get: (url: any, variables: any): Promise<any> => api("get", url, variables),
  post: (url: any, variables?: any): Promise<any> =>
    api("post", url, variables),
  put: (url: any, variables: any): Promise<any> => api("put", url, variables),
  patch: (url: any, variables: any): Promise<any> =>
    api("patch", url, variables),
  delete: (url: any, variables: any): Promise<any> =>
    api("delete", url, variables),
};
