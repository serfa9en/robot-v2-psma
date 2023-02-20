export default {
  namespaced: true,
  actions: {
    start: ({ commit, dispatch, rootState }, payload) => {
      commit('START', payload)

      // let environment = rootState.robot.environment
      // environment = ((environment || {}).id || '').toString()
      // environment = environment.replace(/[bmoprtv_]/g, '')
      // let environment = ''
      //
      // let uniqueId = parseInt(environment + Math.round(new Date().getTime()))
      //
      // dispatch('robot/faceRecognizeAddFaceRequest', {
      //   meta: payload.meta,
      //   data: uniqueId
      // }, { root: true })
    },
    stop: ({ commit }, payload) => commit('STOP', payload),
    // HOOKS
    hookBegin: ({ commit }, payload) => commit('HOOK_BEGIN', payload),
    hookCompleted: ({ commit }, payload) => commit('HOOK_COMPLETED', payload),
    hookFailed: ({ commit }, payload) => commit('HOOK_FAILED', payload)
  },
  mutations: {
    START: (state, payload) => { },
    STOP: (state, payload) => { },
    // HOOKS
    HOOK_BEGIN: (state, payload) => { },
    HOOK_COMPLETED: (state, payload) => { }, // return { data:uniqueId }
    HOOK_FAILED: (state, payload) => { }
  }
}
