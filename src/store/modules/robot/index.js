// const deepExtend = require('deep-extend')

function initialState () {
  return {
    robot: {
      environment: null
    }
  }
}

export default {
  namespaced: true,
  state: initialState(),
  actions: {
    // environment
    setEnvironment: ({ commit, state }, payload) => commit('SET_ENVIRONMENT', payload)
  },
  mutations: {
    // environment
    SET_ENVIRONMENT: (state, payload) => { state.robot.environment = payload.data }
  },
  getters: {
  }
}
