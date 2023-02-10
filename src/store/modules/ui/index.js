import { stateUserMeasurement, actionsUserMeasurement, mutationsUserMeasurement, gettersUserMeasurement } from './userMeasurement'

export default {
  namespaced: true,
  state: {
    ...stateUserMeasurement,
    user: {
      age: null
    },
    headerBtnLeft: {
      enabled: null,
      text: null,
      action: null,
      photo: null
    },
    header: {
      enabled: null
    },
    footer: {
      enabled: null
    },
    videoStream: {
      enabled: null
    },
    spinner: {
      enabled: null
    },
    session: {
      user: {
        lost: null
      }
    },
    acquaintance: {
      status: null
    }
  },
  actions: {
    ...actionsUserMeasurement,
    setUserAge: ({ commit }, payload) => commit('SET_USER_AGE', payload),

    setHeaderBtnLeftEnabled: ({ commit }, payload) => commit('SET_HEADER_BTN_LEFT_ENABLED', payload),
    setHeaderBtnLeftText: ({ commit }, payload) => commit('SET_HEADER_BTN_LEFT_TEXT', payload),
    setHeaderBtnLeftAction: ({ commit }, payload) => commit('SET_HEADER_BTN_LEFT_ACTION', payload),
    setHeaderBtnLeftPhoto: ({ commit }, payload) => commit('SET_HEADER_BTN_LEFT_PHOTO', payload),

    setHeaderEnabled: ({ commit }, payload) => commit('SET_HEADER_ENABLED', payload),

    setFooterEnabled: ({ commit }, payload) => commit('SET_FOOTER_ENABLED', payload),

    // VIDEO STREAM
    setVideoStreamEnabled: ({ commit }, payload) => commit('SET_VIDEO_STREAM_ENABLED', payload),

    // spinner
    setSpinnerEnabled: ({ commit, getters }, payload) => commit('SET_SPINNER_ENABLED', payload),
    // SESSION
    setSessionUserLost: ({ commit }, payload) => commit('SET_SESSION_USER_LOST', payload),
    // ACQUAINTANCE
    setAcquaintanceStatus: ({ commit }, payload) => commit('SET_ACQUAINTANCE_STATUS', payload)
  },
  mutations: {
    ...mutationsUserMeasurement,
    SET_USER_AGE: (state, payload) => { state.user.age = payload.data },

    SET_HEADER_BTN_LEFT_ENABLED: (state, payload) => { state.headerBtnLeft.enabled = payload.data },
    SET_HEADER_BTN_LEFT_TEXT: (state, payload) => { state.headerBtnLeft.text = payload.data },
    SET_HEADER_BTN_LEFT_ACTION: (state, payload) => { state.headerBtnLeft.action = payload.data },
    SET_HEADER_BTN_LEFT_PHOTO: (state, payload) => { state.headerBtnLeft.photo = payload.data },

    SET_HEADER_ENABLED: (state, payload) => { state.header.enabled = payload.data },

    SET_FOOTER_ENABLED: (state, payload) => { state.footer.enabled = payload.data },

    // VIDEO STREAM
    SET_VIDEO_STREAM_ENABLED: (state, payload) => { state.videoStream.enabled = payload.data },

    // spinner
    SET_SPINNER_ENABLED: (state, payload) => { state.spinner.enabled = payload.data },
    // SESSION
    SET_SESSION_USER_LOST: (state, payload) => { state.session.user.lost = payload.data },
    // ACQUAINTANCE
    SET_ACQUAINTANCE_STATUS: (status, payload) => { status.acquaintance.status = payload.data }
  },
  getters: {
    ...gettersUserMeasurement,
    getUserAge: state => state.user.age,

    getHeaderBtnLeftEnabled: state => state.headerBtnLeft.enabled,
    getHeaderBtnLeftText: state => state.headerBtnLeft.text,
    getHeaderBtnLeftAction: state => state.headerBtnLeft.action,
    getHeaderBtnLeftPhoto: state => state.headerBtnLeft.photo,

    getHeaderEnabled: state => state.header.enabled,

    getFooterEnabled: state => state.footer.enabled,

    // VIDEO STREAM
    getVideoStreamEnabled: state => state.videoStream.enabled,

    // spinner
    getSpinnerEnabled: state => state.spinner.enabled,
    // SESSION
    getSessionUserLost: state => state.session.user.lost,
    // ACQUAINTANCE
    getAcquaintanceStatus: state => state.acquaintance.status
  }
}
