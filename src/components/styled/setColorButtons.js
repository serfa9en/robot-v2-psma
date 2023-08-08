/* eslint-disable no-undef */
/* eslint-disable camelcase */

/* ---------------------------COLOR------------------- */
const colorBad = '#E63946'
const colorGood = '#84AD00'
const colorNorm = '#FFB225'

export function setColorSaturatsiya (val) {
  let colorBut = '#691B26'
  if (val >= 95) {
    // все хорошо
    colorBut = colorGood
  }
  if (val < 95 && val >= 90) {
    // средне
    colorBut = colorNorm
  }
  if (val < 90) {
    // все плохо
    colorBut = colorBad
  }
  return colorBut
}

export function setColorGlucometry (val, diabetes) {
  let colorBut = '#691B26'
  val = val.toFixed(1)
  if (diabetes === false) {
    // диабета нет
    if (val < 3.3) {
      colorBut = colorNorm
    }
    if (val < 6.8 && val >= 3.3) {
      colorBut = colorGood
    }
    if (val < 11 && val >= 6.8) {
      colorBut = colorNorm
    }
    if (val > 11) {
      colorBut = colorBad
    }
  } else {
    // диабет есть
    if (val < 3) {
      colorBut = colorBad
    }
    if (val <= 7 && val >= 3) {
      colorBut = colorGood
    }
    if (val < 9.6 && val > 7) {
      colorBut = colorNorm
    }
    if (val < 14 && val >= 9.6) {
      colorBut = colorBad
    }
    if (val >= 14) {
      colorBut = colorBad
    }
  }
  return colorBut
}

export function setColorTemperature (val) {
  let colorBut = '#691B26'
  if (val < 35.5) {
    colorBut = colorNorm
  }
  if (val < 36.9 && val >= 35.5) {
    colorBut = colorGood
  }
  if (val >= 37 && val <= 37.9) {
    colorBut = colorNorm
  }
  if (val > 38) {
    colorBut = colorBad
  }
  return colorBut
}

export function setColorPressure (val_s, val_d) {
  let colorBut = '#691B26'
  if (val_s < 70 && val_d < 40) {
    colorBut = colorBad
  }
  if (val_s >= 70 && val_s <= 90 && val_d >= 40 && val_d <= 50) {
    // все плохо
    colorBut = colorNorm
  }
  if (val_s > 90 && val_s <= 140 && val_d > 50 && val_d <= 90) {
    colorBut = colorGood
  }
  if (val_s > 140 && val_s <= 180 && val_d > 90 && val_d <= 110) {
    // все плохо
    colorBut = colorNorm
  }
  if (val_s > 180 && val_d > 110) {
    colorBut = colorBad
  }
  return colorBut
}

export function setColorImt (val) {
  let colorBut = '#691B26'
  if (val < 18.5) {
    colorBut = colorNorm
  }
  if (val >= 18.5 && val <= 25) {
    colorBut = colorGood
  }
  if (val > 25 && val <= 30) {
    colorBut = colorNorm
  }
  if (val > 30) {
    colorBut = colorBad
  }
  return colorBut
}

/* --------------------------------PATH IMG----------------- */
// пути картинок
export function setImgSaturatsiya (val) {
  if (val >= 95) {
    return 'Sat_good.png'
  }
  if (val < 95 && val >= 90) {
    return 'Sat_norm.png'
  }
  if (val < 90) {
    return 'Sat_bad.png'
  }
}

export function setImgGlucometry (val, diabetes) {
  if (diabetes === false) {
    // диабета нет
    if (val < 3.3) {
      return 'Gluco_norm.png'
    }
    if (val < 6.8 && val >= 3.3) {
      return 'Gluco_good.png'
    }
    if (val < 11 && val >= 6.8) {
      return 'Gluco_norm.png'
    }
    if (val > 11) {
      return 'Gluco_bad.png'
    }
  } else {
    // диабет есть
    if (val < 3) {
      return 'Gluco_bad.png'
    }
    if (val <= 7 && val >= 3) {
      return 'Gluco_good.png'
    }
    if (val < 9.6 && val > 7) {
      return 'Gluco_norm.png'
    }
    if (val < 14 && val >= 9.6) {
      return 'Gluco_bad.png'
    }
    if (val >= 14) {
      return 'Gluco_bad.png'
    }
  }
}

export function setImgTemperature (val) {
  if (val < 35.5) {
    return 'Temp_norm.png'
  }
  if (val < 36.9 && val >= 35.5) {
    return 'Temp_good.png'
  }
  if (val < 37 && val <= 37.9) {
    return 'Temp_norm.png'
  }
  if (val > 38) {
    return 'Temp_bad.png'
  }
  return colorBut
}

