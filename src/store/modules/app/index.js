import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'

const deepExtend = require('deep-extend')

function initialState () {
  return {
    timerAutoSelect: null,
    isImportantPhrase: null,
    step: null,
    passport: {
      data: null,
      birthDate: null
    },
    session: {
      uniq_num: 300,
      filename: '',
      phone_num: '',
      photo_data: null,
      name: ''
    },
    settings: {},
    images: null,
    answers: null,
    labels: null,
    states_no_back: [],
    meeting_talk: false,
    talon: false,
    mail: false,

    loadAppSettings: null,
    iconsSVG: null,

    inactionTimeoutData: {}
  }
}

export default {
  namespaced: true,
  state: initialState(),
  actions: {
    // Setters
    setTimerAutoSelect: ({ commit }, payload) => commit('SET_TIMER_AUTO_SELECT', payload),
    setIsImportantPhrase: ({ commit }, payload) => commit('SET_IS_IMPORTANT_PHRASE', payload),
    clearState: ({ commit }, payload) => commit('CLEAR_STATE'),
    clearUsersData: ({ commit }, payload) => commit('CLEAR_USERS_DATA', payload),
    set_create_talon: ({ commit }, payload) => commit('SET_CREATE_TALON', payload),
    set_create_mail: ({ commit }, payload) => commit('SET_CREATE_MAIL', payload),
    setStep: ({ commit }, payload) => commit('SET_STEP', payload),
    setPassportData: ({ commit }, payload) => commit('SET_PASSPORT_DATA', payload),
    updatePassportData: ({ commit }, payload) => commit('UPDATE_PASSPORT_DATA', payload),
    setPassportBirthDate: ({ commit }, payload) => commit('SET_PASSPORT_BIRTH_DATE', payload),
    setSessionUniqNum: ({ commit }, payload) => commit('SET_SESSION_UNIQ_NUM', payload),
    setSessionFilename: ({ commit }, payload) => commit('SET_SESSION_FILENAME', payload),
    setSessionPhoneNum: ({ commit }, payload) => commit('SET_SESSION_PHONE_NUM', payload),
    setSessionPhotoData: ({ commit }, payload) => commit('SET_SESSION_PHOTO_DATA', payload),
    setSessionName: ({ commit }, payload) => commit('SET_SESSION_NAME', payload),
    setAnswers: ({ commit }, payload) => commit('SET_ANSWERS', payload),
    setImages: ({ commit }, payload) => commit('SET_IMAGES', payload),
    setLabels: ({ commit }, payload) => commit('SET_LABELS', payload),
    setStatesNoBack: ({ commit }, payload) => commit('SET_STATES_NO_BACK', payload),
    setMeetingTalk: ({ commit }, payload) => commit('SET_MEETING_TALK', payload),
    setLoadAppSettings: ({ commit }, payload) => commit('SET_LOAD_APP_SETTINGS', payload),
    setIconsSVG: ({ commit }, payload) => commit('SET_ICONS_SVG', payload),
    setInactionTimeoutData: ({ commit }, payload) => commit('SET_INACTION_TIMEOUT_DATA', payload),
    // HANDLERS
    handlerSetPassportData: ({ dispatch }, payload) => {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.JS, EventTypes.JS_CUSTOM, {
        transition: 'SCANNING'
      })

      dispatch('setPassportData', {
        meta: { eventId: eventId },
        data: payload.data
      })
    },
    handlerUpdatePassportData: ({ dispatch }, payload) => {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK, {
        transition: 'EDIT'
      })

      dispatch('updatePassportData', {
        meta: { eventId: eventId },
        data: payload.data
      })
    }
  },
  mutations: {
    SET_TIMER_AUTO_SELECT: (state, payload) => { state.timerAutoSelect = payload.data },
    SET_IS_IMPORTANT_PHRASE: (state, payload) => {
      if (typeof payload.data !== 'undefined') state.isImportantPhrase = payload.data
    },
    CLEAR_STATE: (state, payload) => {
      const s = initialState()
      Object.keys(s).forEach(key => {
        state[key] = s[key]
      })
    },
    CLEAR_USERS_DATA: (state, payload) => { },
    SET_CREATE_TALON: (state, payload) => { state.talon = payload.data },
    SET_CREATE_MAIL: (state, payload) => { state.mail = payload.data },
    SET_STEP: (state, payload) => { state.step = payload.data },
    SET_PASSPORT_DATA: (state, payload) => { state.passport.data = payload.data },
    UPDATE_PASSPORT_DATA: (state, payload) => { state.passport.data = Object.assign({}, state.passport.data, payload.data) },
    SET_PASSPORT_BIRTH_DATE: (state, payload) => { state.passport.birthDate = payload.data },
    LOAD_SETTINGS: (state, payload) => { state.settings = deepExtend(state.settings, payload.data) },
    SET_SESSION_UNIQ_NUM: (state, payload) => { state.session.uniq_num = payload.data },
    SET_SESSION_FILENAME: (state, payload) => { state.session.filename = payload.data },
    SET_SESSION_PHONE_NUM: (state, payload) => { state.session.phone_num = payload.data },
    SET_SESSION_PHOTO_DATA: (state, payload) => { state.session.photo_data = payload.data },
    SET_SESSION_NAME: (state, payload) => { state.session.name = payload.data },
    SET_ANSWERS: (state, payload) => { state.answers = payload.data },
    SET_IMAGES: (state, payload) => { state.images = payload.data },
    SET_LABELS: (state, payload) => { state.labels = payload.data },
    SET_STATES_NO_BACK: (state, payload) => { state.states_no_back = payload.data },
    SET_MEETING_TALK: (state, payload) => { state.meeting_talk = payload.data },
    SET_LOAD_APP_SETTINGS: (state, payload) => { state.loadAppSettings = payload.data },
    SET_ICONS_SVG: (state, payload) => { state.iconsSVG = payload.data },
    SET_INACTION_TIMEOUT_DATA: (state, payload) => { state.inactionTimeoutData = payload.data }
  },
  getters: {
    getTimerAutoSelect: state => state.timerAutoSelect,
    getIsImportantPhrase: state => state.isImportantPhrase,
    getStep: state => state.step,
    getPassportData: state => state.passport.data,
    getPassportBirthDate: state => state.passport.birthDate,
    getSessionUniqNum: state => state.session.uniq_num,
    getSessionFilename: state => state.session.filename,
    getSessionPhoneNum: state => state.session.phone_num,
    getSessionPhotoData: state => state.session.photo_data,
    getSessionName: state => state.session.name,
    getAnswers: state => state.answers,
    getAnswer: state => name => state.answers[name] ? state.answers[name] : null,
    getLabels: state => state.labels,
    getLabel: state => name => state.labels?.[name] ? state.labels?.[name] : null,
    getStatesNoBack: state => state.states_no_back,
    getImages: state => state.images,
    getImage: state => name => state.images?.[name] ? 'dialog-images/' + state.images?.[name] : null,
    getMeetingTalk: state => state.meeting_talk,
    getLoadAppSettings: state => state.loadAppSettings,
    getIconsSVG: state => state.iconsSVG,
    getInactionTimeoutData: state => state.inactionTimeoutData
  }
}
