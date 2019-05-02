import axiosApi from './plugin/axios'

/**
 * 文章API部分（可以抽离出单独的模块）
 * @param {*}
*/

// (GET) 获取所有文章内容
export const getArticletext = params => axiosApi.get(`${params}`).then( res => res.data )

// (POST) 新建文章
export const setArticleNew = params => axiosApi.post(`article/insertarticle`,params).then( res => res.data )

// (POST) 文章内容写入
export const setArticle = params => axiosApi.post(`article/updatearticle`,params).then( res => res.data )

// (POST) 文章内容删除
export const delectArticle = params => axiosApi.post(`article/delectarticle`,params).then( res => res.data )


/**
 * 类型API部分（可以抽离出单独的模块）
 * @param {*}
*/

// (GET) 获取所有类型
export const getTypes = params => axiosApi.get(`${params}`).then( res => res.data )

// (POST) 新建类型
export const insertType = params => axiosApi.post(`type/insertype`,params).then( res => res.data )

// (POST) 修改类型
export const updateType = params => axiosApi.post(`type/updatetype`,params).then( res => res.data )

// (POST) 删除类型
export const delectType = params => axiosApi.post(`type/delecttype`,params).then( res => res.data )


// ======================== 活动开放接口 ==========================
// (POST) getDataBySql
export const getDataBySql = params => axiosApi.post(`getdatabysql`,params).then( res => res.data )

// 登录接口
export const login = params => axiosApi.post(`login`, params).then( res => res.data )

// 验证token是否过期
export const checkToken = params => axiosApi.post(`token`, params).then( res => res.data )