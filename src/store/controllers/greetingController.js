let isUserLost = true

export default function (logger) {
  return store => {
    let dispatch = store.dispatch
    let getter = store.getters

    store.subscribe((mutation, state) => {
      let payload = mutation.payload
      // let currentState = getter['engine/getCurrentStateName']

      switch (mutation.type) {
        case 'robot/SET_INTERACTION_SESSION_ACTIVE':
          if (payload.data === true) {
            if (isUserLost === true) {
              isUserLost = false

              // dispatch('engine/handlerMoveToState', {
              //   meta: payload.meta,
              //   data: 'START'
              // })

              // setTimeout(() => {
              //   let facesKnown = getter['faces/getStateKnown']
              //
              //   if (currentState === 'START') {
              //     if (facesKnown === 'KNOWN') {
              //       dispatch('robot/sayReplicByName', {
              //         meta: payload.meta,
              //         data: {
              //           step: 'START-KNOWN',
              //           terminate: true
              //         }
              //       })
              //     } else {
              //       dispatch('robot/sayReplicByName', {
              //         meta: payload.meta,
              //         data: {
              //           step: 'START-UNKNOWN',
              //           terminate: true
              //         }
              //       })
              //     }
              //   }
              // }, 2000)
            }
          }

          if (payload.data === false) {
            let facesCount = getter['faces/getStateCount']

            if (['ONE', 'MANY'].includes(facesCount)) {
              dispatch('robot/setInteractionStart', {
                meta: payload.meta
              })

              isUserLost = false
            } else {
              dispatch('engine/handlerMoveToState', {
                meta: payload.meta,
                data: 'WAIT'
              })

              isUserLost = true
            }
          }
          break
      }
    })
  }
}
