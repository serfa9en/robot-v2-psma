// import { msToTime } from '@/utils'
import { EXAMINATION_TYPE } from '@/constants'

let filterTimeout
let filterTimeoutDelay = 3000

let toStartTimeout
let toStartTimeoutDelay = 5000
let timerUserActionActive = null
let timerPromoSearch = null

export function applicationPlugin (logger) {
  return store => {
    let dispatch = store.dispatch
    let getter = store.getters
    // in
    // subscribe
    store.subscribe((mutation, state) => {
      let payload = mutation.payload
      let currentState = getter['engine/getCurrentStateName']

      /**
       * Логгирование всех мутаций кроме SET_MEASURED_DATA_FROM_TOPIC
       */
      // if (mutation.type !== 'ui/SET_MEASURED_DATA_FROM_TOPIC') console.log(msToTime(parseInt(new Date().getTime())), mutation)
      // if (mutation.type === 'faces/SET_USER_GENERAL') (typeof payload.data !== 'undefined' && payload.data !== null) ? console.log('Назначен главный id=' + payload.data.id) : console.log('Назначен главный пустой')

      // Очищение данных пользователя
      if (mutation.type === 'app/CLEAR_USERS_DATA') {
        let knownFaces = Array.isArray(JSON.parse(localStorage.getItem('knownFaces'))) ? JSON.parse(localStorage.getItem('knownFaces')) : []
        let updatedKnownFaces = [...knownFaces]
        let knownFacesIds = knownFaces.map(face => face.id)

        const facesLifeTime = getter['robot/getRobotSettings']?.application?.faces?.faces_lifetime ? store.getters['robot/getRobotSettings']?.application?.faces?.faces_lifetime * 60000 : 86400000 * 3 // 3 days default
        if (knownFaces.length > 0) {
          for (let face of knownFaces) {
            const nowTime = Date.now()
            // Проверка времени жизни постоянных лиц
            if (face.hasOwnProperty('timeStamp') && face.timeStamp + facesLifeTime <= nowTime) {
              robot.faceRecognizeService.delFace(face.id)
              robot.userService.deleteUser(face.id)
              localStorage.removeItem('med_' + face.id)
              updatedKnownFaces = updatedKnownFaces.filter(oldFace => face.id !== oldFace.id)
            }
          }
          localStorage.setItem('knownFaces', JSON.stringify(updatedKnownFaces))
        }
        // Если в списке полей с данными есть временные - удалить их. Постоянных оставить
        Object.keys(localStorage).forEach((key) => {
          // console.warn('-------------------------------------------------------------')
          // console.warn('Поле стораджа', key.replace('med_',''))
          // console.warn('Это данные измерений?', key.startsWith('med_'))
          // if (key.startsWith('med_')) {
          //   console.warn('числовой айди', Number(key.replace('med_','')))
          //   console.warn('Чел есть среди постоянных?', knownFacesIds.includes(Number(key.replace('med_',''))))
          // }
          // console.warn('-------------------------------------------------------------')
          if (key.startsWith('med_') && !knownFacesIds.includes(Number(key.replace('med_', '')))) {
            localStorage.removeItem(key)
          }
        })
      }

      // From Robot
      switch (mutation.type) {
        case 'ui/SET_SPINNER_ENABLED':
          if (payload.data) {
            store.dispatch('robot/sendDialogMuteOn', {
              meta: payload.meta
            })
            dispatch('robot/keyboardHideRequest', {
              meta: payload.meta
            })
          } else {
            if (store.getters['app/getIsImportantPhrase'] !== true) {
              store.dispatch('robot/sendDialogMuteOff', {
                meta: payload.meta
              })
            }
          }
          break
        case 'engine/SET_CURRENT_STATE_NAME':
          if (['START', 'START-1'].includes(getter['engine/getCurrentStateName'])) {
            setTimeout(() => {
              clearTimeout(timerPromoSearch)
              let currentUser = getter['robot/getFaceRecognizeInfo'].find(user => user.is_tracking && [2, 3].includes(user.type))
              if (currentUser) {
                store.dispatch('faces/setUserGeneral', {
                  meta: payload.meta,
                  data: currentUser
                })
                store.dispatch('faces/setStateGeneral', {
                  meta: payload.meta,
                  data: 'GENERAL'
                })
              }
            }, 200)
          }

          if (payload.data.startsWith('PRINT')) {
            let talon = 'talon-template.html'
            fetch(talon).then(response => {
              return response.text()
            }).then(template => {
              // Доработать. когда появлятся изменяемые данные
              // for (let k in data) {
              //   if (data.hasOwnProperty(k)) {
              //     this.talon = this.talon.replace(`{${k}}`, data[k]).replace(/\/n/g, '<br>')
              //   }
              // }
              document.getElementById('print_block_wrap').innerHTML = template.split('<br>').join('')
              dispatch('robot/setPrinterData', {
                meta: payload.meta,
                data: template
              })
            })
          }
          break
        case 'robot/SET_USER_ACTION':
          let actions = payload.data
          // console.warn('actions', actions)
          if (Array.isArray(actions)) {
            dispatch('robot/setUserActionActive', {
              meta: payload.meta,
              data: true
            })
            for (let i = 0; i < actions.length; i++) {
              if (actions[i] === 'state') {
                dispatch('engine/handlerMoveToState', {
                  meta: payload.meta,
                  data: actions[i + 1]
                })
                delete actions[i]
                delete actions[i + 1]
              }
              if (actions[i] === 'print') {
                document.getElementById('printBtn').click()
                delete actions[i]
              }
              if (actions[i] === 'meeting') {
                if (currentState === 'MEETING' && document.getElementById('meeting_input').value.replace(/\s/g, '').length > 0) {
                  document.getElementById('meetBtn').click()
                } else {
                  store.dispatch('robot/sayText', {
                    meta: payload.meta,
                    data: 'Введите Ваше имя'
                  })
                  store.dispatch('robot/sendDialogMuteOn', {
                    meta: payload.meta
                  })
                  setTimeout(() => {
                    store.dispatch('robot/sendDialogMuteOff', {
                      meta: payload.meta
                    })
                  }, 2000)
                }
              }
              if (actions[i] === 'ibs-yes') {
                store.dispatch('ui/setRelativesProblems', {
                  meta: payload.meta,
                  data: true
                })
                dispatch('engine/handlerMoveToState', {
                  meta: payload.meta,
                  data: 'IBS-RESULT'
                })
                delete actions[i]
              }
              if (actions[i] === 'ibs-no') {
                store.dispatch('ui/setRelativesProblems', {
                  meta: payload.meta,
                  data: false
                })
                dispatch('engine/handlerMoveToState', {
                  meta: payload.meta,
                  data: 'IBS-RESULT'
                })
                delete actions[i]
              }
              if (actions[i] === 'imt') {
                if (currentState === 'IMT' && getter['ui/getImtStep'] === 0) {
                  // console.log('IMT ACTION', getter['ui/getImtMistake'])
                  /*
                  let mistake = true
                  if (store.getters['ui/getMeasurementHeight'] >= 70 && store.getters['ui/getMeasurementHeight'] <= 250) mistake = false
                  store.dispatch('ui/setImtMistake', {
                    meta: payload.meta,
                    data: mistake
                  })
                  */
                  let action = 'IMT-1'
                  if (getter['ui/getImtMistake']) action = 'IMT-MISTAKE'
                  dispatch('engine/handlerMoveToState', {
                    meta: payload.meta,
                    data: action
                  })
                }
                delete actions[i]
              }
              if (actions[i] === 'imt-1') {
                if (currentState === 'IMT-1' && getter['ui/getImtStep'] === 1) {
                  // console.log('IMT-1 ACTION')
                  /*
                  let mistake = true
                  if (store.getters['ui/getUserWeight'] >= 20 && store.getters['ui/getUserWeight'] <= 250) mistake = false
                  store.dispatch('ui/setImtMistake', {
                    meta: payload.meta,
                    data: mistake
                  })
                  */
                  let action = 'IMT-SUCCESS'
                  if (getter['ui/getImtMistake']) action = 'IMT-MISTAKE-1'
                  dispatch('engine/handlerMoveToState', {
                    meta: payload.meta,
                    data: action
                  })
                }
                delete actions[i]
              }
              if (actions[i] === 'start') {
                if (currentState === 'DIAGNOSTIC_START') {
                  // console.log('START CONSULT')
                  if (document.getElementById('go_1')) {
                    document.getElementById('go_1').click()
                  }
                }
                delete actions[i]
              }
              if (actions[i] === 'to_pressure') {
                if (currentState === 'SMOKE' || currentState === 'SMOKE-1') {
                  if (document.getElementById('gotoIbs')) {
                    document.getElementById('gotoIbs').click()
                  }
                }
                delete actions[i]
              }
              if (typeof actions[i] === 'string' && actions[i].indexOf('autoclick_') === 0) {
                if (document.getElementById(actions[i])) document.getElementById(actions[i]).click()
                delete actions[i]
              }
            }
            clearTimeout(timerUserActionActive)
            timerUserActionActive = setTimeout(() => {
              dispatch('robot/setUserActionActive', {
                meta: payload.meta,
                data: false
              })
              // console.log('UserActionActive--false')
            }, 2000)
          }
          break
      }

      // SCANNER PASSPORT
      switch (mutation.type) {
        case 'app/SET_PASSPORT_DATA':
          if (['PASSPORT-HELP'].includes(currentState)) {
            if (payload.data.dtype === 'MRZ' && payload.data.failureStatus === 0) {
              dispatch('engine/handlerMoveToState', {
                meta: payload.meta,
                data: 'PASSPORT-SUCCESS'
              })
            } else if (payload.data.dtype === 'MSR') {
              dispatch('engine/handlerMoveToState', {
                meta: payload.meta,
                data: 'PASSPORT-SUCCESS'
              })
            } else {
              dispatch('engine/handlerMoveToState', {
                meta: payload.meta,
                data: 'PASSPORT-FAILED'
              })
            }
          }
          break
      }

      // AUDIO
      switch (mutation.type) {
        case 'robot/FROM_AUDIO_FILE':
          // console.log('robot/FROM_AUDIO_FILE', payload.data)
          break
        case 'robot/SEND_AUDIO_START':
          break
        case 'robot/SEND_AUDIO_STOP':
          break
      }

      // MAIL
      switch (mutation.type) {
        case 'robot/FROM_MAIL_SUCCESS':
          dispatch('engine/handlerMoveToState', {
            meta: payload.meta,
            data: 'EMAIL-SUCCESS'
          })
          break
        case 'robot/FROM_MAIL_ERROR':
          dispatch('engine/handlerMoveToState', {
            meta: payload.meta,
            data: 'EMAIL-FAILED'
          })
          break
      }

      switch (mutation.type) {
        case 'robot/FROM_SYSTEM_APPLICATION_FINISHED':
          if (payload.data !== null) {
            // let currentState = getter['engine/getStateCurrent']
            if (payload.data.name === 'org.promobot.termo') {
              // Устанавливаем язык обратно на русский если в термо-модуле пользователь сменил на другой
              dispatch('robot/setRobotLanguage', {
                meta: payload.meta,
                data: 'ru_RU'
              })
              dispatch('robot/setRobotDialogCase', {
                meta: payload.meta,
                data: 'START:extend'
              })
              const thermoResponse = JSON.parse(localStorage.getItem('tempCase')) || {}
              const currentLocalStorageData = JSON.parse(localStorage.getItem('med_' + String(getter['faces/getUserGeneral'].id))) || {}
              if (thermoResponse?.finished) {
                const date = new Date()
                const preparedLocalStorageData = {
                  'name': 'ui/setMeasurementTemperature',
                  'options': thermoResponse.temp.toFixed(1),
                  'type': 'auto',
                  'date': date.getUTCFullYear() + '/' + (date.getUTCMonth() + 1) + '/' + date.getUTCDate() + '_' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
                }
                dispatch('ui/setMeasuredData', {
                  meta: payload.meta,
                  data: [
                    {
                      'name': 'ui/setMeasurementTemperature',
                      'data': thermoResponse.temp.toFixed(1),
                      'image': '../../assets/img/diagnostic/temperature.png',
                      'text': 'Температура, &deg;C'
                    }
                  ]
                })
                dispatch('ui/setMeasurementTemperature', {
                  meta: payload.meta,
                  data: thermoResponse.temp.toFixed(1)
                })
                dispatch('ui/setMeasuredDataFromTopic', {
                  meta: payload.meta,
                  data: null
                })
                currentLocalStorageData[EXAMINATION_TYPE.THERMO_HEAD] = [preparedLocalStorageData]
                localStorage.setItem('med_' + String(getter['faces/getUserGeneral'].id), JSON.stringify(currentLocalStorageData))
              }
            }

            if (payload.data.name === 'org.promobot.locationmap' && payload.data.status === 100 && payload.data.data !== null) {
              dispatch('robot/setRobotDialogSayAnswer', {
                meta: payload.meta,
                data: {
                  answer: payload.data.data,
                  terminate: true
                }
              })
            }
          }
          break
      }

      // CAMERA
      switch (mutation.type) {
        case 'robot/SEND_CAMERA_START_RESPONSE':
          dispatch('robot/setCameraIsOpen', {
            meta: payload.meta,
            data: payload.data
          })
          break

        case 'robot/SEND_CAMERA_PHOTO_RESPONSE':
          if (payload.data !== null) {
            // console.log(payload.data)
            dispatch('robot/sendFilesystemLoadRequest', {
              meta: payload.meta,
              data: {
                mime_type: 'image/png',
                filename: payload.data.split('/home/promobot/').pop()
              }
            })
          }
          break
      }

      // PRINT
      switch (mutation.type) {
        case 'robot/SET_PRINTER_STATUS':
          // if (currentState.startsWith('PRINT')) {
          if (payload.data === 'success') {
            dispatch('robot/sayReplicByName', {
              meta: payload.meta,
              data: {
                step: currentState + '_PRINTING',
                terminate: true
              }
            })
          } else {
            dispatch('robot/sayReplicByName', {
              meta: payload.meta,
              data: {
                step: currentState + '_NO_PRINTING',
                terminate: true
              }
            })
          }
          if (currentState === 'BYE') {
            setTimeout(() => {
              dispatch('engine/handlerMoveToState', {
                meta: payload.meta,
                data: 'DIAGNOSTIC_START'
              })
            }, 15000)
          }
          // }
          break
      }

      // FILESYSTEM
      switch (mutation.type) {
        case 'robot/SEND_FILESYSTEM_LOAD_RESPONSE':
          if (payload.data !== null) {
            let mask = new Image()
            mask.src = 'dialog-images/Mask.png'
            mask.onload = function () {
              let canvas = document.createElement('canvas')
              canvas.width = 1280
              canvas.height = 720
              let ctx = canvas.getContext('2d')

              let pic = new Image()
              pic.src = payload.data.file

              // Вставляем в канвас селфи и маску
              ctx.translate(canvas.width, 0)
              ctx.scale(-1, 1)
              ctx.drawImage(pic, 0, 0)
              ctx.translate(canvas.width, 0)
              ctx.scale(-1, 1)
              ctx.drawImage(mask, canvas.width - mask.width, canvas.height - mask.height, mask.width, mask.height)
              // Преобразуем канвас в base64
              let base64data = canvas.toDataURL('image/jpeg')
              dispatch('app/setSessionPhotoData', {
                meta: payload.meta,
                data: base64data
              })
              dispatch('engine/handlerMoveToState', {
                meta: payload.meta,
                data: 'PHOTO_RATE'
              })
            }
          }
          break
      }
      // MEETING TALK
      switch (mutation.type) {
        case 'robot/USER_TEXT':
          if (payload.data !== null && payload.data.isFinish === true && store.getters['faces/getUserLost'] === false) {
            if (['IBS', 'IBS-1'].includes(store.getters['engine/getCurrentStateName'])) {
              let text = payload.data.text.toLowerCase()
              if (['меньше 4', '1', '2', '3'].includes(payload.data.text)) text = '3'
              if (['больше 8', '9', '10', '11'].includes(payload.data.text)) text = '9'
              let reg = /[^0-9]/g
              text = text.toLowerCase().replace(reg, ' ').replace(/\s{2,}/g, ' ').trim().split(' ')
              text = String(Math.max.apply(null, text))
              text = text.replace(/\s/g, '').replace(/\D+/g, '')
              store.dispatch('ui/setToldIbs', {
                meta: payload.meta,
                data: text
              })
            }
            if (['SMOKE-1'].includes(store.getters['engine/getCurrentStateName'])) {
              let text = payload.data.text + ' '
              let reg = /(через |а |что |будет )/g
              text = text.toLowerCase().replace(/\s{2,}/g, ' ').replace(reg, ' ').replace(/\s{2,}/g, ' ').trim()
              store.dispatch('ui/setToldSmoke', {
                meta: payload.meta,
                data: text
              })
            }
            if (['MEETING', 'IMT', 'IMT-1'].includes(store.getters['engine/getCurrentStateName'])) {
              if (store.getters['robot/getRobotDialogUserActionActive'] !== true) {
                // console.log(payload.data.text)
                let text = ''
                if (['MEETING'].includes(store.getters['engine/getCurrentStateName']) && store.getters['ui/getSpinnerEnabled'] !== true) {
                  text = payload.data.text.toLowerCase()
                  let reg = new RegExp('( я | меня | зовут | звать | мое | моё | робот | my | name | is )', 'g')
                  let regG = new RegExp('([^А-яЁёA-z ])', 'g')
                  let splits = text.replace(regG, '').replace(/\s{2,}/g, ' ').trim().split(' ')
                  text = ''
                  for (let i = 0; i < splits.length; i++) {
                    let item = ' ' + splits[i] + ' '
                    item = item.replace(reg, '').trim()
                    if (item.length > 0) text += item.substring(0, 1).toUpperCase() + item.substring(1) + ' '
                  }
                  text = text.trim()
                  if (text.split(' ').length - 1 > 1) text = ''
                  store.dispatch('app/setSessionName', {
                    meta: payload.meta,
                    data: text
                  })
                }
                if (['IMT', 'IMT-1'].includes(store.getters['engine/getCurrentStateName']) && payload.data.text.replace(/\s/g, '').replace(/\D+/g, '').length > 0) {
                  // text = payload.data.text.replace(/\s/g, '').replace(/\D+/g,"")
                  text = payload.data.text.replace(/[^0-9\.\/\,\ ]/g, '').replace(/\//g, '.').replace(/\,/g, '.').trim().replace(/[\ ]{2,}/g, ' ').split(' ')
                  // console.log(text)
                  text = (text[0].indexOf('.') === -1 && text[1] && text[1] < 10 ? Number(text[0]) + (text[1].indexOf('.') === -1 ? Number(text[1]) / 10 : Number(text[1])) : Number(text[0]))
                  let action = 'ui/setMeasurementHeight'
                  if (store.getters['ui/getImtStep'] === 1) action = 'ui/setMeasurementWeight'
                  if (store.getters['ui/getImtStep'] === 0 && Number(text) > 0 && Number(text) < 100) {
                    text = String(Number(text) + 100)
                  }
                  store.dispatch(action, {
                    meta: payload.meta,
                    data: text
                  })
                }
                if (text !== '') {
                  store.dispatch('robot/sayText', {
                    meta: payload.meta,
                    data: 'Нажмите далее для продолжения'
                  })
                  store.dispatch('robot/sendDialogMuteOn', {
                    meta: payload.meta
                  })
                  setTimeout(() => {
                    store.dispatch('robot/sendDialogMuteOff', {
                      meta: payload.meta
                    })
                  }, 2000)
                  if (document.getElementById('meeting_input')) {
                    document.getElementById('meeting_input').focus()
                  }
                }
                // store.dispatch('app/setMeetingTalk', {
                //   meta: payload.meta,
                //   data: false
                // })
              }
            }
          }
          break
        case 'app/SET_MEETING_TALK':
          clearTimeout(filterTimeout)
          if (mutation.payload.data === true) {
            dispatch('robot/sendDialogMuteOn', {
              meta: payload.meta
            })
          }
          if (mutation.payload.data === false) {
            filterTimeout = setTimeout(() => {
              dispatch('robot/sendDialogMuteOff', {
                meta: payload.meta
              })
            }, filterTimeoutDelay)
          }
          break
      }
      // DIALOG
      switch (mutation.type) {
        case 'ui/SET_DIALOGSCREEN_MODE':
          clearTimeout(toStartTimeout)
          if (payload.data !== null) {
            // console.log(payload.data)
            dispatch('engine/handlerMoveToState', {
              meta: payload.meta,
              data: 'DIALOG'
            })
            dispatch('ui/setDialogScreenAnswers', {
              meta: payload.meta,
              data: getter['app/getAnswer'](payload.data)
            })
            dispatch('ui/setDialogScreenPicUrl', {
              meta: payload.meta,
              data: getter['app/getImage'](payload.data)
            })
            dispatch('ui/setDialogScreenLabel', {
              meta: payload.meta,
              data: getter['app/getLabel'](payload.data)
            })
            // dispatch('robot/setRobotDialogCase', {
            //   meta: payload.meta,
            //   data: 'default'
            // })
            dispatch('robot/sayReplicByName', {
              meta: payload.meta,
              data: {
                step: payload.data,
                terminate: true
              }
            })
            if (mutation.payload.data === 'GOODBYE') {
              toStartTimeout = setTimeout(() => {

              }, toStartTimeoutDelay)
            }
          }
          break
      }
    })
  }
}

export default applicationPlugin
