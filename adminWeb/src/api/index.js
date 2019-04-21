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

// (POST) 新建文章
export const setArticleNew = params => {
  return axios.post(`${url}article/insertarticle`,params).then( res => res.data )
}

// (POST) 文章内容写入
export const setArticle = params => {
  return axios.post(`${url}article/updatearticle`,params).then( res => res.data )
}

// (POST) 文章内容删除
export const delectArticle = params => {
  return axios.post(`${url}article/delectarticle`,params).then( res => res.data )
}

/**
 * 类型API部分（可以抽离出单独的模块）
 * @param {*}
 */

// (GET) 获取所有类型
export const getTypes = params => {
  return axios.get(`${url}${params}`).then( res => res.data )
}

// (POST) 新建类型
export const insertType = params => {
  return axios.post(`${url}type/insertype`,params).then( res => res.data )
}

// (POST) 修改类型
export const updateType = params => {
  return axios.post(`${url}type/updatetype`,params).then( res => res.data )
}

// (POST) 删除类型
export const delectType = params => {
  return axios.post(`${url}type/delecttype`,params).then( res => res.data )
}