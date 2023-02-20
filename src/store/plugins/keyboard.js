import { EventInitiatorTypes, EventTypes, ActionHandlerTypes, ActionTypes } from 'promobot-logger'

export const keyboardEvents = (dispatch, logger, robot) => {
  robot.keyboardService.onChangeVisible(data => {
    let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.KEYBOARD_CHANGE_VISIBLE, data)
    dispatch('robot/keyboardChangeVisibleResponse', {
      meta: { eventId },
      data: data
    })
  })
}

export const keyboardSubscribers = (dispatch, mutation, logger, robot) => {
  switch (mutation.type) {
    case 'robot/KEYBOARD_SHOW_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.KEYBOARD_SHOW)
      robot.keyboardService.show()
      break
    case 'robot/KEYBOARD_HIDE_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.KEYBOARD_HIDE)
      robot.keyboardService.hide()
      break
    case 'robot/KEYBOARD_SET_LOCALE_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.KEYBOARD_SET_LOCALE, mutation.payload.data)
      robot.keyboardService.setLocale(mutation.payload.data)
      break
    case 'robot/KEYBOARD_GET_LOCALE_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.KEYBOARD_GET_LOCALE)
      robot.keyboardService.getLocale()
        .then(response => {
          let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.KEYBOARD_GET_LOCALE, response)
          dispatch('robot/keyboardGetLocaleResponse', {
            meta: { eventId },
            data: response
          })
        })
      break
  }
}
