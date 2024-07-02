// 配置axios
import axios from 'axios';

const http = axios.create({
  baseURL: '/api/', // 设置基础 URL  http://localhost:8080/api/user/login
  // 其他配置...
});

export default http