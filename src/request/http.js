// 配置axios
import axios from 'axios';

const http = axios.create({
  baseURL: '/api/', // 设置基础 URL  http://localhost:8080/api/user/login
  // 其他配置...
});
// 请求拦截器：会在axios所有请求发送出去之前执行一段特点的代码，例如将token放到请求头中
http.interceptors.request.use(config =>{

  console.log("---------------");
  // 从本地获取token
  let token = window.localStorage.getItem("token")

  if(token){
    config.headers.Authorization = token
  }

  // 可以在代码中做逻辑判断，是否要放行这个请求
  // 放行所有请求
  return config
})

export default http