import robotModule from './modules/robot'
import robotPlugin from './plugins/robot'

import applicationModule from './modules/app'

import engineModule from './modules/engine'
import uiModule from './modules/ui'
import handlersModule from './modules/handlers'

// FEATURES-FACES
import facesModule from '@/features/faces/module'
import facesPlugin from '@/features/faces/plugin'
import facesLogic from '@/features/faces/logic'
// FEATURES-ACQUAINTANCE
import acquaintanceModule from '@/features/acquaintance/module'
import acquaintancePlugin from '@/features/acquaintance/plugin'

// CONTROLLERS
import facesController from './controllers/facesController'
import greetingController from './controllers/greetingController'
import socketController from './controllers/socketController'
import appController from './controllers/appController'

export default (logger, promobot) => ({
  strict: true,
  modules: {
    robot: robotModule,
    engine: engineModule,
    app: applicationModule,
    ui: uiModule,
    handlers: handlersModule,
    faces: facesModule,
    acquaintance: acquaintanceModule
  },
  plugins: [
    // FEATURES
    robotPlugin(logger, promobot),
    facesPlugin(logger),
    facesLogic(logger),
    acquaintancePlugin(logger),
    // CONTROLLERS
    facesController(logger),
    greetingController(logger),
    socketController(logger),
    appController(logger, promobot)
  ]
})
