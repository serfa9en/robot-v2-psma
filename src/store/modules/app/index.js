// import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'

function initialState () {
  return {
    step: null,
    loadAppSettings: null
  }
}

export default {
  namespaced: true,
  state: initialState(),
  actions: {
    // Setters
    clearState: ({ commit }, payload) => commit('CLEAR_STATE'),
    setStep: ({ commit }, payload) => commit('SET_STEP', payload),
    setLoadAppSettings: ({ commit }, payload) => commit('SET_LOAD_APP_SETTINGS', payload)
  },
  mutations: {
    CLEAR_STATE: (state, payload) => {
      const s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    },
    SET_STEP: (state, payload) => { state.step = payload.data },
    SET_LOAD_APP_SETTINGS: (state, payload) => { state.loadAppSettings = payload.data }
  },
  getters: {
    getStep: state => state.step,
    getLoadAppSettings: state => state.loadAppSettings
  }
}
