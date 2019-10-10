import oc from './oidc-callback'

import { createOidcUserManager } from './service/oidc-helpers'

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
    Vue.prototype.$version = '0.0.37'

    // 添加回调路由
    Vue.prototype.$oidcCallback = [{
      name: 'oidc-callback',
      path: '/oidc-callback',
      component: oc
    }]

    // oidc user manager
    Vue.prototype.$usermanager = createOidcUserManager(options)
  }
}
