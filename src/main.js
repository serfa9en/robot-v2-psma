
import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

// import { MeetService } from '@pb/services'

import Promobot from '@pb/api'
import defaultSettings from './settings'
// import { GetPromobotInstance } from './robot'

import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger' // ActionHandlerTypes, ActionTypes
import storeSettings from './store/index'

// import defaultSettings from './settings'
// import Promobot from '@pb/api'

// создаем константу с настройками
// const settings = Object.assign(defaultSettings, (typeof global.settings !== 'undefined') ? global.settings : {})

// createApp(App).use(Vuex).mount('#app')
// VueElement.config.productionTip = false

const app = createApp(App)
app.use(Vuex)
app.config.productionTip = false

const settings = Object.assign(defaultSettings, (typeof global.settings !== 'undefined') ? global.settings : {})
const environment = (typeof QWebChannel !== 'undefined') ? 'production' : 'development'
const urlParams = new URLSearchParams(window.location.search)
settings.emulator.room = urlParams.get('room')
console.log(urlParams.get('room'))
const robotInstance = (environment === 'development')
  ? Promobot.getEmulateInstance(settings.emulator)
  : Promobot.getInstance()

document.addEventListener('DOMContentLoaded', function (event) {
  robotInstance.then(api => {
    global.robot = api
    // global.meetService = new MeetService(api)
    global.logger = PromobotLogger.getInstance()
    const logger = global.logger
    let store = null
    let eventId = null

    api.environmentService.get().then(env => {
      console.log(env)
      store = new Vuex.Store(storeSettings(logger, api))
      // logger
      logger.setRobotUuid(env.uuid_owner) // id робота
      logger.setRobotAppId(settings.applicationId) // id приложения
      logger.setRobotAppVer(settings.applicationVersion) // версия приложения
      logger.setRobotAppLang(settings.applicationLanguage) // id языка приложения (570 - русский)
      if (environment === 'development') {
        logger.addConnection({
          url: settings.emulator.url,
          reconnection: settings.emulator.reconnection,
          secure: settings.emulator.secure,
          room: settings.emulator.room
        })
      }
      if (environment === 'production') {
        logger.addConnection({
          url: settings.statistic.url,
          reconnection: settings.statistic.reconnection,
          secure: settings.statistic.secure
        })
      }
      // event
      logger.createInteractionSession()
      logger.createCaseSession()
      eventId = logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.ROBOT_LOAD_ENVIRONMENT, env)
      store.dispatch('robot/setEnvironment', {
        meta: { eventId: eventId },
        data: env
      })
    }).then(() => {
      // Vue.createApp(App).mount('#app')
      /*
      window.vm = new VueElement({
        store,
        render: h => h(App)
      }).mount('#app')
      */

      window.vm = app.use(store).mount('#app')

      // Run
      // TODO: Спроекттировать архитектуру и взаимосвязи кейса. Чтобы понимать как должен работать проект
      store.dispatch('engine/handlerMoveToState', {
        meta: { eventId },
        data: 'INITIAL'
      })
    })

    /*
    const text = 'Hello World!'
    api.dialogService.sayText(text)
    // logger.logAction(eventId, ActionHandlerTypes.API, ActionTypes.ROBOT_SAY_TEXT, text)

    const textStart = 'Робот начал говорить'
    const textFinish = 'Робот закончил говорить'
    api.dialogService.onRobotReplicStart(() => {
      console.log(textStart)
      // logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.ROBOT_REPLIC_START, textStart)
    })
    api.dialogService.onRobotReplicFinish(() => {
      console.log(textFinish)
      // logger.logEvent(EventInitiatorTypes.ROBOT, EventTypes.ROBOT_REPLIC_FINISH, textFinish)
    })
    */

    /*
    global['toggleDebug'] = () => {
      store.dispatch('engine/setEngineDebug', {
      // eslint-disable-next-line
      data: !vm.$store.getters['engine/getEngineDebug']
      })
    }
    */
  })
})

// const environment = (typeof QWebChannel !== 'undefined') ? 'production' : 'development'
// const urlParams = new URLSearchParams(window.location.search)
// settings.emulator.room = urlParams.get('room')
// const robotInstance = (environment === 'development') ? Promobot.getEmulateInstance(settings.emulator) : Promobot.getInstance()

/*
document.addEventListener('DOMContentLoaded', () => {
  robotInstance.then(promobot => {
    // const logger = PromobotLogger.getInstance()
    // promobot.environmentService.get()
    promobot.dialogService.sayText('Привет мир')
    /*
      .then(robotEnvironment => {
        // logger.setRobotUuid(robotEnvironment.uuid_owner) // id робота
        // logger.setRobotAppId(settings.applicationId) // id приложения
        // logger.setRobotAppVer(settings.applicationVersion) // версия приложения
        // logger.setRobotAppLang(settings.applicationLanguage) // id языка приложения (570 - русский)
        /*
        if (environment === 'development') {
          logger.addConnection({
            url: settings.emulator.url,
            reconnection: settings.emulator.reconnection,
            secure: settings.emulator.secure,
            room: settings.emulator.room
          })
        }
      // })
      .then(() => {
        window.vm = new Vue({
        //  store,
          render: h => h(App)
        }).mount('#app')
      })
  })
})
*/

// createApp(App).use(store).mount('#app')
