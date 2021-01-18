export default {
  namespaced: true,
  state: {
    status: {
      loginStatus: false,
      signupStatus: false,
    }
  },
  mutations: {
    setStatus(state, val) {
      state.status = val
      console.log("state.status: " + state.status)
    }
  },
  actions: {
    async fetchStatus({ commit }, status) {
      commit('setStatus', status)
    },
  }
}