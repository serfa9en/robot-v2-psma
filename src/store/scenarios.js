export default {
  // экран с ожиданием
  wait_promo: [
    {
      name: 'app/setStep',
      options: 'wait_promo',
      timeout: 0
    }
  ],
  // инициализация кейса (начальные параметры)
  initial: [
    {
      name: 'engine/handlerMoveToState',
      options: 'WAIT_PROMO',
      timeout: 1000
    },
    { name: 'app/clearState', options: null }
  ],
  // экран распознавания лица
  meet_face: [
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
    }
  ],
  // пройти отдельное обследование
  diagnostic_start: [
    {
      name: 'app/setStep',
      options: 'diagnostic_start',
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
  wait: [
    { name: 'app/setMeetingTalk', options: false },
    { name: 'robot/faceRecognizeAutotrackingRequest', options: true },
    { name: 'faces/setLogicDbRequest', options: true },
    { name: 'faces/refresh' }
  ]
}
