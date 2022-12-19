export default {
  namespaced: true,
  state: {
    facts: null,
    smokeFacts: null,
    imtFacts: null,
    toldIbs: null,
    toldSmoke: null,
    resultGroup: null,
    resultItems: null,
    ibsRisk: null,
    user: {
      name: null,
      met: null,

      gender: null, // 1 -женский. 0 -мужской
      weight: null,
      growth: null,
      artPressure: null,
      cholesterol: null,
      artPressureEnter: null,
      cholesterolEnter: null,
      smoke: null,
      age: null,
      relativesProblems: null,
      currentPressureAndPulse: null,

      glukometr: null,
      spirographia: null,
      spirographiaQ1: null,
      spirographiaQ2: null,
      saturatsiya: null,
      pulse: null,
      artPressureLow: null,
      temperature: null,
      envTemperature: null,

      measurementNum: null,
      specialistNum: null,
      measurementStep: null,
      equipmentWorks: null,
      // measurementBtn: { 'enabled': null, 'text': null, 'color': null },
      measuredData: null,
      measuredDataFromTopic: null,

      isExaminationStarted: null,
      isSaturatsiyaStarted: null
    },
    specialist: {
      stepQuest: null,
      quest: null,
      path: null,
      yes: null
    },
    imtMistake: null,
    headerBtnLeft: {
      enabled: null,
      text: null,
      action: null,
      photo: null
    },
    header: {
      enabled: null,
      enabledPodHeader: null
    },
    footer: {
      enabled: null
    },
    imt: {
      step: null
    },
    ibs: {
      step: null
    },

    glucometer: {
      connectionStatus: false,
      batteryStatus: false
    },

    subtitles: {
      text: null,
      enabled: true
    },
    videoStream: {
      enabled: null
    },
    session: {
      user: {
        lost: null
      }
    },
    acquaintance: {
      status: null
    },
    spinner: {
      enabled: null
    }
  },
  actions: {
    setFacts: ({ commit }, payload) => commit('SET_FACTS', payload),
    setSmokeFacts: ({ commit }, payload) => commit('SET_SMOKE_FACTS', payload),
    setImtFacts: ({ commit }, payload) => commit('SET_IMT_FACTS', payload),
    setResultGroup: ({ commit }, payload) => commit('SET_RESULT_GROUP', payload),
    setResultItems: ({ commit }, payload) => commit('SET_RESULT_ITEMS', payload),
    setIbsRisk: ({ commit }, payload) => commit('SET_IBS_RISK', payload),

    setToldIbs: ({ commit }, payload) => commit('SET_TOLD_IBS', payload),
    setToldSmoke: ({ commit }, payload) => commit('SET_TOLD_SMOKE', payload),

    setUserName: ({ commit }, payload) => commit('SET_USER_NAME', payload),
    setUserWeight: ({ commit }, payload) => commit('SET_USER_WEIGHT', payload),
    setUserGrowth: ({ commit }, payload) => commit('SET_USER_GROWTH', payload),
    setUserArtPressure: ({ commit }, payload) => commit('SET_USER_ART_PRESSURE', payload),
    setUserCholesterol: ({ commit }, payload) => commit('SET_USER_CHOLESTEROL', payload),
    setUserArtPressureEnter: ({ commit }, payload) => commit('SET_USER_ART_PRESSURE_ENTER', payload),
    setUserCholesterolEnter: ({ commit }, payload) => commit('SET_USER_CHOLESTEROL_ENTER', payload),
    setUserSmoke: ({ commit }, payload) => commit('SET_USER_SMOKE', payload),
    setUserAge: ({ commit }, payload) => commit('SET_USER_AGE', payload),
    setUserGender: ({ commit }, payload) => commit('SET_USER_GENDER', payload),
    setUserMet: ({ commit }, payload) => commit('SET_USER_MET', payload),
    setRelativesProblems: ({ commit }, payload) => commit('SET_RELATIVES_PROBLEMS', payload),

    setUserGlukometr: ({ commit }, payload) => commit('SET_USER_GLUKOMETR', payload),
    setUserSpirographia: ({ commit }, payload) => commit('SET_USER_SPIROGRAPHIA', payload),
    setUserSpirographiaQ1: ({ commit }, payload) => commit('SET_USER_SPIROGRAPHIA_Q1', payload),
    setUserSpirographiaQ2: ({ commit }, payload) => commit('SET_USER_SPIROGRAPHIA_Q2', payload),
    setUserSaturatsiya: ({ commit }, payload) => commit('SET_USER_SATURATSIYA', payload),
    setUserPulse: ({ commit }, payload) => commit('SET_USER_PULSE', payload),
    setUserArtPressureLow: ({ commit }, payload) => commit('SET_USER_ART_PRESSURE_LOW', payload),
    setUserCurrentPressureAndPulse: ({ commit }, payload) => commit('SET_USER_CURRENT_PRESSURE_AND_PULSE', payload),
    setUserTemperature: ({ commit }, payload) => commit('SET_USER_TEMPERATURE', payload),
    setEnvTemperature: ({ commit }, payload) => commit('SET_ENV_TEMPERATURE', payload),

    setMeasurementNum: ({ commit }, payload) => commit('SET_MEASUREMENT_NUM', payload),
    setSpecialistNum: ({ commit }, payload) => commit('SET_SPECIALIST_NUM', payload),
    setMeasurementStep: ({ commit }, payload) => commit('SET_MEASUREMENT_STEP', payload),
    setEquipmentWorks: ({ commit }, payload) => commit('SET_EQUIPMENT_WORKS', payload),
    setMeasurementBtn: ({ commit }, payload) => commit('SET_MEASUREMENT_BTN', payload),
    setMeasuredData: ({ commit }, payload) => commit('SET_MEASURED_DATA', payload),
    setMeasuredDataFromTopic: ({ commit }, payload) => commit('SET_MEASURED_DATA_FROM_TOPIC', payload),

    setStepQuest: ({ commit }, payload) => commit('SET_STEP_QUEST', payload),
    setQuest: ({ commit }, payload) => commit('SET_QUEST', payload),
    setPath: ({ commit }, payload) => commit('SET_PATH', payload),
    setYes: ({ commit }, payload) => commit('SET_YES', payload),

    // статус глюкометра
    setGlucometerConnectionStatus: ({ commit }, payload) => commit('SET_GLUCOMETER_CONNECTION_STATUS', payload),
    setGlucometerBatteryStatus: ({ commit }, payload) => commit('SET_GLUCOMETER_BATTERY_STATUS', payload),

    setIsExaminationStarted: ({ commit }, payload) => commit('SET_IS_EXAMINATION_STARTED', payload),
    setIsSaturatsiyaStarted: ({ commit }, payload) => commit('SET_IS_SATURATSIYA_STARTED', payload),

    setImtMistake: ({ commit }, payload) => commit('SET_IMT_MISTAKE', payload),

    setHeaderBtnLeftEnabled: ({ commit }, payload) => commit('SET_HEADER_BTN_LEFT_ENABLED', payload),
    setHeaderBtnLeftText: ({ commit }, payload) => commit('SET_HEADER_BTN_LEFT_TEXT', payload),
    setHeaderBtnLeftAction: ({ commit }, payload) => commit('SET_HEADER_BTN_LEFT_ACTION', payload),
    setHeaderBtnLeftPhoto: ({ commit }, payload) => commit('SET_HEADER_BTN_LEFT_PHOTO', payload),

    setHeaderEnabled: ({ commit }, payload) => commit('SET_HEADER_ENABLED', payload),
    setHeaderEnabledPodHeader: ({ commit }, payload) => commit('SET_HEADER_ENABLEDPODHEADER', payload),

    setFooterEnabled: ({ commit }, payload) => commit('SET_FOOTER_ENABLED', payload),

    setImtStep: ({ commit }, payload) => commit('SET_IMT_STEP', payload),
    setIbsStep: ({ commit }, payload) => commit('SET_IBS_STEP', payload),

    // SUBTITLES
    setSubtitlesText: ({ commit }, payload) => commit('SET_SUBTITLES_TEXT', payload),
    setSubtitlesEnabled: ({ commit }, payload) => commit('SET_SUBTITLES_ENABLED', payload),
    // VIDEO STREAM
    setVideoStreamEnabled: ({ commit }, payload) => commit('SET_VIDEO_STREAM_ENABLED', payload),
    // SESSION
    setSessionUserLost: ({ commit }, payload) => commit('SET_SESSION_USER_LOST', payload),
    // ACQUAINTANCE
    setAcquaintanceStatus: ({ commit }, payload) => commit('SET_ACQUAINTANCE_STATUS', payload),
    // spinner
    setSpinnerEnabled: ({ commit, getters }, payload) => {
      // console.warn(`[Спиннер переключился]: ${getters.getSpinnerEnabled} -> ${payload.data}`)
      commit('SET_SPINNER_ENABLED', payload)
    }
  },
  mutations: {
    SET_FACTS: (state, payload) => { state.facts = payload.data },
    SET_SMOKE_FACTS: (state, payload) => { state.smokeFacts = payload.data },
    SET_IMT_FACTS: (state, payload) => { state.imtFacts = payload.data },
    SET_RESULT_GROUP: (state, payload) => { state.resultGroup = payload.data },
    SET_RESULT_ITEMS: (state, payload) => { state.resultItems = payload.data },
    SET_IBS_RISK: (state, payload) => { state.ibsRisk = payload.data },

    SET_TOLD_IBS: (state, payload) => { state.toldIbs = payload.data },
    SET_TOLD_SMOKE: (state, payload) => { state.toldSmoke = payload.data },

    SET_USER_NAME: (state, payload) => { state.user.name = payload.data },
    SET_USER_WEIGHT: (state, payload) => { state.user.weight = payload.data },
    SET_USER_GROWTH: (state, payload) => { state.user.growth = payload.data },
    SET_USER_ART_PRESSURE: (state, payload) => { state.user.artPressure = payload.data },
    SET_USER_CHOLESTEROL: (state, payload) => { state.user.cholesterol = payload.data },
    SET_USER_ART_PRESSURE_ENTER: (state, payload) => { state.user.artPressureEnter = payload.data },
    SET_USER_CHOLESTEROL_ENTER: (state, payload) => { state.user.cholesterolEnter = payload.data },
    SET_USER_SMOKE: (state, payload) => { state.user.smoke = payload.data },
    SET_USER_AGE: (state, payload) => { state.user.age = payload.data },
    SET_USER_GENDER: (state, payload) => { state.user.gender = payload.data },
    SET_USER_MET: (state, payload) => { state.user.met = payload.data },
    SET_RELATIVES_PROBLEMS: (state, payload) => { state.user.relativesProblems = payload.data },
    SET_USER_CURRENT_PRESSURE_AND_PULSE: (state, payload) => { state.user.currentPressureAndPulse = payload.data },
    SET_USER_GLUKOMETR: (state, payload) => { state.user.glukometr = payload.data },
    SET_USER_SPIROGRAPHIA: (state, payload) => { state.user.spirographia = payload.data },
    SET_USER_SPIROGRAPHIA_Q1: (state, payload) => { state.user.spirographiaQ1 = payload.data },
    SET_USER_SPIROGRAPHIA_Q2: (state, payload) => { state.user.spirographiaQ2 = payload.data },
    SET_USER_SATURATSIYA: (state, payload) => { state.user.saturatsiya = payload.data },
    SET_USER_PULSE: (state, payload) => { state.user.pulse = payload.data },
    SET_USER_ART_PRESSURE_LOW: (state, payload) => { state.user.artPressureLow = payload.data },
    SET_USER_TEMPERATURE: (state, payload) => { state.user.temperature = payload.data },
    SET_ENV_TEMPERATURE: (state, payload) => { state.user.envTemperature = payload.data },

    SET_MEASUREMENT_NUM: (state, payload) => { state.user.measurementNum = payload.data },
    SET_SPECIALIST_NUM: (state, payload) => { state.user.specialistNum = payload.data },
    SET_MEASUREMENT_STEP: (state, payload) => { state.user.measurementStep = payload.data },
    SET_EQUIPMENT_WORKS: (state, payload) => { state.user.equipmentWorks = payload.data },
    SET_MEASUREMENT_BTN: (state, payload) => { state.user.measurementBtn = payload.data },
    SET_MEASURED_DATA: (state, payload) => { state.user.measuredData = payload.data },
    SET_MEASURED_DATA_FROM_TOPIC: (state, payload) => { state.user.measuredDataFromTopic = payload.data },

    SET_IS_EXAMINATION_STARTED: (state, payload) => { state.user.isExaminationStarted = payload.data },
    SET_IS_SATURATSIYA_STARTED: (state, payload) => { state.user.isSaturatsiyaStarted = payload.data },

    SET_GLUCOMETER_CONNECTION_STATUS: (state, payload) => { state.glucometer.connectionStatus = payload.data },
    SET_GLUCOMETER_BATTERY_STATUS: (state, payload) => { state.glucometer.batteryStatus = payload.data },

    SET_IMT_MISTAKE: (state, payload) => { state.imtMistake = payload.data },

    SET_HEADER_BTN_LEFT_ENABLED: (state, payload) => { state.headerBtnLeft.enabled = payload.data },
    SET_HEADER_BTN_LEFT_TEXT: (state, payload) => { state.headerBtnLeft.text = payload.data },
    SET_HEADER_BTN_LEFT_ACTION: (state, payload) => { state.headerBtnLeft.action = payload.data },
    SET_HEADER_BTN_LEFT_PHOTO: (state, payload) => { state.headerBtnLeft.photo = payload.data },

    SET_HEADER_ENABLED: (state, payload) => { state.header.enabled = payload.data },
    SET_HEADER_ENABLEDPODHEADER: (state, payload) => { state.header.enabledPodHeader = payload.data },

    SET_FOOTER_ENABLED: (state, payload) => { state.footer.enabled = payload.data },

    SET_IMT_STEP: (state, payload) => { state.imt.step = payload.data },
    SET_IBS_STEP: (state, payload) => { state.ibs.step = payload.data },

    // SUBTITLES
    SET_SUBTITLES_TEXT: (state, payload) => { state.subtitles.text = payload.data },
    SET_SUBTITLES_ENABLED: (state, payload) => { state.subtitles.enabled = payload.data },
    // VIDEO STREAM
    SET_VIDEO_STREAM_ENABLED: (state, payload) => { state.videoStream.enabled = payload.data },
    // SESSION
    SET_SESSION_USER_LOST: (state, payload) => { state.session.user.lost = payload.data },
    // ACQUAINTANCE
    SET_ACQUAINTANCE_STATUS: (status, payload) => { status.acquaintance.status = payload.data },
    // spinner
    SET_SPINNER_ENABLED: (state, payload) => { state.spinner.enabled = payload.data },

    SET_STEP_QUEST: (state, payload) => { state.specialist.stepQuest = payload.data },
    SET_QUEST: (state, payload) => { state.specialist.quest = payload.data },
    SET_PATH: (state, payload) => { state.specialist.path = payload.data },
    SET_YES: (state, payload) => { state.specialist.yes = payload.data }
  },
  getters: {
    getFacts: state => state.facts,
    getSmokeFacts: state => state.smokeFacts,
    getImtFacts: state => state.imtFacts,
    getResultGroup: state => state.resultGroup,
    getResultItems: state => state.resultItems,
    getIbsRisk: state => state.ibsRisk,

    getToldIbs: state => state.toldIbs,
    getToldSmoke: state => state.toldSmoke,

    getUser: state => state.user,

    getUserName: state => state.user.name,
    getUserWeight: state => state.user.weight,
    getUserGrowth: state => state.user.growth,
    getUserArtPressure: state => state.user.artPressure,
    getUserCholesterol: state => state.user.cholesterol,
    getUserArtPressureEnter: state => state.user.artPressureEnter,
    getUserCholesterolEnter: state => state.user.cholesterolEnter,
    getUserSmoke: state => state.user.smoke,
    getUserAge: state => state.user.age,
    getUserGender: state => state.user.gender,
    getUserMet: state => state.user.met,
    getRelativesProblems: state => state.user.relativesProblems,

    getUserGlucometry: state => state.user.glukometr,
    getUserSpirographia: state => state.user.spirographia,
    getUserSpirographiaQ1: state => state.user.spirographiaQ1,
    getUserSpirographiaQ2: state => state.user.spirographiaQ2,
    getUserSaturatsiya: state => state.user.saturatsiya,
    getUserPulse: state => state.user.pulse,
    getUserArtPressureLow: state => state.user.artPressureLow,
    getUserCurrentPressureAndPulse: state => state.user.currentPressureAndPulse,
    getUserTemperature: state => state.user.temperature,
    getEnvTemperature: state => state.user.envTemperature,

    getMeasurementNum: state => state.user.measurementNum,
    getSpecialistNum: state => state.user.specialistNum,
    getMeasurementStep: state => state.user.measurementStep,
    getEquipmentWorks: state => state.user.equipmentWorks,
    getMeasurementBtn: state => state.user.measurementBtn,
    getMeasuredData: state => state.user.measuredData,
    getMeasuredDataFromTopic: state => state.user.measuredDataFromTopic,

    getGlucometerConnectionStatus: state => state.glucometer.connectionStatus,
    getGlucometerBatteryStatus: state => state.glucometer.batteryStatus,

    getIsExaminationStarted: state => state.user.isExaminationStarted,
    getIsSaturatsiyaStarted: state => state.user.isSaturatsiyaStarted,

    getImtMistake: state => state.imtMistake,

    getHeaderBtnLeftEnabled: state => state.headerBtnLeft.enabled,
    getHeaderBtnLeftText: state => state.headerBtnLeft.text,
    getHeaderBtnLeftAction: state => state.headerBtnLeft.action,
    getHeaderBtnLeftPhoto: state => state.headerBtnLeft.photo,

    getHeaderEnabled: state => state.header.enabled,
    getHeaderEnabledPodHeader: state => state.header.enabledPodHeader,

    getFooterEnabled: state => state.footer.enabled,

    getImtStep: state => state.imt.step,
    getIbsStep: state => state.ibs.step,

    getSubtitlesText: state => state.subtitles.text,
    getSubtitlesEnabled: state => state.subtitles.enabled,
    // VIDEO STREAM
    getVideoStreamEnabled: state => state.videoStream.enabled,
    // HEADER
    getHeaderTitle: state => state.header.title,
    getHeaderHeader: state => state.header.header,
    getHeaderButton: state => state.header.button,
    // FOOTER
    getFooterFilled: state => state.footer.filled,
    getFooterPrimary: state => state.footer.primary,
    getFooterSecondary: state => state.footer.secondary,
    // SESSION
    getSessionUserLost: state => state.session.user.lost,
    // ACQUAINTANCE
    getAcquaintanceStatus: state => state.acquaintance.status,
    // spinner
    getSpinnerEnabled: state => state.spinner.enabled,

    getStepQuest: state => state.specialist.stepQuest,
    getQuest: state => state.specialist.quest,
    getPath: state => state.specialist.path,
    getYes: state => state.specialist.yes
  }
}
