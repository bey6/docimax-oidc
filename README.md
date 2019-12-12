# docimax-oidc

An oidc-client application for docimax.

## setup

```bash
npm i @docimax/oidc
npm i axios postcss-import postcss-loader postcss-url -D
```

## 配置文件

在 `src/` 目录下新建一个 `auth.js` 用于 oidc 的配置文件，内容如下（请按需修改）：

auth.js 内容如下：

```js
export default {
  authority: 'http://192.168.1.67:10000/',
  client_id: 'plugin',
  redirect_uri: window.location.origin + '/oidc-callback',
  post_logout_redirect_uri: window.location.origin + '/',

  // if we choose to use popup window instead for logins
  popup_redirect_uri: window.location.origin + '/popup.html',
  popupWindowFeatures:
    'menubar=yes,location=yes,toolbar=yes,width=1200,height=800,left=100,top=100;resizable=yes',

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
  filterProtocolClaims: false,
};
```

## src/main.js(或 index.js)

> 注意：axios 也是必要的

```js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { oidcInstance } from '@docimax/oidc';

import axios from 'axios';

import auth from './auth';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(oidcInstance, { oidcConf: auth, router, store });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
```

## src/router.js

目前只支持 `history` 模式，请尽量保持配置一致。

另外， oidc-callback 页会被自动添加到项目的路由上，因此如果 router 中包含了 oidc-callback 相关的路由配置，请删除。

```js
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import { oidcGuard } from '@docimax/oidc';

import store from './store';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'oidc-callback') {
    next();
  } else {
    oidcGuard(Vue, store, next);
  }
});

export default router;
```

## vue.config.js

67 默认配置有可用的 oidc-client，auth.js 不做任何修改的情况下，需要通过 `4300` 端口启动项目。

vue.config.js

```js
module.exports = {
  devServer: {
    port: 4300,
  },
};
```

## 获取 userinfo

直接使用 getUserinfo 即可

```js
computed: {
  ...mapGetters("docimax", ["getUserinfo"])
}
```

## 退出

```js
import { oidcSignout } from '@docimax/oidc';

// ...

function yourFunction() {
  // this 对应的是本 spa 所实例化的 vue 对象
  oidcSignout(this); // here
}
```
