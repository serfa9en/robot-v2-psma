let subtitlesTimeout
let subtitlesTimeoutDelay = 2000

export default function (logger) {
  return store => {
    // let dispatch = store.dispatch
    // let getter = store.getters

    store.subscribe((mutation, state) => {
      let payload = mutation.payload
      // let currentState = getter['engine/getCurrentStateName']

      // DIALOG SUBS
      switch (mutation.type) {
        case 'robot/SET_ROBOT_TEXT':
          store.dispatch('ui/setSubtitlesText', payload)
          clearTimeout(subtitlesTimeout)
          break
        case 'robot/USER_TEXT':
          store.dispatch('ui/setSubtitlesText', {
            meta: payload.meta,
            data: payload.data?.text
          })

          // at the top
          clearTimeout(subtitlesTimeout)

          subtitlesTimeout = setTimeout(() => {
            store.dispatch('ui/setSubtitlesText', {
              meta: payload.meta,
              data: null
            })
          }, subtitlesTimeoutDelay)
          break
      }
    })
  }
}