export function setImgPressure (val_s, val_d) {
  if (val_s < 70 && val_d < 40) {
    return 'Pressure_bad.png'
  }
  if (val_s >= 70 && val_s <= 90 && val_d >= 40 && val_d <= 50) {
    // все плохо
    return 'Pressure_norm.png'
  }
  if (val_s > 90 && val_s <= 140 && val_d > 50 && val_d <= 90) {
    return 'Pressure_good.png'
  }
  if (val_s > 140 && val_s <= 180 && val_d > 90 && val_d <= 110) {
    return 'Pressure_norm.png'
  }
  if (val_s > 180 && val_d > 110) {
    return 'Pressure_bad.png'
  }
}

export function setImgPulse (val_s, val_d) {
  if (val_s < 70 && val_d < 40) {
    return 'Pulse_bad.png'
  }
  if (val_s >= 70 && val_s <= 90 && val_d >= 40 && val_d <= 50) {
    // все плохо
    return 'Pulse_norm.png'
  }
  if (val_s > 90 && val_s <= 140 && val_d > 50 && val_d <= 90) {
    return 'Pulse_good.png'
  }
  if (val_s > 140 && val_s <= 180 && val_d > 90 && val_d <= 110) {
    return 'Pulse_norm.png'
  }
  if (val_s > 180 && val_d > 110) {
    return 'Pulse_bad.png'
  }
}

export function setImgImt (val) {
  if (val < 18.5) {
    return 'Imt_1.png'
  }
  if (val >= 18.5 && val <= 25) {
    return 'Imt_2.png'
  }
  if (val > 25 && val <= 30) {
    return 'Imt_3.png'
  }
  if (val > 30) {
    return 'Imt_4.png'
  }
}

/* ----------------------------------------INFO---------------- */
// Комментарий
export function setInfoSaturatsiya (val) {
  if (val < 95) {
    return 'Убедитесь, что датчик плотно прилегает к вашему пальцу и Ваши руки теплые'
  }
}

export function setInfoGlucometry (val, diabetes) {
  if (diabetes === false) {
    // диабета нет
    if (val < 3.3) {
      return 'Вам необходимо выпить сладкий напиток, съесть сладкое. Проконтролируйте уровень глюкозы повторно через 10 минут'
    }
    if (val < 6.8 && val >= 3.3) {
      return 'Периодическое исследование уровня глюкозы позволяет вовремя выявить нарушения углеводного обмена, риск развития сахарного диабета и сердечно-сосудистых заболеваний'
    }
    if (val < 11 && val >= 6.8) {
      return 'Чаще всего данный уровень глюкозы является следствием недавнего плотного приёма пищи, стрессовой ситуации, физической нагрузки и других провоцирующих факторов'
    }
    if (val > 11) {
      return 'Если повышение глюкозы выявлено впервые, есть вероятность, что у Вас диабет'
    }
  } else {
    // диабет есть
    if (val < 3) {
      return 'Вам необходимо выпить сладкий напиток, съесть сладкое. Проконтролируйте уровень глюкозы повторно через 10 минут'
    }
    if (val <= 7 && val >= 3) {
      return 'Периодическое исследование уровня глюкозы позволяет вовремя выявить погрешности в лечении, а также предотвратить развитие осложнений сахарного диабета'
    }
    if (val < 9.6 && val > 7) {
      return 'Данный уровень глюкозы может является следствием недавнего плотного приёма пищи, стрессовой ситуации, погрешности в лечении и других факторов'
    }
    if (val < 14 && val >= 9.6) {
      return 'Не забывайте принимать сахароснижающие лекарства. Рекомендуем обратиться за помощью к врачу для коррекции вашего лечения'
    }
    if (val >= 14) {
      return 'Имеется риск развития осложнений сахарного диабета. Рекомендуем Вам незамедлительно обратится к врачу'
    }
  }
}

export function setInfoTemperature (val) {
  if (val < 35.5) {
    return 'К понижению температуры тела ведет переохлаждение, обезвоживание, повышенное потоотделение'
  }
  if (val > 37 && val <= 37.9) {
    return 'Возможно, Вы слишком тепло одеты или занимались физической нагрузкой'
  }
  if (val > 38) {
    return 'Есть вероятность того, что Вы болеете'
  }
  return colorBut
}

