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
    },

    // пути к картинке результата
    measurement: {
      pressure: null,
      pulse: null,
      glucometry: null,
      temperature: null,
      saturatsiya: null,
      imt: null
    }
  },
  button: {
    Pressure: {
      text: null,
      color: '#691B26'
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
    pressure: null,
    pressureLow: null,
    pulse: null,
    glucometry: null,
    temperature: null,
    envTemperature: null,
    saturatsiya: null,
    spirographia: null,
    spirographiaQ1: null,
    spirographiaQ2: null,
    imt: null,
    weight: null,
    height: null
  },
  imt: {
    step: null
  },

  // true/false
  consult: null,

  current_measurement: {
    number: null,
    norm: null,
    info: null,
    infoAdd: null
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

  setConsult: ({ commit }, payload) => commit('SET_CONSULT', payload),

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

  setCurMeasurementNumber: ({ commit }, payload) => commit('SET_CURMEASUREMENT_NUMBER', payload),
  setNorm: ({ commit }, payload) => commit('SET_NORM', payload),
  setInfo: ({ commit }, payload) => commit('SET_INFO', payload),
  setInfoAdd: ({ commit }, payload) => commit('SET_INFO_ADD', payload),

  // кнопки измерений
  setButtonPressureColor: ({ commit }, payload) => commit('SET_BUTTON_PRESSURE_COLOR', payload),
  setButtonGlucometryColor: ({ commit }, payload) => commit('SET_BUTTON_GLUCOMETRY_COLOR', payload),
  setButtonTemperatureColor: ({ commit }, payload) => commit('SET_BUTTON__COLOR', payload),
  setButtonSaturatsiyaColor: ({ commit }, payload) => commit('SET_BUTTON_SATURATSIYA_COLOR', payload),
  setButtonSpirographiaColor: ({ commit }, payload) => commit('SET_BUTTON_SPIROGRAPHIA_COLOR', payload),
  setButtonWeightHeightColor: ({ commit }, payload) => commit('SET_BUTTON_WEIGHTHEIGHT_COLOR', payload),

  setReaultPressure: ({ commit }, payload) => commit('SET_RESULT_PRESSURE', payload),
  setReaultPulse: ({ commit }, payload) => commit('SET_RESULT_PULSE', payload),
  setReaultGlucometry: ({ commit }, payload) => commit('SET_RESULT_GLUCOMETRY', payload),
  setReaultTemperature: ({ commit }, payload) => commit('SET_RESULT_TEMPERATURE', payload),
  setReaultSaturatsiya: ({ commit }, payload) => commit('SET_RESULT_SATURATSIYA', payload),
  setReaultImt: ({ commit }, payload) => commit('SET_RESULT_IMT', payload),

  // значения измерений
  setMeasurementPressure: ({ commit }, payload) => commit('SET_MEASUREMENT_PRESSURE', payload),
  setMeasurementPressureLow: ({ commit }, payload) => commit('SET_MEASUREMENT_PRESSURE_LOW', payload),
  setMeasurementPulse: ({ commit }, payload) => commit('SET_MEASUREMENT_PULSE', payload),
  setMeasurementGlucometry: ({ commit }, payload) => commit('SET_MEASUREMENT_GLUCOMETRY', payload),
  setMeasurementTemperature: ({ commit }, payload) => commit('SET_MEASUREMENT_TEMPERATURE', payload),
  setEnvTemperature: ({ commit }, payload) => commit('SET_ENV_TEMPERATURE', payload),
  setMeasurementSaturatsiya: ({ commit }, payload) => commit('SET_MEASUREMENT_SATURATSIYA', payload),
  setMeasurementSpirographia: ({ commit }, payload) => commit('SET_MEASUREMENT_SPIROGRAPHIA', payload),
  setMeasurementSpirographiaQ1: ({ commit }, payload) => commit('SET_MEASUREMENT_SPIROGRAPHIA_Q1', payload),
  setMeasurementSpirographiaQ2: ({ commit }, payload) => commit('SET_MEASUREMENT_SPIROGRAPHIA_Q2', payload),
  setMeasurementWeight: ({ commit }, payload) => commit('SET_MEASUREMENT_WEIGHT', payload),
  setMeasurementHeight: ({ commit }, payload) => commit('SET_MEASUREMENT_HEIGHT', payload),
  setMeasurementImt: ({ commit }, payload) => commit('SET_MEASUREMENT_IMT', payload),
  setImtStep: ({ commit }, payload) => commit('SET_IMT_STEP', payload),

  // риск развития заболевания болезни
  setDiseaseNumber: ({ commit }, payload) => commit('SET_DISEASE_NUMBER', payload)
}

export const mutationsUserMeasurement = {
  SET_CONSULT: (state, payload) => { state.consult = payload.data },
  SET_SPECIALIST_NUMBER: (state, payload) => {
    state.current_specialist.number = payload.data
    state.current_specialist.name = getName(payload.data)
    state.current_specialist.description = getDescription(payload.data)
    state.current_specialist.path = getPath(payload.data)
    state.current_specialist.textResult = getResultGood(payload.data)
  },

  SET_INFO_ADD: (state, payload) => { state.current_measurement.infoAdd = payload.data },
  SET_NORM: (state, payload) => { state.current_measurement.norm = payload.data },
  SET_INFO: (state, payload) => { state.current_measurement.info = payload.data },
  SET_CURMEASUREMENT_NUMBER: (state, payload) => { state.current_measurement.number = payload.data },
  SET_RESULT_PRESSURE: (state, payload) => { state.result.measurement.pressure = payload.data },
  SET_RESULT_PULSE: (state, payload) => { state.result.measurement.pulse = payload.data },
  SET_RESULT_GLUCOMETRY: (state, payload) => { state.result.measurement.glucometry = payload.data },
  SET_RESULT_TEMPERATURE: (state, payload) => { state.result.measurement.temperature = payload.data },
  SET_RESULT_SATURATSIYA: (state, payload) => { state.result.measurement.saturatsiya = payload.data },
  SET_RESULT_IMT: (state, payload) => { state.result.measurement.imt = payload.data },

  // кнопки на панели измерений
  SET_BUTTON_PRESSURE_COLOR: (state, payload) => { state.button.Pressure.color = payload.data },
  SET_BUTTON_GLUCOMETRY_COLOR: (state, payload) => { state.button.Glucometry.color = payload.data },
  SET_BUTTON_TEMPERATURE_COLOR: (state, payload) => { state.button.Temperature.color = payload.data },
  SET_BUTTON_SATURATSIYA_COLOR: (state, payload) => { state.button.Saturatsiya.color = payload.data },
  SET_BUTTON_SPIROGRAPHIA_COLOR: (state, payload) => { state.button.Spirographia.color = payload.data },
  SET_BUTTON_WEIGHTHEIGHT_COLOR: (state, payload) => { state.button.WeightHeight.color = payload.data },

  // результаты измерений
  SET_MEASUREMENT_PRESSURE: (state, payload) => { state.measurement.pressure = payload.data },
  SET_MEASUREMENT_PRESSURE_LOW: (state, payload) => { state.measurement.pressureLow = payload.data },
  SET_MEASUREMENT_PULSE: (state, payload) => { state.measurement.pulse = payload.data },
  SET_MEASUREMENT_GLUCOMETRY: (state, payload) => { state.measurement.glucometry = payload.data },
  SET_MEASUREMENT_TEMPERATURE: (state, payload) => { state.measurement.temperature = payload.data },
  SET_ENV_TEMPERATURE: (state, payload) => { state.measurement.envTemperature = payload.data },
  SET_MEASUREMENT_SATURATSIYA: (state, payload) => { state.measurement.saturatsiya = payload.data },
  SET_MEASUREMENT_SPIROGRAPHIA: (state, payload) => { state.measurement.spirographia = payload.data },
  SET_MEASUREMENT_SPIROGRAPHIA_Q1: (state, payload) => { state.measurement.spirographiaQ1 = payload.data },
  SET_MEASUREMENT_SPIROGRAPHIA_Q2: (state, payload) => { state.measurement.spirographiaQ2 = payload.data },
  SET_MEASUREMENT_WEIGHT: (state, payload) => { state.measurement.weight = payload.data },
  SET_MEASUREMENT_HEIGHT: (state, payload) => { state.measurement.height = payload.data },
  SET_MEASUREMENT_IMT: (state, payload) => { state.measurement.imt = payload.data },
  SET_IMT_STEP: (state, payload) => { state.imt.step = payload.data },

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
  getConsult: state => state.consult,

  getCurMeasurementNumber: state => state.current_measurement.number,
  getInfo: state => state.current_measurement.info,
  getNorm: state => state.current_measurement.norm,
  getInfoAdd: state => state.current_measurement.infoAdd,
  getReaultPressure: state => state.result.measurement.pressure,
  getReaultPulse: state => state.result.measurement.pulse,
  getReaultGlucometry: state => state.result.measurement.glucometry,
  getReaultTemperature: state => state.result.measurement.temperature,
  getReaultSaturatsiya: state => state.result.measurement.saturatsiya,
  getReaultImt: state => state.result.measurement.imt,

  // кнопки измерений
  getButtonPressureColor: state => state.button.Pressure.color,
  getButtonGlucometryColor: state => state.button.Glucometry.color,
  getButtonTemperatureColor: state => state.button.Temperature.color,
  getButtonSaturatsiyaColor: state => state.button.Saturatsiya.color,
  getButtonSpirographiaColor: state => state.button.Spirographia.color,
  getButtonWeightHeightColor: state => state.button.WeightHeight.color,

  // результаты измерений
  getMeasurementPressure: state => state.measurement.pressure,
  getMeasurementPressureLow: state => state.measurement.pressureLow,
  getMeasurementPulse: state => state.measurement.pulse,
  getMeasurementGlucometry: state => state.measurement.glucometry,
  getMeasurementTemperature: state => state.measurement.temperature,
  getEnvTemperature: state => state.measurement.envTemperature,
  getMeasurementSaturatsiya: state => state.measurement.saturatsiya,
  getMeasurementSpirographia: state => state.measurement.spirographia,
  getMeasurementSpirographiaQ1: state => state.measurement.spirographiaQ1,
  getMeasurementSpirographiaQ2: state => state.measurement.spirographiaQ2,
  getMeasurementWeight: state => state.measurement.weight,
  getMeasurementHeight: state => state.measurement.height,
  getMeasurementImt: state => state.measurement.imt,
  getImtStep: state => state.imt.step,

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
