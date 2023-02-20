import { EventInitiatorTypes, EventTypes, ActionHandlerTypes, ActionTypes } from 'promobot-logger'
import { faceRecognizeEvents, faceRecognizeSubscribers } from './faceRecognize'
import { userEvents, userSubscribers } from './user'
import { keyboardEvents, keyboardSubscribers } from './keyboard'

// let timeoutResetTimer = null
/* eslint-disable camelcase */

export function robotPlugin (logger, robot) {
  return store => {
    faceRecognizeEvents(store.dispatch, logger, robot)
    userEvents(store.dispatch, logger, robot)
    keyboardEvents(store.dispatch, logger, robot)

    // CAMERA
    robot.cameraService.onCameraError(error => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.CAMERA_ERROR)
      store.dispatch('robot/setCameraError', {
        meta: { eventId: eventId },
        data: error
      })
    })
    // SUBSCRIBE
    store.subscribe((mutation, state) => {
      faceRecognizeSubscribers(store.dispatch, mutation, logger, robot)
      userSubscribers(store.dispatch, mutation, logger, robot)
      keyboardSubscribers(store.dispatch, mutation, logger, robot)

      // CAMERA
      switch (mutation.type) {
        case 'robot/SEND_CAMERA_START_REQUEST':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.CAMERA_CONTROL, mutation.payload.data)
          robot.cameraService.startCamera().then(() => {
            let childEventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.CAMERA_RESPONSE, true, mutation.payload.meta.eventId)
            store.dispatch('robot/sendCameraStartResponse', {
              meta: { eventId: childEventId },
              data: true
            })
          }).catch(reason => {
            console.log(reason)
            let childEventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.CAMERA_RESPONSE, reason, mutation.payload.meta.eventId)
            store.dispatch('robot/sendCameraStartResponse', {
              meta: { eventId: childEventId },
              data: false
            })
          })
          break

        case 'robot/SEND_CAMERA_PHOTO_REQUEST':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.CAMERA_CONTROL, mutation.payload.data)
          robot.cameraService.makePhoto().then(filename => {
            let childEventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.CAMERA_RESPONSE, filename, mutation.payload.meta.eventId)
            store.dispatch('robot/sendCameraPhotoResponse', {
              meta: { eventId: childEventId },
              data: filename
            })
          }).catch(reason => {
            console.log(reason)
            let childEventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.CAMERA_RESPONSE, reason, mutation.payload.meta.eventId)
            store.dispatch('robot/sendCameraStartResponse', {
              meta: { eventId: childEventId },
              data: null
            })
          })
          break
        case 'robot/SEND_CAMERA_STOP_REQUEST':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.CAMERA_CONTROL, mutation.payload.data)
          robot.cameraService.stopCamera()
          break
      }

      // FILESYSTEM
      switch (mutation.type) {
        case 'robot/SEND_FILESYSTEM_LOAD_REQUEST':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.FILESYSTEM, mutation.payload.data)
          robot.filesystemService.loadFile(mutation.payload.data.mime_type, mutation.payload.data.filename).then(file => {
            let childEventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.FILESYSTEM_RESPONSE, file, mutation.payload.meta.eventId)
            store.dispatch('robot/sendFilesystemLoadResponse', {
              meta: { eventId: childEventId },
              data: file
            })
          })
          break
        case 'robot/SEND_FILESYSTEM_SAVE_REQUEST':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.FILESYSTEM, mutation.payload.data)
          robot.filesystemService.saveFile(mutation.payload.data.mime_type, mutation.payload.data.data, mutation.payload.data.filename)
          break
      }
      // KEYBOARD
      switch (mutation.type) {
        case 'robot/SET_KEYBOARD_VISIBLE':
          // console.log('SET_KEYBOARD_VISIBLE', mutation.payload.data)
          if (mutation.payload.data === true) {
            logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.KEYBOARD_SHOW)
            robot.keyboardService.show()
          } else {
            logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.KEYBOARD_HIDE)
            robot.keyboardService.hide()
          }
          break
      }
    })
  }
}

export default robotPlugin
