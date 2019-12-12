import { UserManager } from 'oidc-client';

export const createOidcUserManager = oidcSettings => new UserManager(oidcSettings);

// 用户登录后事件
// Vue
// func: 具体函数，该函数默认穿入一个 user 信息
export function afterUserLoaded (Vue, func) {
  let userManager;
  if (Vue.$um) userManager = Vue.$um;
  else userManager = Vue.prototype.$um;
  userManager.events.addUserLoaded(func);
}

// token expired event
export function afterAceessTokenExpiring (Vue, func) {
  let userManager;
  if (Vue.$um) userManager = Vue.$um;
  else userManager = Vue.prototype.$um;
  userManager.events.addAccessTokenExpiring(function () {
    userManager.signoutRedirect().then(function (res) {
      func(res);
      console.log('signed out', res);
    }).catch(function (err) {
      console.log(err);
    });
  });
}

// 静默刷新错误事件
export function afterSilentRenewError (Vue, func) {
  let userManager;
  if (Vue.$um) userManager = Vue.$um;
  else userManager = Vue.prototype.$um;
  userManager.events.addSilentRenewError(func);
}

// 用户退出事件
export function afterUserSignedOut (Vue, func) {
  let userManager;
  if (Vue.$um) userManager = Vue.$um;
  else userManager = Vue.prototype.$um;
  userManager.events.addUserSignedOut(function () {
    userManager.signoutRedirect().then((res) => {
      func(res);
      console.log('signed out', res);
    }).catch((err) => {
      console.log(err);
    });
    Vue.$um.removeUser();
  });
}

// 去登录
export function signin (Vue) {
  let userManager;
  if (Vue.$um) userManager = Vue.$um;
  else userManager = Vue.prototype.$um;
  userManager.signinRedirect();
}

// 退出
export function signout (Vue) {
  let userManager;
  if (Vue.$um) userManager = Vue.$um;
  else userManager = Vue.prototype.$um;
  window.sessionStorage.clear();
  userManager.signoutRedirect().then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  });
}

// 获取 profile
export function getUserinfo (Vue) {
  let userManager;
  if (Vue.$um) userManager = Vue.$um;
  else userManager = Vue.prototype.$um;
  return new Promise((resolve, reject) => {
    userManager.getUser().then(function (user) {
      if (user == null) {
        signin(Vue);
        return resolve(null);
      } else {
        const usr = getUserinfoEx();
        return resolve(usr);
      }
    }).catch(function (err) {
      console.log(err);
      return reject(err);
    });
  });
}

// 扩展获取用户信息
function getUserinfoEx () {
  const usr = window.sessionStorage.getItem('@docimax/oidc:userinfo');
  if (usr) {
    return JSON.parse(usr);
  }
  return null;
}
