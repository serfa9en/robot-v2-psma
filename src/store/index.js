import robotModule from './modules/robot'
import applicationModule from './modules/app'
import engineModule from './modules/engine'
import uiModule from './modules/ui'
import handlersModule from './modules/handlers'

// FEATURES-FACES
import facesModule from '@/features/faces/module'
import facesPlugin from '@/features/faces/plugin'
import facesLogic from '@/features/faces/logic'

import facesController from './controllers/facesController'
import greetingController from './controllers/greetingController'

export default (logger, promobot) => ({
  strict: true,
  modules: {
    robot: robotModule,
    engine: engineModule,
    app: applicationModule,
    ui: uiModule,
    handlers: handlersModule,
    face: facesModule
  },
  plugins: [
    facesPlugin(logger),
    facesLogic(logger),

    facesController(logger),
    greetingController(logger)
  ]
})
