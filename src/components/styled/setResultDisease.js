/* --------------------РЕЗУЛЬТАТ ПО БОЛЕЗНЯМ----------- */

export function getComment (number, val) {
  let result
  switch (number) {
    case 0: {
      // сахарный диабет
      result = getDiabetesResult(val)
      break
    }
    case 1: {
      // рефлюксная болезнь
      result = getRefluxResult(val)
      break
    }
    case 2: {
      // депрессия
      result = getDepressionResult(val)
      break
    }
    case 3: {
      // простатит
      result = getProstatitisResult(val)
      break
    }
  }
  return result
}

/* --------------------РЕЗУЛЬТАТ ВЫВОД---------------------- */

export function getDiabetesResultD (val) {
  let proc = ''
  if (val < 7) {
    proc = 'Около 1%'
  }
  if (val >= 7 && val <= 11) {
    proc = 'Около 4%'
  }
  if (val >= 12 && val <= 14) {
    proc = 'Около 17%'
  }
  if (val >= 15 && val <= 20) {
    proc = 'Около 33%'
  }
  if (val > 20) {
    proc = 'Около 50%'
  }
  return proc
}

export function getDiabetesResult (val) {
  let proc = ''
  if (val < 7) {
    proc = 'Низкий риск!'
  }
  if (val >= 7 && val < 11) {
    proc = 'Риск слегка повышен!'
  }
  if (val >= 11 && val < 14) {
    proc = 'Умеренный риск!'
  }
  if (val >= 14 && val <= 20) {
    proc = 'Высокий риск!'
  }
  if (val > 20) {
    proc = 'Очень высокий риск!'
  }
  return proc
}

export function getRefluxResult (val) {
  let proc = ''
  if (val <= 5) {
    proc = 'Низкий риск!'
  }
  if (val > 5 && val <= 8) {
    proc = 'Умеренный риск!'
  }
  if (val > 8) {
    proc = 'Высокий риск!'
  }
  return proc
}

export function getDepressionResult (val) {
  let proc = ''
  if (val <= 4) {
    proc = 'Минимальный уровень!'
  }
  if (val > 4 && val <= 9) {
    proc = 'Легкая депрессия!'
  }
  if (val > 9 && val <= 14) {
    proc = 'Умеренная депрессия!'
  }
  if (val > 14 && val <= 19) {
    proc = 'Тяжёлая депрессия!'
  }
  if (val > 19 && val <= 27) {
    proc = 'Крайне тяжёлая депрессия!'
  }
  return proc
}

export function getProstatitisResult (val) {
  let proc = ''
  if (val <= 7) {
    proc = 'Легкая симптоматика!'
  }
  if (val > 7 && val <= 19) {
    proc = 'Умеренная степень тяжести!'
  }
  if (val > 19) {
    proc = 'Тяжёлая степень нарушений!'
  }
  return proc
}

export function getResultOncology (val) {
  let result
  if (val >= 0 && val <= 5) {
    result = 'Низкий риск!'
  }
  if (val >= 6 && val <= 9) {
    result = 'Умеренный риск!'
  }
  if (val >= 10) {
    result = 'Высокий риск развития!'
  }
  return result
}

/* --------------------КАРТИНКА---------------------- */
export function getDiabetesImg (val) {
  let img = ''
  if (val < 7) {
    img = '1.png'
  }
  if (val >= 7 && val < 11) {
    img = '2.png'
  }
  if (val >= 11 && val < 14) {
    img = '3.png'
  }
  if (val >= 14 && val <= 20) {
    img = '4.png'
  }
  if (val > 20) {
    img = '5.png'
  }
  return img
}

export function getRefluxImg (val) {
  let proc = ''
  if (val <= 5) {
    proc = '1.png'
  }
  if (val > 5 && val <= 8) {
    proc = '3.png'
  }
  if (val > 8) {
    proc = '5.png'
  }
  return proc
}

export function getDepressionImg (val) {
  let proc = ''
  if (val <= 4) {
    proc = '1.png'
  }
  if (val > 4 && val <= 9) {
    proc = '2.png'
  }
  if (val > 9 && val <= 14) {
    proc = '3.png'
  }
  if (val > 14 && val <= 19) {
    proc = '4.png'
  }
  if (val > 19 && val <= 27) {
    proc = '5.png'
  }
  return proc
}

