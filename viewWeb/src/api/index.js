import axiosApi from './plugin/axios'

/**
 * 文章API部分（可以抽离出单独的模块）
 * @param {*}
 */

// (GET) 获取所有文章内容
export const getArticletext = params => axiosApi.get(`${params}`).then( res => res.data )

// ======================== | ==========================
// (POST) getDataBySql
export const getDataBySql = params => axiosApi.post(`getdatabysql`,params).then( res => res.data )