import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'
import { stateFaceRecognize, actionsFaceRecognize, mutationsFaceRecognize, gettersFaceRecognize } from './faceRecognize'
import { stateUser, actionsUser, mutationsUser, gettersUser } from './user'
import { stateKeyboard, actionsKeyboard, mutationsKeyboard, gettersKeyboard } from './keyboard'
// import { stateCustom, actionsCustom, mutationsCustom, gettersCustom } from './custom'
import { actionsDialog, gettersDialog, mutationsDialog, stateDialog } from './dialog'

const deepExtend = require('deep-extend')

function initialState () {
  return {
    ...stateFaceRecognize,
    ...stateUser,
    ...stateKeyboard,
    ...stateDialog,
    robot: {
      interactiveSessionActive: false,
      driveSessionActive: false,
      driveObstacleStatus: false,
      caseSessionActive: false,
      drive: null,
      case: null,
      user: null,
      environment: null,
      settings: {},
      custom: {
        event: null
      },
      muteOnStatus: null,
      language: 'ru_RU'
    },
    dialog: {
      // in
      userText: null,
      robotText: null,
      getReplicByName: null,
      sayReplicByName: null,
      dialogQuestion: null,
      loadAnswer: null,
      userAction: null,
      // case: null,
      // out
      sayText: null,

      userActionActive: null
    },
    passport: {
      finish: null,
      error: null,
      state: null,
      success: null
    },
    sip: {
      status: null,
      tone: null
    },
    dispenser: {
      status: null
    },
    // faceRecognize: {
    //   info: null,
    //   autotracking: null,
    //   general: null,
    //   generalSetted: null,
    //   faceAddStatus: null,
    //   addFace: null,
    //   head: {
    //     enabled: null
    //   },
    //   borders: {
    //     enabled: null
    //   },
    //   frame: null
    // },
    audio: {
      file: null
    },
    mail: {
      success: null,
      error: null,
      sendMial: null
    },
    system: {
      application: {
        finished: null
      }
    },
    camera: {
      is_open: null,
      error: ''
    },
    printer: {
      data: null,
      status: null
    },
    keyboard: {
      visible: null
    }
  }
}

