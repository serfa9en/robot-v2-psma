import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  namespaced: true,
  actions: {
    // ROBOT
    sayReplicByName: ({ dispatch }, payload) => {
      const eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK, {
        transition: 'SAY_REPLIC_BY_NAME'
      })

      dispatch('robot/sayReplicByName', {
        meta: { eventId: eventId },
        data: payload.data
      }, { root: true })
    },
    sendMailSendMail: ({ dispatch }, payload) => {
      const eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK, {
        transition: 'SEND_MAIL'
      })

      const mailData = {
        email: payload.data,
        subject: 'Promobot LLC',
        body: `Promobot LLC - service robots manufacturing 
promobotusa.com 
info@promobotusa.com 
Tel: +7(342)257-80-85 
Whatsapp: +79194401919`
      }

      dispatch('robot/sendMailSendMail', {
        meta: { eventId: eventId },
        data: mailData
      }, { root: true })
    },
    sipCall: ({ dispatch, rootState }, payload) => {
      const eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK, {
        transition: 'SIP'
      })

      let name

      if (rootState.app.passport.data && rootState.app.passport.data.name) {
        name = rootState.app.passport.data.name
      } else {
        name = ''
      }

      let number

      if (rootState.robot.robot.settings.application.sip.phoneNumber) {
        number = rootState.robot.robot.settings.application.sip.phoneNumber
      } else {
        number = '89999999999'
      }

      dispatch('robot/sendSipCallStartWithText', {
        meta: { eventId },
        data: {
          number: number,
          text: `Hello. User ${name} is trying to get in. To give him access press 1, or press 0 to deny.`
        }
      }, { root: true })
    },
    sendFaceRecognizeFrame: ({ dispatch }) => {
      const eventId = global.logger.logEvent(EventInitiatorTypes.JS, EventTypes.JS_CUSTOM)

      dispatch('robot/sendFaceRecognizeFrame', {
        meta: { eventId }
      }, { root: true })
    },
    faceRecognizeGeneralTouchRequest: ({ dispatch }, clickEvent) => {
      const eventData = {
        x: clickEvent.offsetX / clickEvent.target.clientWidth,
        y: clickEvent.offsetY / clickEvent.target.clientHeight,
        transition: 'TOUCH'
      }
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK, eventData)

      let coordinates = {
        x: clickEvent.offsetX / clickEvent.target.clientWidth,
        y: clickEvent.offsetY / clickEvent.target.clientHeight
      }

      dispatch('robot/faceRecognizeGeneralTouchRequest', {
        meta: { eventId },
        data: coordinates
      }, { root: true })
    },
    faceRecognizeAutotrackingRequest: ({ dispatch }, payload) => {
      const eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)

      dispatch('robot/faceRecognizeAutotrackingRequest', {
        meta: { eventId: eventId },
        data: payload.data
      }, { root: true })
    },
    faceRecognizeGeneralFrameRequest: ({ dispatch }, payload) => {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.JS, EventTypes.FACE_GENERAL_FRAME)

      dispatch('robot/faceRecognizeGeneralFrameRequest', {
        meta: { eventId: eventId }
      }, { root: true })
    },
    faceRecognizeAddFaceRequest: ({ dispatch, rootState }, payload) => {
      // let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)

      // let environment = rootState.robot.environment
      // environment = ((environment || {}).id || '').toString()
      // environment = environment.replace(/[bmoprtv_]/g, '')
      // let environment = ''
      // dispatch('robot/faceRecognizeAddFaceRequest', {
      //   meta: { eventId },
      //   data: parseInt(environment + Math.round(new Date().getTime()))
      // }, { root: true })
    },
    // UI
    setSubtitlesEnabled: ({ dispatch }, payload) => {
      const eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK, {
        transition: 'HIDE-SUBS'
      })

      dispatch('ui/setSubtitlesEnabled', {
        meta: { eventId: eventId },
        data: payload.data
      }, { root: true })
    }
  }
}
