/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { EXAMINATION_TYPE } from '../../constants'

let measurementProcess = { 'med_2': null, 'med_3': null, 'med_4': null, 'med_5': null, 'med_6': null, 'med_6_1': null, 'med_6_2': null, 'med_6_3': null }
let tempLong = 0
let tempLongRes = 24
let tempShort = 0
let tempShortRes = 12
let tempResult = 0
let tempResultRes = 8
let pm = { eventId: 1 }
let tempStartInterval = null
let glucometer_finger = null
let actions = []
let isHandScript = null
let spirographTimeout = null
let spirographInterval = null
let spirographTube = null
let spirographMeasure = null
let saturatsiyaTimeout = null
let saturatsiyaInterval = null
let isEquipment = null
let isSpirometer = false

let dataInterval = null
let isCaseStarted = false

const msg = new ROSLIB.Message({})
const msg_c = new ROSLIB.Message({})
const msg_c1 = new ROSLIB.Message({})
const msg_c2 = new ROSLIB.Message({})

export default function (logger) {
  return store => {
    // Старые приборы
    // Спирография и сатурация
    let socket_s = null
    let isSocket = false
    let socketInterval = null

    /**
     * Подключение к сокету
     */
    function connect () {
      socket_s = new WebSocket('ws://192.168.250.91:5680')
      /**
       * ЭМУЛЯТОР НЕРОС
       */
      // socket_s = new WebSocket('ws://localhost:5680')

      socket_s.onopen = function () {
        // При подключении остановить все предыдущие тесты если был обрыв соединения
        socket_s.send('stopTest')
        console.warn('Сокет-соединение со спирографом установлено')
        clearInterval(socketInterval)
        isSocket = true
        socket_s.send('status')
      }
      socket_s.onclose = function (event) {
        clearInterval(socketInterval)
        if (event.wasClean) {
          console.warn('Соединение  со спирографом  закрыто чисто')
        } else if (isSocket) {
          console.warn('Обрыв соединения со спирографом') // например, 'убит' процесс сервера
          socketInterval = setInterval(() => { connect() }, 2000)
        } else {
          console.warn('Отсутствует соединение со спирографом')
        }
        console.warn('Код: ' + event.code + ' причина: ' + event.reason)
        isSocket = false
      }
      socket_s.onmessage = function (event) {
        // console.warn('ПОЛУЧАЕМ ДАННЫЕ СПИРОГРАФА', JSON.stringify(JSON.parse(event.data)))
        let d = JSON.parse(event.data)
        if (typeof d?.status === 'number') {
          // console.warn('ПОЛУЧАЕМ СТАТУС ПОДКЛЮЧЕНИЯ СПИРОГРАФА', { status: d.status, description: d.description })
          if (d.status === 1) {
            isSpirometer = true
          }
          store.dispatch('ui/setMeasuredDataFromTopic', {
            meta: pm,
            data: {
              type: '4_0',
              message: {
                status: d.status,
                description: d.description
              }
            }
          })
        }
        /**
         * СТАРЫЙ ПУЛЬСОКСИМЕТР, ПОДКЛЮЧЕН К СПИРОМЕТРУ
         * TODO: Видеофайл pulseoximeter_old.webm
         */
        // if (store.getters['ui/getMeasurementNum'] === 4 && store.getters['ui/getMeasurementStep'] === 2 && typeof d.HeartRate !== 'undefined') {
        //   store.dispatch('ui/setMeasuredDataFromTopic', {
        //     meta: pm,
        //     data: {
        //       type: '4_2',
        //       message: {
        //         HeartRate: d.HeartRate,
        //         SpO2: d.SpO2
        //       }
        //     }
        //   })
        // }
        if (store.getters['ui/getMeasurementNum'] === 4 && store.getters['ui/getMeasurementStep'] === 6 && typeof d.FVC !== 'undefined') {
          // console.warn('Спирограф прошел условие store.getters['ui/getMeasurementNum'] === 4 && store.getters['ui/getMeasurementStep'] === 6 && typeof d.FVC !== 'undefined'')
          let res = {}
          for (var key in d) {
            let m = d[key].split(' ')
            res[key] = Number(m[0].replace(',', '.'))
          }
          // console.warn('Спирограф res', res)
          store.dispatch('ui/setMeasuredDataFromTopic', {
            meta: pm,
            data: {
              type: '4_6',
              message: res
            }
          })
        }
      }
      socket_s.onerror = function (error) {
        console.warn('Ошибка сокета' + error.message)
        isSocket = false
      }
    }

    connect()

    // subscribe
    store.subscribe((mutation, state) => {
      let payload = mutation.payload
      let dispatch = store.dispatch

      switch (mutation.type) {
        case 'ui/SET_MEASUREMENT_NUM':

          if (payload.data !== null) {
            if (dataInterval !== null) {
              clearInterval(dataInterval)
              dataInterval = null
            }
            if (isEquipment !== null) {
              clearTimeout(isEquipment)
              isEquipment = null
            }

            /**
             *  Спирография: проверка роста, прибора и переход к измерению
             */
            if (payload.data === EXAMINATION_TYPE.PULSEOXIMETER_SPIROMETER && store.getters['ui/getMeasurementStep'] === 4) {
              // проверяем рост, минимум 70 см
              if (store.getters['ui/getUserGrowth'] >= 70) {
                new Promise((resolve, reject) => {
                  actions = []
                  // eslint-disable-next-line prefer-promise-reject-errors
                  isEquipment = setTimeout(() => { reject() }, 10000)
                  setTimeout(() => {
                    if (isSpirometer) {
                      clearTimeout(isEquipment)
                      resolve()
                    }
                  }, 1000)
                }).then(result => {
                  // clearInterval(tempStartInterval)
                  actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'MEASUREMENT_' + payload.data + '_5', 'timeout': 0 })
                  actions.forEach(item => {
                    setTimeout(() => {
                      store.dispatch(item.name, { meta: pm, data: item.options })
                    }, item.timeout)
                  })
                }, () => {
                  // clearInterval(tempStartInterval)
                  actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': false, 'timeout': 0 })
                  actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'START_NEW', 'timeout': 0 })
                  actions.push({ 'name': 'robot/abortRobotReplic', 'options': null, 'timeout': 100 })
                  actions.push({ 'name': 'robot/sayText', 'options': 'Извините, в данный момент это оборудование недоступно', 'timeout': 200 })
                  actions.forEach(item => {
                    setTimeout(() => {
                      store.dispatch(item.name, { meta: pm, data: item.options })
                    }, item.timeout)
                  })
                })
              } else {
                actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': false, 'timeout': 0 })
                actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'IMT-S', 'timeout': 0 })
                actions.forEach(item => {
                  setTimeout(() => {
                    store.dispatch(item.name, { meta: pm, data: item.options })
                  }, item.timeout)
                })
              }
            }

            /**
             *  Пульсоксиметрия: проверка прибора и переход к измерению
             */
            if (payload.data === EXAMINATION_TYPE.PULSEOXIMETER_SPIROMETER && store.getters['ui/getMeasurementStep'] === 1) {
              /**
               * НОВЫЙ ПУЛЬСОКСИМЕТР. ПРОВЕРКА ПОДКЛЮЧЕНИЯ И ПЕРЕХОД К ИЗМЕРЕНИЮ
              */
              new Promise((resolve, reject) => {
                actions = []
                resolve()
                isEquipment = setTimeout(() => { reject() }, 2500)
                if (!topic_stauraciya_start) {
                  // eslint-disable-next-line prefer-promise-reject-errors
                  reject()
                } else {
                  dataInterval = setInterval(() => {
                    if (store.getters['ui/getMeasuredDataFromTopic'].type === '4_1' && store.getters['ui/getMeasuredDataFromTopic'].message.data.state) resolve()
                  }, 250)
                }
              }).then(result => {
                clearTimeout(isEquipment)
                clearInterval(dataInterval)
                actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': false, 'timeout': 0 })
                actions.push({ 'name': 'ui/setIsSaturatsiyaStarted', 'options': true, 'timeout': 0 })
                actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'MEASUREMENT_' + payload.data + '_' + store.getters['ui/getMeasurementStep'], 'timeout': 0 })
                actions.forEach(item => {
                  setTimeout(() => {
                    store.dispatch(item.name, { meta: pm, data: item.options })
                  }, item.timeout)
                })
              }, () => {
                clearTimeout(isEquipment)
                clearInterval(dataInterval)
                actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': false, 'timeout': 0 })
                // actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'START_NEW', 'timeout': 0 })
                // actions.push({ 'name': 'robot/abortRobotReplic', 'options': null, 'timeout': 100 })
                // actions.push({ 'name': 'robot/sayText', 'options': 'Извините, в данный момент это оборудование недоступно', 'timeout': 200 })
                actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'MEASUREMENT_' + payload.data + '_4', 'timeout': 0 })
                actions.forEach(item => {
                  setTimeout(() => {
                    store.dispatch(item.name, { meta: pm, data: item.options })
                  }, item.timeout)
                })
              })
              /**
               * СТАРЫЙ ПУЛЬСОКСИМЕТР. ПРОВЕРКА ПОДКЛЮЧЕНИЯ И ПЕРЕХОД К ИЗМЕРЕНИЮ
              */
              // new Promise((resolve, reject) => {
              //   // console.log(isSocket)
              //   actions = []
              //   isEquipment = setTimeout(() => { reject() }, 10000)
              //   // TODO 1) проверить на железе if (isSpirometer === false) {
              //   if (isSocket === false) {
              //     // reject()
              //     actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'START_NEW', 'timeout': 0 })
              //     actions.push({ 'name': 'robot/abortRobotReplic', 'options': null, 'timeout': 100 })
              //     actions.push({ 'name': 'robot/sayText', 'options': 'Извините, в данный момент это оборудование недоступно', 'timeout': 200 })
              //   } else {
              //     socket_s.send('status')
              //     dataInterval = setInterval(() => {
              //       // console.warn('SPYRO_STATUS', store.getters['ui/getMeasuredDataFromTopic']?.message?.status)
              //       if (store.getters['ui/getMeasuredDataFromTopic']?.message?.status === 1) resolve()
              //     }, 250)
              //   }
              // }).then(() => {
              //   clearTimeout(isEquipment)
              //   clearInterval(dataInterval)
              //   actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': false, 'timeout': 0 })
              //   actions.push({ 'name': 'ui/setIsSaturatsiyaStarted', 'options': true, 'timeout': 0 })
              //   actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'MEASUREMENT_' + payload.data + '_' + store.getters['ui/getMeasurementStep'], 'timeout': 0 })
              //   actions.forEach(item => {
              //     setTimeout(() => {
              //       store.dispatch(item.name, { meta: pm, data: item.options })
              //     }, item.timeout)
              //   })
              // }, () => {
              //   clearTimeout(isEquipment)
              //   clearInterval(dataInterval)
              //   actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': false, 'timeout': 0 })
              //   // actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'START_NEW', 'timeout': 0 })
              //   // actions.push({ 'name': 'robot/abortRobotReplic', 'options': null, 'timeout': 100 })
              //   // actions.push({ 'name': 'robot/sayText', 'options': 'Извините, в данный момент это оборудование недоступно', 'timeout': 200 })
              //   actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'MEASUREMENT_' + payload.data + '_4', 'timeout': 0 })
              //   actions.forEach(item => {
              //     setTimeout(() => {
              //       store.dispatch(item.name, { meta: pm, data: item.options })
              //     }, item.timeout)
              //   })
              // })
            }

            /**
             *  Глюкометрия: проверка работоспособности и переход к измерению
            */
            if (payload.data === EXAMINATION_TYPE.GLUCOMETER && store.getters['ui/getMeasurementStep'] === 1) {
              let errorPhrase = ''
              let connectionIsOk = false
              let batteryIsOk = false
              new Promise((resolve, reject) => {
                // Симуляция того что прибор подключен
                // resolve()
                actions = []
                isEquipment = setTimeout(() => { reject() }, 5000)
                tempStartInterval = setInterval(() => {
                  let connection = store.getters['ui/getGlucometerConnectionStatus']
                  let battery = store.getters['ui/getGlucometerBatteryStatus']
                  // console.warn('connection', connection)
                  // console.warn('battery', battery)
                  if (connection) {
                    connectionIsOk = true
                  } else {
                    errorPhrase = 'GLUCOMETER_NO_CONNECTION'
                  }
                  if (battery) {
                    batteryIsOk = true
                  } else {
                    errorPhrase = 'GLUCOMETER_NO_CHARGE'
                  }
                  // Если и батарея и связь не работают - говорим общую фразу
                  if (!batteryIsOk && !connectionIsOk) {
                    errorPhrase = ''
                  }
                  if (batteryIsOk && connectionIsOk) resolve()
                }, 250)
              }).then(() => {
                // Если глюкометр подключен и заряжен - убрать спиннер и перейти в состояние измерения
                clearInterval(tempStartInterval)
                glucometer_finger = 0
                actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': false, 'timeout': 0 })
                actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'MEASUREMENT_' + payload.data + '_' + store.getters['ui/getMeasurementStep'], 'timeout': 0 })
                actions.forEach(item => {
                  setTimeout(() => {
                    store.dispatch(item.name, { meta: pm, data: item.options })
                  }, item.timeout)
                })
              }, () => {
                // console.warn('errorPhrase', errorPhrase)
                connectionIsOk = false
                batteryIsOk = false
                clearInterval(tempStartInterval)
                actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': false, 'timeout': 0 })
                actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'START_NEW', 'timeout': 0 })
                actions.push({ 'name': 'robot/abortRobotReplic', 'options': null, 'timeout': 100 })
                if (errorPhrase) {
                  actions.push({ 'name': 'robot/sayReplicByName', 'options': { step: errorPhrase, terminate: true }, 'timeout': 200 })
                } else {
                  actions.push({ 'name': 'robot/sayText', 'options': 'Извините, в данный момент это оборудование недоступно', 'timeout': 200 })
                }
                actions.forEach(item => {
                  setTimeout(() => {
                    store.dispatch(item.name, { meta: pm, data: item.options })
                  }, item.timeout)
                })
              })
            }

            /**
             *  Термометрия: проверка работоспособности и переход к измерению
             */
            if (payload.data === EXAMINATION_TYPE.THERMO && store.getters['ui/getMeasurementStep'] === 1) { // Переход к замеру температуры
              new Promise((resolve, reject) => {
                actions = []
                isEquipment = setTimeout(() => { reject() }, 10000)
                if (!topic_t) {
                  reject()
                } else {
                  let countInterval = 0
                  tempStartInterval = setInterval(() => {
                    let d = store.getters['ui/getMeasuredDataFromTopic']
                    if (typeof d !== 'undefined' && d !== null && d.type === 6 && d.message.distance >= 0) {
                      countInterval++
                    }
                    if (countInterval > 0) {
                      clearTimeout(isEquipment)
                      resolve()
                    }
                  }, 250)
                }
              }).then(result => {
                clearInterval(tempStartInterval)
                actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': false, 'timeout': 0 })
                actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'MEASUREMENT_' + payload.data + '_' + store.getters['ui/getMeasurementStep'], 'timeout': 0 })
                actions.forEach(item => {
                  setTimeout(() => {
                    store.dispatch(item.name, { meta: pm, data: item.options })
                  }, item.timeout)
                })
              }, () => {
                clearInterval(tempStartInterval)
                actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': false, 'timeout': 0 })
                actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'START_NEW', 'timeout': 0 })
                actions.push({ 'name': 'robot/abortRobotReplic', 'options': null, 'timeout': 100 })
                actions.push({ 'name': 'robot/sayText', 'options': 'Извините, в данный момент это оборудование недоступно', 'timeout': 200 })
                actions.forEach(item => {
                  setTimeout(() => {
                    store.dispatch(item.name, { meta: pm, data: item.options })
                  }, item.timeout)
                })
              })
            }

            /**
             *  Тонометр: проверка работоспособности и переход к измерению
             */
            if (payload.data === EXAMINATION_TYPE.TONOMETER && store.getters['ui/getMeasurementStep'] === 1) {
              new Promise((resolve, reject) => {
                actions = []
                if (!topic_pressure_start) reject()
                isEquipment = setTimeout(() => { reject() }, 10000)
                resolve()
              }).then(result => {
                actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': false, 'timeout': 0 })
                actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'MEASUREMENT_' + payload.data + '_' + store.getters['ui/getMeasurementStep'], 'timeout': 0 })
                if (store.getters['ui/getIsExaminationStarted'] === true) actions.push({ 'name': 'ui/setHeaderBtnLeftEnabled', 'options': false, 'timeout': 100 })
                actions.forEach(item => {
                  setTimeout(() => {
                    store.dispatch(item.name, { meta: pm, data: item.options })
                  }, item.timeout)
                })
              }, () => {
                if (store.getters['ui/getIsExaminationStarted']) {
                  actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': false, 'timeout': 0 })
                  actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'IBS', 'timeout': 0 })
                } else {
                  actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': false, 'timeout': 0 })
                  actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'START_NEW', 'timeout': 0 })
                  actions.push({ 'name': 'robot/abortRobotReplic', 'options': null, 'timeout': 100 })
                  actions.push({ 'name': 'robot/sayText', 'options': 'Извините, в данный момент это оборудование недоступно', 'timeout': 200 })
                }
                actions.forEach(item => {
                  setTimeout(() => {
                    store.dispatch(item.name, { meta: pm, data: item.options })
                  }, item.timeout)
                })
              })
            }

            /**
             *  Ростометр + весы: проверка работоспособности и переход к измерению
             */
            if (payload.data === EXAMINATION_TYPE.WEIGHT_HEIGHT && store.getters['ui/getMeasurementStep'] === 1) { // Переход к замеру роста и веса
              new Promise((resolve, reject) => {
                actions = []
                isEquipment = setTimeout(() => { reject() }, 1000)
                let request = new ROSLIB.ServiceRequest({
                  data: false
                })
                global.getRostomerReady.callService(request, function (result) {
                  (result.success === true) ? resolve() : reject()
                })
              }).then(result => {
                actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': false, 'timeout': 0 })
                actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'MEASUREMENT_' + payload.data + '_' + store.getters['ui/getMeasurementStep'], 'timeout': 0 })
                actions.forEach(item => {
                  setTimeout(() => {
                    store.dispatch(item.name, { meta: pm, data: item.options })
                  }, item.timeout)
                })
              }, () => {
                if (store.getters['ui/getIsExaminationStarted']) {
                  actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': false, 'timeout': 0 })
                  actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'IMT', 'timeout': 0 })
                  actions.push({ 'name': 'ui/setImtStep', 'options': 0, 'timeout': 0 })
                } else {
                  actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': false, 'timeout': 0 })
                  actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'START_NEW', 'timeout': 0 })
                  actions.push({ 'name': 'robot/abortRobotReplic', 'options': null, 'timeout': 100 })
                  actions.push({ 'name': 'robot/sayText', 'options': 'Извините, в данный момент это оборудование недоступно', 'timeout': 100 })
                }
                actions.forEach(item => {
                  setTimeout(() => {
                    store.dispatch(item.name, { meta: pm, data: item.options })
                  }, item.timeout)
                })
              })
            }
          }
          break
        /**
         * Если прибор прислал данные - запускаются эти плагины сразу,
         * не дожидаясь состояния UI
         */
        case 'ui/SET_MEASURED_DATA_FROM_TOPIC':
          if (['MEASUREMENT_3_3', 'MEASUREMENT_3_1'].includes(store.getters['engine/getCurrentStateName'])) {
            if (typeof payload.data !== 'undefined' && payload.data !== null && payload.data.type === 3 && payload.data.message.calibrated) { // Рост и вес
              // console.log('setMeasuredDataFromTopic =', payload.data)
              dispatch('ui/setMeasuredData', {
                meta: pm,
                data: [
                  {
                    'name': 'ui/setUserWeight',
                    'data': Number(payload.data.message.weight.toFixed(1)),
                    'image': store.getters['app/getIconsSVG'].weight,
                    'text': 'Вес, кг'
                  },
                  {
                    'name': 'ui/setUserGrowth',
                    'data': Number(payload.data.message.height.toFixed(0)),
                    'image': store.getters['app/getIconsSVG'].height,
                    'text': 'Рост, см'
                  }
                ]
              })
              dispatch('engine/handlerMoveToState', {
                meta: pm,
                data: 'MEASUREMENT_3_4'
              })
              dispatch('ui/setMeasuredDataFromTopic', {
                meta: pm,
                data: null
              })
              let s = Number(payload.data.message.weight.toFixed(0)) / Math.pow(Number(payload.data.message.height.toFixed(0)) / 100, 2)
              let phrase = (s <= 20) ? 'RES_WEIGHT_0' : (s <= 25) ? 'RES_WEIGHT_1' : (s <= 30) ? 'RES_WEIGHT_2' : 'RES_WEIGHT_3'
              setTimeout(() => {
                dispatch('robot/sayReplicByName', {
                  meta: pm,
                  data: { 'step': phrase, 'terminate': true }
                })
              }, 500)
            }
          }
          break
        /**
         * Приборы производят измерения в соответствующих состояниях,
         * где MEASUREMENT_<тип прибора(1-4)_<шаг измерения>>
         */
        case 'engine/SET_CURRENT_STATE_NAME':

          if (['START_NEW'].includes(payload.data)) {
            // console.warn('localStorage', localStorage)
            // console.warn('localStorage id', store.getters['faces/getUserGeneral'].id)
            // console.warn('localStorage item', localStorage.getItem('med_' + String(store.getters['faces/getUserGeneral'].id)))
            let lsUserMeasurements = JSON.parse(localStorage.getItem('med_' + String(store.getters['faces/getUserGeneral'].id))) || {}
            Object.keys(lsUserMeasurements).forEach(function (key) {
              this[key].forEach(item => {
                dispatch(item.name, {
                  meta: payload.meta,
                  data: item.options
                })
              })
            }, lsUserMeasurements)
          }

          if (['PROMO'].includes(payload.data)) { // при рестарте кейса сбрасываю возможные начатые измерения приборов
            if (isCaseStarted === false && typeof topic_pressure_start !== 'undefined') {
              isCaseStarted = true
              topic_pressure_start.publish(msg_c1)
            }
            if (typeof topic_pressure_cancel !== 'undefined') topic_pressure_cancel.publish(msg_c2)
            if (typeof topic_glukometr_stop !== 'undefined') topic_glukometr_stop.publish(msg)
            if (isSocket === true) socket_s.send('stopTest')
          }

          if (['PROMO', 'START_NEW'].includes(payload.data)) { // при рестарте и на стрртовом экране кейса сбрасываю все данные в null, отменяю все таймауты и интервалы
            clearInterval(spirographMeasure)
            clearInterval(tempStartInterval)
            clearInterval(spirographTube)
            clearInterval(spirographInterval)
            clearInterval(measurementProcess['med_2'])
            clearInterval(measurementProcess['med_6_3'])
            clearInterval(measurementProcess['med_6_1'])
            clearInterval(measurementProcess['med_6'])
            clearInterval(measurementProcess['med_5'])
            clearInterval(saturatsiyaInterval)

            clearTimeout(isEquipment)
            clearTimeout(saturatsiyaTimeout)
            clearTimeout(spirographTimeout)
            clearTimeout(measurementProcess['med_6_2'])
            clearTimeout(measurementProcess['med_3'])

            spirographMeasure = null
            tempStartInterval = null
            spirographTube = null
            spirographInterval = null
            isEquipment = null
            saturatsiyaTimeout = null
            saturatsiyaInterval = null
            spirographTimeout = null

            measurementProcess = { 'med_2': null, 'med_3': null, 'med_4': null, 'med_5': null, 'med_6': null, 'med_6_1': null, 'med_6_2': null, 'med_6_3': null }
            glucometer_finger = null
            actions = []

            dispatch('ui/setMeasuredDataFromTopic', {
              meta: pm,
              data: null
            })
            if (isHandScript === true) {
              // console.log('STOP SCRIPT HAND')
              isHandScript = null
              dispatch('robot/stopScript', {
                meta: pm,
                data: null
              })
            }
          }
          // начало - обработка данных от дополнительного оборудования

          // Включение скрипта поворота головы всех экранах кроме указанных
          if (store.getters['head/getEnabled'] === false && ['MEASUREMENT_3_3', 'MEASUREMENT_2_2', 'MEASUREMENT_4_2', 'MEASUREMENT_4_6', 'MEASUREMENT_5_1', 'MEASUREMENT_5_2'].includes(payload.data) === false) {
            dispatch('head/setEnabled', {
              meta: pm,
              data: true
            })
          }

          // Пульсоксиметрия

          // Стоп измерения при успехе или ошибке. SATURATSIYA_ERROR - для старого пульсоксиметра, подключенного к спирографу
          if (['MEASUREMENT_4_1', 'MEASUREMENT_4_3', 'MEASUREMENT_4_7', 'SPIROGRAPHIA_ERROR', 'SATURATSIYA_ERROR', 'START_NEW'].includes(payload.data)) {
            if (isSocket === true) socket_s.send('stopTest')
          }

          /**
           * ЗАМЕР САТУРАЦИИ. 2 ВОЗМОЖНЫХ ПРИБОРА
           */
          if (['MEASUREMENT_4_2'].includes(payload.data)) {
            /**
             * НОВЫЙ ПУЛЬСОКСИМЕТР. СЛУШАЕТ ТОПИК, НЕ ЗАВИСИТ ОТ СПИРОГРАФА
             */
            // TODO для подключения раскоментировать топик в main.js
            store.dispatch('ui/setMeasuredDataFromTopic', {
              meta: pm,
              data: null
            })
            let i = 0
            let i_max = 80
            let j = 0 // Считаю сколько раз пальца нет
            let f = 0 // Считаю сколько раз значение меньше 90
            let f_max = 10
            saturatsiyaInterval = setInterval(() => {
              let pd = store.getters['ui/getMeasuredDataFromTopic']
              // console.warn('pd', JSON.stringify(pd))
              if (typeof pd !== 'undefined' && pd !== null && pd.type === '4_2') {
                j = (pd?.message?.data?.state === ['NO_FINGER'] ? j + 1 : 0)
                let s = Number(Number(pd.message.data.SpO2).toFixed(0))
                if (s >= 90 && s !== 255 && i >= 4) {
                  dispatch('ui/setMeasuredData', {
                    meta: pm,
                    data: [
                      {
                        'name': 'ui/setUserSaturatsiya',
                        'data': s,
                        'image': store.getters['app/getIconsSVG'].vessel,
                        'text': 'SpO<sub>2</sub>',
                        'dopText': '%'
                      }
                    ]
                  })
                  dispatch('engine/handlerMoveToState', {
                    meta: pm,
                    data: 'MEASUREMENT_4_3'
                  })
                  let phrase = (s < 95) ? 'RES_SAT_1' : 'RES_SAT_0'
                  setTimeout(() => {
                    dispatch('robot/sayReplicByName', {
                      meta: pm,
                      data: { 'step': phrase, 'terminate': true }
                    })
                  }, 500)
                }
                if (s < 90) {
                  f++
                  // console.log('f =', f, ', s =', s)
                }
                if (f > 0 && s === 255) f = 0
                if (f >= f_max) i = i_max
              }
              if (i === i_max || j === 8) { // Таймаут или нет пальца
                dispatch('ui/setMeasuredData', {
                  meta: pm,
                  data: [
                    {
                      'name': 'ui/setUserSaturatsiya',
                      'data': null,
                      'image': store.getters['app/getIconsSVG'].vessel,
                      'text': 'SpO<sub>2</sub>',
                      'dopText': '%'
                    }
                  ]
                })
                dispatch('engine/handlerMoveToState', {
                  meta: pm,
                  data: 'SATURATSIYA_ERROR'
                })
              }
              i++
            }, 250)
            /**
             * СТАРЫЙ ПУЛЬСОКСИМЕТР. ПОЛУЧАЕТ ДАННЫЕ ИЗ СПИРОГРАФА
             */
            //   store.dispatch('ui/setMeasuredDataFromTopic', {
            //     meta: pm,
            //     data: null
            //   })
            //   socket_s.send('startOxi')
            //   let i = 0
            //   saturatsiyaInterval = setInterval(() => {
            //     let pd = store.getters['ui/getMeasuredDataFromTopic']
            //     // console.warn('startOxiResponse', JSON.stringify(pd.message))
            //     if (pd?.type === '4_2') {
            //       let s = Number(Number(pd.message.SpO2).toFixed(0))
            //       if (s >= 90) {
            //         dispatch('ui/setMeasuredData', {
            //           meta: pm,
            //           data: [
            //             {
            //               'name': 'ui/setUserSaturatsiya',
            //               'data': s,
            //               'image': store.getters['app/getIconsSVG'].vessel,
            //               'text': 'SpO<sub>2</sub>',
            //               'dopText': '%'
            //             }
            //           ]
            //         })
            //         dispatch('engine/handlerMoveToState', {
            //           meta: pm,
            //           data: 'MEASUREMENT_4_3'
            //         })
            //         let phrase = (s < 95) ? 'RES_SAT_1' : 'RES_SAT_0'
            //         setTimeout(() => {
            //           dispatch('robot/sayReplicByName', {
            //             meta: pm,
            //             data: { 'step': phrase, 'terminate': true }
            //           })
            //         }, 500)
            //       } else {
            //         i = 100
            //       }
            //     }
            //     if (i === 100) { // Таймаут или ошибка
            //       dispatch('ui/setMeasuredData', {
            //         meta: pm,
            //         data: [
            //           {
            //             'name': 'ui/setUserSaturatsiya',
            //             'data': null,
            //             'image': store.getters['app/getIconsSVG'].vessel,
            //             'text': 'SpO<sub>2</sub>',
            //             'dopText': '%'
            //           }
            //         ]
            //       })
            //       dispatch('engine/handlerMoveToState', {
            //         meta: pm,
            //         data: 'SATURATSIYA_ERROR'
            //       })
            //     }
            //     i++
            //   }, 250)
            /**
             * общая часть
              */
          } else if (saturatsiyaInterval !== null) {
            clearInterval(saturatsiyaInterval)
            saturatsiyaInterval = null
          }

          // Спирография
          if (['MEASUREMENT_4_5'].includes(payload.data)) { // Началась проверка трубки спирографа
            // let i = 0
            // Вставленную трубку не проверяем т.к. нет такого функционала

            // spirographTube = setInterval(() => {
            //   if (i === 20) {
            //     actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'MEASUREMENT_4_6', 'timeout': 0 })
            //     actions.forEach(item => {
            //       setTimeout(() => {
            //         store.dispatch(item.name, { meta: pm, data: item.options })
            //       }, item.timeout)
            //     })
            //   }
            //   i++
            // }, 500)
            spirographInterval = setInterval(() => {
              actions.push({ 'name': 'robot/sayReplicByName', 'options': { 'step': 'HOW_TO_INSERT_SPIROGRAPH_TUBE', 'terminate': true }, 'timeout': 0 })
            }, 30000)
            spirographTimeout = setTimeout(() => {
              if (spirographInterval !== null) {
                clearInterval(spirographInterval)
                spirographInterval = null
              }
              actions.push({ 'name': 'engine/handlerMoveToState', 'options': 'START_NEW', 'timeout': 0 })
              actions.push({ 'name': 'robot/sayReplicByName', 'options': { 'step': 'START_NEW__NO_SPIROGRAPH_TUBE', 'terminate': true }, 'timeout': 300 })
              actions.forEach(item => {
                setTimeout(() => {
                  store.dispatch(item.name, { meta: pm, data: item.options })
                }, item.timeout)
              })
            }, 180000)
          } else {
            if (spirographInterval !== null) {
              clearInterval(spirographInterval)
              spirographInterval = null
            }
            if (spirographTube !== null) {
              clearInterval(spirographTube)
              spirographTube = null
            }
            if (spirographTimeout !== null) {
              clearTimeout(spirographTimeout)
              spirographTimeout = null
            }
          }

          if (['MEASUREMENT_4_6'].includes(payload.data)) { // Начался замер спирографом
            store.dispatch('ui/setMeasuredDataFromTopic', {
              meta: pm,
              data: null
            })
            setTimeout(() => {
              socket_s.send('startFvc')
              let i = 0
              spirographMeasure = setInterval(() => {
                let pd = store.getters['ui/getMeasuredDataFromTopic']
                // store.dispatch('ui/setUserGrowth', {
                //   meta: pm,
                //   data: 188
                // })
                // pd = { 'type':'4_6', 'message': { 'FVC': 6, 'FEV1': 6, 'PEF': 7 } }
                if (typeof pd !== 'undefined' && pd !== null && pd.type === '4_6') {
                  // console.warn('СПИРОГРАФИЯ РАСПОЗНАНА', pd.message)
                  if (pd.message['FVC'] > 0 && pd.message['FEV1'] > 0 && pd.message['PEF'] > 0) {
                    // console.warn('СПИРОГРАФИЯ НОРМ')
                    dispatch('ui/setUserSpirographia', {
                      meta: pm,
                      data: pd.message
                    })
                    dispatch('ui/setMeasuredData', {
                      meta: pm,
                      data: [
                        {
                          'name': 'ui/setUserSpirographia',
                          'data': pd.message,
                          'image': '',
                          'text': ''
                        }
                      ]
                    })
                    dispatch('engine/handlerMoveToState', {
                      meta: pm,
                      data: 'MEASUREMENT_4_7'
                    })
                  } else {
                    i = 200
                  }
                }
                if (i === 200) {
                  dispatch('engine/handlerMoveToState', {
                    meta: pm,
                    data: 'SPIROGRAPHIA_ERROR'
                  })
                }
                i++
              }, 250)
            }, 8000)
          } else if (spirographMeasure !== null) {
            clearInterval(spirographMeasure)
            spirographMeasure = null
          }

          // Глюкометрия
          if (['MEASUREMENT_2_2'].includes(payload.data)) { // Начался замер глюкометром первого пальца
            let f_trust = 0
            clearTimeout(isEquipment)
            // Очистить хранилище данных, получаемых из приборов по сокету
            dispatch('ui/setMeasuredDataFromTopic', {
              meta: pm,
              data: null
            })
            // останавливаем текущее измерение
            topic_glukometr_stop.publish(msg)
            setTimeout(() => {
              // говорим глюкометру что мереем новый палец и стартуем
              let msg_gl = new ROSLIB.Message({ data: glucometer_finger })
              topic_glukometr_start.publish(msg_gl)
            }, 1500)
            setTimeout(() => {
              let i = 0
              let percent = null
              let max_i = 50
              measurementProcess['med_2'] = setInterval(() => {
                let pd = store.getters['ui/getMeasuredDataFromTopic']
                // MOK
                // const pd = PD.GLUCOMETR_RESULT
                if (typeof pd !== 'undefined' && pd !== null && pd.type === 2) {
                  if (typeof pd.message.data === 'number') {
                    topic_glukometr_stop.publish(msg)
                    glucometer_finger = 0
                    dispatch('ui/setMeasuredData', {
                      meta: pm,
                      data: [
                        {
                          'name': 'ui/setUserGlukometr',
                          'data': Number((pd.message.data).toFixed(1)),
                          'image': store.getters['app/getIconsSVG'].glucometer,
                          'text': 'ммоль/л'
                        }
                      ]
                    })
                    dispatch('engine/handlerMoveToState', {
                      meta: pm,
                      data: 'MEASUREMENT_2_5'
                    })
                    if (store.getters['ui/getIsExaminationStarted'] !== true) {
                      let s = Number((pd.message.data).toFixed(1))
                      let phrase = (s <= 3.3) ? 'RES_GLUK_0' : (s <= 5.5) ? 'RES_GLUK_1' : (s <= 10) ? 'RES_GLUK_2' : 'RES_GLUK_3'
                      setTimeout(() => {
                        dispatch('robot/sayReplicByName', {
                          meta: pm,
                          data: { 'step': phrase, 'terminate': true }
                        })
                      }, 500)
                    }
                  }
                }
                if (typeof pd !== 'undefined' && pd !== null && pd.type === 22) {
                  // console.warn('[glucomerty data]:', i, pd.message.percent, pd.message.finger_trust, pd.message.finger, glucometer_finger)
                  if (pd.message.finger_trust > 0 && pd.message.finger_trust < 100) {
                    f_trust++
                  }
                  if (pd.message.finger_trust === 100) f_trust = 0
                  if (f_trust === 12) {
                    f_trust = 0
                    i = i - 8
                    dispatch('robot/sayText', {
                      meta: pm,
                      data: 'Вы неправильно вставили палец в прибор. Прижмите его к нижней решетчатой части'
                    })
                  }
                  if (pd.message.finger === glucometer_finger && pd.message.finger_trust === 100 && pd.message.percent !== percent) {
                    i = 0
                    percent = pd.message.percent
                  }
                  if (pd.message.percent === 100) {
                    if (glucometer_finger === 0) {
                      glucometer_finger = 1
                      dispatch('engine/handlerMoveToState', {
                        meta: payload.meta,
                        data: 'MEASUREMENT_2_3'
                      })
                    } else if (glucometer_finger === 1) {
                      glucometer_finger = 2
                      dispatch('engine/handlerMoveToState', {
                        meta: payload.meta,
                        data: 'MEASUREMENT_2_4'
                      })
                    }
                  }
                }
                if (i === max_i || (typeof pd !== 'undefined' && pd !== null && pd.message.finger_trust === 0)) {
                  topic_glukometr_stop.publish(msg)
                  glucometer_finger = 0
                  dispatch('engine/handlerMoveToState', {
                    meta: payload.meta,
                    data: 'CLUKOMETR_ERROR'
                  })
                }
                i++
              }, 250)
            }, 3000)
          } else if (measurementProcess['med_2'] !== null) {
            clearInterval(measurementProcess['med_2'])
            measurementProcess['med_2'] = null
          }

          // Замер температуры
          if (measurementProcess['med_6_3'] !== null && ['MEASUREMENT_6_3', 'MEASUREMENT_6_3_ERROR'].includes(payload.data) === false) {
            clearInterval(measurementProcess['med_6_3'])
            measurementProcess['med_6_3'] = null
          }
          if (['MEASUREMENT_6_3', 'MEASUREMENT_6_3_ERROR'].includes(payload.data) && isHandScript === true) {
            let allowableDistanceAttempt = 0 // количество произведенных попыток установить голову пользователя перед термометром внутри дистанции измерения
            let farDistanceAttempt = 0 // количество произведенных попыток установить пользователя на дистанцию измерения
            // Фраза для температуры
            if (['MEASUREMENT_6_3'].includes(payload.data)) {
              let temperature = store.getters['ui/getUserTemperature']
              let phrase = (temperature <= 36) ? 'RES_TEMPRATURE_0' : (temperature <= 36.9) ? 'RES_TEMPRATURE_1' : (temperature <= 37.9) ? 'RES_TEMPRATURE_2' : 'RES_TEMPRATURE_3'
              setTimeout(() => {
                dispatch('robot/sayReplicByName', {
                  meta: pm,
                  data: { 'step': phrase, 'terminate': true }
                })
              }, 500)
            }
            measurementProcess['med_6_3'] = setInterval(() => {
              let pd = store.getters['ui/getMeasuredDataFromTopic']
              if (typeof pd !== 'undefined' && pd !== null && pd.type === 6) {
                // пользователь в измерительном интервале, но слишком близко к роботу - ближе 3,6 см
                if (allowableDistanceAttempt % 36 === 0 && allowableDistanceAttempt > 0) {
                  dispatch('robot/sayText', {
                    meta: pm,
                    data: 'Пожалуйста, отойдите, чтобы я мог опустить руку'
                  })
                }
                // если пользователь достаточно близко к термометру - сброс счетчика позвать пользователя и приращение счетчика установить перед термометром
                if (pd.message.distance < 150) {
                  allowableDistanceAttempt++
                  farDistanceAttempt = 0
                // иначе - приращение счетчика позвать пользователя
                } else {
                  farDistanceAttempt++
                }
                // console.warn(allowableDistanceAttempt, farDistanceAttempt, pd.message.distance)
                // попытки позвать пользователя иссякли, отключаем работу руки с термометром
                if (farDistanceAttempt > 10) {
                  // console.log('STOP SCRIPT HAND')
                  clearInterval(measurementProcess['med_6_3'])
                  measurementProcess['med_6_3'] = null
                  dispatch('robot/stopScript', {
                    meta: pm,
                    data: null
                  })
                  setTimeout(() => {
                    let scriptName = 'hands_down'
                    dispatch('robot/startScript', {
                      meta: pm,
                      data: scriptName
                    })
                  }, 1000)
                  dispatch('ui/setMeasuredDataFromTopic', {
                    meta: pm,
                    data: { 'type': '6_4', 'message': null }
                  })
                  isHandScript = null
                  if (['MEASUREMENT_6_3'].includes(payload.data)) {
                    dispatch('robot/sendDialogMuteOff', {
                      meta: pm,
                      data: true
                    })
                  }
                }
              }
            }, 250)
          }
          if (isHandScript === true && ['MEASUREMENT_6_3', 'MEASUREMENT_6_3_ERROR'].includes(payload.data) === false) {
            // console.warn('STOP SCRIPT HAND')
            clearInterval(measurementProcess['med_6_3'])
            measurementProcess['med_6_3'] = null
            dispatch('robot/stopScript', {
              meta: pm,
              data: null
            })
            dispatch('ui/setMeasuredDataFromTopic', {
              meta: pm,
              data: { 'type': '6_4', 'message': null }
            })
            isHandScript = null
            dispatch('robot/sendDialogMuteOff', {
              meta: pm,
              data: true
            })
          }
          // if (measurementProcess['med_6_1'] !== null && ['MEASUREMENT_6_2', 'MEASUREMENT_6_3', 'MEASUREMENT_6_3_ERROR'].includes(payload.data) === false) {
          if (measurementProcess['med_6_1'] !== null && ['MEASUREMENT_6_2'].includes(payload.data) === false) {
            // console.warn('exit 6_2, 6_3')
            clearInterval(measurementProcess['med_6_1'])
            measurementProcess['med_6_1'] = null
            // isHandScript = null
          }

          if (['MEASUREMENT_6_2'].includes(payload.data)) { // Начался замер температуры
            let i = 0
            measurementProcess['med_6_1'] = setInterval(() => {
              if (store.getters['robot/getDialogMuteOnStatus'] !== true) {
                dispatch('robot/sendDialogMuteOn', {
                  meta: pm,
                  data: true
                })
              }
            }, 250)
            dispatch('robot/stopScript', {
              meta: pm,
              data: null
            })
            // console.warn('stopScript')
            // dispatch('robot/sayText', {
            //   meta: pm,
            //   data: 'Когда я подниму руку, поднесите лоб к моей ладони'
            // })
            let offSet = 7800
            let temperatureDefault = (typeof store.getters['robot/getRobotSettings']?.application?.jsRobotSettings?.temperatureDefault !== 'undefined') ? store.getters['robot/getRobotSettings'].application.jsRobotSettings.temperatureDefault : 29500
            let distCorrect = (typeof store.getters['robot/getRobotSettings']?.application?.jsRobotSettings?.distanceDefault !== 'undefined') ? store.getters['robot/getRobotSettings'].application.jsRobotSettings.distanceDefault : 550
            // console.warn('temperatureDefault', temperatureDefault)
            // console.warn('distCorrect', distCorrect)
            setTimeout(() => {
              let envTemp = store.getters['ui/getMeasuredDataFromTopic']
              // console.warn('envTemp', envTemp)
              if (typeof offSet !== 'undefined' && offSet !== null && envTemp.type === 6 && envTemp.message.distance > 180 && envTemp.message.distance < 300) offSet = temperatureDefault - envTemp.message.temperature
              dispatch('ui/setEnvTemperature', {
                meta: pm,
                data: offSet
              })
              // console.warn('TEMP OFFSET', offSet)
              let scriptName = 'motions/middlenewnext_f64ddb37_6f1c_4428_8d30_305738b8ce27/middlenewnext_f64ddb37_6f1c_4428_8d30_305738b8ce27.json'
              if (store.getters['ui/getUserGrowth'] > 170) {
                scriptName = 'motions/maxnewnext_f64ddb37_6f1c_4428_8d30_305738b8ce27/maxnewnext_f64ddb37_6f1c_4428_8d30_305738b8ce27.json'
              }
              isHandScript = true
              dispatch('robot/startScript', {
                meta: pm,
                data: scriptName
              })
              // console.warn('START SCRIPT HAND')
            }, 2500)
            measurementProcess['med_6_2'] = setTimeout(() => {
              measurementProcess['med_6'] = setInterval(() => {
                let pd = store.getters['ui/getMeasuredDataFromTopic']
                if (typeof pd !== 'undefined' && pd !== null && pd.type === 6) {
                  tempLong = (pd.message.distance > 250) ? tempLong + 1 : tempLong = 0
                  if (tempLong === tempLongRes) {
                    dispatch('robot/sayText', {
                      meta: pm,
                      data: 'Поднесите Ваш лоб к моей левой ладони'
                    })
                    tempLong = -10
                    /**
                     * ЭМУЛЯТОР: отправляем в псевдотопик сигнал но то, что пользователь подошел вплотную к термометру
                     */
                    // global.topic_t.publish(new ROSLIB.Message(
                    //   {
                    //     distance: 70,
                    //     temperature: 36600
                    //   }
                    // ))
                  }
                  tempShort = (tempLong === 0 && pd.message.distance > 100) ? tempShort + 1 : tempShort = 0
                  if (tempShort === tempShortRes) {
                    dispatch('robot/sayText', {
                      meta: pm,
                      data: 'Ваш лоб должен быть еще ближе к моей ладони'
                    })
                    tempShort = -10
                  }
                  tempResult = (tempLong === 0 && tempShort === 0) ? tempResult + 1 : tempResult = 0
                  if (tempResult === tempResultRes) {
                    // console.warn('tempResultRes', tempResultRes)
                    // console.warn('tempResult', tempResult)
                    let tt = Number(((pd.message.temperature + offSet + (((pd.message.distance - 50) / 10 * distCorrect))) / 1000).toFixed(1))
                    /**
                     * ЭМУЛЯТОР: хардкод результатов измерения
                     */
                    // tt = 36.6
                    if (tt >= 35 && tt <= 39) {
                      // console.log('pd temp', pd)
                      dispatch('ui/setMeasuredData', {
                        meta: pm,
                        data: [
                          {
                            'name': 'ui/setUserTemperature',
                            'data': tt,
                            'image': 'dialog-images/temp.png',
                            'text': 'Температура, &deg;C'
                          }
                        ]
                      })
                      dispatch('ui/setUserTemperature', {
                        meta: pm,
                        data: tt
                      })
                      dispatch('ui/setMeasuredDataFromTopic', {
                        meta: pm,
                        data: null
                      })
                      dispatch('engine/handlerMoveToState', {
                        meta: pm,
                        data: 'MEASUREMENT_6_3'
                      })
                      tempResult = 0
                    } else {
                      i = 90
                    }
                    /**
                     * ЭМУЛЯТОР: отправляем в псевдотопик сигнал о том, что температура измерена и можно вырубать аппарат
                     */
                    // global.topic_t.publish(new ROSLIB.Message(
                    //   {
                    //     distance: 999,
                    //     temperature: 1000
                    //   }
                    // ))
                  }
                }
                if (i === 90) {
                  dispatch('ui/setMeasuredData', {
                    meta: payload.meta,
                    data: [
                      {
                        'name': 'ui/setUserTemperature',
                        'data': null,
                        'image': 'dialog-images/temp.png',
                        'text': 'Температура, &deg;C'
                      }
                    ]
                  })
                  dispatch('ui/setMeasuredDataFromTopic', {
                    meta: pm,
                    data: null
                  })
                  dispatch('engine/handlerMoveToState', {
                    meta: pm,
                    data: 'MEASUREMENT_6_3_ERROR'
                  })
                  // dispatch('robot/sayText', {
                  //   meta: pm,
                  //   data: 'При замере температуры произошла ошибка'
                  // })
                }
                i++
              }, 250)
            }, 19000)
          } else if (measurementProcess['med_6'] !== null || measurementProcess['med_6_2'] !== null) {
            // Замерить температуру не удалось
            clearInterval(measurementProcess['med_6'])
            clearTimeout(measurementProcess['med_6_2'])
            measurementProcess['med_6'] = null
            measurementProcess['med_6_2'] = null
          }

          // Замер давления
          if (['MEASUREMENT_5_1'].includes(payload.data)) { // Отмена текущей тонометрии
            topic_pressure_cancel.publish(msg_c)
          }
          if (['MEASUREMENT_5_2'].includes(payload.data)) {
            // let msg = new ROSLIB.Message({})
            // let msg_c = new ROSLIB.Message({})
            let msg_c1 = new ROSLIB.Message({})
            let msg_c2 = new ROSLIB.Message({})
            dispatch('robot/stopScript', {
              meta: pm,
              data: null
            })
            // Начался замер давления и пульса
            // console.warn('pressure_start', topic_pressure_start)
            topic_pressure_start.publish(msg_c2)
            setTimeout(() => {
              let i = 0
              // let j = 0
              // let rt_data = null
              let max_i = 40
              // Дефолтные данные давления и пульса
              let s = null
              let d = null
              let p = null
              // По умолчанию состояние измерения - ошибка,
              // Если измерение будет успешным - состояние изменится на MEASUREMENT_5_3 с выводом данных
              let st = 'MEASUREMENT_5_3_ERROR'
              measurementProcess['med_5'] = setInterval(() => {
                let pd = store.getters['ui/getMeasuredDataFromTopic']
                // if (pd?.type == 51) console.warn('==', JSON.stringify(pd.message.data))
                if (typeof pd !== 'undefined' && pd !== null && pd.type === 51) {
                  // console.warn('ПЛАГИН УВИДЕЛ СТАТУСЫ ТОНОМЕТРА', pd.message.data.state)
                  if (pd.message.data.state.includes('MEASURING')) {
                    i = 0
                  }
                  if (pd.message.data.errors.length > 2) i = max_i
                  if (pd.message.data.state.includes('FINISHED') && pd.message.data.systolic > 50) {
                    i = max_i
                    s = Number(pd.message.data.systolic.toFixed(0))
                    d = Number(pd.message.data.diastolic.toFixed(0))
                    p = Number(pd.message.data.heart_rate.toFixed(0))
                    st = 'MEASUREMENT_5_3'
                    // Если измерение ОК - заполняем данные ручного ввода,
                    // Чтобы не предлагать пользователю ввести в ручную АД
                    dispatch('ui/setUserArtPressureEnter', {
                      meta: pm,
                      data: s
                    })
                  }
                }
                // Давление измерено, либо ошибка, либо достигнуто максимальное время измерения (40 сек)
                if (i >= max_i) {
                  // console.warn('ИЗМЕРЕНИЕ ДАВЛЕНИЯ ЗАВЕРШЕНО')
                  setTimeout(() => {
                    topic_pressure_cancel.publish(msg_c1)
                  }, 200)
                  // console.warn('Systolic:', s)
                  // console.warn('Diastolic', d)
                  // console.warn('Heart rate', p)
                  dispatch('ui/setMeasuredData', {
                    meta: pm,
                    data: [
                      {
                        'name': 'ui/setUserArtPressure',
                        'data': s,
                        'image': store.getters['app/getIconsSVG'].bloodPressure,
                        'text': 'Давление'
                      },
                      {
                        'name': 'ui/setUserArtPressureLow',
                        'data': d,
                        'image': store.getters['app/getIconsSVG'].bloodPressure,
                        'text': 'Нижнее значение',
                        'hidden': true
                      },
                      {
                        'name': 'ui/setUserPulse',
                        'data': p,
                        'image': store.getters['app/getIconsSVG'].pulse,
                        'text': 'Пульс'
                      }
                    ]
                  })
                  dispatch('ui/setMeasuredDataFromTopic', {
                    meta: pm,
                    data: null
                  })
                  dispatch('engine/handlerMoveToState', {
                    meta: pm,
                    data: st
                  })
                  if (st === 'MEASUREMENT_5_3') {
                    let phrase = (s <= 70) ? 'RES_SYSTOLIC_0' : (s <= 90) ? 'RES_SYSTOLIC_1' : (s <= 140) ? 'RES_SYSTOLIC_2' : (s <= 180) ? 'RES_SYSTOLIC_3' : 'RES_SYSTOLIC_4'
                    // console.warn('[pressure phrase]: ', phrase)
                    setTimeout(() => {
                      dispatch('robot/sayReplicByName', {
                        meta: pm,
                        data: { 'step': phrase, 'terminate': true }
                      })
                    }, 500)
                  }
                }
                i++

                // Старый замер на запястье
                // if (typeof pd !== 'undefined' && pd !== null && pd.type == 51 && typeof(pd.message.data) === 'number' && pd.message.data !== rt_data) {
                //   i = 0
                //   j++
                //   rt_data = pd.message.data
                // }
                // console.log('i =', i, ' measure is going')
                // if (i === max_i || (typeof pd !== 'undefined' && pd !== null && (pd.type == 52 || (pd.type == 5 && j > 10)))) {
                //   console.log('pd =', pd)
                //   let s = 120
                //   let d = 80
                //   let p = null
                //   let st = 'MEASUREMENT_5_3_ERROR'
                //   if (i !== max_i && pd.type == 5 && pd.message.systolic > 50) {
                //     s = Number(pd.message.systolic.toFixed(0))
                //     d = Number(pd.message.diastolic.toFixed(0))
                //     p = Number(pd.message.heart_rate.toFixed(0))
                //     st = 'MEASUREMENT_5_3'
                //     dispatch('ui/setUserArtPressureEnter', {
                //       meta: pm,
                //       data: s
                //     })
                //   }
                //   setTimeout(() => {
                //     topic_pressure_cancel.publish(msg_c1)
                //   }, 1000)
                //   dispatch('ui/setMeasuredData', {
                //     meta: pm,
                //     data: [
                //       {
                //         'name': 'ui/setUserArtPressure',
                //         'data': s,
                //         'image': 'dialog-images/pressure.png',
                //         'text': 'Давление'
                //       },
                //       {
                //         'name': 'ui/setUserArtPressureLow',
                //         'data': d,
                //         'image': 'dialog-images/height.png',
                //         'text': 'Нижнее значение',
                //         'hidden': true
                //       },
                //       {
                //         'name': 'ui/setUserPulse',
                //         'data': p,
                //         'image': 'dialog-images/puls.png',
                //         'text': 'Пульс'
                //       }
                //     ]
                //   })
                //   dispatch('ui/setMeasuredDataFromTopic', {
                //     meta: pm,
                //     data: null
                //   })
                //   dispatch('engine/handlerMoveToState', {
                //     meta: pm,
                //     data: st
                //   })
                //   if (store.getters['ui/getIsExaminationStarted'] !== true && st === 'MEASUREMENT_5_3') {
                //     let phrase = (s <= 70) ? 'RES_SYSTOLIC_0' : (s <= 90) ? 'RES_SYSTOLIC_1' : (s <= 140) ? 'RES_SYSTOLIC_2' : (s <= 180) ? 'RES_SYSTOLIC_3' : 'RES_SYSTOLIC_4'
                //     setTimeout(() => {
                //       dispatch('robot/sayReplicByName', {
                //         meta: pm,
                //         data: { 'step': phrase, 'terminate': true }
                //       })
                //     }, 500)
                //   }
                // }
                // i++
              }, 250)
            }, 1500)
          } else if (measurementProcess['med_5'] !== null) {
            clearInterval(measurementProcess['med_5'])
            measurementProcess['med_5'] = null
          }

          // Рост вес
          if (['MEASUREMENT_3_3'].includes(payload.data)) {
            // По умолчанию состояние измерения - ошибка,
            // Если измерение будет успешным - состояние изменится на MEASUREMENT_3_4 с выводом данных (логика прописана отдельно)
            measurementProcess['med_3'] = setTimeout(() => { // Сбрасываю измерение если прошло более 25 сек. и результата нет
              dispatch('ui/setMeasuredData', {
                meta: pm,
                data: [
                  {
                    'name': 'ui/setUserWeight',
                    'data': null,
                    'image': store.getters['app/getIconsSVG'].weight,
                    'text': 'Вес, кг'
                  },
                  {
                    'name': 'ui/setUserGrowth',
                    'data': null,
                    'image': store.getters['app/getIconsSVG'].height,
                    'text': 'Рост, см'
                  }
                ]
              })
              dispatch('engine/handlerMoveToState', {
                meta: pm,
                data: 'MEASUREMENT_3_4_ERROR'
              })
            }, 25000)
          } else if (measurementProcess['med_3'] !== null) {
            clearTimeout(measurementProcess['med_3'])
            measurementProcess['med_3'] = null
          }
          // конец - обработка данных от дополнительного оборудования
          break
      }
    })
  }
}