export default {
  namespaced: true,
  state: initialState(),
  actions: {
    ...actionsFaceRecognize,
    ...actionsUser,
    ...actionsKeyboard,
    ...actionsDialog,
    startScript: ({ commit, state }, payload) => commit('START_SCRIPT', payload),
    stopScript: ({ commit, state }, payload) => commit('STOP_SCRIPT', payload),

    clearState: ({ commit }) => commit('CLEAR_STATE'),
    // INTERACTION
    setInteractiveSessionActive: ({ commit, state }, payload) => commit('SET_INTERACTION_SESSION_ACTIVE', payload),
    setInteractionStart: ({ commit }, payload) => commit('SET_INTERACTION_START', payload),
    setDriveSessionActive: ({ commit, state }, payload) => commit('SET_DRIVE_SESSION_ACTIVE', payload),
    setDriveObstacleStatus: ({ commit, state }, payload) => commit('SET_DRIVE_OBSTACLE_STATUS', payload),
    setCaseSessionActive: ({ commit, state }, payload) => commit('SET_CASE_SESSION_ACTIVE', payload),
    // custom
    setCaseStart: ({ commit, state }, payload) => commit('SET_CASE_START', payload),
    setCaseStop: ({ commit, state }, payload) => commit('SET_CASE_STOP', payload),
    setApplicationRestart: ({ commit, state }, payload) => commit('SET_APPLICATION_RESTART', payload),
    robotCustomEvent: ({ commit, state }, payload) => commit('ROBOT_CUSTOM_EVENT', payload),
    // environment
    setEnvironment: ({ commit, state }, payload) => commit('SET_ENVIRONMENT', payload),
    // dialog
    abortRobotReplic: ({ commit, state }, payload) => {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK, {
        transition: 'ROBOT_REPLIC_ABORT'
      })

      commit('ROBOT_REPLIC_ABORT', {
        meta: { eventId: eventId }
      })
    },
    userText: ({ commit, state }, payload) => commit('USER_TEXT', payload),
    sayText: ({ commit, state }, payload) => commit('SAY_TEXT', payload),
    setRobotText: ({ commit }, payload) => commit('SET_ROBOT_TEXT', payload),
    getReplicByName: ({ commit, state }, payload) => commit('GET_REPLIC_BY_NAME', payload),
    sayReplicByName: ({ commit, state }, payload) => commit('SAY_REPLIC_BY_NAME', payload),
    setUserAction: ({ commit, state }, payload) => commit('SET_USER_ACTION', payload),
    setUserActionActive: ({ commit, state }, payload) => commit('SET_USER_ACTION_ACTIVE', payload),
    setDialogQuestion: ({ commit, state }, payload) => commit('SET_DIALOG_QUESTION', payload),
    setRobotDialogLoadAnswer: ({ commit }, payload) => commit('SET_ROBOT_DIALOG_LOAD_ANSWER', payload),
    setRobotDialogSayAnswer: ({ commit }, payload) => commit('SET_ROBOT_DIALOG_SAY_ANSWER', payload),
    clickAnswer: ({ commit }, clickEvent) => { //, answer
      let logger = PromobotLogger.getInstance()
      let eventData = {
        x: clickEvent.x,
        y: clickEvent.y,
        text: clickEvent.target.textContent.replace(/\n/g, '').trim(),
        transition: 'TOUCH'
      }
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK, eventData)

      commit('CLICK_DIALOG_ANSWER', {
        meta: { eventId: eventId },
        data: clickEvent.target.textContent.replace(/\n/g, '').trim()
      })
    },
    sendDialogExternalPlay: ({ commit }, payload) => commit('SEND_DIALOG_EXTERNAL_PLAY', payload),
    sendDialogExternalStop: ({ commit }, payload) => commit('SEND_DIALOG_EXTERNAL_STOP', payload),
    setRobotDialogCase: ({ commit, state }, payload) => commit('SET_ROBOT_DIALOG_CASE', payload),
    // user
    // userPresence: ({ commit, state }, payload) => commit('SET_USER', payload),
    // userLost: ({ commit, state }, payload) => commit('SET_USER', payload),
    // setGeneral: ({ commit }, clickEvent) => {
    //   let logger = PromobotLogger.getInstance()
    //   let eventData = {
    //     x: clickEvent.offsetX / clickEvent.target.clientWidth,
    //     y: clickEvent.offsetY / clickEvent.target.clientHeight,
    //     transition: 'TOUCH'
    //   }
    //   let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK, eventData)

    //   let coordinates = {
    //     x: clickEvent.offsetX / clickEvent.target.clientWidth,
    //     y: clickEvent.offsetY / clickEvent.target.clientHeight
    //   }

    //   commit('SET_GENERAL', {
    //     meta: { eventId: eventId },
    //     data: coordinates
    //   })
    // },
    // sendAddUser: ({ commit }, payload) => commit('SEND_ADD_USER', payload),
    // sendDeleteUser: ({ commit }, payload) => commit('SEND_DELETE_USER', payload),
    // setFaceRecognizeAutotracking: ({ commit }, payload) => commit('SET_FACE_RECOGNIZE_AUTOTRACKING', payload),
    // fromFaceRecognizeInfo: ({ commit }, payload) => commit('FROM_FACE_RECOGNIZE_INFO', payload),
    // fromFaceRecognizeGeneral: ({ commit }, payload) => commit('FROM_FACE_RECOGNIZE_GENERAL', payload),
    // fromFaceRecognizeGeneralSetted: ({ commit }, payload) => commit('FROM_FACE_RECOGNIZE_GENERAL_SETTED', payload),
    // sendFaceRecognizeSetGeneral: ({ commit }, payload) => commit('SEND_FACE_RECOGNIZE_SET_GENERAL', payload),
    // fromFaceRecognizeFaceAddStatus: ({ commit }, payload) => commit('FROM_FACE_RECOGNIZE_FACE_ADD_STATUS', payload),
    // sendFaceRecognizeAddFace: ({ commit }, payload) => commit('SEND_FACE_RECOGNIZE_ADD_FACE', payload),
    // sendFaceRecognizeDelFace: ({ commit }, payload) => commit('SEND_FACE_RECOGNIZE_DEL_FACE', payload),
    // sendFaceRecognizeHeadEnabled: ({ commit }, payload) => commit('SEND_FACE_RECOGNIZE_HEAD_ENABLED', payload),
    // sendFaceRecognizeBordersEnabled: ({ commit }, payload) => commit('SEND_FACE_RECOGNIZE_BORDERS_ENABLED', payload),
    // sendFaceRecognizeFrame: ({ commit }, payload) => commit('SEND_FACE_RECOGNIZE_FRAME', payload),
    // fromFaceRecognizeFrame: ({ commit }, payload) => commit('FROM_FACE_RECOGNIZE_FRAME', payload),
    // settings
    setRobotSettings: ({ commit, state }, payload) => commit('SET_ROBOT_SETTINGS', payload),
    setRobotSettingsLoad: ({ commit, state }, payload) => commit('SET_ROBOT_SETTINGS_LOAD', payload),
    setRobotSettingsChange: ({ commit, state }, payload) => commit('SET_ROBOT_SETTINGS_CHANGE', payload),
    setRobotLanguage: ({ commit, state }, payload) => commit('SET_ROBOT_LANGUAGE', payload),

    // passport
    sendScannerPassportScan: ({ commit }, payload) => commit('SEND_SCANNER_PASSPORT_SCAN', payload),
    fromScannerPassportFinish: ({ commit }, payload) => commit('FROM_SCANNER_PASSPORT_FINISH', payload),
    fromScannerPassportError: ({ commit }, payload) => commit('FROM_SCANNER_PASSPORT_ERROR', payload),
    fromScannerPassportState: ({ commit }, payload) => commit('FROM_SCANNER_PASSPORT_STATE', payload),
    handlerUpdatePassportData: ({ dispatch }, payload) => {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)

      dispatch('updatePassportData', {
        meta: { eventId: eventId },
        data: payload.data
      })
    },
    updatePassportData: ({ commit }, payload) => commit('UPDATE_PASSPORT_DATA', payload),
    fromScannerPassportSuccess: ({ commit }, payload) => commit('FROM_SCANNER_PASSPORT_SUCCESS', payload),
    // SIP
    fromSipStatus: ({ commit }, payload) => commit('FROM_SIP_STATUS', payload),
    fromSipTone: ({ commit }, payload) => commit('FROM_SIP_TONE', payload),
    sendSipCallStart: ({ commit }, payload) => commit('SEND_SIP_CALL_START', payload),
    sendSipCallStartWithFile: ({ commit }, payload) => commit('SEND_SIP_CALL_START_WITH_FILE', payload),
    sendSipCallStartWithText: ({ commit }, payload) => commit('SEND_SIP_CALL_START_WITH_TEXT', payload),
    sendSipCallStop: ({ commit }, payload) => commit('SEND_SIP_CALL_STOP', payload),
    sendSipPlayFile: ({ commit }, payload) => commit('SEND_SIP_PLAY_FILE', payload),
    sendSipPlayText: ({ commit }, payload) => commit('SEND_SIP_PLAY_TEXT', payload),
    // DISPENSER
    fromDispenserStatus: ({ commit }, payload) => commit('FROM_DISPENSER_STATUS', payload),
    sendDispenserDispense: ({ commit }, payload) => commit('SEND_DISPENSER_DISPENSE', payload),
    // SCRIPTS
    fromScriptEnd: ({ commit }, payload) => commit('FROM_SCRIPT_END', payload),
    // AUDIO
    fromAudioFile: ({ commit }, payload) => commit('FROM_AUDIO_FILE', payload),
    sendAudioStart: ({ commit }, payload) => commit('SEND_AUDIO_START', payload),
    sendAudioStop: ({ commit }, payload) => commit('SEND_AUDIO_STOP', payload),
    // MAIL
    fromMailSuccess: ({ commit }, payload) => commit('FROM_MAIL_SUCCESS', payload),
    fromMailError: ({ commit }, payload) => commit('FROM_MAIL_ERROR', payload),
    sendMailSendMail: ({ commit }, payload) => commit('SEND_MAIL_SEND_MAIL', payload),
    // DIALOG
    sendDialogMuteOn: ({ commit, dispatch }, payload) => {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      dispatch('setDialogMuteOnStatus', {
        meta: { eventId: eventId },
        data: true
      })
      commit('SEND_DIALOG_MUTE_ON', payload)
    },
    sendDialogMuteOff: ({ commit, dispatch }, payload) => {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      dispatch('setDialogMuteOnStatus', {
        meta: { eventId: eventId },
        data: false
      })
      commit('SEND_DIALOG_MUTE_OFF', payload)
    },
    setDialogMuteOnStatus: ({ commit }, payload) => commit('SET_DIALOG_MUTE_ON_STATUS', payload),
    // SYSTEM
    fromSystemApplicationFinished: ({ commit }, payload) => commit('FROM_SYSTEM_APPLICATION_FINISHED', payload),
    // CAMERA
    sendCameraStartRequest: ({ commit }, payload) => commit('SEND_CAMERA_START_REQUEST', payload),
    sendCameraStartResponse: ({ commit }, payload) => commit('SEND_CAMERA_START_RESPONSE', payload),
    sendCameraPhotoRequest: ({ commit }, payload) => commit('SEND_CAMERA_PHOTO_REQUEST', payload),
    sendCameraPhotoResponse: ({ commit }, payload) => commit('SEND_CAMERA_PHOTO_RESPONSE', payload),
    sendCameraStopRequest: ({ commit }, payload) => commit('SEND_CAMERA_STOP_REQUEST', payload),
    setCameraError: ({ commit }, payload) => commit('SET_CAMERA_ERROR', payload),
    setCameraIsOpen: ({ commit }, payload) => commit('SET_CAMERA_IS_OPEN', payload),
    // FILESYSTEM
    sendFilesystemLoadRequest: ({ commit }, payload) => commit('SEND_FILESYSTEM_LOAD_REQUEST', payload),
    sendFilesystemLoadResponse: ({ commit }, payload) => commit('SEND_FILESYSTEM_LOAD_RESPONSE', payload),
    sendFilesystemSaveRequest: ({ commit }, payload) => commit('SEND_FILESYSTEM_SAVE_REQUEST', payload),
    // PRINTER
    setPrinterData: ({ commit }, payload) => commit('SET_PRINTER_DATA', payload),
    setPrinterStatus: ({ commit }, payload) => commit('SET_PRINTER_STATUS', payload),
    setPrinterState: ({ commit }, payload) => commit('SET_PRINTER_STATE', payload),
    // KEYBOARD
    setKeyboardVisible: ({ commit }, payload) => commit('SET_KEYBOARD_VISIBLE', payload)

  },
  mutations: {
    ...mutationsFaceRecognize,
    ...mutationsUser,
    ...mutationsKeyboard,
    ...mutationsDialog,
    CLEAR_STATE: (state) => {
      const s = initialState()
      Object.keys(s).forEach(key => {
        if (key !== 'robot') {
          state[key] = s[key]
        }
      })
    },
    START_SCRIPT: (state, payload) => { },
    STOP_SCRIPT: (state, payload) => { },
    // custom
    SET_CASE_START: (state, payload) => { },
    SET_CASE_STOP: (state, payload) => { },
    SET_APPLICATION_RESTART: (state, payload) => { },
    ROBOT_CUSTOM_EVENT: (state, payload) => { state.robot.custom.event = payload.data },
    // sessions
    SET_INTERACTION_SESSION_ACTIVE: (state, payload) => { state.robot.interactiveSessionActive = payload.data },
    SET_INTERACTION_START: (state, payload) => { },
    SET_DRIVE_SESSION_ACTIVE: (state, payload) => { state.robot.driveSessionActive = payload.data },
    SET_DRIVE_OBSTACLE_STATUS: (state, payload) => { state.robot.driveObstacleStatus = payload.data },
    SET_CASE_SESSION_ACTIVE: (state, payload) => { state.robot.caseSessionActive = payload.data },
    // environment
    SET_ENVIRONMENT: (state, payload) => { state.robot.environment = payload.data },
    // dialog
    ROBOT_REPLIC_ABORT: (state, payload) => { },
    SET_USER_ACTION: (state, payload) => { state.dialog.userAction = payload.data },
    SET_USER_ACTION_ACTIVE: (state, payload) => { state.dialog.userActionActive = payload.data },
    SET_USER_SAY: (state, payload) => { state.dialog.userSayText = payload.data },
    SAY_TEXT: (state, payload) => { state.dialog.sayText = payload.data },
    SET_ROBOT_TEXT: (state, payload) => { state.dialog.robotText = payload.data },
    USER_TEXT: (state, payload) => { state.dialog.userText = payload.data },
    GET_REPLIC_BY_NAME: (state, payload) => { state.dialog.getReplicByName = payload.data },
    SAY_REPLIC_BY_NAME: (state, payload) => { state.dialog.sayReplicByName = payload.data },
    SET_DIALOG_QUESTION: (state, payload) => { state.dialog.dialogQuestion = payload.data },
    CLICK_DIALOG_ANSWER: (state, payload) => { state.dialog.dialogAnswer = payload.data },
    SEND_DIALOG_EXTERNAL_PLAY: (state, payload) => { },
    SEND_DIALOG_EXTERNAL_STOP: (state, payload) => { },
    SET_ROBOT_DIALOG_CASE: (state, payload) => { state.dialog.case = payload.data },
    SET_ROBOT_DIALOG_LOAD_ANSWER: (state, payload) => { state.dialog.loadAnswer = payload.data },
    SET_ROBOT_DIALOG_SAY_ANSWER: (state, payload) => { },
    // user
    // SET_USER: (state, payload) => { state.robot.user = payload.data },
    // SET_GENERAL: (state, payload) => { },
    // SEND_ADD_USER: (state, payload) => { },
    // SEND_DELETE_USER: (state, payload) => { },
    // FROM_FACE_RECOGNIZE_INFO: (state, payload) => { state.faceRecognize.info = payload.data },
    // SET_FACE_RECOGNIZE_AUTOTRACKING: (state, payload) => { state.faceRecognize.autotracking = payload.data },
    // FROM_FACE_RECOGNIZE_GENERAL: (state, payload) => { state.faceRecognize.general = payload.data },
    // FROM_FACE_RECOGNIZE_GENERAL_SETTED: (state, payload) => { state.faceRecognize.generalSetted = payload.data },
    // SEND_FACE_RECOGNIZE_SET_GENERAL: (state, payload) => { },
    // FROM_FACE_RECOGNIZE_FACE_ADD_STATUS: (state, payload) => { state.faceRecognize.faceAddStatus = payload.data },
    // SEND_FACE_RECOGNIZE_ADD_FACE: (state, payload) => { state.faceRecognize.addFace = payload.data },
    // SEND_FACE_RECOGNIZE_DEL_FACE: (state, payload) => { },
    // SEND_FACE_RECOGNIZE_HEAD_ENABLED: (state, payload) => { state.faceRecognize.head.enabled = payload.data },
    // SEND_FACE_RECOGNIZE_BORDERS_ENABLED: (state, payload) => { state.faceRecognize.borders.enabled = payload.data },
    // SEND_FACE_RECOGNIZE_FRAME: (state, payload) => { },
    // FROM_FACE_RECOGNIZE_FRAME: (state, payload) => { state.faceRecognize.frame = payload.data },
    // settings
    SET_ROBOT_SETTINGS: (state, payload) => { state.robot.settings = deepExtend(state.robot.settings, payload.data) },
    SET_ROBOT_SETTINGS_LOAD: (state, payload) => { },
    SET_ROBOT_LANGUAGE: (state, payload) => { state.robot.language = payload.data },
    SET_ROBOT_SETTINGS_CHANGE: (state, payload) => { },
    // passport scanner
    SEND_SCANNER_PASSPORT_SCAN: (state, payload) => { },
    FROM_SCANNER_PASSPORT_FINISH: (state, payload) => { state.passport.finish = payload.data },
    FROM_SCANNER_PASSPORT_ERROR: (state, payload) => { state.passport.error = payload.data },
    FROM_SCANNER_PASSPORT_STATE: (state, payload) => { state.passport.state = payload.data },
    UPDATE_PASSPORT_DATA: (state, payload) => {
      if (payload.data.name) {
        let patronymic = state.passport.finish.name.split(' ')[1]
        payload.data.name = [
          payload.data.name,
          patronymic
        ].join(' ')
      }

      if (payload.data.patronymic) {
        let name = state.passport.finish.name.split(' ')[0]
        payload.data.name = [
          name,
          payload.data.patronymic
        ].join(' ')

        delete payload.patronymic
      }

      state.passport.finish = Object.assign({}, state.passport.finish, payload.data)
    },
    FROM_SCANNER_PASSPORT_SUCCESS: (state, payload) => { state.passport.success = payload.data },
    // SIP
    FROM_SIP_STATUS: (state, payload) => { state.sip.status = payload.data },
    FROM_SIP_TONE: (state, payload) => { state.sip.tone = payload.data },
    SEND_SIP_CALL_START: (state, payload) => { },
    SEND_SIP_CALL_START_WITH_FILE: (state, payload) => { },
    SEND_SIP_CALL_START_WITH_TEXT: (state, payload) => { },
    SEND_SIP_CALL_STOP: (state, payload) => { },
    SEND_SIP_PLAY_FILE: (state, payload) => { },
    SEND_SIP_PLAY_TEXT: (state, payload) => { },
    // DISPENSER
    FROM_DISPENSER_STATUS: (state, payload) => { state.dispenser.status = payload.data },
    SEND_DISPENSER_DISPENSE: (state, payload) => { },
    // SCRIPTS
    FROM_SCRIPT_END: (state, payload) => { },
    // AUDIO
    FROM_AUDIO_FILE: (state, payload) => { state.audio.file = payload.data },
    SEND_AUDIO_START: (state, payload) => { },
    SEND_AUDIO_STOP: (state, payload) => { },
    // MAIL
    FROM_MAIL_SUCCESS: (state, payload) => { state.mail.success = payload.data },
    FROM_MAIL_ERROR: (state, payload) => { state.mail.error = payload.data },
    SEND_MAIL_SEND_MAIL: (state, payload) => { state.mail.sendMial = payload.data },
    // DIALOG
    SEND_DIALOG_MUTE_ON: (state, payload) => { },
    SEND_DIALOG_MUTE_OFF: (state, payload) => { },
    SET_DIALOG_MUTE_ON_STATUS: (state, payload) => { state.robot.muteOnStatus = payload.data },
    // SYSTEM
    FROM_SYSTEM_APPLICATION_FINISHED: (state, payload) => { state.system.application.finished = payload.data },
    // CAMERA
    SEND_CAMERA_START_REQUEST: (state, payload) => { },
    SEND_CAMERA_START_RESPONSE: (state, payload) => { },
    SEND_CAMERA_PHOTO_REQUEST: (state, payload) => { },
    SEND_CAMERA_PHOTO_RESPONSE: (state, payload) => { },
    SEND_CAMERA_STOP_REQUEST: (state, payload) => { },
    SET_CAMERA_ERROR: (state, payload) => { state.camera.error = payload.data },
    SET_CAMERA_IS_OPEN: (state, payload) => { state.camera.is_open = payload.data },
    // FILESYSTEM
    SEND_FILESYSTEM_LOAD_REQUEST: (state, payload) => { },
    SEND_FILESYSTEM_LOAD_RESPONSE: (state, payload) => { },
    SEND_FILESYSTEM_SAVE_REQUEST: (state, payload) => { },
    // printer
    SET_PRINTER_DATA: (state, payload) => { state.printer.data = payload.data },
    SET_PRINTER_STATUS: (state, payload) => { state.printer.status = payload.data },
    // KEYBOARD
    SET_KEYBOARD_VISIBLE: (state, payload) => { state.keyboard.visible = payload.data }
  },
  getters: {
    ...gettersFaceRecognize,
    ...gettersUser,
    ...gettersKeyboard,
    ...gettersDialog,
    // TODO
    // УБрать слово robot из dialog
    getRobotSettings: state => state.robot.settings,
    getRobot: (state) => state.robot,
    getRobotUser: (state) => state.robot.user,
    getRobotLanguage: (state) => state.robot.language,
    // DIALOG
    getDialogQuestion: (state) => state.dialog.dialogQuestion,
    getUserText: (state) => state.dialog.userText,
    getRobotText: (state) => state.dialog.robotText,
    getRobotDialogLoadAnswer: (state) => state.dialog.loadAnswer,
    getRobotDialogUserAction: (state) => state.dialog.userAction,
    getRobotDialogUserActionActive: (state) => state.dialog.userActionActive,
    getRobotDialogCase: (state) => state.robot.dialog.case,
    // PASSPORT
    getRobotPassportFinish: (state) => state.passport.finish,
    getRobotPassportError: (state) => state.passport.error,
    getRobotPassportState: (state) => state.passport.state,
    // SIP
    // getSipPublicCallEvent: (state) => state.sip.publicCallEvent,
    // getSipHiddenCallEvent: (state) => state.sip.hiddenCallEvent,
    // getSipToneEvent: (state) => state.sip.toneEvent,
    getSipStatus: state => state.sip.status,
    getSipEvent: state => state.sip.event,
    // DISPENSER
    getDispenserStatus: (state) => state.dispenser.status,
    // USER
    // getFaceRecognizeInfo: state => state.faceRecognize.info,
    // getFaceRecognizeAutotracking: (state) => state.faceRecognize.autotracking,
    // getFaceRecognizeGeneral: (state) => state.faceRecognize.general,
    // getFaceRecognizeGeneralSetted: (state) => state.faceRecognize.generalSetted,
    // getFaceRecognizeFaceAddStatus: (state) => state.faceRecognize.faceAddStatus,
    // getFaceRecognizeAddFace: (state) => state.faceRecognize.addFace,
    // getFaceRecognizeHeadEnabled: (state) => state.faceRecognize.head.enabled,
    // getFaceRecognizeBordersEnabled: (state) => state.faceRecognize.borders.enabled,
    // getFaceRecognizeFrame: (state) => state.faceRecognize.frame,
    // SCRIPTS
    getRobotCustomEvent: state => state.robot.custom.event,
    // AUDIO
    getAudioFile: state => state.audio.file,
    // MAIL
    getMailSuccess: state => state.mail.success,
    getMailError: state => state.mail.error,
    getMailSendMail: state => state.mail.sendMial,
    // SYSTEM
    getSystemApplicationFinished: state => state.system.application.finished,
    // CAMERA
    getCameraError: state => state.camera.error,
    getCameraIsOpen: state => state.camera.is_open,
    // printer
    getPrinterData: state => state.printer.data,
    getPrinterStatus: state => state.printer.status,

    getDialogMuteOnStatus: state => state.robot.muteOnStatus
  }
}
