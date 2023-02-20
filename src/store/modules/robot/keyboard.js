export const stateKeyboard = {
  keyboard: {
    visible: null,
    locale: null
  }
}

export const actionsKeyboard = {
  keyboardShowRequest: ({ commit }, payload) => commit('KEYBOARD_SHOW_REQUEST', payload),
  keyboardHideRequest: ({ commit }, payload) => commit('KEYBOARD_HIDE_REQUEST', payload),
  keyboardSetLocaleRequest: ({ commit }, payload) => commit('KEYBOARD_SET_LOCALE_REQUEST', payload),
  keyboardGetLocaleRequest: ({ commit }, payload) => commit('KEYBOARD_GET_LOCALE_REQUEST', payload),
  keyboardGetLocaleResponse: ({ commit }, payload) => commit('KEYBOARD_GET_LOCALE_RESPONSE', payload),
  keyboardChangeVisibleResponse: ({ commit }, payload) => commit('KEYBOARD_CHANGE_VISIBLE_RESPONSE', payload)
}

export const mutationsKeyboard = {
  KEYBOARD_SHOW_REQUEST: (state, payload) => { },
  KEYBOARD_HIDE_REQUEST: (state, payload) => { },
  KEYBOARD_SET_LOCALE_REQUEST: (state, payload) => { },
  KEYBOARD_GET_LOCALE_REQUEST: (state, payload) => { },
  KEYBOARD_GET_LOCALE_RESPONSE: (state, payload) => { state.keyboard.locale = payload.data },
  KEYBOARD_CHANGE_VISIBLE_RESPONSE: (state, payload) => { state.keyboard.visible = payload.data }
}

export const gettersKeyboard = {
  getKeyboardVisible: state => state.keyboard.visible,
  getKeyboardLocale: state => state.keyboard.locale
}
