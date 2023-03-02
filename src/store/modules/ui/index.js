import { stateUserMeasurement, actionsUserMeasurement, mutationsUserMeasurement, gettersUserMeasurement } from './userMeasurement'

export default {
  namespaced: true,
  state: {
    ...stateUserMeasurement,
    resultGroup: null,
    resultItems: null,
    user: {
      met: null,
      age: null,
      gender: null,
      measurementNum: null,
      measurementStep: null,
      equipmentWorks: null,
      isSaturatsiyaStarted: null,
      measuredData: null,
      measuredDataFromTopic: null
    },
    glucometer: {
      connectionStatus: false,
      batteryStatus: false
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
    subtitles: {
      text: null,
      enabled: true
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
    setResultGroup: ({ commit }, payload) => commit('SET_RESULT_GROUP', payload),
    setResultItems: ({ commit }, payload) => commit('SET_RESULT_ITEMS', payload),
    setUserAge: ({ commit }, payload) => commit('SET_USER_AGE', payload),
    setUserMet: ({ commit }, payload) => commit('SET_USER_MET', payload),
    setUserGender: ({ commit }, payload) => commit('SET_USER_GENDER', payload),
    setMeasurementNum: ({ commit }, payload) => commit('SET_MEASUREMENT_NUM', payload),
    setMeasurementStep: ({ commit }, payload) => commit('SET_MEASUREMENT_STEP', payload),
    setEquipmentWorks: ({ commit }, payload) => commit('SET_EQUIPMENT_WORKS', payload),
    setIsSaturatsiyaStarted: ({ commit }, payload) => commit('SET_IS_SATURATSIYA_STARTED', payload),
    setMeasuredData: ({ commit }, payload) => commit('SET_MEASURED_DATA', payload),
    setMeasuredDataFromTopic: ({ commit }, payload) => commit('SET_MEASURED_DATA_FROM_TOPIC', payload),
    // статус глюкометра
    setGlucometerConnectionStatus: ({ commit }, payload) => commit('SET_GLUCOMETER_CONNECTION_STATUS', payload),
    setGlucometerBatteryStatus: ({ commit }, payload) => commit('SET_GLUCOMETER_BATTERY_STATUS', payload),

    setHeaderBtnLeftEnabled: ({ commit }, payload) => commit('SET_HEADER_BTN_LEFT_ENABLED', payload),
    setHeaderBtnLeftText: ({ commit }, payload) => commit('SET_HEADER_BTN_LEFT_TEXT', payload),
    setHeaderBtnLeftAction: ({ commit }, payload) => commit('SET_HEADER_BTN_LEFT_ACTION', payload),
    setHeaderBtnLeftPhoto: ({ commit }, payload) => commit('SET_HEADER_BTN_LEFT_PHOTO', payload),

    setHeaderEnabled: ({ commit }, payload) => commit('SET_HEADER_ENABLED', payload),

    setFooterEnabled: ({ commit }, payload) => commit('SET_FOOTER_ENABLED', payload),

    // VIDEO STREAM
    setVideoStreamEnabled: ({ commit }, payload) => commit('SET_VIDEO_STREAM_ENABLED', payload),
    // SUBTITLES
    setSubtitlesText: ({ commit }, payload) => commit('SET_SUBTITLES_TEXT', payload),
    setSubtitlesEnabled: ({ commit }, payload) => commit('SET_SUBTITLES_ENABLED', payload),

    // spinner
    setSpinnerEnabled: ({ commit, getters }, payload) => commit('SET_SPINNER_ENABLED', payload),
    // SESSION
    setSessionUserLost: ({ commit }, payload) => commit('SET_SESSION_USER_LOST', payload),
    // ACQUAINTANCE
    setAcquaintanceStatus: ({ commit }, payload) => commit('SET_ACQUAINTANCE_STATUS', payload)
  },
  mutations: {
    ...mutationsUserMeasurement,
    SET_RESULT_GROUP: (state, payload) => { state.resultGroup = payload.data },
    SET_RESULT_ITEMS: (state, payload) => { state.resultItems = payload.data },
    SET_USER_AGE: (state, payload) => { state.user.age = payload.data },
    SET_USER_MET: (state, payload) => { state.user.met = payload.data },
    SET_USER_GENDER: (state, payload) => { state.user.gender = payload.data },
    SET_MEASUREMENT_NUM: (state, payload) => { state.user.measurementNum = payload.data },
    SET_MEASUREMENT_STEP: (state, payload) => { state.user.measurementStep = payload.data },
    SET_EQUIPMENT_WORKS: (state, payload) => { state.user.equipmentWorks = payload.data },
    SET_IS_SATURATSIYA_STARTED: (state, payload) => { state.user.isSaturatsiyaStarted = payload.data },
    SET_MEASURED_DATA: (state, payload) => { state.user.measuredData = payload.data },
    SET_MEASURED_DATA_FROM_TOPIC: (state, payload) => { state.user.measuredDataFromTopic = payload.data },

    SET_GLUCOMETER_CONNECTION_STATUS: (state, payload) => { state.glucometer.connectionStatus = payload.data },
    SET_GLUCOMETER_BATTERY_STATUS: (state, payload) => { state.glucometer.batteryStatus = payload.data },

    SET_HEADER_BTN_LEFT_ENABLED: (state, payload) => { state.headerBtnLeft.enabled = payload.data },
    SET_HEADER_BTN_LEFT_TEXT: (state, payload) => { state.headerBtnLeft.text = payload.data },
    SET_HEADER_BTN_LEFT_ACTION: (state, payload) => { state.headerBtnLeft.action = payload.data },
    SET_HEADER_BTN_LEFT_PHOTO: (state, payload) => { state.headerBtnLeft.photo = payload.data },

    SET_HEADER_ENABLED: (state, payload) => { state.header.enabled = payload.data },

    SET_FOOTER_ENABLED: (state, payload) => { state.footer.enabled = payload.data },
    // SUBTITLES
    SET_SUBTITLES_TEXT: (state, payload) => { state.subtitles.text = payload.data },
    SET_SUBTITLES_ENABLED: (state, payload) => { state.subtitles.enabled = payload.data },

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
    getResultGroup: state => state.resultGroup,
    getResultItems: state => state.resultItems,
    getUserAge: state => state.user.age,
    getUserMet: state => state.user.met,
    getUserGender: state => state.user.gender,
    getMeasurementNum: state => state.user.measurementNum,
    getMeasurementStep: state => state.user.measurementStep,
    getEquipmentWorks: state => state.user.equipmentWorks,
    getIsSaturatsiyaStarted: state => state.user.isSaturatsiyaStarted,
    getMeasuredData: state => state.user.measuredData,
    getMeasuredDataFromTopic: state => state.user.measuredDataFromTopic,

    getGlucometerConnectionStatus: state => state.glucometer.connectionStatus,
    getGlucometerBatteryStatus: state => state.glucometer.batteryStatus,

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
