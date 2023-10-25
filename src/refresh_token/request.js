import axios from 'axios'
import { setToken, setRefreshToken, getToken } from './token'
import { refreshToken, isRefreshRequest } from './refreshToken'

const ins = axios.create({
  baseURL: 'http://localhost:9527',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

ins.interceptors.response.use(async res => {
  if (res.headers.authorization) {
    const token = res.headers.authorization.replace('Bearer ', '')
    setToken(token)
    ins.defaults.headers.Authorization = `Bearer ${token}`
  }
  if (res.headers.refreshtoken) {
    const refreshtoken = res.headers.refreshtoken.replace('Bearer ', '')
    setRefreshToken(refreshtoken)
  }

  // 没有权限且不是刷新token的请求，重新换取token
  if (res.data.code === 401 && !isRefreshRequest(res.config)) {
    // 刷新token成功
    const isSuccess = await refreshToken()
    if (isSuccess) {
      // 有新的token后，重新请求
      res.config.headers.Authorization = `Bearer ${getToken()}`
      const resp = await ins.request(res.config)
      return resp
    } else {
      // 刷新失败，跳转登录页面
    }
  }

  return res.data
})

export default ins
