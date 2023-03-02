export default function (logger) {
  return store => {
    let dispatch = store.dispatch
    let getter = store.getters

    store.subscribe((mutation, state) => {
      let payload = mutation.payload
      let currentState = getter['engine/getCurrentStateName']

      switch (mutation.type) {
        case 'dispenser/SET_STATE_PROCESS':
          if (currentState === 'DISPENSER-DISPENSE') {
            switch (payload.data) {
              case 'SUCCESS':
                dispatch('engine/handlerMoveToState', {
                  meta: payload.meta,
                  data: 'DISPENSER-COMPLETE'
                })
                break
              case 'ERROR':
                dispatch('engine/handlerMoveToState', {
                  meta: payload.meta,
                  data: 'DISPENSER-HAS-ERROR'
                })
                break
              case 'EMPTY':
                dispatch('engine/handlerMoveToState', {
                  meta: payload.meta,
                  data: 'DISPENSER-HAS-WARNING'
                })
                break
            }
          }
          break
      }
    })
  }
}
