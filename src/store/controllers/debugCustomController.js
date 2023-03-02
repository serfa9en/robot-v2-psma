export default function (logger) {
  return store => {
    // let dispatch = store.dispatch
    // let getter = store.getters

    store.subscribe((mutation, state) => {
      let payload = mutation.payload
      // let currentState = getter['engine/getCurrentStateName']

      switch (mutation.type) {
        case 'robot/ROBOT_CUSTOM_EVENT':
          // для отладки
          // if (getter['engine/getEngineDebug']) {
          switch (payload.data) {
            case 1:
              break
            case 2:
              break
            case 3:
              break
            case 4:
              break
            case 5:
              break
            case 6:
              break
            case 7:
              break
            case 8:
              break
            case 9:
              break
          }
          // }
          break
      }
    })
  }
}
