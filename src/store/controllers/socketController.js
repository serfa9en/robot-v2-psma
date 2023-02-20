let socket

export default function (logger) {
  return store => {
    let dispatch = store.dispatch
    // let getter = store.getters

    store.subscribe((mutation, state) => {
      let payload = mutation.payload
      // let currentState = getter['engine/getCurrentStateName']

      switch (mutation.type) {
        case 'app/SET_STEP':
          switch (payload.data) {
            case 'passport-help':
              socket = new WebSocket('ws://192.168.250.91:5679/')
              // socket = new WebSocket('ws://192.168.89.244:5679/')

              socket.onopen = () => {
                // console.log('open')
                socket.send('enable')
              }

              socket.onclose = () => {
                // console.log('close')
              }

              socket.onmessage = event => {
                let data = JSON.parse(event.data)

                // IS EQUIPMENT DISCONNECTED
                if (data.status === 'disconnected') {
                  socket.close()

                  dispatch('engine/handlerClickMoveToState', {
                    transition: 'WS',
                    data: 'PASSPORT-FAILED'
                  })
                }

                // HAS DATA FROM CALLBACK
                if (['MSR', 'MRZ'].includes(data.dtype)) {
                  if (data.dtype === 'MSR') {
                    data.fullName = data.cardHolder.split('/')[1] + ' ' + data.cardHolder.split('/')[0]
                  }

                  if (data.dtype === 'MRZ') {
                    data.fullName = data.firstName + data.lastName
                  }

                  socket.send('disable')
                  socket.close()

                  setTimeout(() => {
                    dispatch('app/handlerSetPassportData', {
                      data: data
                    })
                  }, 100)
                }
              }
              break
            default:
              let socketStatuses = {
                CONNECTING: 0,
                OPEN: 1,
                CLOSING: 2,
                CLOSED: 3
              }

              if (socket) {
                if (socket.readyState !== socketStatuses.CLOSED) {
                  socket.send('disable')
                  socket.close()
                }
              }
              break
          }
          break
      }
    })
  }
}
