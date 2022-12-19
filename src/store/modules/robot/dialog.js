export const stateDialog = {
  dialog: {
    // mute: false,
    // question: null,
    // action: null,
    // userReplic: null,
    // robotReplic: null,
    // answer: null,
    // greeting: null,
    // replic: null,
    // extra: null,
    // macroses: null,
    // case: null
  }
}

export const actionsDialog = {
  // dialogMuteRequest: ({ commit }, payload) => commit('DIALOG_MUTE_REQUEST', payload),
  // dialogMuteOnRequest: ({ commit }, payload) => commit('DIALOG_MUTE_ON_REQUEST', payload),
  // dialogMuteOffRequest: ({ commit }, payload) => commit('DIALOG_MUTE_OFF_REQUEST', payload),
  // dialogAbortRobotReplicRequest: ({ commit }, payload) => commit('DIALOG_ABORT_ROBOT_REPLIC_REQUEST', payload),
  // dialogGetReplicRequest: ({ commit }, payload) => commit('DIALOG_GET_REPLIC_REQUEST', payload),
  // dialogGetReplicByNameRequest: ({ commit }, payload) => commit('DIALOG_GET_REPLIC_BY_NAME_REQUEST', payload),
  // dialogSayAnswerByDataRequest: ({ commit }, payload) => commit('DIALOG_SAY_ANSWER_BY_DATA_REQUEST', payload),
  // dialogSayReplicByNameRequest: ({ commit }, payload) => commit('DIALOG_SAY_REPLIC_BY_NAME_REQUEST', payload),
  dialogSayReplicByDataRequest: ({ commit }, payload) => commit('DIALOG_SAY_REPLIC_BY_DATA_REQUEST', payload)
  // dialogSayTextRequest: ({ commit }, payload) => commit('DIALOG_SAY_TEXT_REQUEST', payload),
  // dialogSetAnswerRequest: ({ commit }, payload) => commit('DIALOG_SET_ANSWER_REQUEST', payload),
  // dialogExternalPlayRequest: ({ commit }, payload) => commit('DIALOG_EXTERNAL_PLAY_REQUEST', payload),
  // dialogExternalPlayStopRequest: ({ commit }, payload) => commit('DIALOG_EXTERNAL_PLAY_STOP_REQUEST', payload),
  // dialogQuestionResponse: ({ commit }, payload) => commit('DIALOG_QUESTION_RESPONSE', payload),
  // dialogActionResponse: ({ commit }, payload) => commit('DIALOG_ACTION_RESPONSE', payload),
  // dialogUserReplicResponse: ({ commit }, payload) => commit('DIALOG_USER_REPLIC_RESPONSE', payload),
  // dialogRobotReplicStartResponse: ({ commit }, payload) => commit('DIALOG_ROBOT_REPLIC_START_RESPONSE', payload),
  // dialogRobotReplicFinishResponse: ({ commit }, payload) => commit('DIALOG_ROBOT_REPLIC_FINISH_RESPONSE', payload),
  // dialogLoadAnswerResponse: ({ commit }, payload) => commit('DIALOG_LOAD_ANSWER_RESPONSE', payload),
  // dialogLoadGreetingResponse: ({ commit }, payload) => commit('DIALOG_LOAD_GREETING_RESPONSE', payload),
  // dialogLoadReplicResponse: ({ commit }, payload) => commit('DIALOG_LOAD_REPLIC_RESPONSE', payload),
  // dialogLoadExtraReplicResponse: ({ commit }, payload) => commit('DIALOG_LOAD_EXTRA_REPLIC_RESPONSE', payload),
  // dialogSetMacroses: ({ commit }, payload) => commit('DIALOG_SET_MACROSES', payload),
  // dialogSetCase: ({ commit }, payload) => commit('DIALOG_SET_CASE', payload)
}

export const mutationsDialog = {
  // DIALOG_MUTE_REQUEST: (state, payload) => { state.dialog.mute = payload.data },
  // DIALOG_MUTE_ON_REQUEST: (state, payload) => { state.dialog.mute = true },
  // DIALOG_MUTE_OFF_REQUEST: (state, payload) => { state.dialog.mute = false },
  // DIALOG_ABORT_ROBOT_REPLIC_REQUEST: (state, payload) => { },
  // DIALOG_GET_REPLIC_REQUEST: (state, payload) => { },
  // DIALOG_GET_REPLIC_BY_NAME_REQUEST: (state, payload) => { },
  // DIALOG_SAY_ANSWER_BY_DATA_REQUEST: (state, payload) => { },
  // DIALOG_SAY_REPLIC_BY_NAME_REQUEST: (state, payload) => { },
  DIALOG_SAY_REPLIC_BY_DATA_REQUEST: (state, payload) => { }
  // DIALOG_SAY_TEXT_REQUEST: (state, payload) => { },
  // DIALOG_SET_ANSWER_REQUEST: (state, payload) => { },
  // DIALOG_EXTERNAL_PLAY_REQUEST: (state, payload) => { },
  // DIALOG_EXTERNAL_PLAY_STOP_REQUEST: (state, payload) => { },
  // DIALOG_QUESTION_RESPONSE: (state, payload) => { state.dialog.question = payload.data },
  // DIALOG_ACTION_RESPONSE: (state, payload) => { state.dialog.action = payload.data },
  // DIALOG_USER_REPLIC_RESPONSE: (state, payload) => { state.dialog.userReplic = payload.data },
  // DIALOG_ROBOT_REPLIC_START_RESPONSE: (state, payload) => { state.dialog.robotReplic = payload.data },
  // DIALOG_ROBOT_REPLIC_FINISH_RESPONSE: (state, payload) => { state.dialog.robotReplic = payload.data },
  // DIALOG_LOAD_ANSWER_RESPONSE: (state, payload) => { state.dialog.answer = payload.data },
  // DIALOG_LOAD_GREETING_RESPONSE: (state, payload) => { state.dialog.greeting = payload.data },
  // DIALOG_LOAD_REPLIC_RESPONSE: (state, payload) => { state.dialog.replic = payload.data },
  // DIALOG_LOAD_EXTRA_REPLIC_RESPONSE: (state, payload) => { state.dialog.extra = payload.data },
  // DIALOG_SET_MACROSES: (state, payload) => { state.dialog.macroses = payload.data },
  // DIALOG_SET_CASE: (state, payload) => { state.dialog.case = payload.data.name }
}

export const gettersDialog = {
  // getDialogMute: state => state.dialog.mute,
  // getDialogQuestion: state => state.dialog.question,
  // getDialogAction: state => state.dialog.action,
  // getDialogUserPreplic: state => state.dialog.userReplic,
  // getDialogRobotPreplic: state => state.dialog.robotReplic,
  // getDialogAnswer: state => state.dialog.answer,
  // getDialogReplic: state => state.dialog.replic,
  // getDialogExtraReplic: state => state.dialog.extra,
  // getDialogMacroses: state => state.dialog.macroses,
  // getDialogCase: state => state.dialog.case
}
