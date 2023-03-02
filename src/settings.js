import packageSettings from '../package.json'
import { EXAMINATION_TYPE } from './constants'

export default {
  applicationId: 'org.promobot.' + packageSettings.name, // id приложения
  applicationVersion: packageSettings.version, // версия приложения
  applicationLanguage: '570', // id языка приложения (570 - русский)
  applicationDebug: true,

  // далее параметры эмулятора
  emulator: {
    url: 'http://localhost:8089',
    reconnection: false,
    secure: false
  },

  // параметры для прода
  statistic: {
    url: 'http://localhost:8084',
    reconnection: false,
    secure: false
  },

  thermocontrol: {
    url: 'http://localhost:8089'
  }
}

export const generalAppData = {
  // ВНИМАНИЕ! Порядок массива tiles соответствует отображению плиток с приборами
  tiles: [
    { 'type': EXAMINATION_TYPE.TONOMETER, 'active': 1 },
    { 'type': EXAMINATION_TYPE.WEIGHT_HEIGHT, 'active': 1 },
    { 'type': EXAMINATION_TYPE.THERMO, 'active': 1, 'subtype': EXAMINATION_TYPE.THERMO_HEAD },
    { 'type': EXAMINATION_TYPE.PULSEOXIMETER_SPIROMETER, 'active': 1, 'active_spir': 1, 'active_sat': 1 },
    { 'type': EXAMINATION_TYPE.GLUCOMETER, 'active': 1 },
    { 'type': EXAMINATION_TYPE.SPIROG, 'active': 1 }
  ]
}
