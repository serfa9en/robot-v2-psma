// let sipTimeout
// let sipTone = null

export default function (logger) {
  return store => {
    let dispatch = store.dispatch
    let getter = store.getters

    store.subscribe((mutation, state) => {
      let payload = mutation.payload
      // let currentState = getter['engine/getCurrentStateName']

      // SIP
      switch (mutation.type) {
        case 'robot/FROM_SIP_TONE':
          // sipTone = payload.data

          // let userUniqueId = getter['robot/getFaceRecognizeAddFace']

          switch (payload.data) {
            case '1':
              let generalUser = getter['faces/getGeneral']

              let currentUserState = JSON.parse(localStorage.getItem(generalUser?.id))
              currentUserState = Object.assign({}, currentUserState, { passIssued: true })

              localStorage.setItem(generalUser.id, JSON.stringify(currentUserState))

              let generalUsername = getter['app/getPassportData']
                .fullName.split(' ')[0]

              let sendAddUserPayload = {
                meta: payload.meta,
                data: {
                  id: generalUser?.id,
                  name: generalUsername,
                  gender: generalUser?.gender,
                  age: generalUser?.age
                }
              }

              dispatch('robot/sendAddUser', sendAddUserPayload)

              currentUserState = Object.assign({}, currentUserState, { hasName: true })

              localStorage.setItem(generalUser.id, JSON.stringify(currentUserState))

              dispatch('engine/handlerMoveToState', {
                meta: payload.meta,
                data: 'DISPENSER-DISPENSE'
              })
              break
            case '0':
              dispatch('engine/handlerMoveToState', {
                meta: payload.meta,
                data: 'SIP-ANSWER-NEGATIVE'
              })
              break
          }
          break
      }
    })
  }
}
