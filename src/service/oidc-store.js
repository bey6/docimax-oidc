export default {
  namespaced: true,
  state: {
    userinfo: {},
    permission: {}
  },
  getters: {
    getUserinfo: state => {
      return state.userinfo;
    },
    getPermission: state => {
      return state.permission;
    }
  }
};
