import { EventInitiatorTypes, EventTypes, ActionHandlerTypes, ActionTypes } from 'promobot-logger'

export const faceRecognizeEvents = (dispatch, logger, robot) => {
  robot.faceRecognizeService.onInfo(info => {
    let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.FACE_RECOGNIZE_INFO, info)
    // console.warn('faceRecognizeInfoResponse', info)
    dispatch('robot/faceRecognizeInfoResponse', {
      meta: { eventId },
      data: info
    })
  })
  robot.faceRecognizeService.onGeneral(id => {
    let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.FACE_RECOGNIZE_GENERAL, { id })
    // console.warn('faceRecognizeGeneralIdResponse', id)
    dispatch('robot/faceRecognizeGeneralIdResponse', {
      meta: { eventId },
      data: id
    })
  })
  robot.faceRecognizeService.onGeneralSetted(message => {
    let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.FACE_RECOGNIZE_GENERAL_SETTED)
    // console.warn('faceRecognizeGeneralSettedResponse', message)
    dispatch('robot/faceRecognizeGeneralSettedResponse', {
      meta: { eventId },
      data: message
    })
  })
  robot.faceRecognizeService.onFaceAddStatus(status => {
    let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.FACE_TRAINED)
    // console.warn('faceRecognizeAddFaceStatusResponse', status)
    dispatch('robot/faceRecognizeAddFaceStatusResponse', {
      meta: { eventId: eventId },
      data: status
    })
  })
}

export const faceRecognizeSubscribers = (dispatch, mutation, logger, robot) => {
  switch (mutation.type) {
    case 'robot/FACE_RECOGNIZE_GENERAL_TOUCH_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.AUTO_TRACKING_STATUS)
      robot.faceRecognizeService.touchGeneral(mutation.payload.data)
      break
    case 'robot/FACE_RECOGNIZE_GENERAL_FRAME_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.JS_CUSTOM)
      robot.faceRecognizeService.getGeneralFrame()
        .then(image => {
          let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.FACE_GENERAL_FRAME)

          dispatch('robot/faceRecognizeGeneralFrameResponse', {
            meta: { eventId: eventId },
            data: image
          })
        })
      break
    case 'robot/FACE_RECOGNIZE_AUTOTRACKING_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.AUTO_TRACKING_STATUS)
      robot.faceRecognizeService.autoTracking(mutation.payload.data)
      break
    case 'robot/FACE_RECOGNIZE_GENERAL_SET_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ROBOT_SET_GENERAL)
      robot.faceRecognizeService.setGeneral(mutation.payload.data)
      break
    case 'robot/FACE_RECOGNIZE_SAVE_PHOTO_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ROBOT_SET_GENERAL)
      robot.faceRecognizeService.savePhoto(mutation.payload.data)
      break
    case 'robot/FACE_RECOGNIZE_ADD_FACE_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ADD_FACE)
      robot.faceRecognizeService.addFace(mutation.payload.data)
      break
    case 'robot/FACE_RECOGNIZE_DEL_FACE_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ADD_FACE)
      robot.faceRecognizeService.delFace(mutation.payload.data)
      break
    case 'robot/FACE_RECOGNIZE_HEAD_ENABLED_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ADD_FACE)
      robot.faceRecognizeService.headEnabled(mutation.payload.data)
      break
    case 'robot/FACE_RECOGNIZE_BORDERS_ENABLED_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ADD_FACE)
      robot.faceRecognizeService.enableBorders(mutation.payload.data)
      break
    case 'robot/FACE_RECOGNIZE_REFRESH_FACES_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.FACE_RECOGNIZE_INFO)
      robot.faceRecognizeService.refreshFaces()
      break
  }
}
