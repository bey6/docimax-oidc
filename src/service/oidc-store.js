export default {
  namespaced: true,
  state: {
    userinfo: {}
  },
  getters: {
    getUserinfo: state => {
      return state.userinfo
    }
  },
  mutations: {
    setUserinfo (state, payload) {
      state.userinfo = payload
    }
  },
  actions: {
    async requestUserinfo ({ commit }, { url }) {
      // eslint-disable-next-line no-undef
      const res = await axios.get(url)
      console.log(res)
      commit('setUserinfo', res)
    }
  }
}