export function setInfoPressure (val_s, val_d) {
  if (val_s < 70 && val_d < 40) {
    return 'Возможно, Вы принимали лекарства для снижения давления'
  }
  if (val_s >= 70 && val_s <= 90 && val_d >= 40 && val_d <= 50) {
    return 'Возможно, Вы принимали лекарства для снижения давления или устали'
  }
  if (val_s > 90 && val_s <= 140 && val_d > 50 && val_d <= 90) {
    return 'Регулярное измерение артериального давления позволит Вам вовремя выявить отклонения в своем здоровье'
  }
  if (val_s > 140 && val_s <= 180 && val_d > 90 && val_d <= 110) {
    return 'Возможно, Вы испытывали физические нагрузки, эмоциональный стресс, пили энергетические напитки или кофе, курили в ближайший час'
  }
}

export function setInfoImt (val) {
  if (val < 18.5) {
    return 'При дефиците массы тела возникает белково-энергетическая недостаточность, которая может приводить к серьезным отклонениям в Вашем здоровье'
  }
  if (val >= 18.5 && val <= 25) {
    return 'Ожирение является фактором риска многих заболеваний. Придерживайтесь принципами здорового питания, занимайтесь спортом'
  }
  if (val > 25 && val <= 30) {
    return 'Повышенный индекс массы тела является одним из основных факторов риска сердечно-сосудистых заболеваний'
  }
  if (val > 30) {
    return 'Ожирение является одним из основных факторов риска сердечно-сосудистых заболеваний'
  }
}

/* ---------------------------------------INFO ADD --------------------- */
// Комментарий 2
export function setInfoAddSaturatsiya (val) {
  if (val < 95 && val >= 90) {
    return 'Повторно измерьте сатурацию крови. При сохранении низких значений обратитесь к врачу'
  }
  if (val < 90) {
    return 'Повторно измерьте сатурацию крови. При сохранении низких значений обратитесь к врачу'
  }
}

export function setInfoAddGlucometry (val, diabetes) {
  if (diabetes === false) {
    // диабета нет
    if (val < 3.3) {
      return 'При сохранении низких значений вызовите скорую по номеру 112 или 103'
    }
    if (val < 6.8 && val >= 3.3) {
      return 'Придерживайтесь принципам здорового образа жизни и питания'
    }
    if (val < 11 && val >= 6.8) {
      return 'Если вы недавно поели, проконтролируйте уровень глюкозы через 2 часа. При сохранении высоких значений необходима консультация врача'
    }
    if (val > 11) {
      return 'Рекомендуем незамедлительно обратиться за помощью к врачу, чтобы пройти обследование'
    }
  } else {
    // диабет есть
    if (val < 3) {
      return 'При сохранении низких значений вызовите скорую по номеру 112 или 103'
    }
    if (val <= 7 && val >= 3) {
      return 'Придерживайтесь принципам здорового образа жизни и питания, соблюдайте все рекомендации Вашего лечащего врача'
    }
    if (val < 9.6 && val > 7) {
      return 'Не забывайте принимать сахароснижающие лекарства. При ухудшении состояния обратитесь к врачу'
    }
  }
}

export function setInfoAddTemperature (val) {
  if (val < 35.5) {
    return 'Возможно, Вы только что пришли с улицы.  Проконтролируйте свою температуру повторно, при сохранении низких значений обратитесь к врачу.'
  }
  if (val > 37 && val <= 37.9) {
    return 'Проконтролируйте свою температуру через 15 минут, при сохранении высоких значений более 37 С обратитесь к врачу'
  }
  if (val > 38) {
    return 'Проконтролируйте свою температуру через 15 минут, при сохранении высоких значений более 37 С обратитесь к врачу'
  }
  return colorBut
}

export function setInfoAddPressure (val_s, val_d) {
  if (val_s < 70 && val_d < 40) {
    return 'Проконтролируйте свое давление повторно через 15 минут. При сохранении низких значений вам необходимо обратитесь к врачу'
  }
  if (val_s >= 70 && val_s <= 90 && val_d >= 40 && val_d <= 50) {
    return 'Проконтролируйте свое давление повторно через 15 минут. При сохранении низких значений вам необходимо обратитесь к врачу'
  }
  if (val_s > 90 && val_s <= 140 && val_d > 50 && val_d <= 90) {
    return null
  }
  if (val_s > 140 && val_s <= 180 && val_d > 90 && val_d <= 110) {
    return 'Проконтролируйте свое давление повторно через 15 минут. При сохранении высоких значений вам необходимо обратитесь к врачу'
  }
  if (val_s > 180 && val_d > 110) {
    return 'Проконтролируйте свое давление повторно через 15 минут. При сохранении высоких значений вызовите скорую помощь по номеру 112 или 103'
  }
}

