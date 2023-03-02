import robotModule from './modules/robot'
import robotPlugin from './plugins/robot'

import applicationModule from './modules/app'
import applicationPlugin from './plugins/application'

import engineModule from './modules/engine'
import uiModule from './modules/ui'

// FEATURES-FACES
import facesModule from '@/features/faces/module'
import facesPlugin from '@/features/faces/plugin'
import facesLogic from '@/features/faces/logic'
// FEATURES-ACQUAINTANCE
import acquaintanceModule from '@/features/acquaintance/module'
import acquaintancePlugin from '@/features/acquaintance/plugin'

import dispenserModule from './modules/dispenser'
import dispenserPlugin from './plugins/dispenser'

import handlersModule from './modules/handlers'
// FEATURES-HEAD
import headModule from '@/features/head/module'
import headPlugin from '@/features/head/plugin'
// CONTROLLERS
import debugCustomController from './controllers/debugCustomController'
import facesController from './controllers/facesController'
import redirectController from './controllers/redirectController'
import subtitlesController from './controllers/subtitlesController'
import sipController from './controllers/sipController'
import greetingController from './controllers/greetingController'
import dispenserController from './controllers/dispenserController'
import socketController from './controllers/socketController'
import equipmentController from './controllers/equipmentController'
import appController from './controllers/appController'

export default (logger, promobot) => ({
  strict: true,
  modules: {
    robot: robotModule,
    engine: engineModule,
    app: applicationModule,
    ui: uiModule,
    head: headModule,
    faces: facesModule,
    acquaintance: acquaintanceModule,
    handlers: handlersModule,
    dispenser: dispenserModule
  },
  plugins: [
    // FEATURES
    robotPlugin(logger, promobot),
    applicationPlugin(logger),
    facesPlugin(logger),
    facesLogic(logger),
    acquaintancePlugin(logger),
    dispenserPlugin(logger),
    headPlugin(),
    // CONTROLLERS
    debugCustomController(logger),
    facesController(logger),
    redirectController(logger),
    subtitlesController(logger),
    sipController(logger),
    greetingController(logger),
    dispenserController(logger),
    socketController(logger),
    equipmentController(logger),
    appController(logger, promobot)
  ]
})
