import pkg from '../package.json';

import { createOidcUserManager, signout } from './service/oidc-helpers';
import { oidcRoute, oidcGuard as guard } from './service/oidc-route';
import OidcStore from './service/oidc-store';

// setup
export const oidcInstance = {
  install (Vue, options) {
    // show version
    console.log(`@docimax/oidc version: ${pkg.version}`);
    // oidc user manager
    Vue.prototype.$um = createOidcUserManager(options.oidcConf);
    // 认证地址
    Vue.prototype.$authUrl = options.oidcConf.authority;
    // 添加回调路由
    options.router.addRoutes(oidcRoute);
    // 注册模块
    options.store.registerModule('docimax', OidcStore);
  }
};

// guard
export const oidcGuard = guard;

// signout
export const oidcSignout = signout;