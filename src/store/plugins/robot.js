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

    // // userService.onUserPresence
    // robot.userService.onUserPresence((user, isNew) => {
    //   let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.USER_PRESENCE, { user: user })
    //   store.dispatch('robot/userPresence', {
    //     meta: { eventId: eventId },
    //     data: user
    //   })
    // })
    // // userService.onUserLost
    // robot.userService.onUserLost(() => {
    //   let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.USER_LOST)
    //   store.dispatch('robot/userPresence', {
    //     meta: { eventId: eventId },
    //     data: null
    //   })
    // })

    // // FACE RECOGNIZE
    // robot.faceRecognizeService.onInfo(info => {
    //   let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.FACE_RECOGNIZE_INFO)
    //   store.dispatch('robot/fromFaceRecognizeInfo', {
    //     meta: { eventId: eventId },
    //     data: info
    //   })
    // })
    // robot.faceRecognizeService.onGeneral(message => {
    //   let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.FACE_RECOGNIZE_GENERAL)
    //   store.dispatch('robot/fromFaceRecognizeGeneral', {
    //     meta: { eventId: eventId },
    //     data: message
    //   })
    // })
    // robot.faceRecognizeService.onGeneralSetted(message => {
    //   let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.FACE_RECOGNIZE_GENERAL_SETTED)
    //   store.dispatch('robot/fromFaceRecognizeGeneralSetted', {
    //     meta: { eventId: eventId },
    //     data: message
    //   })
    // })
    // robot.faceRecognizeService.onFaceAddStatus(status => {
    //   let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.FACE_TRAINED)
    //   store.dispatch('robot/fromFaceRecognizeFaceAddStatus', {
    //     meta: { eventId: eventId },
    //     data: status
    //   })
    // })

    // DRIVE
    robot.driveService.onStart(() => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.DRIVE_START)
      store.dispatch('robot/setDriveSessionActive', {
        meta: { eventId: eventId },
        data: true
      })
      store.dispatch('robot/setDriveObstacleStatus', {
        meta: { eventId: eventId },
        data: false
      })
    })
    robot.driveService.onObstacle(() => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.DRIVE_OBSTACLE)
      store.dispatch('robot/setDriveObstacleStatus', {
        meta: { eventId: eventId },
        data: true
      })
    })
    robot.driveService.onFinish(() => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.DRIVE_STOP)
      store.dispatch('robot/setDriveSessionActive', {
        meta: { eventId: eventId },
        data: false
      })
    })

    // INTERACTION
    robot.interactionService.onStart(() => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.INTERACTION_START)
      store.dispatch('robot/setInteractiveSessionActive', {
        meta: { eventId: eventId },
        data: true
      })
    })
    robot.interactionService.onStop(() => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.INTERACTION_STOP)
      store.dispatch('robot/setInteractiveSessionActive', {
        meta: { eventId: eventId },
        data: false
      })
    })

    // DIALOG
    robot.dialogService.onRobotReplicStart(text => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.ROBOT_REPLIC_START)
      store.dispatch('robot/setRobotText', {
        meta: { eventId: eventId },
        data: text
      })
    })
    robot.dialogService.onRobotReplicFinish(() => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.ROBOT_REPLIC_FINISH)
      // при завершении фразы очищаем субтитры
      store.dispatch('robot/setRobotText', {
        meta: { eventId: eventId },
        data: null
      })
    })
    robot.dialogService.onUserReplic((text, isFinish) => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.USER_REPLIC, text)
      store.dispatch('robot/userText', {
        meta: { eventId: eventId },
        data: {
          text,
          isFinish
        }
      })
    })
    robot.dialogService.onAction(data => {
      // console.warn('Юзерэшкон получен', data)
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.ROBOT_ACTION, data)
      store.dispatch('robot/setUserAction', {
        meta: { eventId: eventId },
        data: data
      })
    })
    robot.dialogService.onQuestion(question => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.ROBOT_QUESTION, {
        text: question.text,
        answers: question.answers
      })
      store.dispatch('robot/setDialogQuestion', {
        meta: { eventId: eventId },
        data: {
          text: question.text,
          answers: question.answers
        }
      })

      // QUESTION CANCEL
      // try {
      //   let timeoutResetAnchor = 15000
      //   if (store.getters['robot/getRobotSettings'].system.dialog.timeoutResetAnchor) {
      //     timeoutResetAnchor = store.getters['robot/getRobotSettings'].system.dialog.timeoutResetAnchor
      //   }
      // } catch (err) {
      //   // ...
      // }

      // if (timeoutResetAnchor !== null) {
      //   clearTimeout(timeoutResetTimer)
      // }

      // timeoutResetTimer = setTimeout(() => {
      //   let eventId = logger.logEvent(EventInitiatorTypes.JS, EventTypes.JS_TIMEOUT)
      //   store.dispatch('robot/setDialogQuestion', {
      //     meta: { eventId: eventId },
      //     data: null
      //   })
      // }, timeoutResetAnchor)
    },
    () => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.ROBOT_QUESTION, {})
      store.dispatch('robot/setDialogQuestion', {
        meta: { eventId: eventId },
        data: null
      })
    })
    robot.dialogService.onLoadAnswer(answer => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.ROBOT_LOAD_ANSWER, answer)
      store.dispatch('robot/setRobotDialogSayAnswer', {
        meta: { eventId: eventId },
        data: answer
      })
    })
    robot.dialogService.onLoadGreeting(replica => {
      // let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.ROBOT_LOAD_ANSWER, replica)
      // robot.dialogService.sayReplicByData(replica, false)
    })
    // ДОБАВОЧНЫЕ ФРАЗЫ
    robot.dialogService.onLoadExtraReplic(replica => {
      if (store.getters['engine/getCurrentStateName'] === 'START_NEW') {
        let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.ROBOT_LOAD_EXTRA_REPLIC, replica)
        logger.logAction(eventId, ActionHandlerTypes.ROBOT, ActionTypes.ROBOT_SAY_REPLIC)
        robot.dialogService.sayReplicByData(replica, false)
      }
    })

    // SCRIPTS
    robot.scriptsService.onScriptEnd(() => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.SCRIPTS_END)
      store.dispatch('robot/fromScriptEnd', {
        meta: { eventId: eventId }
      })
    })
    robot.systemService.onApplicationFinished(message => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.APPLICATION_FINISH, message)
      store.dispatch('robot/fromSystemApplicationFinished', {
        meta: { eventId: eventId },
        data: message
      })
    })

    // CUSTOM
    robot.customEventsService.onCaseStart(() => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.CASE_START)
      store.dispatch('robot/setCaseStart', {
        meta: { eventId: eventId }
      })
    })
    robot.customEventsService.onCaseStop(() => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.CASE_STOP)
      store.dispatch('robot/setCaseStop', {
        meta: { eventId: eventId }
      })
    })
    robot.customEventsService.onRestart(() => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.RESTART)
      store.dispatch('robot/setApplicationRestart', {
        meta: { eventId: eventId }
      })
    })
    robot.customEventsService.onCustom(data => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.ROBOT_CUSTOM)
      store.dispatch('robot/robotCustomEvent', {
        meta: { eventId: eventId },
        data: data
      })
    })

    // SETTINGS
    robot.settingsService.onChange(() => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.ROBOT_SETTINGS_CHANGE)
      store.dispatch('robot/setSettingsChange', {
        meta: { eventId: eventId }
      })
    })

    // PASSPORT
    // robot.passportService.onScanPassportFinish(message => {
    //   let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.SCANNER_PASSPORT_FINISH)
    //   store.dispatch('robot/fromScannerPassportFinish', {
    //     meta: { eventId: eventId },
    //     data: message
    //   })
    // })
    // robot.passportService.onScanPassportError(message => {
    //   let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.SCANNER_PASSPORT_ERROR)
    //   store.dispatch('robot/fromScannerPassportError', {
    //     meta: { eventId: eventId },
    //     data: message
    //   })
    // })
    // robot.passportService.onScanPassportState(message => {
    //   let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.SCANNER_PASSPORT_STATE)
    //   store.dispatch('robot/fromScannerPassportState', {
    //     meta: { eventId: eventId },
    //     data: message
    //   })
    // })

    // SIP
    robot.sipService.onStatusChange(status => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.SIP_STATUS_CHANGE, status)
      store.dispatch('robot/fromSipStatus', {
        meta: { eventId: eventId },
        data: status
      })
    })
    robot.sipService.onToneEvent(tone => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.SIP_TONE_EVENT, tone)
      store.dispatch('robot/fromSipTone', {
        meta: { eventId: eventId },
        data: tone
      })
    })

    // AUDIO
    robot.audioService.onAudioResponse(file => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.AUDIO_SERVICE_RESPONSE)
      store.dispatch('robot/fromAudioFile', {
        meta: { eventId: eventId },
        data: file
      })
    })

    // MAIL
    robot.mailService.onSuccess(() => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.MAIL_SERVICE_RESPONSE)
      store.dispatch('robot/fromMailSuccess', {
        meta: { eventId: eventId },
        data: true
      })
    })
    robot.mailService.onError(error => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.MAIL_SERVICE_RESPONSE)
      store.dispatch('robot/fromMailError', {
        meta: { eventId: eventId },
        data: error
      })
    })

    // DISPENSER
    robot.dispenserService.onStatus(message => {
      let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.DISPENSER_STATUS)
      store.dispatch('robot/fromDispenserStatus', {
        meta: { eventId: eventId },
        data: message
      })
    })
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
      // SCRIPT
      switch (mutation.type) {
        case 'robot/START_SCRIPT':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ROBOT_MUTE, mutation.payload.data)
          robot.scriptsService.startScript(mutation.payload.data)
          break
        case 'robot/STOP_SCRIPT':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ROBOT_MUTE, mutation.payload.data)
          robot.scriptsService.stopScript()
          break
      }
      // INTERACTION
      switch (mutation.type) {
        case 'robot/SET_INTERACTION_START':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.INTERACTION_START)
          robot.interactionService.start()
          break
      }

      // SETTINGS
      switch (mutation.type) {
        case 'robot/SET_ROBOT_LANGUAGE':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ROBOT_SETTINGS, mutation.payload.data)
          robot.settingsService.setLanguage(mutation.payload.data)
          break
        case 'robot/SET_ROBOT_SETTINGS_LOAD':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ROBOT_GET_SETTINGS, mutation.payload.data)
          robot.settingsService.get(mutation.payload.data).then(settings => {
            let childEventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.ROBOT_LOAD_SETTINGS, settings, mutation.payload.meta.eventId)
            store.dispatch('robot/setRobotSettings', {
              meta: { eventId: childEventId },
              data: settings
            })
          })
          break
        case 'robot/SET_ROBOT_SETTINGS':
          if (mutation.payload.data.hasOwnProperty('application')) {
            // Выпилить лица из базы если они указаны как временные в локал сторидже
            // Запрос параметра происходит в состоянии INITIAL
            let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.MAIL_SERVICE_RESPONSE)
            store.dispatch('app/clearUsersData', {
              meta: { eventId }
            })
          }
          break
      }

      // DIALOG
      switch (mutation.type) {
        case 'robot/CLICK_DIALOG_ANSWER':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.JS, ActionTypes.SET_ANSWER, mutation.payload.text)
          robot.dialogService.setAnswer(mutation.payload.data)
          break
        case 'robot/SAY_TEXT':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ROBOT_SAY_TEXT, mutation.payload.data)
          robot.dialogService.sayText(mutation.payload.data)
          break
        case 'robot/GET_REPLIC_BY_NAME':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ROBOT_GET_REPLIC, mutation.payload.data)
          robot.dialogService.getReplicByName(mutation.payload.data)
          break
        case 'robot/SAY_REPLIC_BY_NAME':
          // console.log(mutation.payload.data.step)
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ROBOT_SAY_REPLIC, mutation.payload.data.step)
          robot.dialogService.sayReplicByName(mutation.payload.data.step, (typeof mutation.payload.data.terminate !== 'undefined' && mutation.payload.data.terminate === true))
          break
        case 'robot/ROBOT_REPLIC_ABORT':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ROBOT_REPLIC_ABORT, mutation.payload.data)
          robot.dialogService.abortRobotReplic()
          break
        case 'robot/SET_ROBOT_DIALOG_LOAD_ANSWER':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.JS, ActionTypes.SET_ANSWER, mutation.payload.text)
          robot.dialogService.setAnswer(mutation.payload.data)
          break
        case 'robot/SET_ROBOT_DIALOG_SAY_ANSWER':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ROBOT_SAY_ANSWER, mutation.payload.data)
          robot.dialogService.sayAnswerByData(mutation.payload.data, (typeof mutation.payload.data.terminate !== 'undefined' && mutation.payload.data.terminate === true))
          break
        case 'robot/SEND_DIALOG_MUTE_ON':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.JS, ActionTypes.DIALOG_MUTE_ON, {})
          robot.dialogService.muteOn()
          break
        case 'robot/SEND_DIALOG_MUTE_OFF':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.JS, ActionTypes.DIALOG_MUTE_OFF, {})
          robot.dialogService.muteOff()
          break
        case 'robot/SEND_DIALOG_EXTERNAL_PLAY':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.JS, ActionTypes.ROBOT_EXTERNAL_PLAY, mutation.payload.data)
          let { url, volume } = mutation.payload.data
          robot.dialogService.externalPlay(url, volume)
          break
        case 'robot/SEND_DIALOG_EXTERNAL_STOP':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.JS, ActionTypes.ROBOT_EXTERNAL_STOP, {})
          robot.dialogService.externalPlayStop()
          break
        case 'robot/SET_ROBOT_DIALOG_CASE':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.JS, ActionTypes.SET_DIALOG_CASE, mutation.payload.text)
          robot.dialogService.setCase(mutation.payload.data)
          break
        // TODO переписать как в губере красиво
        case 'robot/DIALOG_SAY_REPLIC_BY_DATA_REQUEST':
          // console.warn('SEND TO LINGUA', mutation?.payload)
          logger.logAction(mutation.payload.meta.eventId, 'ROBOT', 'ROBOT_SAY_REPLIC', mutation.payload.data)
          robot.dialogService.sayReplicByData(mutation?.payload?.data?.replica, (mutation?.payload?.data?.terminate === true))
          break
      }

      // CUSTOM
      switch (mutation.type) {
        case 'robot/ROBOT_CUSTOM_EVENT':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.CUSTOM_EVENT_JS, mutation.payload.data)
          robot.customEventsService.sendCustom(mutation.payload.data)
          break
      }

      faceRecognizeSubscribers(store.dispatch, mutation, logger, robot)
      userSubscribers(store.dispatch, mutation, logger, robot)
      keyboardSubscribers(store.dispatch, mutation, logger, robot)

      // // USER SERVICE
      // switch (mutation.type) {
      //   case 'robot/SET_GENERAL':
      //     logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ROBOT_SET_GENERAL)
      //     robot.userService.setGeneral(mutation.payload.data)
      //     break
      //   case 'robot/SEND_ADD_USER':
      //     logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.USER_DATABASE_RESPONSE)
      //     robot.userService.addUser(mutation.payload.data)
      //       .then(response => {
      //         // eslint-disable-next-line
      //         let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.USER_DATABASE_RESPONSE, response)
      //       })
      //     break
      //   case 'robot/SEND_DELETE_USER':
      //     logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.USER_DATABASE_RESPONSE)
      //     robot.userService.deleteUser(mutation.payload.data)
      //       .then(response => {
      //         // eslint-disable-next-line
      //         let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.USER_DATABASE_RESPONSE, response)
      //       })
      //     break
      // }

      // // FACE RECOGNIZE
      // switch (mutation.type) {
      //   case 'robot/SET_FACE_RECOGNIZE_AUTOTRACKING':
      //     logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.AUTO_TRACKING_STATUS)
      //     robot.faceRecognizeService.autoTracking(mutation.payload.data)
      //     break
      //   case 'robot/SEND_FACE_RECOGNIZE_SET_GENERAL':
      //     logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ROBOT_SET_GENERAL)
      //     robot.faceRecognizeService.setGeneral(mutation.payload.data)
      //     break
      //   case 'robot/SEND_FACE_RECOGNIZE_ADD_FACE':
      //     logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ADD_FACE)
      //     robot.faceRecognizeService.addFace(mutation.payload.data)
      //     break
      //   case 'robot/SEND_FACE_RECOGNIZE_DEL_FACE':
      //     logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ADD_FACE)
      //     robot.faceRecognizeService.delFace(mutation.payload.data)
      //     break
      //   case 'robot/SEND_FACE_RECOGNIZE_HEAD_ENABLED':
      //     logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ADD_FACE)
      //     robot.faceRecognizeService.headEnabled(mutation.payload.data)
      //     break
      //   case 'robot/SEND_FACE_RECOGNIZE_BORDERS_ENABLED':
      //     logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.ADD_FACE)
      //     robot.faceRecognizeService.enableBorders(mutation.payload.data)
      //     break
      //   case 'robot/SEND_FACE_RECOGNIZE_FRAME':
      //     logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.JS_CUSTOM)
      //     robot.faceRecognizeService.getGeneralFrame()
      //       .then(image => {
      //         let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.FACE_GENERAL_FRAME)

      //         store.dispatch('robot/fromFaceRecognizeFrame', {
      //           meta: { eventId: eventId },
      //           data: image
      //         })
      //       })
      //     break
      // }

      // PASSPORT
      switch (mutation.type) {
        case 'robot/SEND_SCANNER_PASSPORT_SCAN':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.SCAN_PASSPORT, mutation.payload.data)
          robot.passportService.scanPassport(true)
            .then(response => {
              // eslint-disable-next-line
              let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.SCANNER_PASSPORT_RESPONSE, { success: true })

              store.dispatch('robot/fromScannerPassportSuccess', {
                meta: { eventId: eventId },
                data: true
              })
            }, () => {
              // eslint-disable-next-line
              let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.SCANNER_PASSPORT_RESPONSE, { success: false })

              store.dispatch('robot/fromScannerPassportSuccess', {
                meta: { eventId: eventId },
                data: false
              })
            })
          break
      }

      // SIP
      switch (mutation.type) {
        case 'robot/SEND_SIP_CALL_START':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.SIP_CALL, mutation.payload.data)
          robot.sipService.callStart(mutation.payload.data)
          break
        case 'robot/SEND_SIP_CALL_START_WITH_FILE':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.SIP_CALL, mutation.payload.data)
          robot.sipService.callStartWithFile(mutation.payload.data.number, mutation.payload.data.file_path)
          break
        case 'robot/SEND_SIP_CALL_START_WITH_TEXT':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.SIP_CALL, mutation.payload.data)
          robot.sipService.callStartWithText(mutation.payload.data.number, mutation.payload.data.text)
          break
        case 'robot/SEND_SIP_CALL_STOP':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.SIP_CALL_STOP, mutation.payload.data)
          robot.sipService.callStop()
          break
        case 'robot/SEND_SIP_PLAY_FILE':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.SIP_PLAY_FILE, mutation.payload.data)
          robot.sipService.playFile(mutation.payload.data)
          break
        case 'robot/SEND_SIP_PLAY_TEXT':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.SIP_PLAY_TEXT, mutation.payload.data)
          robot.sipService.playText(mutation.payload.data)
          break
      }

      // DISPENSER
      switch (mutation.type) {
        case 'robot/SEND_DISPENSER_DISPENSE':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.DISPENSER_DISPENSE, mutation.payload.data)
          robot.dispenserService.dispense()
          break
      }

      // PRINTER
      switch (mutation.type) {
        case 'robot/SET_PRINTER_DATA':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.PRINT)
          robot.printService.print(mutation.payload.data.talon, mutation.payload.data.mimeType).then(nothing => {
            let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.PRINTER_STATUS, { status: 'success' })
            store.dispatch('robot/setPrinterStatus', {
              meta: { eventId },
              data: 'success'
            })
          }).catch(error => {
            let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.PRINTER_ERROR, { error: error }, mutation.payload.meta.eventId)
            store.dispatch('robot/setPrinterStatus', {
              meta: { eventId },
              data: error
            })
          })
          break
      }

      // AUDIO
      switch (mutation.type) {
        case 'robot/SEND_AUDIO_START':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.AUDIO_RECORD_START, mutation.payload.data)
          robot.audioService.start(mutation.payload.data)
          break
        case 'robot/SEND_AUDIO_STOP':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.AUDIO_RECORD_STOP, mutation.payload.data)
          robot.audioService.stop()
          break
      }

      // MAIL
      switch (mutation.type) {
        case 'robot/SEND_MAIL_SEND_MAIL':
          logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.MAIL_SEND, mutation.payload.data)

          // TODO
          // реализовать удаление пустых полей
          let { email, subject, body, filename } = mutation.payload.data
          let payload = { email, subject, body, filename }

          payload = Object.keys(payload).reduce((acc, val) => {
            if (payload[val] === undefined) return acc
            return Object.assign(acc, { [val]: payload[val] })
          }, {})

          robot.mailService.sendMail(email, subject, body, filename)
          break
      }
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