export function getProstatitisImg (val) {
  let proc = ''
  if (val <= 7) {
    proc = '1.png'
  }
  if (val > 7 && val <= 19) {
    proc = '3.png'
  }
  if (val > 19) {
    proc = '5.png'
  }
  return proc
}

export function getImgOncology (val) {
  let result
  if (val >= 0 && val <= 5) {
    result = '1.png'
  }
  if (val >= 6 && val <= 9) {
    result = '3.png'
  }
  if (val >= 10) {
    result = '5.png'
  }
  return result
}

/* --------------------ТЕКСТ---------------------- */
export function getDiabetesText (val) {
  let text = ''
  if (val < 7) {
    text = 'Рекомендуем придерживаться ЗОЖ и правильного питания'
  }
  if (val >= 7 && val < 11) {
    text = 'Рекомендуем придерживаться ЗОЖ и правильного питания'
  }
  if (val >= 11 && val < 14) {
    text = 'Bозможно у вас преддиабет! Вам необходимо обратиться к профильному специалисту (эндокринологу) или терапевту, а также придерживаться ЗОЖ и правильного питания'
  }
  if (val >= 14 && val <= 20) {
    text = 'Возможно у вас преддиабет или сахарный диабет! Вам необходимо обратиться к профильному специалисту (эндокринологу) или терапевту, а также придерживаться ЗОЖ и правильного питания'
  }
  if (val > 20) {
    text = 'Возможно у вас сахарный диабет! Вам необходимо обратиться к профильному специалисту (эндокринологу) или терапевту, а также придерживаться ЗОЖ и правильного питания'
  }
  return text
}

export function getRefluxText (val) {
  let text = ''
  if (val <= 5) {
    text = 'Необходимо придерживаться дробного питания малыми порциями 5-6 раз в сутки. Соблюдать ЗОЖ и правильное питание'
  }
  if (val > 5 && val <= 8) {
    text = 'Вам необходимо обратиться к профильному специалисту (гастроэнтерологу) или терапевту. Необходимо придерживаться дробного питания малыми порциями 5-6 раз в сутки. Соблюдать ЗОЖ и правильное питание'
  }
  if (val > 8) {
    text = 'Вам необходимо обратиться к профильному специалисту (гастроэнтерологу) или терапевту. Необходимо придерживаться дробного питания малыми порциями 5-6 раз в сутки. Соблюдать ЗОЖ и правильное питание'
  }
  return text
}

export function getDepressionText (val) {
  let proc = ''
  if (val <= 4) {
    proc = 'У Вас минимальный уровень депрессии или полное её отсутствие'
  }
  if (val > 4 && val <= 9) {
    proc = 'Вам необходимо обратиться к профильному специалисту (психологу или психотерапевту)'
  }
  if (val > 9 && val <= 14) {
    proc = 'Вам необходимо обратиться к профильному специалисту (психологу или психотерапевту)'
  }
  if (val > 14 && val <= 19) {
    proc = 'Вам необходимо обратиться к профильному специалисту (психологу или психотерапевту), потребуется назначение комплексной схемы лечения'
  }
  if (val > 19 && val <= 27) {
    proc = 'Вам необходимо обратиться к профильному специалисту (психологу или психотерапевту), потребуется назначение комплексной схемы лечения'
  }
  return proc
}

export function getProstatitisText (val) {
  let proc = ''
  if (val <= 7) {
    proc = 'Вам показано дальнейшее наблюдение, возможно назначение симптоматической терапии'
  }
  if (val > 7 && val <= 19) {
    proc = 'Вам показано дообследование с целью подбора препаратов для консервативного лечения'
  }
  if (val > 19) {
    proc = 'Вам показано комплексное урологическое обследование, рекомендуется оперативное лечение'
  }
  return proc
}

export function getTextOncology (val) {
  let result
  if (val >= 0 && val <= 5) {
    result = 'Проходите плановые медицинские осмотры'
  }
  if (val >= 6 && val <= 9) {
    result = 'Вам следует обратиться в первичный онкологический кабинет по месту медобслуживания'
  }
  if (val >= 10) {
    result = 'Вам необходимо срочно обратиться в первичный онкологический кабинет по месту медобслуживания с целью дальнейшего обследования в онкологическом диспансере'
  }
  return result
}

