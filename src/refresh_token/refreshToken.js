// 刷新token
import request from './request'
import { getRefreshToken } from './token'

/**
 * 优化点：同一时间发出很多请求都失败了，都要去刷新token，导致该函数在某一个时间点
 * 并发执行多次（网络请求并发刷新token的问题，如何解决呢？🔥）
 *  定义全局的promise
 *  1.在函数内判断，存在promise就返回
 *  2.为了让请求期间都使用同一个promise，每次请求拿到结果就清空，这样就避免刷新token并发的情况
 */
let promise

// 刷新token需要请求一个单独的接口
export async function refreshToken() {
  // 第一次创建promise，有值返回
  if (promise) {
    return promise
  }

  promise = new Promise(async (resolve, reject) => {
    const resp = await request.get('/refresh_token', {
      headers: {
        Authorization: `Bearer ${getRefreshToken}`
      },
      __isRefreshToken: true
    })
    resolve(resp.code === 0)
  })
  promise.finally(() => {
    // 为了让请求期间都使用同一个promise
    promise = null // 每次请求拿到结果就清空，这样就避免刷新token并发的情况 🔥
  })

  return promise
}

/**
 * 判断是否是刷新token的请求
 * @param {*} config
 * @returns
 */
export function isRefreshRequest(config) {
  return !!config.__isRefreshToken
}
