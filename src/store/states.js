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
    name: 'INITIAL',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'initial'
      }]
  },
  {
    name: 'MEET_FACE',
    entering: [
      {
        name: 'engine/handlerCallScenario',
        options: 'meet_face'
      }]
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
      }]
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
  }
]
