export default [
  {
    name: 'WAIT_PROMO',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'wait_promo'
      }
    ]
  },
  {
    'name': 'MEETING',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'meeting' }
    ]
  },
  {
    name: 'MEET_FACE',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'meet_face'
      },
      {
        name: 'robot/sayReplicByName',
        options: { step: 'START', terminate: true },
        timeout: 100
      }
    ]
  },
  {
    name: 'AGE',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'age_view'
      }]
  },
  {
    name: 'MAIN_VIEW',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'main_view'
      },
      {
        name: 'ui/setSpinnerEnabled',
        options: true,
        timeout: 0
      }
    ]
  },
  {
    name: 'WAIT',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'wait'
      }
    ]
  },
  {
    name: 'DIAGNOSTIC_START',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'diagnostic_start'
      }
    ]
  },
  {
    name: 'SPECIALIST_START',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'specialist'
      }
    ]
  },
  {
    name: 'SPECIALIST_QUEST',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'specialist_quest'
      }
    ]
  },
  {
    name: 'SPECIALIST_RESULT',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'specialist_result'
      }
    ]
  },
  {
    name: 'DISEASE_MAIN',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'disease_main'
      }
    ]
  },
  {
    name: 'DISEASE_QUEST',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'disease_quest'
      }
    ]
  },
  {
    name: 'WIDTH_HEIGHT',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'width_height'
      }
    ]
  },
  {
    name: 'WIDTH_HEIGHT_2',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'width_height'
      }
    ]
  },
  {
    name: 'EXIT',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'exit_view'
      }
    ]
  },
  /*
  {
    name: 'MEASUREMENT',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'measurement'
      }
    ]
  },
  */

  {
    'name': 'MEASUREMENT_6_1',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_6_1', 'timeout': 0 },
      { 'name': 'robot/setRobotDialogCase', 'options': 'TEMPERATURE:extend', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_6_1', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'MEASUREMENT_6_2',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_6_2', 'timeout': 0 },
      { 'name': 'robot/setRobotDialogCase', 'options': 'TEMPERATURE-PROCESS:extend', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_6_2', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'MEASUREMENT_6_3',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_6_3', 'timeout': 0 },
      { 'name': 'robot/setRobotDialogCase', 'options': 'TEMPERATURE-RESULT:extend', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_6_3', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'MEASUREMENT_6_3_ERROR',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_6_3', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_6_3_ERROR', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'MEASUREMENT_2_1',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_2_1', 'timeout': 0 },
      { 'name': 'robot/setRobotDialogCase', 'options': 'MEASUREMENT_2_1:extend', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_2_1', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'MEASUREMENT_2_2',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_2_2', 'timeout': 0 },
      { 'name': 'robot/setRobotDialogCase', 'options': 'MEASUREMENT_2_2:extend', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_2_2', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'MEASUREMENT_2_3',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_2_3', 'timeout': 0 },
      { 'name': 'robot/setRobotDialogCase', 'options': 'MEASUREMENT_2_3:extend', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_2_3', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'MEASUREMENT_2_4',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_2_4', 'timeout': 0 },
      { 'name': 'robot/setRobotDialogCase', 'options': 'MEASUREMENT_2_4:extend', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_2_4', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'MEASUREMENT_2_5',
    'entering': [
      // { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'result_view', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_2_5', 'timeout': 0 },
      { 'name': 'robot/setRobotDialogCase', 'options': 'MEASUREMENT_2_5:extend', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_2_5', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'CLUKOMETR_ERROR',
    'entering': [
      { 'name': 'robot/setRobotDialogCase', 'options': 'CLUKOMETR_ERROR:extend', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'CLUKOMETR_ERROR', 'terminate': true }, 'timeout': 50 },
      { 'name': 'engine/handlerCallScenario', 'options': 'glucometerError' }
    ]
  },
  {
    'name': 'MEASUREMENT_5_1',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_5_1', 'timeout': 0 },
      { 'name': 'robot/setRobotDialogCase', 'options': 'PRESSURE:extend', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_5_1', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'MEASUREMENT_5_2',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_5_2', 'timeout': 0 },
      { 'name': 'robot/setRobotDialogCase', 'options': 'PRESSURE-PROCESS:extend', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_5_2', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'MEASUREMENT_5_3',
    'entering': [
      // { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'result_view', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_5_3', 'timeout': 0 }
    ]
  },
  {
    'name': 'MEASUREMENT_5_3_ERROR',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_5_3', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_5_3_ERROR', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'MEASUREMENT_4_1',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_4_1', 'timeout': 0 },
      { 'name': 'robot/setRobotDialogCase', 'options': 'MEASUREMENT_4_1:extend', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_4_1', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'MEASUREMENT_4_2',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_4_2', 'timeout': 0 },
      { 'name': 'robot/setRobotDialogCase', 'options': 'MEASUREMENT_4_2:extend', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_4_2', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'MEASUREMENT_4_3',
    'entering': [
      // { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'result_view', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_4_3', 'timeout': 0 },
      { 'name': 'robot/setRobotDialogCase', 'options': 'MEASUREMENT_4_3:extend', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_4_3', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'SATURATSIYA_ERROR',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'saturatsiyaError' }
    ]
  },
  /*
  {
    'name': 'MEASUREMENT_3_1',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_3_1', 'timeout': 0 },
      { 'name': 'robot/setRobotDialogCase', 'options': 'HEIGHT:extend', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_3_1', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'MEASUREMENT_3_2',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_3_2', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_3_2', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'MEASUREMENT_3_3',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_3_3', 'timeout': 0 },
      { 'name': 'robot/setRobotDialogCase', 'options': 'HEIGHT-PROCESS:extend', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_3_3', 'terminate': true }, 'timeout': 100 }
    ]
  },
  {
    'name': 'MEASUREMENT_3_4',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_3_4', 'timeout': 0 }
    ]
  },
  {
    'name': 'MEASUREMENT_3_4_ERROR',
    'entering': [
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement', 'timeout': 0 },
      { 'name': 'engine/handlerCallScenario', 'options': 'measurement_3_4', 'timeout': 0 },
      { 'name': 'robot/sayReplicByName', 'options': { 'step': 'MEASUREMENT_3_4_ERROR', 'terminate': true }, 'timeout': 50 }
    ]
  },
  */
  {
    name: 'RESULT',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'result_view'
      }]
  },
  {
    name: 'PRINT_VIEW',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'print_view'
      }
    ]
  },
  {
    name: 'EXAMINATION',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'examination'
      }]
  },
  {
    name: 'EXAM_RESULT',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'exam_result'
      }]
  },
  {
    name: 'ONCOLOGY_MAIN',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'oncology_main'
      }]
  },

  {
    name: 'DIABETES',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'diabetes'
      }]
  },
  {
    name: 'REFLUX',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'reflux'
      }]
  },
  {
    name: 'DEPRESSION',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'depression'
      }]
  },
  {
    name: 'PROSTATITIS',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'prostatitis'
      }]
  },
  {
    name: 'ONCOLOGY_QUEST',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'oncology_quest'
      }]
  },
  {
    name: 'DISEASE_RESULT',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'disease_result'
      }]
  },
  {
    name: 'RECOMEND_VIEW',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'recomend_view'
      }]
  },

  {
    name: 'INITIAL',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'initial'
      }]
  }
]
