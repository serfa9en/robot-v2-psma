export const stateFaceRecognize = {
  faceRecognize: {
    info: [],
    general: {
      id: null,
      setted: null,
      frame: null,
      set: null
    },
    autotracking: null,
    photo: {
      path: null
    },
    face: {
      add: null,
      del: null,
      status: null
    },
    head: {
      enabled: null
    },
    borders: {
      enabled: null
    }
  }
}

export const actionsFaceRecognize = {
  faceRecognizeGeneralTouchRequest: ({ commit }, payload) => commit('FACE_RECOGNIZE_GENERAL_TOUCH_REQUEST', payload),
  faceRecognizeInfoResponse: ({ commit }, payload) => commit('FACE_RECOGNIZE_INFO_RESPONSE', payload),
  faceRecognizeGeneralIdResponse: ({ commit }, payload) => commit('FACE_RECOGNIZE_GENERAL_ID_RESPONSE', payload),
  faceRecognizeGeneralSettedResponse: ({ commit }, payload) => commit('FACE_RECOGNIZE_GENERAL_SETTED_RESPONSE', payload),
  faceRecognizeGeneralFrameRequest: ({ commit }, payload) => commit('FACE_RECOGNIZE_GENERAL_FRAME_REQUEST', payload),
  faceRecognizeGeneralFrameResponse: ({ commit }, payload) => commit('FACE_RECOGNIZE_GENERAL_FRAME_RESPONSE', payload),
  faceRecognizeAutotrackingRequest: ({ commit }, payload) => commit('FACE_RECOGNIZE_AUTOTRACKING_REQUEST', payload),
  faceRecognizeGeneralSetRequest: ({ commit }, payload) => commit('FACE_RECOGNIZE_GENERAL_SET_REQUEST', payload),
  faceRecognizeSavePhotoRequest: ({ commit }, payload) => commit('FACE_RECOGNIZE_SAVE_PHOTO_REQUEST', payload),
  faceRecognizeAddFaceRequest: ({ commit }, payload) => commit('FACE_RECOGNIZE_ADD_FACE_REQUEST', payload),
  faceRecognizeDelFaceRequest: ({ commit }, payload) => commit('FACE_RECOGNIZE_DEL_FACE_REQUEST', payload),
  faceRecognizeAddFaceStatusResponse: ({ commit }, payload) => commit('FACE_RECOGNIZE_ADD_FACE_STATUS_RESPONSE', payload),
  faceRecognizeHeadEnabledRequest: ({ commit }, payload) => commit('FACE_RECOGNIZE_HEAD_ENABLED_REQUEST', payload),
  faceRecognizeBordersEnabledRequest: ({ commit }, payload) => commit('FACE_RECOGNIZE_BORDERS_ENABLED_REQUEST', payload),
  faceRecognizeRefreshFacesRequest: ({ commit }, payload) => commit('FACE_RECOGNIZE_REFRESH_FACES_REQUEST', payload)
}

export const mutationsFaceRecognize = {
  FACE_RECOGNIZE_GENERAL_TOUCH_REQUEST: (state, payload) => { },
  FACE_RECOGNIZE_INFO_RESPONSE: (state, payload) => { state.faceRecognize.info = payload.data },
  FACE_RECOGNIZE_GENERAL_ID_RESPONSE: (state, payload) => { state.faceRecognize.general.id = payload.data },
  FACE_RECOGNIZE_GENERAL_SETTED_RESPONSE: (state, payload) => { state.faceRecognize.general.setted = payload.data },
  FACE_RECOGNIZE_GENERAL_FRAME_RESPONSE: (state, payload) => { state.faceRecognize.general.frame = payload.data },
  FACE_RECOGNIZE_GENERAL_FRAME_REQUEST: (state, payload) => { },
  FACE_RECOGNIZE_AUTOTRACKING_REQUEST: (state, payload) => { state.faceRecognize.autotracking = payload.data },
  FACE_RECOGNIZE_GENERAL_SET_REQUEST: (state, payload) => { state.faceRecognize.general.set = payload.data },
  FACE_RECOGNIZE_SAVE_PHOTO_REQUEST: (state, payload) => { state.faceRecognize.photo.path = payload.data },
  FACE_RECOGNIZE_ADD_FACE_REQUEST: (state, payload) => { state.faceRecognize.face.add = payload.data },
  FACE_RECOGNIZE_DEL_FACE_REQUEST: (state, payload) => { state.faceRecognize.face.del = payload.data },
  FACE_RECOGNIZE_ADD_FACE_STATUS_RESPONSE: (state, payload) => { state.faceRecognize.face.status = payload.data },
  FACE_RECOGNIZE_HEAD_ENABLED_REQUEST: (state, payload) => { state.faceRecognize.head.enabled = payload.data },
  FACE_RECOGNIZE_BORDERS_ENABLED_REQUEST: (state, payload) => { state.faceRecognize.borders.enabled = payload.data },
  FACE_RECOGNIZE_REFRESH_FACES_REQUEST: (state, payload) => { }
}

export const gettersFaceRecognize = {
  getFaceRecognizeInfo: state => state.faceRecognize.info,
  getFaceRecognizeGeneralId: state => state.faceRecognize.general.id,
  getFaceRecognizeGeneralSetted: state => state.faceRecognize.general.setted,
  getFaceRecognizeGeneralFrame: state => state.faceRecognize.general.frame,
  getFaceRecognizeAutotracking: state => state.faceRecognize.autotracking,
  getFaceRecognizeGeneralSet: state => state.faceRecognize.general.set,
  getFaceRecognizePhotoPath: state => state.faceRecognize.photo.path,
  getFaceRecognizeAddFace: state => state.faceRecognize.face.add,
  getFaceRecognizeDelFace: state => state.faceRecognize.face.del,
  getFaceRecognizeAddFaceStatus: state => state.faceRecognize.face.status,
  getFaceRecognizeHeadEnabled: state => state.faceRecognize.head.enabled,
  getFaceRecognizeBordersEnabled: state => state.faceRecognize.borders.enabled
}
