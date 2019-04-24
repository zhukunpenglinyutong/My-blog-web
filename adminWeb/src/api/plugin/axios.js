// ======= src/plugin/axios ===========
import axios from 'axios'

// 创建一个 axios 实例
const axiosApi = axios.create({
  baseURL: 'http://localhost:8000/api/serveweb/',
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
// 响应拦截器

export default axiosApi