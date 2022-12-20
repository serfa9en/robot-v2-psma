// const deepExtend = require('deep-extend')
import { stateFaceRecognize, actionsFaceRecognize, mutationsFaceRecognize, gettersFaceRecognize } from './faceRecognize'

function initialState () {
  return {
    ...stateFaceRecognize,
    robot: {
      environment: null
    },
    camera: {
      is_open: null,
      error: ''
    }
  }
}

export default {
  namespaced: true,
  state: initialState(),
  actions: {
    ...actionsFaceRecognize,
    // environment
    setEnvironment: ({ commit, state }, payload) => commit('SET_ENVIRONMENT', payload),
    // CAMERA
    sendCameraStartRequest: ({ commit }, payload) => commit('SEND_CAMERA_START_REQUEST', payload),
    sendCameraStartResponse: ({ commit }, payload) => commit('SEND_CAMERA_START_RESPONSE', payload),
    sendCameraPhotoRequest: ({ commit }, payload) => commit('SEND_CAMERA_PHOTO_REQUEST', payload),
    sendCameraPhotoResponse: ({ commit }, payload) => commit('SEND_CAMERA_PHOTO_RESPONSE', payload),
    sendCameraStopRequest: ({ commit }, payload) => commit('SEND_CAMERA_STOP_REQUEST', payload),
    setCameraError: ({ commit }, payload) => commit('SET_CAMERA_ERROR', payload),
    setCameraIsOpen: ({ commit }, payload) => commit('SET_CAMERA_IS_OPEN', payload)
  },
  mutations: {
    ...mutationsFaceRecognize,
    // environment
    SET_ENVIRONMENT: (state, payload) => { state.robot.environment = payload.data },
    // CAMERA
    SEND_CAMERA_START_REQUEST: (state, payload) => { },
    SEND_CAMERA_START_RESPONSE: (state, payload) => { },
    SEND_CAMERA_PHOTO_REQUEST: (state, payload) => { },
    SEND_CAMERA_PHOTO_RESPONSE: (state, payload) => { },
    SEND_CAMERA_STOP_REQUEST: (state, payload) => { },
    SET_CAMERA_ERROR: (state, payload) => { state.camera.error = payload.data },
    SET_CAMERA_IS_OPEN: (state, payload) => { state.camera.is_open = payload.data }
  },
  getters: {
    ...gettersFaceRecognize,
    // CAMERA
    getCameraError: state => state.camera.error,
    getCameraIsOpen: state => state.camera.is_open
  }
}