/* --------------------ЦВЕТ РЕЗУЛЬТАТА---------------------- */
export function getDiabetesColor (val) {
  let colorBut = ''
  if (val < 7) {
    colorBut = 'rgba(132,173,0,0.2)'
  }
  if (val >= 7 && val < 11) {
    colorBut = 'rgba(255,178,37,0.2)'
  }
  if (val >= 11 && val < 14) {
    colorBut = 'rgba(255,142,37,0.2)'
  }
  if (val >= 14 && val <= 20) {
    colorBut = 'rgba(230,57,70,0.2)'
  }
  if (val > 20) {
    colorBut = 'rgba(199,50,61,0.2)'
  }
  return colorBut
}

export function getRefluxColor (val) {
  let colorBut = ''
  if (val <= 5) {
    colorBut = 'rgba(132,173,0,0.2)'
  }
  if (val > 5 && val <= 8) {
    colorBut = 'rgba(255,142,37,0.2)'
  }
  if (val > 8) {
    colorBut = 'rgba(199,50,61,0.2)'
  }
  return colorBut
}

export function getDepressionColor (val) {
  let proc = ''
  if (val <= 4) {
    proc = 'rgba(132,173,0,0.2)'
  }
  if (val > 4 && val <= 9) {
    proc = 'rgba(255,178,37,0.2)'
  }
  if (val > 9 && val <= 14) {
    proc = 'rgba(255,142,37,0.2)'
  }
  if (val > 14 && val <= 19) {
    proc = 'rgba(230,57,70,0.2)'
  }
  if (val > 19 && val <= 27) {
    proc = 'rgba(199,50,61,0.2)'
  }
  return proc
}

export function getProstatitisColor (val) {
  let proc = ''
  if (val <= 7) {
    proc = 'rgba(132,173,0,0.2)'
  }
  if (val > 7 && val <= 19) {
    proc = 'rgba(255,142,37,0.2)'
  }
  if (val > 19) {
    proc = 'rgba(199,50,61,0.2)'
  }
  return proc
}

export function getColorOncology (val) {
  let result
  if (val >= 0 && val <= 5) {
    result = 'rgba(132,173,0,0.2)'
  }
  if (val >= 6 && val <= 9) {
    result = 'rgba(255,142,37,0.2)'
  }
  if (val >= 10) {
    result = 'rgba(199,50,61,0.2)'
  }
  return result
}

/* --------------------ЦВЕТ BORDER РЕЗУЛЬТАТА---------------------- */
export function getDiabetesBorderColor (val) {
  let colorBut = ''
  if (val < 7) {
    colorBut = '3px double #84ad00'
  }
  if (val >= 7 && val < 11) {
    colorBut = '3px double #ffb225'
  }
  if (val >= 11 && val < 14) {
    colorBut = '3px double #ff8e25'
  }
  if (val >= 14 && val <= 20) {
    colorBut = '3px double #e63946'
  }
  if (val > 20) {
    colorBut = '3px double #c7323d'
  }
  return colorBut
}

export function getRefluxBorderColor (val) {
  let colorBut = ''
  if (val <= 5) {
    colorBut = '3px double #84ad00'
  }
  if (val > 5 && val <= 8) {
    colorBut = '3px double #ff8e25'
  }
  if (val > 8) {
    colorBut = '3px double #c7323d'
  }
  return colorBut
}

export function getDepressionBorderColor (val) {
  let proc = ''
  if (val <= 4) {
    proc = '3px double #84ad00'
  }
  if (val > 4 && val <= 9) {
    proc = '3px double #ffb225'
  }
  if (val > 9 && val <= 14) {
    proc = '3px double #ff8e25'
  }
  if (val > 14 && val <= 19) {
    proc = '3px double #e63946'
  }
  if (val > 19 && val <= 27) {
    proc = '3px double #c7323d'
  }
  return proc
}

export function getProstatitisBorderColor (val) {
  let proc = ''
  if (val <= 7) {
    proc = '3px double #84ad00'
  }
  if (val > 7 && val <= 19) {
    proc = '3px double #ff8e25'
  }
  if (val > 19) {
    proc = '3px double #c7323d'
  }
  return proc
}

export function getBorderColorOncology (val) {
  let result
  if (val >= 0 && val <= 5) {
    result = '3px double #84ad00'
  }
  if (val >= 6 && val <= 9) {
    result = '3px double #ff8e25'
  }
  if (val >= 10) {
    result = '3px double #c7323d'
  }
  return result
}
