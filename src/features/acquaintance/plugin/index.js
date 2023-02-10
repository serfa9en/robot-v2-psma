/* eslint-disable no-unused-vars */
/* eslint-disable handle-callback-err */
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'

let isAllow = false

export default function (logger) {
  return store => {
    let dispatch = store.dispatch
    let getter = store.getters
    let newGeneralId = null
    let meetingTimer = null
    let knownFaces = Array.isArray(JSON.parse(localStorage.getItem('knownFaces'))) ? JSON.parse(localStorage.getItem('knownFaces')) : []
    const eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.KEYUP)
    global.meetService.on('start', (id) => {
      // console.warn('[meeting service]: callback on start', id)
      newGeneralId = id
      // meetingTimer = setTimeout(() => {
      //   dispatch('acquaintance/stop', {
      //     meta: { eventId }
      //   })
      //   dispatch('acquaintance/hookFailed', {
      //     meta: { eventId }
      //   })
      // }, 7000)
    }).on('finish', () => {
      // console.warn('[meeting service]: callback on finish')
      // clearTimeout(meetingTimer)
      dispatch('acquaintance/hookCompleted', {
        meta: { eventId }
      })
    }).on('error', () => {
      // clearTimeout(meetingTimer)
      // console.warn('[meeting service]: callback on error', error)
      dispatch('acquaintance/stop', {
        meta: { eventId }
      })
      dispatch('acquaintance/hookFailed', {
        meta: { eventId }
      })
    })

    store.subscribe((mutation, state) => {
      let payload = mutation.payload
      let currentState = getter['engine/getStateCurrent']

      switch (mutation.type) {
        case 'acquaintance/START':
          // console.warn('acquaintance/START')
          isAllow = true
          global.meetService.activate()
          global.meetService.meet(getter['app/getSessionName'])
          break
        case 'acquaintance/STOP':
          // console.warn('acquaintance/STOP')
          isAllow = false
          global.meetService.deactivate()
          break
        case 'acquaintance/HOOK_COMPLETED':
          const currentGeneralUser = getter['faces/getUserGeneral']
          const userData = localStorage.getItem('med_' + currentGeneralUser.id)
          const timeStamp = Date.now()
          /**
           * При успешном знакомстве заменяем привязку к данным измерений с временного id на постоянный
           */
          localStorage.removeItem('med_' + currentGeneralUser.id)
          localStorage.setItem('med_' + String(newGeneralId), userData)
          /**
           * Логика сохранения списка запомненных лиц на определенное время с последующим удалением по таймеру.
           * Обработка списка происходит при получении настроек робота в момент инициации кейса robot/SET_ROBOT_SETTINGS
           * Если лицо временное (type 3) то
           * информация с измерениями будет удалятся при переходе на promo
           * или при клике на кнопку "Это не я"
           */
          let newFace = {
            id: newGeneralId,
            timeStamp
          }
          knownFaces.push(newFace)
          localStorage.setItem('knownFaces', JSON.stringify(knownFaces))

          dispatch('acquaintance/stop', {})
          dispatch('faces/setUserGeneral', {
            meta: { eventId },
            data: { ...currentGeneralUser, id: newGeneralId }
          })
          dispatch('ui/setUserMet', {
            meta: payload.meta,
            data: 2
          })
          dispatch('robot/faceRecognizeGeneralFrameRequest', {
            meta: payload.meta
          })
          dispatch('engine/handlerMoveToState', {
            meta: payload.meta,
            data: 'START_NEW'
          })
          break
        case 'acquaintance/HOOK_FAILED':
          // dispatch('ui/setDialogScreenMode', {
          //   meta: payload.meta,
          //   data: 'MEETING_FAIL'
          // })
          // console.warn('HOOK_FAILED')
          dispatch('engine/handlerMoveToState', {
            meta: payload.meta,
            data: 'START_NEW'
          })
          // dispatch('robot/faceRecognizeGeneralFrameRequest', {
          //   meta: payload.meta
          // })
          break
      }
    })
  }
}
