import { getDescription, getName, getPath } from '../../dataStorage/specialist'

export const stateUserMeasurement = {
  current_specialist: {
    number: null, // id
    name: null, // Наименование
    description: null, // Описание
    path: null // Путь - папка с картинками
  },
  result: {
    // true/false - хорошо/плохо
    // если плохо? Вывести вопросы?
    specialist: {
      cardiologist: null,
      neurologist: null,
      gastroenterologist: null,
      gynecologist: null,
      urologist: null,
      coloproctologist: null,
      ophtalmologist: null,
      otorinolaringologist: null,
      endocrinologist: null
    }
  }
}

export const actionsUserMeasurement = {
  setSpecialistNumber: ({ commit }, payload) => commit('SET_SPECIALIST_NUMBER', payload),

  // результаты специалистов
  setResultSpecialistCardiologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_CARDIOLOGIST', payload),
  setResultSpecialistNeurologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_NEUROLOGIST', payload),
  setResultSpecialistGastroenterologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_GASTROENTEROLOGIST', payload),
  setResultSpecialistGynecologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_GYNECOLOGIST', payload),
  setResultSpecialistUrologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_UROLOGIST', payload),
  setResultSpecialistColoproctologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_COLOPROCTOLOGIST', payload),
  setResultSpecialistOphtalmologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_OPHTALMOLOGIST', payload),
  setResultSpecialistOtorinolaringologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_OTORINOLARINGOLOGIST', payload),
  setResultSpecialistEndocrinologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_ENDOCRINOLOGIST', payload)
}

export const mutationsUserMeasurement = {
  SET_SPECIALIST_NUMBER: (state, payload) => {
    state.current_specialist.number = payload.data
    state.current_specialist.name = getName(payload.data)
    state.current_specialist.description = getDescription(payload.data)
    state.current_specialist.path = getPath(payload.data)
  },

  // результаты специалистов
  SET_RESULT_SPECIALIST_CARDIOLOGIST: (state, payload) => { state.result.specialist.cardiologist = payload.data },
  SET_RESULT_SPECIALIST_NEUROLOGIST: (state, payload) => { state.result.specialist.neurologist = payload.data },
  SET_RESULT_SPECIALIST_GASTROENTEROLOGIST: (state, payload) => { state.result.specialist.gastroenterologist = payload.data },
  SET_RESULT_SPECIALIST_GYNECOLOGIST: (state, payload) => { state.result.specialist.gynecologist = payload.data },
  SET_RESULT_SPECIALIST_UROLOGIST: (state, payload) => { state.result.specialist.urologist = payload.data },
  SET_RESULT_SPECIALIST_COLOPROCTOLOGIST: (state, payload) => { state.result.specialist.coloproctologist = payload.data },
  SET_RESULT_SPECIALIST_OPHTALMOLOGIST: (state, payload) => { state.result.specialist.ophtalmologist = payload.data },
  SET_RESULT_SPECIALIST_OTORINOLARINGOLOGIST: (state, payload) => { state.result.specialist.otorinolaringologist = payload.data },
  SET_RESULT_SPECIALIST_ENDOCRINOLOGIST: (state, payload) => { state.result.specialist.endocrinologist = payload.data }
}

export const gettersUserMeasurement = {
  getSpecialistNumber: state => state.current_specialist.number,
  getSpecialistName: state => state.current_specialist.name,
  getSpecialistDescription: state => state.current_specialist.description,
  getSpecialistPath: state => state.current_specialist.path,

  // результаты специалистов
  getResultSpecialistCardiologist: state => state.result.specialist.cardiologist,
  getResultSpecialistNeurologist: state => state.result.specialist.neurologist,
  getResultSpecialistGastroenterologist: state => state.result.specialist.gastroenterologist,
  getResultSpecialistGynecologist: state => state.result.specialist.gynecologist,
  getResultSpecialistUrologist: state => state.result.specialist.urologist,
  getResultSpecialistColoproctologist: state => state.result.specialist.coloproctologist,
  getResultSpecialistOphtalmologist: state => state.result.specialist.ophtalmologist,
  getResultSpecialistOtorinolaringologist: state => state.result.specialist.otorinolaringologist,
  getResultSpecialistEndocrinologist: state => state.result.specialist.endocrinologist
}
