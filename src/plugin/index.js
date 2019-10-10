import oc from './oidc-callback'

import { createOidcUserManager } from './service/oidc-helpers'

const oum = createOidcUserManager({
  authority: 'http://192.168.1.67:10000/',
  client_id: 'plugin',
  redirect_uri: window.location.origin + '/oidc-callback',
  post_logout_redirect_uri: window.location.origin + '/',

  // if we choose to use popup window instead for logins
  popup_redirect_uri: window.location.origin + '/popup.html',
  popupWindowFeatures: 'menubar=yes,location=yes,toolbar=yes,width=1200,height=800,left=100,top=100;resizable=yes',

  // these two will be done dynamically from the buttons clicked, but are
  // needed if you want to use the silent_renew
  response_type: 'id_token token',
  // scope: "openid profile email api1 api2.read_only",
  scope: 'openid profile',

  // this will toggle if profile endpoint is used
  loadUserInfo: false,

  // silent renew will get a new access_token via an iframe
  // just prior to the old access_token expiring (60 seconds prior)
  silent_redirect_uri: window.location.origin + '/silent.html',
  automaticSilentRenew: true,

  // will revoke (reference) access tokens at logout time
  revokeAccessTokenOnSignout: true,

  // this will allow all the OIDC protocol claims to be visible in the window. normally a client app
  // wouldn't care about them or want them taking up space
  filterProtocolClaims: false
})

let user = null

oum.clearStaleState()
oum.events.addUserLoaded(u => {
  user = u
})
oum.events.addUserUnloaded(e => {
  user = null
})

export default {
  install (Vue, options) {
    // 注册全局组件
    // Vue.component(box.name, box)

    // 注册全局指令
    // Vue.directive('my-directive', {
    //   bind (el, binding, vnode, oldVnode) {
    //     // ...
    //   }
    // })

    // 混入
    // Vue.mixin({
    //   created () {
    //     // ...
    //   }
    // })

    // 添加原型属性
    Vue.prototype.$doVersion = '0.0.582'
    // 添加回调路由
    Vue.prototype.$oidcCallback = [{
      name: 'oidc-callback',
      path: '/oidc-callback',
      component: oc
    }]
    // oidc user manager
    Vue.prototype.$usermanager = oum
    // current user
    Vue.prototype.$userinfo = user
  }
}
