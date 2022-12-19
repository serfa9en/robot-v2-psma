export const stateCustom = {
  custom: {
    case: {
      start: null,
      stop: null,
      restart: null
    },
    instance: null
  }
}

export const actionsCustom = {
  customRequest: ({ commit }, payload) => commit('CUSTOM_REQUEST', payload),
  customCaseStartResponse: ({ commit }, payload) => commit('CUSTOM_CASE_START_RESPONSE', payload),
  customCaseStopResponse: ({ commit }, payload) => commit('CUSTOM_CASE_STOP_RESPONSE', payload),
  customCaseRestartResponse: ({ commit }, payload) => commit('CUSTOM_CASE_RESTART_RESPONSE', payload),
  customResponse: ({ commit }, payload) => commit('CUSTOM_RESPONSE', payload)
}

export const mutationsCustom = {
  CUSTOM_REQUEST: (state, payload) => { },
  CUSTOM_CASE_START_RESPONSE: (state, payload) => { state.custom.case.start = payload.data },
  CUSTOM_CASE_STOP_RESPONSE: (state, payload) => { state.custom.case.stop = payload.data },
  CUSTOM_CASE_RESTART: (state, payload) => { state.custom.case.restart = payload.data },
  CUSTOM_RESPONSE: (state, payload) => { state.custom.instance = payload.data }
}

export const gettersCustom = {
  getCustomCaseStart: state => state.custom.case.start,
  getCustomCaseStop: state => state.custom.case.stop,
  getCustomCaseRestart: state => state.custom.case.restart,
  getCustom: state => state.custom.instance
}
