import axios from 'axios'
const url = 'http://localhost:8000/api/serveweb/'

/**
 * 文章API部分（可以抽离出单独的模块）
 * @param {*}
 */

// (GET) 获取所有文章内容
export const getArticletext = params => {
  return axios.get(`${url}${params}`).then( res => res.data )
}

// ======================== | ==========================
// (POST) getDataBySql
export const getDataBySql = params => {
  return axios.post(`${url}getdatabysql`,params).then( res => res.data )
}