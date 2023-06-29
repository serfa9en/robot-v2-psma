import { getDescription, getName, getPath, getResultGood } from '../../dataStorage/specialist'
// import { getDiseaseName, getContextDisease } from '../../dataStorage/disease'
import { getOncologyName, getContextOncology, getPathOncology } from '../../dataStorage/oncology'

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
    // если плохо - сохранение в виде строки (0,1,1,0,1...)
    specialistBad: {
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
    },

    disease_count: {
      diabetes: null,
      reflux: null,
      depression: null,
      prostatitis: null,
      oncology: {
        mammary_cancer: null,       // рак молочной железы
        stomach_cancer: null,       // рак желудка
        esophageal_carcinoma: null, // рак пищевода
        bladder_cancer: null,       // рак мочевого пузыря
        lung_cancer: null,          // рак легкого
        melanoma: null,             // меланома
        skin_cancer: null,          // рак кожи
        throat_cancer: null,        // рак глотки
        laryngeal_cancer: null,     // рак гортани
        thyroid_cancer: null,       // рак щитовидной железы
        bowel_cancer: null          // рак кишечника
      }
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
  current_oncology: {
    number: null,
    name: null,
    context_disease: null,
    path_img: null,
    comment: null,
    commentD: null,
    text: null,
    color: null
  },

  current_disease: {
    number: null,
    title: null,
    path_img: null,
    comment: null,
    commentD: null,
    text: null,
    color: null
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

  // результаты специалистов ВСЕ ПЛОХО - сохранения вопросов
  setResultSpecialistBadCardiologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_BAD_CARDIOLOGIST', payload),
  setResultSpecialistBadNeurologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_BAD_NEUROLOGIST', payload),
  setResultSpecialistBadGastroenterologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_BAD_GASTROENTEROLOGIST', payload),
  setResultSpecialistBadGynecologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_BAD_GYNECOLOGIST', payload),
  setResultSpecialistBadUrologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_BAD_UROLOGIST', payload),
  setResultSpecialistBadColoproctologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_BAD_COLOPROCTOLOGIST', payload),
  setResultSpecialistBadOphtalmologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_BAD_OPHTALMOLOGIST', payload),
  setResultSpecialistBadOtorinolaringologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_BAD_OTORINOLARINGOLOGIST', payload),
  setResultSpecialistBadEndocrinologist: ({ commit }, payload) => commit('SET_RESULT_SPECIALIST_BAD_ENDOCRINOLOGIST', payload),

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
  // setDiseaseNumber: ({ commit }, payload) => commit('SET_DISEASE_NUMBER', payload),
  setOncologyNumber: ({ commit }, payload) => commit('SET_ONCOLOGY_NUMBER', payload),

  setResultDiseaseCountDiabetes: ({ commit }, payload) => commit('SET_RESULT_DISEASE_COUNT_DIABETES', payload),
  setResultDiseaseCountReflux: ({ commit }, payload) => commit('SET_RESULT_DISEASE_COUNT_REFLUX', payload),
  setResultDiseaseCountDepression: ({ commit }, payload) => commit('SET_RESULT_DISEASE_COUNT_DEPRESSION', payload),
  setResultDiseaseCountProstatitis: ({ commit }, payload) => commit('SET_RESULT_DISEASE_COUNT_PROSTATITIS', payload),
  setResultDiseaseCountOncologyMammaryCancer: ({ commit }, payload) => commit('SET_RESULT_DISEASE_COUNT_ONCOLOGY_MAMMARY_CANCER', payload),
  setResultDiseaseCountOncologyStomachCancer: ({ commit }, payload) => commit('SET_RESULT_DISEASE_COUNT_ONCOLOGY_STOMACH_CANCER', payload),
  setResultDiseaseCountOncologyEsophagealCarcinoma: ({ commit }, payload) => commit('SET_RESULT_DISEASE_COUNT_ONCOLOGY_ESOPHAGEAL_CARCINOMA', payload),
  setResultDiseaseCountOncologyBladderCancer: ({ commit }, payload) => commit('SET_RESULT_DISEASE_COUNT_ONCOLOGY_BLADDER_CANCER', payload),
  setResultDiseaseCountOncologyLungCancer: ({ commit }, payload) => commit('SET_RESULT_DISEASE_COUNT_ONCOLOGY_LUNG_CANCER', payload),
  setResultDiseaseCountOncologyMelanoma: ({ commit }, payload) => commit('SET_RESULT_DISEASE_COUNT_ONCOLOGY_MELANOMA', payload),
  setResultDiseaseCountOncologySkinCancer: ({ commit }, payload) => commit('SET_RESULT_DISEASE_COUNT_ONCOLOGY_SKIN_CANCER', payload),
  setResultDiseaseCountOncologyThroatCancer: ({ commit }, payload) => commit('SET_RESULT_DISEASE_COUNT_ONCOLOGY_THROAT_CANCER', payload),
  setResultDiseaseCountOncologyLaryngealCancer: ({ commit }, payload) => commit('SET_RESULT_DISEASE_COUNT_ONCOLOGY_LARYNGEAL_CANCER', payload),
  setResultDiseaseCountOncologyThyroidCancer: ({ commit }, payload) => commit('SET_RESULT_DISEASE_COUNT_ONCOLOGY_THYROID_CANCER', payload),
  setResultDiseaseCountOncologyBowelCancer: ({ commit }, payload) => commit('SET_RESULT_DISEASE_COUNT_ONCOLOGY_BOWEL_CANCER', payload),

  // риск развития заболеваний
  setCurrentDiseaseNumber: ({ commit }, payload) => commit('SET_CURRENT_DISEASE_NUMBER', payload),
  setCurrentDiseaseTitle: ({ commit }, payload) => commit('SET_CURRENT_DISEASE_TITLE', payload),
  setCurrentDiseaseImg: ({ commit }, payload) => commit('SET_CURRENT_DISEASE_IMG', payload),
  setCurrentDiseaseComment: ({ commit }, payload) => commit('SET_CURRENT_DISEASE_COMMENT', payload),
  setCurrentDiseaseCommentD: ({ commit }, payload) => commit('SET_CURRENT_DISEASE_COMMENT_D', payload),
  setCurrentDiseaseText: ({ commit }, payload) => commit('SET_CURRENT_DISEASE_TEXT', payload),
  setCurrentDiseaseColor: ({ commit }, payload) => commit('SET_CURRENT_DISEASE_COLOR', payload)
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

  // результаты специалистов - ВСЕ ПЛОХО - сохранение вопросов
  SET_RESULT_SPECIALIST_BAD_CARDIOLOGIST: (state, payload) => { state.result.specialistBad.cardiologist = payload.data },
  SET_RESULT_SPECIALIST_BAD_NEUROLOGIST: (state, payload) => { state.result.specialistBad.neurologist = payload.data },
  SET_RESULT_SPECIALIST_BAD_GASTROENTEROLOGIST: (state, payload) => { state.result.specialistBad.gastroenterologist = payload.data },
  SET_RESULT_SPECIALIST_BAD_GYNECOLOGIST: (state, payload) => { state.result.specialistBad.gynecologist = payload.data },
  SET_RESULT_SPECIALIST_BAD_UROLOGIST: (state, payload) => { state.result.specialistBad.urologist = payload.data },
  SET_RESULT_SPECIALIST_BAD_COLOPROCTOLOGIST: (state, payload) => { state.result.specialistBad.coloproctologist = payload.data },
  SET_RESULT_SPECIALIST_BAD_OPHTALMOLOGIST: (state, payload) => { state.result.specialistBad.ophtalmologist = payload.data },
  SET_RESULT_SPECIALIST_BAD_OTORINOLARINGOLOGIST: (state, payload) => { state.result.specialistBad.otorinolaringologist = payload.data },
  SET_RESULT_SPECIALIST_BAD_ENDOCRINOLOGIST: (state, payload) => { state.result.specialistBad.endocrinologist = payload.data },

  SET_ONCOLOGY_NUMBER: (state, payload) => {
    state.current_oncology.number = payload.data
    state.current_oncology.name = getOncologyName(payload.data)
    state.current_oncology.context_disease = getContextOncology(payload.data)
    state.current_oncology.path_img = getPathOncology(payload.data)
  },

  SET_RESULT_DISEASE_COUNT_DIABETES: (state, payload) => { state.result.disease_count.diabetes = payload.data },
  SET_RESULT_DISEASE_COUNT_REFLUX: (state, payload) => { state.result.disease_count.reflux = payload.data },
  SET_RESULT_DISEASE_COUNT_DEPRESSION: (state, payload) => { state.result.disease_count.depression = payload.data },
  SET_RESULT_DISEASE_COUNT_PROSTATITIS: (state, payload) => { state.result.disease_count.prostatitis = payload.data },
  SET_RESULT_DISEASE_COUNT_ONCOLOGY_MAMMARY_CANCER: (state, payload) => { state.result.disease_count.oncology.mammary_cancer = payload.data },
  SET_RESULT_DISEASE_COUNT_ONCOLOGY_STOMACH_CANCER: (state, payload) => { state.result.disease_count.oncology.stomach_cancer = payload.data },
  SET_RESULT_DISEASE_COUNT_ONCOLOGY_ESOPHAGEAL_CARCINOMA: (state, payload) => { state.result.disease_count.oncology.esophageal_carcinoma = payload.data },
  SET_RESULT_DISEASE_COUNT_ONCOLOGY_BLADDER_CANCER: (state, payload) => { state.result.disease_count.oncology.bladder_cancer = payload.data },
  SET_RESULT_DISEASE_COUNT_ONCOLOGY_LUNG_CANCER: (state, payload) => { state.result.disease_count.oncology.lung_cancer = payload.data },
  SET_RESULT_DISEASE_COUNT_ONCOLOGY_MELANOMA: (state, payload) => { state.result.disease_count.oncology.melanoma = payload.data },
  SET_RESULT_DISEASE_COUNT_ONCOLOGY_SKIN_CANCER: (state, payload) => { state.result.disease_count.oncology.skin_cancer = payload.data },
  SET_RESULT_DISEASE_COUNT_ONCOLOGY_THROAT_CANCER: (state, payload) => { state.result.disease_count.oncology.throat_cancer = payload.data },
  SET_RESULT_DISEASE_COUNT_ONCOLOGY_LARYNGEAL_CANCER: (state, payload) => { state.result.disease_count.oncology.laryngeal_cancer = payload.data },
  SET_RESULT_DISEASE_COUNT_ONCOLOGY_THYROID_CANCER: (state, payload) => { state.result.disease_count.oncology.thyroid_cancer = payload.data },
  SET_RESULT_DISEASE_COUNT_ONCOLOGY_BOWEL_CANCER: (state, payload) => { state.result.disease_count.oncology.bowel_cancer = payload.data },

  SET_CURRENT_DISEASE_NUMBER: (state, payload) => { state.current_disease.number = payload.data },
  SET_CURRENT_DISEASE_TITLE: (state, payload) => { state.current_disease.title = payload.data },
  SET_CURRENT_DISEASE_IMG: (state, payload) => { state.current_disease.path_img = payload.data },
  SET_CURRENT_DISEASE_COMMENT: (state, payload) => { state.current_disease.comment = payload.data },
  SET_CURRENT_DISEASE_COMMENT_D: (state, payload) => { state.current_disease.commentD = payload.data },
  SET_CURRENT_DISEASE_TEXT: (state, payload) => { state.current_disease.text = payload.data },
  SET_CURRENT_DISEASE_COLOR: (state, payload) => { state.current_disease.color = payload.data }
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

  // результаты специалистов - ВСЕ ПЛОХО - Вопросы
  getResultSpecialistBadCardiologist: state => state.result.specialistBad.cardiologist,
  getResultSpecialistBadNeurologist: state => state.result.specialistBad.neurologist,
  getResultSpecialistBadGastroenterologist: state => state.result.specialistBad.gastroenterologist,
  getResultSpecialistBadGynecologist: state => state.result.specialistBad.gynecologist,
  getResultSpecialistBadUrologist: state => state.result.specialistBad.urologist,
  getResultSpecialistBadColoproctologist: state => state.result.specialistBad.coloproctologist,
  getResultSpecialistBadOphtalmologist: state => state.result.specialistBad.ophtalmologist,
  getResultSpecialistBadOtorinolaringologist: state => state.result.specialistBad.otorinolaringologist,
  getResultSpecialistBadEndocrinologist: state => state.result.specialistBad.endocrinologist,

  getOncologyNumber: state => state.current_oncology.number,
  getOncologyName: state => state.current_oncology.name,
  getContextOncology: state => state.current_oncology.context_disease,
  getPathOncology: state => state.current_oncology.path_img,

  getResultDiseaseCountDiabetes: state => state.result.disease_count.diabetes,
  getResultDiseaseCountReflux: state => state.result.disease_count.reflux,
  getResultDiseaseCountDepression: state => state.result.disease_count.depression,
  getResultDiseaseCountProstatitis: state => state.result.disease_count.prostatitis,
  getResultDiseaseCountOncologyMammaryCancer: state => state.result.disease_count.oncology.mammary_cancer,
  getResultDiseaseCountOncologyStomachCancer: state => state.result.disease_count.oncology.stomach_cancer,
  getResultDiseaseCountOncologyEsophagealCarcinoma: state => state.result.disease_count.oncology.esophageal_carcinoma,
  getResultDiseaseCountOncologyBladderCancer: state => state.result.disease_count.oncology.bladder_cancer,
  getResultDiseaseCountOncologyLungCancer: state => state.result.disease_count.oncology.lung_cancer,
  getResultDiseaseCountOncologyMelanoma: state => state.result.disease_count.oncology.melanoma,
  getResultDiseaseCountOncologySkinCancer: state => state.result.disease_count.oncology.skin_cancer,
  getResultDiseaseCountOncologyThroatCancer: state => state.result.disease_count.oncology.throat_cancer,
  getResultDiseaseCountOncologyLaryngealCancer: state => state.result.disease_count.oncology.laryngeal_cancer,
  getResultDiseaseCountOncologyThyroidCancer: state => state.result.disease_count.oncology.thyroid_cancer,
  getResultDiseaseCountOncologyBowelCancer: state => state.result.disease_count.oncology.bowel_cancer,

  getCurrentDiseaseNumber: state => state.current_disease.number,
  getCurrentDiseaseTitle: state => state.current_disease.title,
  getCurrentDiseaseImg: state => state.current_disease.path_img,
  getCurrentDiseaseComment: state => state.current_disease.comment,
  getCurrentDiseaseCommentD: state => state.current_disease.commentD,
  getCurrentDiseaseText: state => state.current_disease.text,
  getCurrentDiseaseColor: state => state.current_disease.color
}
