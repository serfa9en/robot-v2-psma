/* eslint-disable no-undef */
/* eslint-disable camelcase */
import * as question from '../dataStorage/specialist_question'

export function getComment (index, val) {
  let str = ''
  switch (index) {
    case 0: {
      // температура
      if (val < 35.5) {
        str = 'У Вас пониженная температура <br /> К понижению температуры тела ведет переохлаждение, обезвоживание, повышенное потоотделение.'
      }
      if (val < 36.9 && val >= 35.5) {
        str = 'Ваша температура соответсвует физиологической норме'
      }
      if (val >= 37 && val <= 37.9) {
        str = 'У Вас умеренно повышена температура тела <br /> Возможно, Вы слишком тепло одеты или занимались физической нагрузкой.'
      }
      if (val > 38) {
        str = 'У Вас значительно повышена температура тела <br />Есть вероятность того, что Вы болеете'
      }
      break
    }
    case 1: {
      // ИМТ
      if (val < 18.5) {
        str = 'У Вас имеется дефицит массы тела<br /> При дефиците массы тела возникает белково-энергетическая недостаточность, которая может приводить к серьезным отклонениям в Вашем здоровье.'
      }
      if (val >= 18.5 && val <= 25) {
        str = 'ИМТ соответствует норме <br /> Ожирение является фактором риска многих заболеваний. Придерживайтесь принципами здорового питания, занимайтесь спортом. Контролируйте свой вес.'
      }
      if (val > 25 && val <= 30) {
        str = 'У Вас имеется избыточная масса тела <br /> Повышенный индекс массы тела является одним из основных факторов риска сердечно-сосудистых заболеваний. <br /> Вам необходимо обратиться для консультации к врачу <br />'
        str += 'Соблюдайте рекомендации: <br /> <ul><li> ограничить калорийность своего рациона за счет снижения количества потребляемых жиров и сахаров; </li>'
        str += '<li>увеличить потребление фруктов и овощей, а также зернобобовых, цельных злаков и орехов; </li>'
        str += '<li>вести регулярную физическую активность (30 минут ходьбы в день + не менее 75 минут физической активности высокой интенсивности (плавание, бег) в неделю). </li></ul><br />'
      }
      if (val > 30) {
        str = 'У Вас имеется ожирение <br />'
        if (val <= 34.9) str += 'Ожирение первой степени <br />'
        if (val > 34.9 && val <= 39.9) str += 'Ожирение второй степени <br />'
        if (val > 40) str += 'Ожирение третьей степени <br />'
        str += 'Ожирение является одним из основных факторов риска сердечно-сосудистых заболеваний. <br /> Вам необходимо обратиться для консультации к врачу.<br />'
      }
      break
    }
    case 2: {
      // глюкоза
      val = val.toFixed(1)
      if (val < 3.3) {
        str = 'У Вас низкий уровень глюкозы в крови <br /> Вам необходимо выпить сладкий напиток, съесть сладкое. Проконтролируйте уровень глюкозы повторно через 10 минут.'
      }
      if (val >= 3.3 && val < 6.8) {
        str = 'Уровень глюкозы в крови соответсвует норме <br /> Периодическое исследование уровня глюкозы позволяет вовремя выявить нарушения углеводного обмена, риск развития сахарного диабета и сердечно-сосудистых заболеваний.'
      }
      if (val >= 6.8 && val < 11) {
        str = 'У Вас повышенный уровень глюкозы в крови <br />'
        str += 'Чаще всего данный уровень глюкозы является следствием недавнего плотного приёма пищи, стрессовой ситуации, физической нагрузки и других провоцирующих факторов.'
      }
      if (val > 11) {
        str = 'Уровень глюкозы в крови значительно повышен <br />'
        str += 'Если повышение глюкозы выявлено впервые, есть вероятность, что у Вас диабет. Рекомендуем незамедлительно обратиться за помощью к врачу, чтобы пройти обследование.'
      }
      break
    }
    case 3: {
      // сатурация
      if (val >= 95) {
        str = 'Ваша сатурация крови в пределах нормы'
      }
      if (val < 95) {
        str = 'Ваша сатурация крови снижена <br />'
        str += 'Убедитесь, что датчик плотно прилегает к вашему пальцу и Ваши руки теплые. Повторно измерьте сатурацию крови. При сохранении низких значений обратитесь к врачу.'
      }
      break
    }
  }
  return str
}

export function getCommentPressure (val_s, val_d) {
  let str = ''
  if (val_s < 70 && val_d < 40) {
    str = 'У Вас очень низкое давление'
  }
  if (val_s >= 70 && val_s <= 90 && val_d >= 40 && val_d <= 50) {
    str = 'У Вас пониженное давление <br /> Возможно, Вы принимали лекарства для снижения давления или устали.'
  }
  if (val_s > 90 && val_s <= 140 && val_d > 50 && val_d <= 90) {
    str = 'Ваше артериальное давления соответствует норме <br /> Регулярное измерение артериального давления позволит Вам вовремя выявить отклонения в своем здоровье.'
  }
  if (val_s > 140 && val_s <= 180 && val_d > 90 && val_d <= 110) {
    str = 'Ваше артериальное давление повышено <br /> Возможно, Вы испытывали физические нагрузки, эмоциональный стресс, пили энергетические напитки или кофе, курили в ближайший час.'
  }
  if (val_s > 180 && val_d > 110) {
    str = 'У Вас очень высокое давление <br /> Проконтролируйте свое артериальное давление повторно через некоторое время'
  }
  return str
}

export function getQuestions (index) {
  let str = ''
  switch (index) {
    case 0: {
      str = 'ui/getResultSpecialistBadCardiologist'
      break
    }
    case 1: {
      str = 'ui/getResultSpecialistBadNeurologist'
      break
    }
    case 2: {
      str = 'ui/getResultSpecialistBadGastroenterologist'
      break
    }
    case 3: {
      str = 'ui/getResultSpecialistBadGynecologist'
      break
    }
    case 4: {
      str = 'ui/getResultSpecialistBadUrologist'
      break
    }
    case 5: {
      str = 'ui/getResultSpecialistBadColoproctologist'
      break
    }
    case 6: {
      str = 'ui/getResultSpecialistBadOphtalmologist'
      break
    }
    case 7: {
      str = 'ui/getResultSpecialistBadOtorinolaringologist'
      break
    }
    case 8: {
      str = 'ui/getResultSpecialistBadEndocrinologist'
      break
    }
  }
  return str
}

export function getQuestionsContex (spec, quest) {
  let str = ''
  switch (spec) {
    case 0: {
      str = question.getCardiologist(quest)
      break
    }
    case 1: {
      str = question.getNeurologist(quest)
      break
    }
    case 2: {
      str = question.getGastroenterologist(quest)
      break
    }
    case 3: {
      str = question.getGynecologist(quest)
      break
    }
    case 4: {
      str = question.getUrologist(quest)
      break
    }
    case 5: {
      str = question.getColoproctologist(quest)
      break
    }
    case 6: {
      str = question.getOphthalmologist(quest)
      break
    }
    case 7: {
      str = question.getOtorinolaryngologist(quest)
      break
    }
    case 8: {
      str = question.getEndocrinologist(quest)
      break
    }
  }
  return str
}
