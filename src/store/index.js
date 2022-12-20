import robotModule from './modules/robot'
import applicationModule from './modules/app'
import engineModule from './modules/engine'
import uiModule from './modules/ui'
import handlersModule from './modules/handlers'

export default (logger, promobot) => ({
  strict: true,
  modules: {
    robot: robotModule,
    engine: engineModule,
    app: applicationModule,
    ui: uiModule,
    handlers: handlersModule
  },
  plugins: [
  ]
})
