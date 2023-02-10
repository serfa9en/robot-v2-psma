export function initialState () {
  return {
    state: {
      count: 'ZERO', // ZERO, ONE, MANY
      known: 'NONE', // NONE, KNOWN, TEMP
      general: 'NONE' // 'NONE, GENERAL, WAIT
    },
    user: {
      general: {}, // Объект сессионного пользователя
      lost: false // Пользователь потерян
    },
    timeouts: {
      lostUser: 20000, // Таймаут на сброс сессии
      setOneGeneral: 1000 // Таймер назначения главным 1 пользователя >= 1000
    },
    logic: {
      dbRequest: false, // Запрашивать информацию о пользователе из БД
      states: {
        isPrivate: false, // При потере сразу переходит в userLost
        isExclude: false // Отключает логику работы с лицами
      },
      allowOneGeneral: true // Позволять назначать главным если пользователь стоит один перед роботом
    },
    general: null
  }
}

export const actions = {
  refresh: ({ commit, rootState }, payload) => { // обновляет данные
    let info = rootState.robot.faceRecognize.info || []

    commit('REFRESH', {
      meta: payload.meta,
      data: info
    })
  },
  clearState: ({ commit }, payload) => commit('CLEAR_STATE', payload), // сброс настроек
  // STATE
  setStateCount: ({ commit }, payload) => commit('SET_STATE_COUNT', payload),
  setStateKnown: ({ commit }, payload) => commit('SET_STATE_KNOWN', payload),
  setStateGeneral: ({ commit }, payload) => commit('SET_STATE_GENERAL', payload),
  // USER
  setUserGeneral: ({ commit }, payload) => commit('SET_USER_GENERAL', payload),
  setUserLost: ({ commit }, payload) => commit('SET_USER_LOST', payload),
  // TIMEOUTS
  setTimeoutsLostUser: ({ commit }, payload) => commit('SET_TIMEOUTS_LOST_USER', payload), // устанавливает таймер потери главного (милисекунды)
  setTimeoutsSetOneGeneral: ({ commit }, payload) => commit('SET_TIMEOUTS_SET_ONE_GENERAL', payload), // устанавливает таймер назначения одного главным (милисекунды)
  // LOGIC
  setLogicDbRequest: ({ commit }, payload) => commit('SET_LOGIC_DB_REQUEST', payload), // запрашивать данные о сессионом пользователе { true | false (default) }
  setLogicStatesIsPrivate: ({ commit }, payload) => commit('SET_LOGIC_STATES_IS_PRIVATE', payload), // установить приватное состояние (при потеле главного userLost сразу выставляется в true) { true | false (default) }
  setLogicStatesIsExclude: ({ commit }, payload) => commit('SET_LOGIC_STATES_IS_EXCLUDE', payload), // отключить логику работы с главным { true | false (default) }
  setAllowOneGeneral: ({ commit }, payload) => commit('SET_ALLOW_ONE_GENERAL', payload),
  // HOOKS
  zero: ({ commit }, payload) => commit('HOOK_ZERO', payload),
  one: ({ commit }, payload) => commit('HOOK_ONE', payload),
  many: ({ commit }, payload) => commit('HOOK_MANY', payload),
  start: ({ commit }, payload) => commit('HOOK_START', payload),
  completed: ({ commit }, payload) => commit('HOOK_COMPLETED', payload),
  lost: ({ commit }, payload) => commit('HOOK_LOST', payload),
  find: ({ commit }, payload) => commit('HOOK_FIND', payload),
  trackChanged: ({ commit }, payload) => commit('HOOK_TRACK_CHANGED', payload),
  timerEnd: ({ commit }, payload) => commit('HOOK_TIMER_END', payload),
  clean: ({ commit }, payload) => commit('HOOK_CLEAN', payload)
}

