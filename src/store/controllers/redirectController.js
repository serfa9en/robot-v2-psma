export default function (logger) {
  return store => {
    let dispatch = store.dispatch
    let getter = store.getters

    store.subscribe((mutation, state) => {
      let payload = mutation.payload
      let currentState = getter['engine/getCurrentStateName']

      // let facesKnown = getter['faces/getStateKnown']
      let facesGeneral = getter['faces/getStateGeneral']
      let facesUser = getter['faces/getGeneral']

      switch (currentState) {
        case 'REDIRECT':
          if (['GENERAL'].includes(facesGeneral)) {
            let isKnownUser = JSON.parse(localStorage.getItem(facesUser?.id))

            if (isKnownUser) {
              if (isKnownUser.passIssued === true) {
                dispatch('engine/handlerMoveToState', {
                  meta: payload.meta,
                  data: 'DISPENSER-DISPENSE'
                })
              }

              if (isKnownUser.passIssued === false) {
                dispatch('engine/handlerMoveToState', {
                  meta: payload.meta,
                  data: 'PASSPORT-GREETING'
                })
              }
            }

            if (isKnownUser === null) {
              dispatch('engine/handlerMoveToState', {
                meta: payload.meta,
                data: 'PASSPORT-GREETING'
              })
            }
          } else {
            dispatch('engine/handlerMoveToState', {
              meta: payload.meta,
              data: 'SELECT_GENERAL'
            })
          }
          break
      }
    })
  }
}
