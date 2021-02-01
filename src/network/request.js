import axios from "axios";

export function request(config) {
  // 1. 创建axios实例
  const instance = axios.create({
    // baseURL: "http://123.207.32.32:8000",
    baseURL: "http://152.136.185.210:7878/api/m5",
    timeout: 5000
  });

  /* -------------------------------------------------------
    2. 拦截器 
      作用：
      1. 当config中的一些信息不符合服务器的要求时
      2. 每次发送网络请求时，都希望界面中有显示一个请求的图标
      3. 某些网络请求(比如登录(token))，必须携带一些特殊的信息
    -------------------------------------------------------
    */
  // 2.1. 请求拦截
  instance.interceptors.request.use(
    config => {
      // console.log(config); // 拦截
      return config; // 返回拦截的信息
    },
    err => {
      console.log(err);
    }
  );
  // 2.2. 响应拦截
  instance.interceptors.response.use(
    res => {
      // console.log(res);
      return res;
    },
    err => {
      console.log(err);
    }
  );

  // 3. 发送真正的网络请求
  return instance(config); // 返回一个Promise
}
