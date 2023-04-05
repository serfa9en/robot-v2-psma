/* eslint-disable no-unused-vars */

let lostGeneralUserTimeout
let ignoreLostFaceTimeout
let setOneGeneralTimeout

let reactionTimeout
let reactionTimeoutDelay = 1500

let sleepTimeout
let sleepTimeoutDelay = 300

let isUserLost = false
let isAlreadySayUserLost = false

let dbResponseSended = false

let isSessionStarted = false

let timerSetGeneralUser = null

export default function (logger) {
  return store => {
    let dispatch = store.dispatch
    let getter = store.getters

    store.subscribe((mutation, state) => {
      let payload = mutation.payload
      let currentState = getter['engine/getStateCurrent']

      let facesCount = getter['faces/getStateCount']
      let facesGeneral = getter['faces/getStateGeneral']
      let facesUser = getter['faces/getUserGeneral']

      let lostGeneralUserTimeoutDelay = getter['faces/getTimeoutsLostUser'] || 25000
      let ignoreLostFaceTimeoutDelay = getter['faces/getTimeoutsIgnoreLostFace'] || 5000
      let setOneGeneralTimeoutDelay = (getter['faces/getTimeoutsSetOneGeneral'] >= 1000)
        ? getter['faces/getTimeoutsSetOneGeneral']
        : 1000

      let dbRequest = getter['faces/getLogicDbRequest'] || false
      let isPrivateState = getter['faces/getLogicStatesIsPrivate'] || false
      let isExcludedState = getter['faces/getLogicStatesIsExclude'] || false
      let isAllowSetOneGeneral = getter['faces/getLogicAllowOneGeneral']

      if (isExcludedState === false) {
        // ЛОГИКА РАБОТЫ С ГЛАВНЫМ
        switch (mutation.type) {
          case 'faces/SET_STATE_GENERAL':
            switch (payload.data) {
              case 'GENERAL':
                isUserLost = false

                clearTimeout(setOneGeneralTimeout)
                clearTimeout(lostGeneralUserTimeout)
                clearTimeout(reactionTimeout)

                dispatch('faces/setUserLost', {
                  meta: payload.meta,
                  data: false
                })

                // dispatch('robot/faceRecognizeGeneralFrameRequest', {
                //   meta: payload.meta
                // })
                // console.log('dbRequest', dbRequest)
                if (dbRequest === true) {
                  dispatch('faces/setLogicDbRequest', {
                    meta: payload.meta,
                    data: false
                  })

                  dispatch('robot/userGetRequest', {
                    meta: payload.meta,
                    data: facesUser?.id
                  })

                  dbResponseSended = true
                }
                break
            }
            break
          case 'robot/USER_GET_RESPONSE':
            if (dbResponseSended === true) {
              dbResponseSended = false

              let newGeneralUserObj = Object.assign({}, facesUser, payload.data)

              dispatch('faces/setUserGeneral', {
                meta: payload.meta,
                data: newGeneralUserObj
              })

              // HOOK COMPLETED
              dispatch('faces/completed', {
                meta: payload.meta,
                data: newGeneralUserObj
              })
            }
            break
        }

        switch (mutation.type) {
          case 'faces/SET_USER_GENERAL':
            if (JSON.stringify(payload.data) !== JSON.stringify({})) {
              if (isSessionStarted === false) {
                isSessionStarted = true

                // HOOK START
                dispatch('faces/start', {
                  meta: payload.meta,
                  data: payload.data
                })
              } else {
                // HOOK CHANGE PLACE
              }
            }

            if (JSON.stringify(payload.data) === JSON.stringify({})) {
              if (isSessionStarted === true) {
                isSessionStarted = false

                // HOOK CLEAN
                dispatch('faces/clean', {
                  meta: payload.meta
                })
              }
            }

            if (payload?.data?.id >= 0) {
              dispatch('ui/setUserMet', {
                meta: payload.meta,
                data: payload.data.type
              })
              dispatch('ui/setUserAge', {
                meta: payload.meta,
                data: payload.data.age
              })
              dispatch('ui/setUserGender', {
                meta: payload.meta,
                data: (payload.data.gender === 1) ? 0 : 1
              })
            }
            break
        }

        switch (mutation.type) {
          case 'faces/SET_STATE_COUNT':
            // Никого нет и нет главного
            clearTimeout(setOneGeneralTimeout)
            if (['NONE'].includes(facesGeneral)) {
              switch (payload.data) {
                // Пришел 1
                case 'ONE':
                  dispatch('faces/one', {
                    meta: payload.meta
                  })
                  if (['DIAGNOSTIC_START', 'WAIT_PROMO', 'INITIAL'].includes(getter['engine/getCurrentStateName']) === false) {
                    if (isAllowSetOneGeneral === true) {
                      setOneGeneralTimeout = setTimeout(() => {
                        dispatch('robot/faceRecognizeAutotrackingRequest', {
                          meta: payload.meta,
                          data: false
                        })
                      }, setOneGeneralTimeoutDelay)
                    }
                  }
                  break
                // Пришло много
                case 'MANY':
                  // HOOK MANY
                  dispatch('faces/many', {
                    meta: payload.meta
                  })
                  break
                // Все ушли
                case 'ZERO':
                  dispatch('robot/faceRecognizeAutotrackingRequest', {
                    meta: payload.meta,
                    data: true
                  })

                  // HOOK ZERO
                  dispatch('faces/zero', {
                    meta: payload.meta
                  })
                  break
              }
            }
            break
        }

        // GENERAL LOST
        switch (mutation.type) {
          case 'faces/SET_STATE_GENERAL':
            switch (payload.data) {
              case 'WAIT':
                // FOR ZERO
                clearTimeout(sleepTimeout)
                sleepTimeout = setTimeout(() => {
                  facesCount = getter['faces/getStateCount']
                  facesGeneral = getter['faces/getStateGeneral']

                  if (['ZERO'].includes(facesCount) && isUserLost === false) {
                    clearTimeout(lostGeneralUserTimeout)
                    clearTimeout(reactionTimeout)

                    if (isPrivateState === true) {
                      isUserLost = true

                      dispatch('faces/setUserLost', {
                        meta: payload.meta,
                        data: true
                      })

                      lostGeneralUserTimeout = setTimeout(() => {
                        dispatch('robot/faceRecognizeAutotrackingRequest', {
                          meta: payload.meta,
                          data: true
                        })

                        // HOOK TIMER END
                        dispatch('faces/timerEnd', {
                          meta: payload.meta
                        })
                      }, lostGeneralUserTimeoutDelay)
                    }

                    if (isPrivateState === false) {
                      lostGeneralUserTimeout = setTimeout(() => {
                        dispatch('robot/faceRecognizeAutotrackingRequest', {
                          meta: payload.meta,
                          data: true
                        })

                        // HOOK TIMER END
                        dispatch('faces/timerEnd', {
                          meta: payload.meta
                        })
                      }, lostGeneralUserTimeoutDelay)
                    }
                  }

                  // FOR ONE or MANY
                  if (['ONE', 'MANY'].includes(facesCount) && isUserLost === false) {
                    clearTimeout(lostGeneralUserTimeout)
                    clearTimeout(reactionTimeout)

                    reactionTimeout = setTimeout(() => {
                      isUserLost = true

                      dispatch('faces/setUserLost', {
                        meta: payload.meta,
                        data: true
                      })

                      lostGeneralUserTimeout = setTimeout(() => {
                        dispatch('robot/faceRecognizeAutotrackingRequest', {
                          meta: payload.meta,
                          data: true
                        })

                        // HOOK TIMER END
                        dispatch('faces/timerEnd', {
                          meta: payload.meta
                        })
                      }, lostGeneralUserTimeoutDelay)
                    // }, reactionTimeoutDelay - sleepTimeoutDelay)
                    }, 30000)
                  }
                }, sleepTimeoutDelay)
                break
            }
            break
        }

        // Лицо потеряно и есть другие лица
        switch (mutation.type) {
          case 'faces/SET_STATE_COUNT':
            switch (payload.data) {
              case 'ONE':
              case 'MANY':
                if (['WAIT'].includes(facesGeneral)) {
                  if (isPrivateState === false && isUserLost === false) {
                    clearTimeout(lostGeneralUserTimeout)
                    clearTimeout(reactionTimeout)

                    reactionTimeout = setTimeout(() => {
                      isUserLost = true

                      dispatch('faces/setUserLost', {
                        meta: payload.meta,
                        data: true
                      })
                      dispatch('robot/keyboardHideRequest', {
                        meta: payload.meta
                      })

                      lostGeneralUserTimeout = setTimeout(() => {
                        dispatch('robot/faceRecognizeAutotrackingRequest', {
                          meta: payload.meta,
                          data: true
                        })

                        // HOOK TIMER END
                        dispatch('faces/timerEnd', {
                          meta: payload.meta
                        })
                      }, lostGeneralUserTimeoutDelay)
                    }, reactionTimeoutDelay - sleepTimeoutDelay)
                  }
                }
                break
            }
            break
        }

        // USER LOST
        switch (mutation.type) {
          case 'faces/SET_USER_LOST':
            if (payload.data === true) {
              // Чтобы не дергал hook каждый раз
              if (isAlreadySayUserLost === false) {
                isAlreadySayUserLost = true

                // HOOK LOST
                dispatch('faces/lost', {
                  meta: payload.meta
                })
                // dispatch('robot/faceRecognizeGeneralFrameRequest', {
                //   meta: payload.meta
                // })
              }
            } else {
              store.dispatch('robot/sendDialogMuteOff', {
                meta: payload.meta
              })
            }

            if (payload.data === false && isAlreadySayUserLost === true) {
              isAlreadySayUserLost = false

              // HOOK FIND
              dispatch('faces/find', {
                meta: payload.meta
              })
            }
            break
        }
      }
    })
  }
}
