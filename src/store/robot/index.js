import { actionsDialog, gettersDialog, mutationsDialog } from './dialog'

function initialState () {
  return {
    robot: {
      environment: null
    },
    dialog: {
      sayText: null
    }
  }
}

export default {
  namespaced: true,
  state: initialState(),
  actions: {
    ...actionsDialog,

    // environment
    setEnvironment: ({ commit }, payload) => commit('SET_ENVIRONMENT', payload),

    sayText: ({ commit, state }, payload) => commit('SAY_TEXT', payload)
  },
  mutations: {
    ...mutationsDialog,

    // environment
    SET_ENVIRONMENT: (state, payload) => { state.robot.environment = payload.data },
    SAY_TEXT: (state, payload) => { state.dialog.sayText = payload.data }
  },
  getters: {
    ...gettersDialog
  }
}
