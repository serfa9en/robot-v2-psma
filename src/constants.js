// МОК-данные с приборов, для разработки
export const GLUCOMETR_RESULT = {
  type: 2,
  message: {
    data: 5.5
  }
}
// ПРИБОРЫ
export const EXAMINATION_TYPE = {
  CONSULTATION: 1, // 1
  // Росто - весомер
  WEIGHT_HEIGHT: 3, // 3
  THERMO: 6, // 6
  // Термометр пальцем в лоб
  THERMO_FINGER: 60,
  // Термометр как отдельный модуль
  THERMO_HEAD: 61,
  // TODO разделить эти измерения
  // Спирометрия
  // SPIROMETER: 'SPIROMETER', // 4
  // Пульсоксиметрия
  // PULSEOXIMETER: 'PULSEOXIMETER', // 4
  // Пульсоксиметрия и спирография
  PULSEOXIMETER_SPIROMETER: 4, // 4
  // Тонометр на плечо
  TONOMETER: 5, // 5
  // Глюкометр
  GLUCOMETER: 2 // 2
}

// СИГНАЛЫ ИЗ ТОПИКОВ
export const TOPIC_DATA = {
  // Росто - весомер
  WEIGHT_HEIGHT_RESULT: 'WEIGHT_HEIGHT_RESULT', // 3
  // Термометр пальцем в лоб
  THERMO_FINGER_RESULT: 'THERMO_FINGER_RESULT', // 6
  // Спирометрия
  SPIROMETER_STATUS: 'SPIROMETER_STATUS', // 4_0
  SPIROMETER_RESULT: 'SPIROMETER_RESULT', // 4_6
  // Пульсоксиметрия
  PULSEOXIMETER_RESULT: 'PULSEOXIMETER_RESULT', // 4_2
  // Тонометр на плечо
  TONOMETER_STATUS: 'TONOMETER_STATUS', // 5_1
  // Глюкометр
  GLUCOMETER_BATTERY: 'GLUCOMETER_BATTERY', // 21
  GLUCOMETER_CONNECTION: 'GLUCOMETER_CONNECTION', // 20
  GLUCOMETER_PERCENT: 'GLUCOMETER_PERCENT', // 22
  GLUCOMETER_RESULT: 'GLUCOMETER_RESULT' // 2
}
