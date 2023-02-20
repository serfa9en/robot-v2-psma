import packageSettings from '../package.json'

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
