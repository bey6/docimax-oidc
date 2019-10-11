import { oidcRoute } from './service/oidc-route'
import { createOidcUserManager } from './service/oidc-helpers'
import OidcStore from './service/oidc-store'
import pkg from '../package.json'

// export const version = pkg.version

// export const route = oidcRoute

// export async function getUserInfo (Vue, axios, url) {
//   try {
//     const claim = Vue.$um.getUser()
//     if (!axios) {
//       return claim
//     } else {
//       if (!url) {
//         const res = await axios.get(url)
//         return res
//       }
//       return claim
//     }
//   } catch (error) {
//     return error
//   }
// }

// 用户登录后事件
// Vue
// func: 具体函数，该函数默认穿入一个 user 信息
export function afterUserLoaded (Vue, func) {
  Vue.prototype.$um.events.addUserLoaded(func)
}

export function afterUserUnloaded (Vue, func) {
  Vue.prototype.$um.events.addUserUnloaded(func)
}

export function afterAceessTokenExpiring (Vue, func) {
  Vue.prototype.$um.events.addAccessTokenExpiring(function () {
    func()
    console.log('Access token expiring...' + new Date())
  })
}

export function afterSilentRenewError (Vue, func) {
  Vue.prototype.$um.events.addSilentRenewError(func)
}

export function afterUserSignedOut (Vue, func) {
  Vue.prototype.$um.events.addUserSignedOut(function () {
    func()
    Vue.$um.removeUser()
  })
}

// setup
export const oidcInstance = {
  install (Vue, options) {
    // show version
    console.log(`@docimax/oidc version: ${pkg.version}`)
    // oidc user manager
    Vue.prototype.$um = createOidcUserManager(options.oidcConf)
    // 认证地址
    Vue.prototype.$authUrl = options.oidcConf.authority
    // 添加回调路由
    options.router.addRoutes(oidcRoute)
    // 注册模块
    options.store.registerModule('docimax', OidcStore)
  }
}
