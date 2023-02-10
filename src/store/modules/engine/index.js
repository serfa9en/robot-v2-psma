import states from '../../states'
import scenarios from '../../scenarios'
import TimeOut from '../../../timeout'
import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'
import packageSettings from '../../../../package.json'

export default {
  namespaced: true,
  state: {
    engine: {
      version: packageSettings.version,
      debug: true,
      demo: false
    },
    current: {
      stateName: 'IDLE'
    },
    pre: {
      stateName: 'IDLE'
    },
    states,
    scenarios
  },
  actions: {
    // handlers
    /*
    handlerDelayedMoveToState: ({ state, commit, dispatch }, payload) => {
      if (payload.data !== state.current.stateName) {
        let logger = PromobotLogger.getInstance()
        let eventId = logger.logEvent(EventInitiatorTypes.JS, EventTypes.JS_TIMEOUT, {
          transition: 'TIMEOUT'
        })
        dispatch('handlerMoveToState', {
          meta: { eventId: eventId },
          data: payload.data
        })
      }
    },
    */
    handlerClickMoveToState: ({ dispatch }, payload) => {
      let transition = payload.transition || 'UNKNOWN'
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK, {
        transition: transition
      })

      return dispatch('handlerMoveToState', {
        meta: { eventId: eventId },
        data: payload.data
      })
    },

    handlerMoveToState: ({ state, commit, dispatch }, payload) => {
      let timeOut = TimeOut.getInstance()
      let currentState = state.states.find(s => s.name === state.current.stateName)
      let nextState = state.states.find(s => s.name === payload.data)
      if (currentState !== nextState) {
        timeOut.clearTimers()
        if (currentState) {
          if ('exiting' in currentState && Array.isArray(currentState.exiting)) {
            currentState.exiting.forEach(action => {
              let timeout = (typeof action.timeout !== 'undefined') ? action.timeout : 0
              let enabled = (typeof action.enabled !== 'undefined') ? action.enabled : true
              if (enabled) {
                let timer = setTimeout(() => {
                  dispatch(action.name, {
                    meta: payload.meta,
                    data: action.options
                  }, { root: true })
                }, timeout)
                timeOut.insertTimer(timer)
              }
            })
          }
        }
        if (nextState) {
          if ('entering' in nextState && Array.isArray(nextState.entering)) {
            nextState.entering.forEach(action => {
              let timeout = (typeof action.timeout !== 'undefined') ? action.timeout : 0
              let enabled = (typeof action.enabled !== 'undefined') ? action.enabled : true
              if (enabled) {
                let timer = setTimeout(() => {
                  dispatch(action.name, {
                    meta: payload.meta,
                    data: action.options
                  }, { root: true })
                }, timeout)
                timeOut.insertTimer(timer)
              }
            })
          }
          dispatch('handlerSaveStateName', {
            meta: payload.meta,
            data: payload.data
          })
        }
      }
    },
    handlerCallScenario: ({ state, dispatch }, payload) => {
      let timeOut = TimeOut.getInstance()
      let name = payload.data
      if (name in state.scenarios) {
        let scenario = state.scenarios[name]
        if (Array.isArray(scenario)) {
          scenario.forEach(item => {
            let timeout = (typeof item.timeout !== 'undefined') ? item.timeout : 0
            let enabled = (typeof item.enabled !== 'undefined') ? item.enabled : true
            if (enabled) {
              let timer = setTimeout(() => {
                dispatch(item.name, {
                  meta: payload.meta,
                  data: item.options
                }, { root: true })
              }, timeout)
              timeOut.insertTimer(timer)
            }
          })
        }
      }
    },
    handlerSavePreStateName: ({ state, dispatch }, payload) => {
      let logger = PromobotLogger.getInstance()
      if (payload.meta && payload.meta.eventId && payload.data) {
        logger.logState(payload.meta.eventId, {
          stateName: payload.data
        })
        dispatch('setPreStateName', payload)
      }
    },
    handlerSaveStateName: ({ state, dispatch }, payload) => {
      let logger = PromobotLogger.getInstance()
      if (payload.meta && payload.meta.eventId && payload.data) {
        logger.logState(payload.meta.eventId, {
          stateName: payload.data
        })
        dispatch('setCurrentStateName', payload)
      }
    },
    // setters
    setCurrentStateName: ({ state, commit, getters }, payload) => {
      // console.warn(`[Состояние изменилось]: ${getters.getCurrentStateName} -> ${payload.data} `)
      commit('SET_CURRENT_STATE_NAME', payload)
    },
    setPreStateName: ({ state, commit, getters }, payload) => {
      // console.warn(`[Состояние изменилось]: ${getters.getCurrentStateName} -> ${payload.data} `)
      commit('SET_PRE_STATE_NAME', payload)
    }
    // setEngineDebug: ({ commit }, payload) => commit('SET_ENGINE_DEBUG', payload)
  },
  mutations: {
    // SET_ENGINE_DEBUG: (state, payload) => { state.engine.debug = payload.data },
    SET_CURRENT_STATE_NAME: (state, payload) => { state.current.stateName = payload.data },
    SET_PRE_STATE_NAME: (state, payload) => { state.pre.stateName = payload.data }
  },
  getters: {
    // getEngineVersion: (state) => state.engine.version,
    // getEngineDebug: (state) => state.engine.debug,
    getCurrentStateName: (state) => state.current.stateName,
    getPreStateName: (state) => state.pre.stateName
  }
}
