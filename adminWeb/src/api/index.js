import axios from 'axios'
const url = 'http://localhost:8000/api/serveweb/'

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
 * 添加文章类型（可以抽离出单独的模块）
 * @param {*} params 
 */

// (POST) 文章内容写入
export const setType = params => {
  return axios.post(`${url}/type/settype`,params).then( res => res.data )
}