export default function (logger) {
  return store => {
    let dispatch = store.dispatch
    let getter = store.getters

    store.subscribe((mutation, state) => {
      let payload = mutation.payload
      // let currentState = getter['engine/getStateCurrent']

      // HOOK_ZERO
      // HOOK_ONE
      // HOOK_MANY
      // HOOK_START
      // HOOK_COMPLETED
      // HOOK_LOST
      // HOOK_FIND
      // HOOK_TIMER_END
      // HOOK_CLEAN

      // if ((mutation.type).startsWith('faces/HOOK')) console.warn('FACE', mutation.type)
      switch (mutation.type) {
        case 'faces/HOOK_TRACK_CHANGED':
        case 'faces/HOOK_START':
        case 'faces/HOOK_ONE':
        case 'faces/HOOK_MANY':
          if (store.getters['robot/getFaceRecognizeAutotracking'] && store.getters['robot/getFaceRecognizeInfo'].length > 0 && ['PROMO'].includes(getter['engine/getCurrentStateName'])) {
            let action = 'SELECT_GENERAL'
            dispatch('engine/handlerMoveToState', {
              meta: payload.meta,
              data: action
            })
          }
          break
        case 'faces/HOOK_ZERO':
          if (['WAIT'].includes(getter['engine/getCurrentStateName'])) {
            dispatch('engine/handlerMoveToState', {
              meta: payload.meta,
              data: 'PROMO'
            })
          }
          break
        case 'faces/HOOK_CLEAN':
          break
        case 'faces/HOOK_TIMER_END':
          if (['SELECT_GENERAL', 'START_NEW', 'PROMO', 'START-NEW1'].includes(getter['engine/getCurrentStateName']) === false) {
            dispatch('engine/handlerMoveToState', {
              meta: payload.meta,
              data: 'PROMO'
            })
          }
          break
        case 'faces/HOOK_COMPLETED':
          // console.log('name', payload.data.name)
          break
        case 'faces/HOOK_LOST':
          if (['SELECT_GENERAL', 'START-NEW', 'PROMO', 'START-NEW1'].includes(getter['engine/getCurrentStateName']) === false) {
            dispatch('robot/keyboardHideRequest', {
              meta: payload.meta
            })
            dispatch('app/setMeetingTalk', {
              meta: payload.meta,
              data: false
            })
            dispatch('robot/sayReplicByName', {
              meta: payload.meta,
              data: {
                terminate: true,
                step: 'LOST-GENERAL'
              }
            })
            dispatch('robot/sendDialogMuteOn', {
              meta: payload.meta
            })
          }
          break
        case 'faces/HOOK_FIND':
          // dispatch('robot/abortRobotReplic', payload)

          dispatch('robot/sendDialogMuteOff', {
            meta: payload.meta
          })
          break
      }
    })
  }
}
