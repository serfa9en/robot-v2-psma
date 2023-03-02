/* eslint-disable no-unused-vars */

let dispenserWaitTimeout
let dispenserWaitTimeoutDelay = 2000
let dispenserRetryTimeout
let dispenserRetryTimeoutDelay = 2000
let dispenserRetryTimeoutAttempt = 0
let dispenserRetryTimeoutMaxAttempt = 5

export default function (logger) {
  return store => {
    let dispatch = store.dispatch
    let getter = store.getters

    store.subscribe((mutation, state) => {
      let payload = mutation.payload

      switch (mutation.type) {
        case 'dispenser/DISPENSE':
          dispenserRetryTimeoutAttempt += 1

          // TODO
          // Подписаться на различные состояния диспенсера

          // Если не сработал датчик выдачи карты
          if (dispenserRetryTimeoutAttempt <= dispenserRetryTimeoutMaxAttempt) {
            dispatch('robot/sendDispenserDispense', {
              meta: payload.meta
            })

            dispenserRetryTimeout = setTimeout(() => {
              dispatch('dispenser/dispense', {
                meta: payload.meta
              })
            }, dispenserRetryTimeoutDelay)
          } else {
            clearTimeout(dispenserRetryTimeout)
            dispenserRetryTimeoutAttempt = 0

            dispatch('dispenser/setStateProcess', {
              meta: payload.meta,
              data: 'ERROR'
            })
          }
          break
        case 'robot/FROM_DISPENSER_STATUS':
          switch (payload.data.type) {
            // PROCESS
            case 'dispenser.card.dispensing':
              dispatch('dispenser/setStateProcess', {
                meta: payload.meta,
                data: 'DISPENSING'
              })
              break
            case 'dispenser.card.error':
              dispatch('dispenser/setStateProcess', {
                meta: payload.meta,
                data: 'ERROR'
              })
              break
            case 'dispenser.not.connected':
              dispatch('dispenser/setStateDispenser', {
                meta: payload.meta,
                data: 'NOT-CONNECTED'
              })
              break
            case 'dispenser.sensor':
              if (payload.data.sensor === 'CaptSensor1') {
                // Необходимо, чтобы сбросить таймаут повторного вызова выдачи
                clearTimeout(dispenserRetryTimeout)
                dispenserRetryTimeoutAttempt = 0

                dispatch('dispenser/setStateProcess', {
                  meta: payload.meta,
                  data: 'SUCCESS'
                })

                // Чтобы понимать, что диспенсер активен
                dispenserWaitTimeout = setTimeout(() => {
                  dispatch('dispenser/setStateProcess', {
                    meta: payload.meta,
                    data: 'WAIT'
                  })
                }, dispenserWaitTimeoutDelay)
              }
              break

            // GLOBAL
            case 'dispenser.card.empty':
              dispatch('dispenser/setStateDispenser', {
                meta: payload.meta,
                data: 'EMPTY'
              })

              dispatch('dispenser/setStateProcess', {
                meta: payload.meta,
                data: 'EMPTY'
              })
              break

            // DISPENSER
            case 'dispenser.communication.timeout':
              dispatch('dispenser/setStateDispenser', {
                meta: payload.meta,
                data: 'TIMEOUT'
              })
              break
            case 'dispenser.card.preempty':
              dispatch('dispenser/setStateDispenser', {
                meta: payload.meta,
                data: 'PREEMPTY'
              })
              break
            case 'dispenser.cardbin.full':
              dispatch('dispenser/setStateDispenser', {
                meta: payload.meta,
                data: 'FULL'
              })
              break
            case 'dispenser.nodispenser':
              dispatch('dispenser/setStateDispenser', {
                meta: payload.meta,
                data: 'NODISPENSER'
              })
              break
          }
          break
      }
    })
  }
}
