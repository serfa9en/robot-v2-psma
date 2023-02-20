export default function (logger) {
  return store => {
    let dispatch = store.dispatch
    let getter = store.getters

    // UTILS
    function getEnabledOrDisabled (isEnable) {
      if (isEnable) {
        return { scriptsEnabled: null }
      }
      return { scriptsDisabled: null }
    }

    function headEnabled (dispatch, payload) {
      // console.log('headEnabled', payload.data)
      dispatch('robot/robotCustomEvent', {
        meta: payload.meta,
        data: getEnabledOrDisabled(payload.data)
      })

      dispatch('robot/faceRecognizeHeadEnabledRequest', {
        meta: payload.meta,
        data: payload.data
      })
    }

    store.subscribe((mutation, state) => {
      let payload = mutation.payload

      switch (mutation.type) {
        case 'head/SET_ENABLED':
          headEnabled(dispatch, payload)
          break
      }

      switch (mutation.type) {
        case 'robot/SCRIPT_END_RESPONSE':
          headEnabled(dispatch, {
            meta: payload.meta,
            data: getter['head/getEnabled']
          })
          break
      }
    })
  }
}
