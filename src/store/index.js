import robotModule from './robot'
// import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default (logger, api) => ({
  strict: true,
  modules: {
    robot: robotModule
  },
  plugins: [
  ]

  /*
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
  */
})
