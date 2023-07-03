export default {
  // экран с ожиданием
  wait_promo: [
    {
      name: 'app/setStep',
      options: 'wait_promo',
      timeout: 0
    },
    { name: 'ui/setSubtitlesEnabled', options: true },
    {
      name: 'ui/setHeaderEnabled',
      options: false,
      timeout: 0
    },
    { 'name': 'robot/faceRecognizeAutotrackingRequest', 'options': false, 'timeout': 0 },
    { 'name': 'robot/faceRecognizeAutotrackingRequest', 'options': true, 'timeout': 1000 },
    { 'name': 'robot/startScript', 'options': 'check_wvs', 'timeout': 0 },
    { 'name': 'head/setEnabled', 'options': true, 'timeout': 0 },
    { 'name': 'robot/abortRobotReplic', 'options': null, 'timeout': 0 },
    { 'name': 'app/setMeetingTalk', 'options': false },
    { 'name': 'faces/setTimeoutsLostUser', 'options': 600000, 'timeout': 0 }
  ],
  // инициализация кейса (начальные параметры)
  initial: [
    {
      name: 'engine/handlerMoveToState',
      options: 'WAIT_PROMO',
      timeout: 1000
    },
    { name: 'ui/setSubtitlesEnabled', options: true },
    { name: 'robot/setRobotSettingsLoad', options: { settings_type: 'system', group: 'js' }, timeout: 0 },
    { name: 'robot/setRobotSettingsLoad', options: { settings_type: 'application', group: 'faces' }, timeout: 200 },
    { name: 'app/clearState', options: null },
    { name: 'ui/setMeasurementTemperature', options: null, timeout: 0 },
    { name: 'ui/setFlagExit', options: null, timeout: 0 },
    { 'name': 'robot/abortRobotReplic', 'options': null, 'timeout': 1100 },
    { 'name': 'ui/setSessionUserLost', 'options': false },
    { 'name': 'faces/setLogicDbRequest', 'options': true },
    { 'name': 'faces/setUserGeneral', 'options': null },
    { 'name': 'robot/setUserActionActive', 'options': null, 'timeout': 0 },
    { 'name': 'robot/faceRecognizeAutotrackingRequest', 'options': true }
  ],
  // экран распознавания лица
  meet_face: [
    { 'name': 'engine/handlerCallScenario', 'options': 'reset' },
    {
      name: 'app/setStep',
      options: 'meet_face',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: false,
      timeout: 0
    }
  ],
  meeting: [
    { name: 'robot/setRobotDialogCase', options: 'MEETING:extend', timeout: 0 },
    { name: 'robot/sayReplicByName', options: { 'step': 'MEETING', terminate: true }, timeout: 100 },
    { name: 'robot/faceRecognizeGeneralFrameRequest', options: true },
    { name: 'app/setMeetingTalk', options: false },
    { name: 'ui/setSpinnerEnabled', options: false, timeout: 0 },
    { name: 'app/setStep', options: 'meeting', timeout: 50 },
    { name: 'engine/handlerCallScenario', options: 'generalHeaderLogoFooter', timeout: 110 },
    { name: 'ui/setHeaderBtnLeftText', options: 'Это не я', timeout: 0 },
    { name: 'ui/setHeaderBtnLeftAction', options: { 'engine/handlerClickMoveToState': 'MEET_FACE' }, timeout: 120 },
    { name: 'ui/setHeaderBtnLeftEnabled', options: true, timeout: 0 },
    { name: 'ui/setHeaderBtnLeftPhoto', options: false, timeout: 0 }
  ],
  // экран с вводом возраста
  age_view: [
    {
      name: 'app/setStep',
      options: 'age_view',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftText',
      options: 'Выход',
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftAction',
      options: {
        'engine/handlerClickMoveToState': 'MEET_FACE'
      },
      timeout: 0
    }
  ],
  result_view: [
    {
      name: 'app/setStep',
      options: 'result_view',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftText',
      options: 'Выход',
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftAction',
      options: {
        'engine/handlerClickMoveToState': 'EXIT'
      },
      timeout: 0
    }
  ],
  // главное меню
  main_view: [
    {
      name: 'app/setStep',
      options: 'main_view',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftText',
      options: 'Выход',
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftAction',
      options: {
        'engine/handlerClickMoveToState': 'MEET_FACE'
      },
      timeout: 0
    },
    {
      name: 'ui/setSpinnerEnabled',
      options: false,
      timeout: 0
    },
    {
      name: 'ui/setStepExamination',
      options: null,
      timeout: 0
    },
    {
      name: 'ui/setRecomendType0',
      options: null,
      timeout: 0
    },
    {
      name: 'ui/setRecomendType1',
      options: null,
      timeout: 0
    },
    {
      name: 'ui/setRecomendType2',
      options: null,
      timeout: 0
    }
  ],
  // пройти отдельное обследование
  diagnostic_start: [
    {
      name: 'app/setStep',
      options: 'diagnostic_start',
      timeout: 0
    },
    { name: 'ui/setMeasurementStep', options: null, timeout: 0 },
    { name: 'ui/setMeasurementNum', options: null, timeout: 0 },
    { name: 'head/setEnabled', options: true, timeout: 0 },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftText',
      options: 'Выход',
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftAction',
      options: {
        'engine/handlerClickMoveToState': 'EXIT'
      },
      timeout: 0
    }
    // { name: 'ui/setFlagConsultation', options: false, timeout: 0 }
  ],
  specialist: [
    {
      name: 'app/setStep',
      options: 'specialist',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftText',
      options: 'Выход',
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftAction',
      options: {
        'engine/handlerClickMoveToState': 'EXIT'
      },
      timeout: 0
    }
  ],
  specialist_quest: [
    {
      name: 'app/setStep',
      options: 'specialist_quest',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftText',
      options: 'Выход',
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftAction',
      options: {
        'engine/handlerClickMoveToState': 'EXIT'
      },
      timeout: 0
    }
  ],
  specialist_result: [
    {
      name: 'app/setStep',
      options: 'specialist_result',
      timeout: 0
    }
  ],
  disease_main: [
    {
      name: 'app/setStep',
      options: 'disease_main',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftText',
      options: 'Выход',
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftAction',
      options: {
        'engine/handlerClickMoveToState': 'EXIT'
      },
      timeout: 0
    }
  ],
  disease_quest: [
    {
      name: 'app/setStep',
      options: 'disease_quest',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftText',
      options: 'Выход',
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftAction',
      options: {
        'engine/handlerClickMoveToState': 'EXIT'
      },
      timeout: 0
    }
  ],
  width_height: [
    {
      name: 'app/setStep',
      options: 'width_height',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftText',
      options: 'Выход',
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftAction',
      options: {
        'engine/handlerClickMoveToState': 'EXIT'
      },
      timeout: 0
    }
  ],
  exit_view: [
    {
      name: 'app/setStep',
      options: 'exit_view',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: false,
      timeout: 0
    }
  ],
  measurement: [
    { name: 'app/setStep', options: 'measurement', timeout: 50 }
    // { name: 'engine/handlerCallScenario', options: 'exit', timeout: 100 }
  ],
  exit: [
    {
      name: 'ui/setHeaderEnabled', options: true, timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftText', options: 'Выход', timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftAction',
      options: {
        'engine/handlerClickMoveToState': 'EXIT'
      },
      timeout: 0
    },
    {
      name: 'ui/setFlagExit',
      options: true,
      timeout: 0
    }
  ],
  reset: [
    { name: 'app/setSessionName', options: '', timeout: 0 },
    { name: 'ui/setMeasurementWeight', options: null, timeout: 0 },
    { name: 'ui/setMeasurementHeight', options: null, timeout: 0 },
    { name: 'ui/setMeasurementPressure', options: null, timeout: 0 },
    { name: 'ui/setUserAge', options: null, timeout: 0 },
    { name: 'ui/setUserGender', options: null, timeout: 0 },
    { name: 'ui/setFooterEnabled', options: true, timeout: 0 },
    { name: 'ui/setMeasurementGlucometry', options: null, timeout: 0 },
    { name: 'ui/setMeasurementSpirographia', options: null, timeout: 0 },
    { name: 'ui/setMeasurementSaturatsiya', options: null, timeout: 0 },
    { name: 'ui/setMeasurementPulse', options: null, timeout: 0 },
    { name: 'ui/setMeasurementPressureLow', options: null, timeout: 0 },
    { name: 'ui/setMeasurementTemperature', options: null, timeout: 0 },
    { name: 'ui/setMeasuredDataFromTopic', options: null, timeout: 0 },
    { name: 'ui/setMeasurementNum', options: null, timeout: 0 },
    { name: 'ui/setMeasurementStep', options: null, timeout: 0 },
    { name: 'ui/setEquipmentWorks', options: { '2': null, '3': null, '4': null, '5': null, '6': null }, timeout: 0 },
    { name: 'app/setIsImportantPhrase', options: null, timeout: 0 },
    { name: 'app/setTimerAutoSelect', options: null, timeout: 0 },
    { name: 'ui/setConsult', options: null, timeout: 0 },
    { name: 'ui/setResultSpecialistCardiologist', options: null, timeout: 0 },
    { name: 'ui/setResultSpecialistNeurologist', options: null, timeout: 0 },
    { name: 'ui/setResultSpecialistGastroenterologist', options: null, timeout: 0 },
    { name: 'ui/setResultSpecialistGynecologist', options: null, timeout: 0 },
    { name: 'ui/setResultSpecialistUrologist', options: null, timeout: 0 },
    { name: 'ui/setResultSpecialistColoproctologist', options: null, timeout: 0 },
    { name: 'ui/setResultSpecialistOphtalmologist', options: null, timeout: 0 },
    { name: 'ui/setResultSpecialistOtorinolaringologist', options: null, timeout: 0 },
    { name: 'ui/setResultSpecialistEndocrinologist', options: null, timeout: 0 },
    { name: 'ui/setMeasurementImt', options: null, timeout: 0 },
    { name: 'ui/setFlagConsultation', options: null, timeout: 0 },
    { name: 'ui/setFlagExamination', options: null, timeout: 0 },
    { name: 'ui/setFlagFullExamination', options: null, timeout: 0 },
    { name: 'ui/setStepExamination', options: null, timeout: 0 },
    { name: 'ui/setButtonPressureColor', options: '#691B26', timeout: 0 },
    { name: 'ui/setButtonGlucometryColor', options: '#691B26', timeout: 0 },
    { name: 'ui/setButtonTemperatureColor', options: '#691B26', timeout: 0 },
    { name: 'ui/setButtonSaturatsiyaColor', options: '#691B26', timeout: 0 },
    { name: 'ui/setButtonSpirographiaColor', options: '#691B26', timeout: 0 },
    { name: 'ui/setButtonWeightHeightColor', options: '#691B26', timeout: 0 },
    { name: 'ui/setFlagExit', options: null, timeout: 0 }
  ],
  /* температура */
  measurement_6_1: [
    { name: 'ui/setMeasurementStep', options: 1, timeout: 0 },
    { name: 'ui/setMeasurementNum', options: 6, timeout: 0 },
    { name: 'head/setEnabled', options: false, timeout: 300 },
    // { name: 'engine/handlerCallScenario', options: 'generalHeaderLogoFooter', timeout: 100 },
    { name: 'engine/handlerCallScenario', options: 'exit', timeout: 100 }
  ],
  /*
  measurement_6_2: [
    { name: 'ui/setMeasurementStep', options: 2, timeout: 0 },
    { name: 'ui/setMeasurementNum', options: 6, timeout: 0 },
    { name: 'ui/setHeaderBtnLeftEnabled', options: false, timeout: 0 },
    { name: 'ui/setHeaderBtnLeftPhoto', options: false, timeout: 0 }
  ],
  measurement_6_3: [
    { 'name': 'ui/setMeasurementStep', 'options': 3, 'timeout': 0 },
    { 'name': 'ui/setMeasurementNum', 'options': 6, 'timeout': 0 },
    { 'name': 'ui/setHeaderBtnLeftEnabled', 'options': false, 'timeout': 0 },
    { 'name': 'ui/setHeaderBtnLeftPhoto', 'options': false, 'timeout': 0 }
  ],
  /* температура */

  /* давление */
  measurement_5_1: [
    { name: 'ui/setMeasurementStep', options: 1, timeout: 0 },
    { name: 'ui/setMeasurementNum', options: 5, timeout: 0 },
    { name: 'engine/handlerCallScenario', options: 'exit', timeout: 100 },
    { name: 'head/setEnabled', options: false, timeout: 300 }
  ],
  measurement_5_2: [
    { name: 'ui/setMeasurementStep', options: 2, timeout: 0 },
    { name: 'ui/setMeasurementNum', options: 5, timeout: 0 },
    { name: 'engine/handlerCallScenario', options: 'exit', timeout: 100 },
    { name: 'head/setEnabled', options: false, timeout: 300 }
  ],
  measurement_5_3: [
    { 'name': 'ui/setMeasurementStep', 'options': 3, 'timeout': 0 },
    { 'name': 'ui/setMeasurementNum', 'options': 5, 'timeout': 0 },
    { 'name': 'ui/setHeaderBtnLeftEnabled', 'options': false, 'timeout': 0 },
    { 'name': 'ui/setHeaderBtnLeftPhoto', 'options': false, 'timeout': 0 }
  ],
  /* давление */

  /* глюкоза */
  measurement_2_1: [
    { 'name': 'ui/setMeasurementStep', 'options': 1, 'timeout': 0 },
    { 'name': 'ui/setMeasurementNum', 'options': 2, 'timeout': 0 },
    { 'name': 'engine/handlerCallScenario', 'options': 'exit', 'timeout': 100 }
  ],
  measurement_2_2: [
    { 'name': 'ui/setMeasurementStep', 'options': 2, 'timeout': 0 },
    { 'name': 'ui/setMeasurementNum', 'options': 2, 'timeout': 0 },
    { name: 'engine/handlerCallScenario', options: 'exit', timeout: 100 },
    { 'name': 'head/setEnabled', 'options': false, 'timeout': 300 }
  ],
  measurement_2_3: [
    { 'name': 'ui/setMeasurementStep', 'options': 3, 'timeout': 0 },
    { 'name': 'ui/setMeasurementNum', 'options': 2, 'timeout': 0 },
    { 'name': 'engine/handlerCallScenario', 'options': 'generalHeaderLogoFooter', 'timeout': 100 },
    { 'name': 'ui/setHeaderBtnLeftEnabled', 'options': false, 'timeout': 200 },
    { 'name': 'ui/setHeaderBtnLeftPhoto', 'options': false, 'timeout': 0 }
  ],
  measurement_2_4: [
    { 'name': 'ui/setMeasurementStep', 'options': 4, 'timeout': 0 },
    { 'name': 'ui/setMeasurementNum', 'options': 2, 'timeout': 0 },
    { 'name': 'engine/handlerCallScenario', 'options': 'generalHeaderLogoFooter', 'timeout': 100 },
    { 'name': 'ui/setHeaderBtnLeftEnabled', 'options': false, 'timeout': 200 },
    { 'name': 'ui/setHeaderBtnLeftPhoto', 'options': false, 'timeout': 0 }
  ],
  measurement_2_5: [
    { 'name': 'ui/setMeasurementStep', 'options': 5, 'timeout': 0 },
    { 'name': 'ui/setMeasurementNum', 'options': 2, 'timeout': 0 },
    { 'name': 'ui/setHeaderBtnLeftEnabled', 'options': false, 'timeout': 0 },
    { 'name': 'ui/setHeaderBtnLeftPhoto', 'options': false, 'timeout': 0 }
  ],
  /* глюкоза */

  /* сатурация */
  measurement_4_1: [
    { 'name': 'ui/setMeasurementStep', 'options': 1, 'timeout': 0 },
    { 'name': 'ui/setMeasurementNum', 'options': 4, 'timeout': 0 },
    { name: 'engine/handlerCallScenario', options: 'exit', timeout: 100 }
  ],
  measurement_4_2: [
    { 'name': 'ui/setMeasurementStep', 'options': 2, 'timeout': 0 },
    { 'name': 'ui/setMeasurementNum', 'options': 4, 'timeout': 0 },
    { name: 'engine/handlerCallScenario', options: 'exit', timeout: 100 },
    { 'name': 'head/setEnabled', 'options': false, 'timeout': 300 }
  ],
  measurement_4_3: [
    { 'name': 'ui/setMeasurementStep', 'options': 3, 'timeout': 0 },
    { 'name': 'ui/setMeasurementNum', 'options': 4, 'timeout': 0 },
    { 'name': 'ui/setHeaderBtnLeftEnabled', 'options': false, 'timeout': 0 },
    { 'name': 'ui/setHeaderBtnLeftPhoto', 'options': false, 'timeout': 0 }
  ],
  saturatsiyaError: [
    { 'name': 'robot/setRobotDialogCase', 'options': 'SATURATSIYA_ERROR:extend', 'timeout': 0 },
    { 'name': 'robot/sayReplicByName', 'options': { 'step': 'SATURATSIYA_ERROR', 'terminate': true }, 'timeout': 100 },
    { 'name': 'ui/setSpinnerEnabled', 'options': false },
    { 'name': 'app/setMeetingTalk', 'options': false },
    { 'name': 'app/setStep', 'options': 'saturatsiyaError', 'timeout': 0 }
  ],
  /* сатурация */

  examination: [
    {
      name: 'app/setStep',
      options: 'examination',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftText',
      options: 'Выход',
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftAction',
      options: {
        'engine/handlerClickMoveToState': 'EXIT'
      },
      timeout: 0
    }
  ],

  exam_result: [
    {
      name: 'app/setStep',
      options: 'exam_result',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftText',
      options: 'Выход',
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftAction',
      options: {
        'engine/handlerClickMoveToState': 'EXIT'
      },
      timeout: 0
    }
  ],
  print_view: [
    {
      name: 'app/setStep',
      options: 'print_view',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: false,
      timeout: 0
    },
    {
      name: 'ui/setSpinnerEnabled',
      options: false,
      timeout: 0
    }
  ],
  oncology_main: [
    {
      name: 'app/setStep',
      options: 'oncology_main',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setSpinnerEnabled',
      options: false,
      timeout: 0
    }
  ],

  diabetes: [
    {
      name: 'app/setStep',
      options: 'diabetes',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setSpinnerEnabled',
      options: false,
      timeout: 0
    }
  ],
  reflux: [
    {
      name: 'app/setStep',
      options: 'reflux',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setSpinnerEnabled',
      options: false,
      timeout: 0
    }
  ],
  depression: [
    {
      name: 'app/setStep',
      options: 'depression',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setSpinnerEnabled',
      options: false,
      timeout: 0
    }
  ],
  prostatitis: [
    {
      name: 'app/setStep',
      options: 'prostatitis',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setSpinnerEnabled',
      options: false,
      timeout: 0
    }
  ],
  oncology_quest: [
    {
      name: 'app/setStep',
      options: 'oncology_quest',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setSpinnerEnabled',
      options: false,
      timeout: 0
    }
  ],
  disease_result: [
    {
      name: 'app/setStep',
      options: 'disease_result',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: true,
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftText',
      options: 'Выход',
      timeout: 0
    },
    {
      name: 'ui/setHeaderBtnLeftAction',
      options: {
        'engine/handlerClickMoveToState': 'EXIT'
      },
      timeout: 0
    }
  ],
  recomend_view: [
    {
      name: 'app/setStep',
      options: 'recomend_view',
      timeout: 0
    },
    {
      name: 'ui/setHeaderEnabled',
      options: false,
      timeout: 0
    }
  ],

  wait: [
    { name: 'app/setMeetingTalk', options: false },
    { name: 'robot/faceRecognizeAutotrackingRequest', options: true },
    { name: 'faces/setLogicDbRequest', options: true },
    { name: 'faces/refresh' },
    { name: 'ui/setSubtitlesEnabled', options: true },
    { name: 'ui/setSpinnerEnabled', options: false, timeout: 50 }
  ]
}
