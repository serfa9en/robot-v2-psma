import { EventInitiatorTypes, EventTypes, ActionHandlerTypes, ActionTypes } from 'promobot-logger'

export const userEvents = (dispatch, logger, robot) => {
  robot.userService.onUserPresence((user, isNew) => {
    let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.USER_PRESENCE, { user: user })
    dispatch('robot/userPresenceResponse', {
      meta: { eventId: eventId },
      data: user
    })
  })
  robot.userService.onUserLost(() => {
    let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.USER_LOST)
    dispatch('robot/userLostResponse', {
      meta: { eventId: eventId },
      data: null
    })
  })
}

export const userSubscribers = (dispatch, mutation, logger, robot) => {
  switch (mutation.type) {
    case 'robot/USER_ADD_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.USER_DATABASE_RESPONSE)
      robot.userService.addUser(mutation.payload.data)
        .then(response => {
          let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.USER_DATABASE_RESPONSE, response)
          dispatch('robot/userAddResponse', {
            meta: { eventId },
            data: response
          })
        })
      break
    case 'robot/USER_DEL_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.USER_DATABASE_RESPONSE)
      robot.userService.deleteUser(mutation.payload.data)
        .then(response => {
          let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.USER_DATABASE_RESPONSE, response)
          dispatch('robot/userDelResponse', {
            meta: { eventId },
            data: response
          })
        })
      break
    case 'robot/USER_GET_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.USER_DATABASE_RESPONSE)
      robot.userService.getUser(mutation.payload.data)
        .then(response => {
          // console.warn('Данные о пользователе от робота получены', response)
          let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.USER_DATABASE_RESPONSE, response)
          dispatch('robot/userGetResponse', {
            meta: { eventId },
            data: response
          })
        })
      break
    case 'robot/USER_UPDATE_REQUEST':
      logger.logAction(mutation.payload.meta.eventId, ActionHandlerTypes.ROBOT, ActionTypes.USER_DATABASE_RESPONSE)
      robot.userService.updateUser(mutation.payload.data)
        .then(response => {
          let eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.USER_DATABASE_RESPONSE, response)
          dispatch('robot/userUpdateResponse', {
            meta: { eventId },
            data: response
          })
        })
      break
  }
}
