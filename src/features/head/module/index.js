export default {
  namespaced: true,
  state: {
    enabled: true
  },
  actions: {
    setEnabled: ({ commit }, payload) => commit('SET_ENABLED', payload)
  },
  mutations: {
    SET_ENABLED: (state, payload) => { state.enabled = payload.data }
  },
  getters: {
    getEnabled: state => state.enabled
  }
}
