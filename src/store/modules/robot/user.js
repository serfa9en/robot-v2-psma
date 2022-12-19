export const stateUser = {
  user: {
    presence: null,
    add: null,
    del: null,
    get: null,
    update: null
  }
}

export const actionsUser = {
  userPresenceResponse: ({ commit }, payload) => commit('USER_PRESENCE_RESPONSE', payload),
  userLostResponse: ({ commit }, payload) => commit('USER_LOST_RESPONSE', payload),
  userAddRequest: ({ commit }, payload) => commit('USER_ADD_REQUEST', payload),
  userAddResponse: ({ commit }, payload) => commit('USER_ADD_RESPONSE', payload),
  userDelRequest: ({ commit }, payload) => commit('USER_DEL_REQUEST', payload),
  userDelResponse: ({ commit }, payload) => commit('USER_DEL_RESPONSE', payload),
  userGetRequest: ({ commit }, payload) => commit('USER_GET_REQUEST', payload),
  userGetResponse: ({ commit }, payload) => commit('USER_GET_RESPONSE', payload),
  userUpdateRequest: ({ commit }, payload) => commit('USER_UPDATE_REQUEST', payload),
  userUpdateResponse: ({ commit }, payload) => commit('USER_UPDATE_RESPONSE', payload)
}

export const mutationsUser = {
  USER_PRESENCE_RESPONSE: (state, payload) => { state.user.presence = payload.data },
  USER_LOST_RESPONSE: (state, payload) => { state.user.presence = payload.data },
  USER_ADD_REQUEST: (state, payload) => { },
  USER_ADD_RESPONSE: (state, payload) => { state.user.add = payload.data },
  USER_DEL_REQUEST: (state, payload) => { },
  USER_DEL_RESPONSE: (state, payload) => { state.user.del = payload.data },
  USER_GET_REQUEST: (state, payload) => { },
  USER_GET_RESPONSE: (state, payload) => { state.user.get = payload.data },
  USER_UPDATE_REQUEST: (state, payload) => { },
  USER_UPDATE_RESPONSE: (state, payload) => { state.user.get = payload.data }
}

export const gettersUser = {
  getUserPresence: state => state.user.presence,
  getUserAdd: state => state.user.add,
  getUserDel: state => state.user.del,
  getUserGet: state => state.user.get,
  getUserUpdate: state => state.user.update
}
