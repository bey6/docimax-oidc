import oc from '../oidc-callback';
import { getUserinfo } from './oidc-helpers';

export const oidcRoute = [{
  name: 'oidc-callback',
  path: '/oidc-callback',
  component: oc
}];

// 首位
export function oidcGuard (Vue, store, next) {
  getUserinfo(Vue).then(res => {
    store.state.docimax.userinfo = res;
    next();
  }, err => {
    console.log(err);
  });
}