export const mutations = {
  CLEAR_STATE: (state, payload) => {
    const s = initialState()
    const ignoredKeys = [
      'timeouts'
    ]

    Object.keys(s).forEach(key => {
      if (ignoredKeys.includes(key) === false) {
        state[key] = s[key]
      }
    })
  },
  REFRESH: (state, payload) => { },
  // STATE
  SET_STATE_COUNT: (state, payload) => { state.state.count = payload.data },
  SET_STATE_KNOWN: (state, payload) => { state.state.known = payload.data },
  SET_STATE_GENERAL: (state, payload) => { state.state.general = payload.data },
  // USER
  SET_USER_GENERAL: (state, payload) => { state.user.general = payload.data },
  SET_USER_LOST: (state, payload) => { state.user.lost = payload.data },
  // TIMEOUTS
  SET_TIMEOUTS_LOST_USER: (state, payload) => { state.timeouts.lostUser = payload.data },
  SET_TIMEOUTS_SET_ONE_GENERAL: (state, payload) => { state.timeouts.setOneGeneral = payload.data },
  // LOGIC
  SET_LOGIC_DB_REQUEST: (state, payload) => { state.logic.dbRequest = payload.data },
  SET_LOGIC_STATES_IS_PRIVATE: (state, payload) => { state.logic.states.isPrivate = payload.data },
  SET_LOGIC_STATES_IS_EXCLUDE: (state, payload) => { state.logic.states.isExclude = payload.data },
  SET_ALLOW_ONE_GENERAL: (state, payload) => { state.logic.allowOneGeneral = payload.data },
  // HOOKS
  HOOK_ZERO: (state, payload) => { }, // Нет главного и все ушли
  HOOK_ONE: (state, payload) => { }, // Нет главного пришел один
  HOOK_MANY: (state, payload) => { }, // Нет главного пришло много
  HOOK_START: (state, payload) => { }, // сообщает, что сессия началась
  HOOK_COMPLETED: (state, payload) => { }, // Пришла информация из БД
  HOOK_LOST: (state, payload) => { }, // Пользователь потерян
  HOOK_FIND: (state, payload) => { }, // Пользователь вернулся
  HOOK_TRACK_CHANGED: (state, payload) => { }, // У главного сменился id трека
  HOOK_TIMER_END: (state, payload) => { }, // Закончился таймер потери главного
  HOOK_CLEAN: (state, payload) => { } // сообщает, что сессия завершилась
}

export const getters = {
  // STATE
  getStateCount: state => state.state.count, // возвращает количество лиц перед роботом (NONE - лиц нет, ONE - одно лицо, MANY - больше 1 лица)
  getStateKnown: state => state.state.known, // возвращает наличие пользователя в базе лиц (KNOWN - есть совпадение в базе, TEMP - нет совпадения в базе лиц, NONE - лиц нет или не распознано)
  getStateGeneral: state => state.state.general, // возвращает статус сессии с главным пользователем (NONE - главный не назначен, GENERAL - главный назначен и находится перед роботом, WAIT - главный назначен но робот его не видит)
  // USER
  getUserGeneral: state => state.user.general, // возвращает объект сессионного пользователя (type JSON) HOOK_START & HOOK_CLEAN
  getUserLost: state => state.user.lost, // возвращает флаг, что сессионный пользователь потерян
  // TIMEOUTS
  getTimeoutsLostUser: state => state.timeouts.lostUser, // возращает таймаут потери главного (def:15000)
  getTimeoutsSetOneGeneral: state => state.timeouts.setOneGeneral, // возращает таймаут назначения главного (def:1000)
  // LOGIC
  getLogicDbRequest: state => state.logic.dbRequest, // возвращает флаг для запроса данных о сессионном пользователе (def:false) HOOK_COMPLETED
  getLogicStatesIsPrivate: state => state.logic.states.isPrivate, // возвращает флаг состояния находится ли модуль в приватном состояния (def:false)
  getLogicStatesIsExclude: state => state.logic.states.isExclude, // возвращает флаг состояния включена логика работы с главным или нет (def:false)
  getLogicAllowOneGeneral: state => state.logic.allowOneGeneral // возвращает флаг состояния включена логика назначения одного главным или нет (def:true)
}

export default {
  namespaced: true,
  state: initialState(),
  actions,
  mutations,
  getters
}
