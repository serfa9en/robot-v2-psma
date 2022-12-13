export default {
  namespaced: true,
  state: {
    user: {
      age: null
    },
    headerBtnLeft: {
      enabled: null,
      text: null,
      action: null
    },
    header: {
      enabled: null
    },
    footer: {
      enabled: null
    },
    spinner: {
      enabled: null
    }
  },
  actions: {
    setUserAge: ({ commit }, payload) => commit('SET_USER_AGE', payload),

    setHeaderBtnLeftEnabled: ({ commit }, payload) => commit('SET_HEADER_BTN_LEFT_ENABLED', payload),
    setHeaderBtnLeftText: ({ commit }, payload) => commit('SET_HEADER_BTN_LEFT_TEXT', payload),
    setHeaderBtnLeftAction: ({ commit }, payload) => commit('SET_HEADER_BTN_LEFT_ACTION', payload),

    setHeaderEnabled: ({ commit }, payload) => commit('SET_HEADER_ENABLED', payload),

    setFooterEnabled: ({ commit }, payload) => commit('SET_FOOTER_ENABLED', payload),

    setSpinnerEnabled: ({ commit, getters }, payload) => commit('SET_SPINNER_ENABLED', payload)
  },
  mutations: {
    SET_USER_AGE: (state, payload) => { state.user.age = payload.data },

    SET_HEADER_BTN_LEFT_ENABLED: (state, payload) => { state.headerBtnLeft.enabled = payload.data },
    SET_HEADER_BTN_LEFT_TEXT: (state, payload) => { state.headerBtnLeft.text = payload.data },
    SET_HEADER_BTN_LEFT_ACTION: (state, payload) => { state.headerBtnLeft.action = payload.data },

    SET_HEADER_ENABLED: (state, payload) => { state.header.enabled = payload.data },

    SET_FOOTER_ENABLED: (state, payload) => { state.footer.enabled = payload.data },

    SET_SPINNER_ENABLED: (state, payload) => { state.spinner.enabled = payload.data }
  },
  getters: {
    getUserAge: state => state.user.age,

    getHeaderBtnLeftEnabled: state => state.headerBtnLeft.enabled,
    getHeaderBtnLeftText: state => state.headerBtnLeft.text,
    getHeaderBtnLeftAction: state => state.headerBtnLeft.action,

    getHeaderEnabled: state => state.header.enabled,

    getFooterEnabled: state => state.footer.enabled,

    getSpinnerEnabled: state => state.spinner.enabled
  }
}