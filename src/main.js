import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
// import store from './store'

import defaultSettings from './settings'
import Promobot from '@pb/api'

// Vue.use(Vuex)
// Vue.config.productionTip = false

// создаем константу с настройками
const settings = Object.assign(defaultSettings, (typeof global.settings !== 'undefined') ? global.settings : {})

// эмулятор
const environment = (typeof QWebChannel !== 'undefined') ? 'production' : 'development'
const robotInstance = (environment === 'development') ? Promobot.getEmulateInstance(settings.emulator) : Promobot.getInstance()
robotInstance.then(promobot => {
  promobot.dialogService.sayText('Привет мир')
  createApp(App).use(Vuex).mount('#app')
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
