import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'

function initialState () {
  return {
    state: {
      dispenser: null, // null, NOT-CONNECTED, EMPTY, TIMEOUT, PREEMPTY, FULL, NODISPENSER
      process: null // null, ERROR, DISPENSING, SUCCESS, WAIT, EMPTY
    },
    settings: null
  }
}

export default {
  namespaced: true,
  state: initialState(),
  actions: {
    setStateDispenser: ({ commit }, payload) => commit('SET_STATE_DISPENSER', payload),
    setStateProcess: ({ commit }, payload) => commit('SET_STATE_PROCESS', payload),
    // ACTIONS
    dispense: ({ commit }, payload) => {
      if (payload.meta !== undefined) {
        // Если выдача была инциализирована чем-то отличным от клика пользователя
        commit('DISPENSE', {
          meta: payload.meta
        })
      } else {
        // Если пользователь кликнул на выдачу пропуска
        let logger = PromobotLogger.getInstance()
        let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK, {
          transition: 'DISPENSE'
        })

        commit('DISPENSE', {
          meta: { eventId: eventId }
        })
      }
    }
  },
  mutations: {
    SET_STATE_DISPENSER: (state, payload) => { state.state.dispenser = payload.data },
    SET_STATE_PROCESS: (state, payload) => { state.state.process = payload.data },
    DISPENSE: (state, payload) => { }
  },
  getters: {
    getStateDispenser: state => state.state.dispenser,
    getStateProcess: state => state.state.process
  }
}
