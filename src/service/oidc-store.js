export default {
  namespaced: true,
  state: {
    userinfo: {},
    permission: {}
  },
  getters: {
    getUserinfo: state => {
      if (state.userinfo && state.userinfo.Name) {
        return state.userinfo;
      }
      let userinfoStr = window.sessionStorage.getItem('@docimax/oidc:userinfo');
      state.userinfo = JSON.parse(userinfoStr);
      return state.userinfo;
    },
    getPermission: state => {
      if (state.permission && state.permission.User && state.permission.User.Name) {
        return state.permission;
      }
      let permissionStr = window.sessionStorage.getItem('@docimax/oidc:permission');
      state.permission = JSON.parse(permissionStr);
      return state.permission;
    },
    userGetter: state => {
      if (state.userinfo && state.userinfo.Name) {
        return state.userinfo;
      }
      let userinfoStr = window.sessionStorage.getItem('@docimax/oidc:userinfo');
      state.userinfo = JSON.parse(userinfoStr);
      return state.userinfo;
    },
    permissionGetter: state => {
      if (state.permission && state.permission.User && state.permission.User.Name) {
        return state.permission;
      }
      let permissionStr = window.sessionStorage.getItem('@docimax/oidc:permission');
      state.permission = JSON.parse(permissionStr);
      return state.permission;
    }
  }
};
