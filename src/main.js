/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

import { MeetService } from '@pb/services'

import Promobot from '@pb/api'
import defaultSettings, { generalAppData } from './settings'
// import { GetPromobotInstance } from './robot'

import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger' // ActionHandlerTypes, ActionTypes
import storeSettings from './store/index'
import { getters } from './features/faces/module'
import { requestJson } from './utils'

// import defaultSettings from './settings'
// import Promobot from '@pb/api'

// создаем константу с настройками
// const settings = Object.assign(defaultSettings, (typeof global.settings !== 'undefined') ? global.settings : {})

// createApp(App).use(Vuex).mount('#app')
// VueElement.config.productionTip = false

// const app = createApp(App)
Vue.use(Vuex)
Vue.config.productionTip = false

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
    global.meetService = new MeetService(api)
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
      global.generalAppData = generalAppData
      return requestJson('config/facts.json')
    }).then(() => {
      // Vue.createApp(App).mount('#app')

      window.vm = new Vue({
        store,
        render: h => h(App)
      }).$mount('#app')

      // window.vm = new Vue(App).use(store).mount('#app')
      // window.vm = app.use(store).mount('#app')

      // Run
      store.dispatch('engine/handlerMoveToState', {
        meta: { eventId },
        data: 'INITIAL'
      })
    }).then(() => {
      // Приборы по топикам

      global.ros = new ROSLIB.Ros()
      global.ros.connect('ws://promobot:9092')
      /**
       * ЭМУЛЯТОР РОС
      */
      global.ros.connect('ws://localhost:9092')

      global.ros.on('error', () => {
        console.error('ros error')
      })

      global.ros.on('connection', () => {
        console.warn('!! ros connected !!')

        // Ростомер
        const topic = new ROSLIB.Topic({ // топик по росту и весу
          ros: global.ros,
          name: '/weight_measure/result',
          messageType: 'med_case_msgs/Weight_measure',
          queue_size: 5
        })
        topic.subscribe(message => {
          // console.warn('weight height measure', message)
          store.dispatch('ui/setMeasuredDataFromTopic', {
            meta: null,
            data: {
              type: 3,
              message: {
                weight: message.weight,
                calibrated: message.calibrated,
                height: message.height,
                index: message.index
              }
            }
          })
        })
        global.getRostomerReady = new ROSLIB.Service({
          ros: global.ros,
          name: '/weight_measure/conn_state',
          serviceType: 'std_srvs/SetBool'
        })

        // Термометр
        global.topic_t = new ROSLIB.Topic({ // топик по замеру температуры
          ros: global.ros,
          name: '/temperature_unit/data',
          messageType: 'promobot_msgs/Temp_measure',
          queue_size: 5
        })
        global.topic_t.subscribe(message => {
        // console.warn('temp dist measure', message)
          if (store.getters['ui/getMeasurementNum'] === 6) {
            store.dispatch('ui/setMeasuredDataFromTopic', {
              meta: null,
              data: {
                type: 6,
                message: {
                  temperature: message.temperature,
                  distance: message.distance
                } }
            })
          }
        })

        /**
         * НОВЫЙ ПУЛЬСОКСИМЕТР ROS
         * TODO: Видеофайл pulseoximeter_new.webm
         */
        global.topic_stauraciya_start = new ROSLIB.Topic({
          ros: global.ros,
          name: '/oxi_meter/state',
          messageType: 'med_case_msgs/Oxi_state',
          queue_size: 5
        })
        global.topic_stauraciya_start.subscribe(message => {
          if (store.getters['ui/getMeasurementNum'] === 4 && store.getters['ui/getMeasurementStep'] === 1 && message?.state.indexOf("'") === -1 && !JSON.parse(message?.state).includes('NO_FINGER')) {
            store.dispatch('engine/handlerMoveToState', {
              meta: { eventId: 1 },
              data: 'MEASUREMENT_4_2'
            })
          }
          if (store.getters['ui/getMeasurementNum'] === 4 && store.getters['ui/getMeasurementStep'] === 2 && typeof message.heart_rate !== 'undefined') {
            store.dispatch('ui/setMeasuredDataFromTopic', {
              meta: null,
              data: {
                type: '4_2',
                message: {
                  data: message
                } }
            })
          }
        })

        // Тонометр новый (на плечо)
        global.topic_pressure_start = new ROSLIB.Topic({
          ros: global.ros,
          name: '/blood_pressure/measure_start',
          messageType: 'std_msgs/Empty',
          queue_size: 5
        })
        global.topic_pressure_start.subscribe(message => {
          // console.warn('TOPIC_PRESSURE_START', message)
        })

        global.topic_pressure_cancel = new ROSLIB.Topic({ // топик по отмене замера давления
          ros: global.ros,
          name: '/blood_pressure/measure_cancel',
          messageType: 'std_msgs/Empty',
          queue_size: 5
        })
        global.topic_pressure_cancel.subscribe(message => {
          // console.warn('TOPIC_PRESSURE_CANCEL', message)
        })

        global.topic_pressure_state = new ROSLIB.Topic({ // топик по данным при замере давления
          ros: global.ros,
          name: '/blood_pressure/state',
          messageType: 'med_case_msgs/Blood_press',
          queue_size: 5
        })

        global.topic_pressure_state.subscribe(message => {
          // console.warn('TOPIC PRESSURE STATE', message)
          if (store.getters['ui/getMeasurementNum'] === 5 && store.getters['ui/getMeasurementStep'] === 2) {
            store.dispatch('ui/setMeasuredDataFromTopic', {
              meta: null,
              data: {
                type: 51,
                message: {
                  data: message
                }
              }
            })
          }
        })

        // Глюкометр
        global.topic_glukometr_battery = new ROSLIB.Topic({ // топик по отмене замера давления
          ros: global.ros,
          name: '/glucometer/battery',
          messageType: 'std_msgs/UInt8',
          queue_size: 5
        })
        global.topic_glukometr_tcp_connection = new ROSLIB.Topic({ // топик по отмене замера давления
          ros: global.ros,
          name: '/glucometer/tcp_connection',
          messageType: 'std_msgs/Bool',
          queue_size: 5
        })
        global.topic_glukometr_battery.subscribe(message => {
          // console.warn('GLUCOMETER_BATTERY', JSON.stringify(message))
          if (store.getters['ui/getMeasurementNum'] === 2 && store.getters['ui/getMeasurementStep'] === 1) {
            store.dispatch('ui/setGlucometerBatteryStatus', {
              meta: null,
              data: message.data
            })
          }
        })
        global.topic_glukometr_tcp_connection.subscribe(message => {
          // console.warn('GLUCOMETER_CONNECTION', JSON.stringify(message))
          if (store.getters['ui/getMeasurementNum'] === 2 && store.getters['ui/getMeasurementStep'] === 1) {
            store.dispatch('ui/setGlucometerConnectionStatus', {
              meta: null,
              data: message.data
            })
          }
        })
        global.topic_glukometr_start = new ROSLIB.Topic({
          ros: global.ros,
          name: '/glucometer/start',
          messageType: 'std_msgs/UInt8',
          queue_size: 5
        })

        global.topic_glukometr_stop = new ROSLIB.Topic({
          ros: global.ros,
          name: '/glucometer/stop',
          messageType: 'std_msgs/Empty',
          queue_size: 5
        })

        global.topic_glukometr_percent = new ROSLIB.Topic({
          ros: global.ros,
          name: '/glucometer/percent',
          messageType: 'promobot_glucometer/Percent',
          queue_size: 5
        })
        global.topic_glukometr_percent.subscribe(message => {
          // console.warn('GLUCOMETER_PERCENT', message)
          if (typeof message.percent === 'number' && store.getters['ui/getMeasurementNum'] === 2 && store.getters['ui/getMeasurementStep'] === 2) {
            store.dispatch('ui/setMeasuredDataFromTopic', {
              meta: null,
              data: { 'type': 22,
                'message': {
                  finger: message.finger,
                  percent: message.percent,
                  finger_trust: message.finger_trust
                } }
            })
          }
        })

        global.topic_glukometr_finish = new ROSLIB.Topic({
          ros: global.ros,
          name: '/glucometer/finish',
          messageType: 'std_msgs/Float64',
          queue_size: 5
        })
        global.topic_glukometr_finish.subscribe(message => {
          if (store.getters['ui/getMeasurementNum'] === 2) {
            // console.warn('glucometer finish', message)
            store.dispatch('ui/setMeasuredDataFromTopic', {
              meta: null,
              data: { 'type': 2,
                'message': {
                  data: message.data
                } }
            })
          }
        })
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