export function setInfoAddImt (val) {
  if (val < 18.5) {
    return 'Необходимо обратиться за консультацией к врачу'
  }
  if (val >= 18.5 && val <= 25) {
    return 'Контролируйте свой вес'
  }
  if (val > 25 && val <= 30) {
    return 'Вам необходимо обратиться для консультации к врачу'
  }
  if (val > 30) {
    return 'Вам необходимо обратиться для консультации к врачу'
  }
}

/* -------------------------------НОРМА-------------------- */
export function setNormSaturatsiya (val) {
  if (val >= 95) {
    // все хорошо
    return 'Ваша сатурация крови в пределах нормы'
  }
  if (val < 95 && val >= 90) {
    // средне
    return 'Ваша сатурация крови снижена'
  }
  if (val < 90) {
    // все плохо
    return 'Ваша сатурация крови значительно снижена'
  }
}

export function setNormGlucometry (val, diabetes) {
  if (diabetes === false) {
    // диабета нет
    if (val < 3.3) {
      return 'У Вас низкий уровень глюкозы в крови'
    }
    if (val < 6.8 && val >= 3.3) {
      return 'Уровень глюкозы соответствует норме'
    }
    if (val < 11 && val >= 6.8) {
      return 'У Вас повышенный уровень глюкозы в крови'
    }
    if (val > 11) {
      return 'Ваш уровень глюкозы значительно повышен'
    }
  } else {
    // диабет есть
    if (val < 3) {
      return 'У Вас низкий уровень глюкозы в крови'
    }
    if (val <= 7 && val >= 3) {
      return 'Ваш диабет хорошо контролируется'
    }
    if (val < 9.6 && val > 7) {
      return 'у Вас повышен уровень глюкозы крови'
    }
    if (val < 14 && val >= 9.6) {
      return 'Ваш уровень глюкозы значительно повышен'
    }
    if (val >= 14) {
      return 'Ваш уровень глюкозы значительно повышен'
    }
  }

  if (val < 3) {
    return 'У Вас низкий уровень глюкозы в крови'
  }
  if (val < 3.3 && val > 3) {
    return 'Уровень глюкозы соответствует норме'
  }
  if (val < 6.8 && val >= 3.3) {
    return 'Уровень глюкозы соответствует норме'
  }
  if (val < 11 && val >= 6.8) {
    return 'У Вас повышенный уровень глюкозы в крови'
  }
  if (val > 11) {
    return 'Ваш уровень глюкозы значительно повышен'
  }
}

export function setNormTemperature (val) {
  if (val < 35.5) {
    return 'У Вас пониженная температура тела'
  }
  if (val < 36.9 && val >= 35.5) {
    return 'Ваша температура тела соответствует норме'
  }
  if (val < 37 && val <= 37.9) {
    // все плохо
    return 'У Вас умеренно повышена температура тела'
  }
  if (val > 38) {
    return 'У Вас значительно повышена температура тела'
  }
}

export function setNormPressure (val_s, val_d) {
  if (val_s < 70 && val_d < 40) {
    return 'У Вас очень низкое давление'
  }
  if (val_s >= 70 && val_s <= 90 && val_d >= 40 && val_d <= 50) {
    // все плохо
    return 'У Вас пониженное давление'
  }
  if (val_s > 90 && val_s <= 140 && val_d > 50 && val_d <= 90) {
    return 'Ваше артериальное давления соответствует норме'
  }
  if (val_s > 140 && val_s <= 180 && val_d > 90 && val_d <= 110) {
    // все плохо
    return 'Ваше артериальное давление повышено'
  }
  if (val_s > 180 && val_d > 110) {
    return 'У Вас очень высокое артериальное давление'
  }
}

export function setNormImt (val) {
  if (val < 18.5) {
    return 'У Вас имеется дефицит массы тела'
  }
  if (val >= 18.5 && val <= 25) {
    return 'ИМТ (индекс массы тела) соответствует норме'
  }
  if (val > 25 && val <= 30) {
    return 'У Вас имеется избыточная масса тела'
  }
  if (val < 34.9) {
    return 'У Вас имеется ожирение первой степени'
  }
  if (val < 39.9) {
    return 'У Вас имеется ожирение второй степени'
  }
  if (val >= 40) {
    return 'У Вас имеется ожирение третьей степени'
  }
}
