# docimax-oidc

An oidc-client application for docimax.

## setup

```
npm i @docimax/oidc
npm i axios postcss-import postcss-loader postcss-url -D
```

## 配置文件

在 `src/` 目录下新建一个用于 oidc 的配置文件，内容如下（请按需修改）：

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

```js
// ...
import { oidcGuard } from '@docimax/oidc/src/service/oidc-route';

// ...
router.beforeEach((to, from, next) => {
  if (to.name === 'oidc-callback') {
    next();
  } else {
    oidcGuard(Vue, Store, next);
  }
});
```

## 获取 userinfo

直接使用 getUserinfo 即可

```js
computed: {
  ...mapGetters("docimax", ["getUserinfo"])
}
```
