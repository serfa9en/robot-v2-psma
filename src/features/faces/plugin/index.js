/* eslint-disable no-unused-vars */

let isGeneralSettedByTouch = false
let lostAllNewTimeOut = null
let lostAllNewTimer = 10000

export default function (logger) {
  return store => {
    let dispatch = store.dispatch
    let getter = store.getters

    store.subscribe((mutation, state) => {
      let payload = mutation.payload

      /**
       * КОЛИЧЕСТВО ЛИЦ ПЕРЕД РОБОТОМ
       * считает сколько лиц перед роботом,
       * устанавливает в faces/setStateCount ONE, MANY, ZERO
      */
      switch (mutation.type) {
        case 'faces/REFRESH':
        case 'robot/FACE_RECOGNIZE_INFO_RESPONSE': {
          let currentUsers = []

          if (Array.isArray(payload.data) === true) {
            currentUsers = payload.data
              .filter(user => [1, 2, 3]
                .includes(user.type))
          }

          if (currentUsers.length === 1) {
            dispatch('faces/setStateCount', {
              meta: payload.meta,
              data: 'ONE'
            })
          }

          if (currentUsers.length > 1) {
            dispatch('faces/setStateCount', {
              meta: payload.meta,
              data: 'MANY'
            })
          }

          // ZERO
          if (currentUsers.length === 0) {
            dispatch('faces/setStateCount', {
              meta: payload.meta,
              data: 'ZERO'
            })
          }

          if (currentUsers.length === 1 && [-2, -1].includes(currentUsers[0].id)) {
            dispatch('faces/setStateCount', {
              meta: payload.meta,
              data: 'ZERO'
            })
          }
          break
        }
      }

      let facesCount = getter['faces/getStateCount']

      /**
       * СТАТУС РАСПОЗНАНИЯ ОТСЛЕЖИВАЕМОГО ЛИЦА
       * Проверяет лица, которые перед роботом и определяет какое лицо отслеживается (поле is_tracking)
       * устанавливает в faces/setStateKnown KNOWN, TEMP.
       * если ни одно из лиц не трекается - ставит NONE
       */
      switch (mutation.type) {
        case 'faces/REFRESH':
        case 'robot/FACE_RECOGNIZE_INFO_RESPONSE':
          let trackedUser

          if (Array.isArray(payload.data) === true) {
            trackedUser = payload.data
              .find(user => user.is_tracking)
          }

          if (typeof trackedUser !== 'undefined') {
            if (trackedUser.type === 2) {
              dispatch('faces/setStateKnown', {
                meta: payload.meta,
                data: 'KNOWN'
              })
            }

            if (trackedUser.type === 3) {
              dispatch('faces/setStateKnown', {
                meta: payload.meta,
                data: 'TEMP'
              })
            }
          } else {
            dispatch('faces/setStateKnown', {
              meta: payload.meta,
              data: 'NONE'
            })
          }
          break
      }

      let facesKnown = getter['faces/getStateKnown']
      let facesGeneral = getter['faces/getStateGeneral']

      /**
       * СБРОС НА НАЧАЛЬНЫЙ ЭКРАН ПРИ ПОТЕРЕ ЛИЦ
       * Когда обновляется массив лиц перед роботом, и лиц не стает - запускается таймер длиной lostAllNewTimer
       * По истечении времени происходит сброс на PROMO
       * Данный таймер запускается на экранах 'SELECT_GENERAL', 'BYE', 'START_NEW'
       */
      switch (mutation.type) {
        case 'faces/REFRESH':
        case 'robot/FACE_RECOGNIZE_INFO_RESPONSE':
          clearTimeout(lostAllNewTimeOut)
          lostAllNewTimeOut = null
          // Логика потери всех для некоторых сейтов для медкейса, где основной сброс идет через 10 минут
          let currentUsers = store.getters['robot/getFaceRecognizeInfo'].filter(user => {
            return [1, 2, 3].includes(user.type)
          })
          if (currentUsers.length === 0) {
            lostAllNewTimeOut = setTimeout(() => {
              if (['MEET_FACE', 'BYE', 'AGE', 'MAIN_VIEW'].includes(store.getters['engine/getCurrentStateName'])) {
                // console.warn('ЛИЦ ВСЕ ЕЩЕ НЕТ И Я НА ЭКРАНЕ СБРОСА')
                dispatch('engine/handlerMoveToState', {
                  meta: payload.meta,
                  data: 'WAIT_PROMO'
                })
              }
            }, lostAllNewTimer)
          }

          break
      }

      switch (mutation.type) {
        case 'robot/FACE_RECOGNIZE_GENERAL_ID_RESPONSE':
          let generalUser = getter['faces/getUserGeneral']
          let autotracking = getter['robot/getFaceRecognizeAutotracking']

          // Если в состоянии WAIT пользователь появился и его айди соответствует установленному ранее главному
          // То WAIT меняется на GENERAL (активный пользователь вернулся в поле зрения робота)
          if (['WAIT'].includes(facesGeneral)) {
            if (generalUser?.id === payload.data) {
              dispatch('faces/setStateGeneral', {
                meta: payload.meta,
                data: 'GENERAL'
              })
            }
          }

          // Главный ушел из поля зрения робота, робот ждет его появления (WAIT)
          if (['GENERAL'].includes(facesGeneral)) {
            if (payload.data === -2 || payload.data === -1) {
              dispatch('faces/setStateGeneral', {
                meta: payload.meta,
                data: 'WAIT'
              })
            }
          }

          // Непонятная логика. Состояние NONE только если авто-отслеживание активно, далее проверка на отсутствие авто-отслеживания
          if (['NONE'].includes(facesGeneral)) {
            if (autotracking === false) {
              if (payload.data > -1) {
                let currentUser = getter['robot/getFaceRecognizeInfo']
                  .find(user => user.id === payload.data)

                dispatch('faces/setUserGeneral', {
                  meta: payload.meta,
                  data: currentUser
                })

                dispatch('faces/setStateGeneral', {
                  meta: payload.meta,
                  data: 'GENERAL'
                })
              }
            }
          }

          if (isGeneralSettedByTouch === true) {
            if (autotracking === false) {
              if (payload.data > -1) {
                let currentUser = getter['robot/getFaceRecognizeInfo']
                  .find(user => user.id === payload.data)

                dispatch('faces/setUserGeneral', {
                  meta: payload.meta,
                  data: currentUser
                })

                dispatch('faces/setStateGeneral', {
                  meta: payload.meta,
                  data: 'GENERAL'
                })

                isGeneralSettedByTouch = false
              }
            }
          }
          break
      }

      switch (mutation.type) {
        case 'robot/FACE_RECOGNIZE_GENERAL_SETTED_RESPONSE':
          let currentUser = getter['robot/getFaceRecognizeInfo']
            .find(user => user.id === payload.data && user.is_tracking === true)

          if (payload.data > -1) {
            dispatch('robot/faceRecognizeAutotrackingRequest', {
              meta: payload.meta,
              data: false
            })

            if (currentUser) {
              dispatch('faces/setUserGeneral', {
                meta: payload.meta,
                data: currentUser
              })

              dispatch('faces/setStateGeneral', {
                meta: payload.meta,
                data: 'GENERAL'
              })
            } else {
              isGeneralSettedByTouch = true
            }
          }
          break
      }

      switch (mutation.type) {
        case 'robot/FACE_RECOGNIZE_AUTOTRACKING_REQUEST':
          // AUTOTRACKING OFF
          if (payload.data === false) {
            // FILTER ONLY KNOW USERS
            let faceRecognizeInfo = getter['robot/getFaceRecognizeInfo']

            if (Array.isArray(faceRecognizeInfo) === true) {
              faceRecognizeInfo = faceRecognizeInfo
                .filter(user => [2, 3].includes(user.type))
            } else {
              faceRecognizeInfo = []
            }

            if (faceRecognizeInfo.length === 1) {
              // FIND TRACKED USER
              let trackedUser = faceRecognizeInfo
                .find(user => user.is_tracking)

              if (trackedUser) {
                dispatch('faces/setUserGeneral', {
                  meta: payload.meta,
                  data: trackedUser
                })

                dispatch('faces/setStateGeneral', {
                  meta: payload.meta,
                  data: 'GENERAL'
                })
              }
            }
          }

          // AUTOTRACKING ON
          if (payload.data === true) {
            isGeneralSettedByTouch = false

            dispatch('faces/setUserGeneral', {
              meta: payload.meta,
              data: {}
            })

            // При включенном авто-отслеживании главного состояние facesGeneral === NONE
            dispatch('faces/setStateGeneral', {
              meta: payload.meta,
              data: 'NONE'
            })
          }
          break
      }
    })
  }
}
