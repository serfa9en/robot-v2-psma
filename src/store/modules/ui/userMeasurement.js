import { getDescription, getName, getPath, getResultGood } from '../../dataStorage/specialist'
import { getDiseaseName, getContextDisease } from '../../dataStorage/disease'

export const stateUserMeasurement = {
  current_specialist: {
    number: null, // id
    name: null, // Наименование
    description: null, // Описание
    path: null, // Путь - папка с картинками
    textResult: null // текст в результатах
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
  },
  button: {
    Pressure: {
      text: null,
      color: '#DC143C'
    },
    Glucometry: {
      text: null,
      color: '#691B26'
    },
    Temperature: {
      text: null,
      color: '#691B26'
    },
    Saturatsiya: {
      text: null,
      color: '#691B26'
    },
    Spirographia: {
      text: null,
      color: '#691B26'
    },
    WeightHeight: {
      text: null,
      color: '#691B26'
    }
  },
  // значения результатов
  measurement: {
    pressure: '120/80',
    glucometry: null,
    temperature: null,
    saturatsiya: null,
    spirographia: null,
    weightHeight: null
  },
  // current disease - не сделана ветка
  current_disease: {
    number: null,
    name: null,
    context_disease: null
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
  setResultSpecialistEndocrinologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_ENDOCRINOLOGIST', payload),

  // кнопки измерений
  setButtonPressureColor: ({ commit }, payload) => commit('SET_BUTTON_PRESSURE_COLOR', payload),
  setButtonGlucometryColor: ({ commit }, payload) => commit('SET_BUTTON_GLUCOMETRY_COLOR', payload),
  setButtonTemperatureColor: ({ commit }, payload) => commit('SET_BUTTON_TEMPERATURE_COLOR', payload),
  setButtonSaturatsiyaColor: ({ commit }, payload) => commit('SET_BUTTON_SATURATSIYA_COLOR', payload),
  setButtonSpirographiaColor: ({ commit }, payload) => commit('SET_BUTTON_SPIROGRAPHIA_COLOR', payload),
  setButtonWeightHeightColor: ({ commit }, payload) => commit('SET_BUTTON_WEIGHTHEIGHT_COLOR', payload),

  // значения измерений
  setMeasurementPressure: ({ commit }, payload) => commit('SET_MEASUREMENT_PRESSURE', payload),
  setMeasurementGlucometry: ({ commit }, payload) => commit('SET_MEASUREMENT_GLUCOMETRY', payload),
  setMeasurementTemperature: ({ commit }, payload) => commit('SET_MEASUREMENT_TEMPERATURE', payload),
  setMeasurementSaturatsiya: ({ commit }, payload) => commit('SET_MEASUREMENT_SATURATSIYA', payload),
  setMeasurementSpirographia: ({ commit }, payload) => commit('SET_MEASUREMENT_SPIROGRAPHIA', payload),
  setMeasurementWeightHeight: ({ commit }, payload) => commit('SET_MEASUREMENT_WEIGHTHEIGHT', payload),

  // риск развития заболевания болезни
  setDiseaseNumber: ({ commit }, payload) => commit('SET_DISEASE_NUMBER', payload)
}

export const mutationsUserMeasurement = {
  SET_SPECIALIST_NUMBER: (state, payload) => {
    state.current_specialist.number = payload.data
    state.current_specialist.name = getName(payload.data)
    state.current_specialist.description = getDescription(payload.data)
    state.current_specialist.path = getPath(payload.data)
    state.current_specialist.textResult = getResultGood(payload.data)
  },

  // кнопки на панели измерений
  SET_BUTTON_PRESSURE_COLOR: (state, payload) => { state.button.Pressure.color = payload.data },
  SET_BUTTON_GLUCOMETRY_COLOR: (state, payload) => { state.button.Glucometry.color = payload.data },
  SET_BUTTON_TEMPERATURE_COLOR: (state, payload) => { state.button.Temperature.color = payload.data },
  SET_BUTTON_SATURATSIYA_COLOR: (state, payload) => { state.button.Saturatsiya.color = payload.data },
  SET_BUTTON_SPIROGRAPHIA_COLOR: (state, payload) => { state.button.Spirographia.color = payload.data },
  SET_BUTTON_WEIGHTHEIGHT_COLOR: (state, payload) => { state.button.WeightHeight.color = payload.data },

  // результаты измерений
  SET_MEASUREMENT_PRESSURE: (state, payload) => { state.measurement.pressure = payload.data },
  SET_MEASUREMENT_GLUCOMETRY: (state, payload) => { state.measurement.glucometry = payload.data },
  SET_MEASUREMENT_TEMPERATURE: (state, payload) => { state.measurement.temperature = payload.data },
  SET_MEASUREMENT_SATURATSIYA: (state, payload) => { state.measurement.saturatsiya = payload.data },
  SET_MEASUREMENT_SPIROGRAPHIA: (state, payload) => { state.measurement.spirographia = payload.data },
  SET_MEASUREMENT_WEIGHTHEIGHT: (state, payload) => { state.measurement.weightHeight = payload.data },

  // результаты специалистов
  SET_RESULT_SPECIALIST_CARDIOLOGIST: (state, payload) => { state.result.specialist.cardiologist = payload.data },
  SET_RESULT_SPECIALIST_NEUROLOGIST: (state, payload) => { state.result.specialist.neurologist = payload.data },
  SET_RESULT_SPECIALIST_GASTROENTEROLOGIST: (state, payload) => { state.result.specialist.gastroenterologist = payload.data },
  SET_RESULT_SPECIALIST_GYNECOLOGIST: (state, payload) => { state.result.specialist.gynecologist = payload.data },
  SET_RESULT_SPECIALIST_UROLOGIST: (state, payload) => { state.result.specialist.urologist = payload.data },
  SET_RESULT_SPECIALIST_COLOPROCTOLOGIST: (state, payload) => { state.result.specialist.coloproctologist = payload.data },
  SET_RESULT_SPECIALIST_OPHTALMOLOGIST: (state, payload) => { state.result.specialist.ophtalmologist = payload.data },
  SET_RESULT_SPECIALIST_OTORINOLARINGOLOGIST: (state, payload) => { state.result.specialist.otorinolaringologist = payload.data },
  SET_RESULT_SPECIALIST_ENDOCRINOLOGIST: (state, payload) => { state.result.specialist.endocrinologist = payload.data },

  SET_DISEASE_NUMBER: (state, payload) => {
    state.current_disease.number = payload.data
    state.current_disease.name = getDiseaseName(payload.data)
    state.current_disease.context_disease = getContextDisease(payload.data)
  }
}

export const gettersUserMeasurement = {
  // кнопки измерений
  getButtonPressureColor: state => state.button.Pressure.color,
  getButtonGlucometryColor: state => state.button.Glucometry.color,
  getButtonTemperatureColor: state => state.button.Temperature.color,
  getButtonSaturatsiyaColor: state => state.button.Saturatsiya.color,
  getButtonSpirographiaColor: state => state.button.Spirographia.color,
  getButtonWeightHeightColor: state => state.button.WeightHeight.color,

  // результаты измерений
  getMeasurementPressure: state => state.measurement.pressure,
  getMeasurementGlucometry: state => state.measurement.glucometry,
  getMeasurementTemperature: state => state.measurement.temperature,
  getMeasurementSaturatsiya: state => state.measurement.saturatsiya,
  getMeasurementSpirographia: state => state.measurement.spirographia,
  getMeasurementWeightHeight: state => state.measurement.weightHeight,

  getSpecialistNumber: state => state.current_specialist.number,
  getSpecialistName: state => state.current_specialist.name,
  getSpecialistDescription: state => state.current_specialist.description,
  getSpecialistPath: state => state.current_specialist.path,
  getSpecialistTextResult: state => state.current_specialist.textResult,

  // результаты специалистов
  getResultSpecialistCardiologist: state => state.result.specialist.cardiologist,
  getResultSpecialistNeurologist: state => state.result.specialist.neurologist,
  getResultSpecialistGastroenterologist: state => state.result.specialist.gastroenterologist,
  getResultSpecialistGynecologist: state => state.result.specialist.gynecologist,
  getResultSpecialistUrologist: state => state.result.specialist.urologist,
  getResultSpecialistColoproctologist: state => state.result.specialist.coloproctologist,
  getResultSpecialistOphtalmologist: state => state.result.specialist.ophtalmologist,
  getResultSpecialistOtorinolaringologist: state => state.result.specialist.otorinolaringologist,
  getResultSpecialistEndocrinologist: state => state.result.specialist.endocrinologist,

  getDiseasetNumber: state => state.current_disease.number,
  getDiseaseName: state => state.current_disease.name,
  getContextDisease: state => state.current_disease.context_disease
}
