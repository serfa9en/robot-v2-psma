import { EventInitiatorTypes, EventTypes } from 'promobot-logger'
import * as request from './requestResult'
import * as specialist from '../dataStorage/specialist'

export default function (logger) {
  return store => {
    store.subscribe((mutation) => {
      let payload = mutation.payload
      if (mutation.type === 'app/SET_CREATE_TALON') {
        // console.log('CONTROLLER - CREATE_TALON')
        if (payload.data === true) {
          console.log('CONTROLLER - CREATE_TALON')
          console.log('формирование талона')
          // let d = getMeasurementPressure;
          // формирование талона
          // формирование части измерений

          // store.getters['ui/getMeasurementPressure']
          // store.getters['ui/getMeasurementPressureLow']
          // store.getters['ui/getMeasurementPulse']
          // store.getters['ui/getMeasurementTemperature']
          // store.getters['ui/getMeasurementGlucometry']
          // store.getters['ui/getMeasurementSaturatsiya']
          // store.getters['ui/getMeasurementHeight']
          // store.getters['ui/getMeasurementWeight']
          // store.getters['ui/getMeasurementImt']

          // event.target.setAttribute('disabled', 'disabled')
          let templatePath = 'talon-template.html'
          fetch(templatePath).then(response => {
            return response.text()
          }).then(talon => {
            let htmlResult = ''
            htmlResult += (store.getters['ui/getMeasurementHeight'] !== null ? '<p>Рост: ' + store.getters['ui/getMeasurementHeight'] + ' см</p>' : '')
            htmlResult += (store.getters['ui/getMeasurementWeight'] !== null ? '<p>Вес: ' + store.getters['ui/getMeasurementWeight'] + ' кг</p>' : '')
            htmlResult += (store.getters['ui/getMeasurementImt'] !== null ? '<p>ИМТ: ' + store.getters['ui/getMeasurementImt'] + '</p>' : '')
            htmlResult += (store.getters['ui/getMeasurementTemperature'] !== null ? '<p>Температура: ' + store.getters['ui/getMeasurementTemperature'] + ' &deg;С</p>' : '')
            htmlResult += (store.getters['ui/getMeasurementGlucometry'] !== null ? '<p>Глюкоза: ' + store.getters['ui/getMeasurementGlucometry'] + ' ммоль/л</p>' : '')
            htmlResult += (store.getters['ui/getMeasurementSaturatsiya'] !== null ? '<p>Сатурация: ' + store.getters['ui/getMeasurementSaturatsiya'] + '%</p>' : '')
            htmlResult += ((store.getters['ui/getMeasurementPressure'] !== null && store.getters['ui/getMeasurementPressureLow'] !== null) ? '<p>Давление: ' + store.getters['ui/getMeasurementPressure'] + ' / ' + store.getters['ui/getMeasurementPressureLow'] + ' мм.рт.ст.</p>' : '')
            htmlResult += (store.getters['ui/getMeasurementPulse'] !== null ? '<p>Пульс: ' + store.getters['ui/getMeasurementPulse'] + ' уд./мин.</p>' : '')
            htmlResult += '<br />'
            // console.log(htmlResult)

            // Комментарии к результатам измерения
            let htmlComm = ''
            // проверка есть ли измерения
            if (store.getters['ui/getMeasurementImt'] !== null
              || store.getters['ui/getMeasurementTemperature'] !== null
              || store.getters['ui/getMeasurementGlucometry'] !== null
              || store.getters['ui/getMeasurementSaturatsiya'] !== null
              || store.getters['ui/getMeasurementPressure'] !== null) {
              htmlComm += 'Комментарии к результатам: <br />'
            }
            // есть хотя бы одно измерение
            let count = 0
            if (htmlComm !== '') {
              if (store.getters['ui/getMeasurementImt'] !== null) {
                count++
                htmlComm += count + '. ' + request.getComment(1, store.getters['ui/getMeasurementImt']) + '<br />'
              }
              if (store.getters['ui/getMeasurementTemperature'] !== null) {
                count++
                htmlComm += count + '. ' + request.getComment(0, store.getters['ui/getMeasurementTemperature']) + '<br />'
              }
              if (store.getters['ui/getMeasurementGlucometry'] !== null) {
                count++
                htmlComm += count + '. ' + request.getComment(2, store.getters['ui/getMeasurementGlucometry']) + '<br />'
              }
              if (store.getters['ui/getMeasurementSaturatsiya'] !== null) {
                count++
                htmlComm += count + '. ' + request.getComment(3, store.getters['ui/getMeasurementSaturatsiya']) + '<br />'
              }
              if (store.getters['ui/getMeasurementPressure'] !== null) {
                count++
                htmlComm += count + '. ' + request.getCommentPressure(store.getters['ui/getMeasurementPressure'], store.getters['ui/getMeasurementPressureLow']) + '<br />'
              }
            }

            // Результаты специалистов
            // есть хотя бы одно измерение
            let htmlSpecGood = ''
            let mass = [0, 0, 0, 0, 0, 0, 0, 0, 0]
            count = 0
            let countBad = 0
            if (store.getters['ui/getResultSpecialistCardiologist'] === true) {
              mass[0] = 1
              count++
            } else if (store.getters['ui/getResultSpecialistCardiologist'] === false) {
              mass[0] = 2
              countBad++
            }
            if (store.getters['ui/getResultSpecialistNeurologist'] === true) {
              mass[1] = 1
              count++
            } else if (store.getters['ui/getResultSpecialistNeurologist'] === false) {
              mass[1] = 2
              countBad++
            }
            if (store.getters['ui/getResultSpecialistGastroenterologist'] === true) {
              mass[2] = 1
              count++
            } else if (store.getters['ui/getResultSpecialistGastroenterologist'] === false) {
              mass[2] = 2
              countBad++
            }
            if (store.getters['ui/getResultSpecialistGynecologist'] === true) {
              mass[3] = 1
              count++
            } else if (store.getters['ui/getResultSpecialistGynecologist'] === false) {
              mass[3] = 2
              countBad++
            }
            if (store.getters['ui/getResultSpecialistUrologist'] === true) {
              mass[4] = 1
              count++
            } else if (store.getters['ui/getResultSpecialistUrologist'] === false) {
              mass[4] = 2
              countBad++
            }
            if (store.getters['ui/getResultSpecialistColoproctologist'] === true) {
              mass[5] = 1
              count++
            } else if (store.getters['ui/getResultSpecialistColoproctologist'] === false) {
              mass[5] = 2
              countBad++
            }
            if (store.getters['ui/getResultSpecialistOphtalmologist'] === true) {
              mass[6] = 1
              count++
            } else if (store.getters['ui/getResultSpecialistOphtalmologist'] === false) {
              mass[6] = 2
              countBad++
            }
            if (store.getters['ui/getResultSpecialistOtorinolaringologist'] === true) {
              mass[7] = 1
              count++
            } else if (store.getters['ui/getResultSpecialistOtorinolaringologist'] === false) {
              mass[7] = 2
              countBad++
            }
            if (store.getters['ui/getResultSpecialistEndocrinologist'] === true) {
              mass[8] = 1
              count++
            } else if (store.getters['ui/getResultSpecialistEndocrinologist'] === false) {
              mass[8] = 2
              countBad++
            }

            let flag = count
            if (count > 0) htmlSpecGood += '<p> У вас отсутствуют характерные симптомы для срочного обращения к '

            // 1. Все хорошо:
            for (let i = 0; i < mass.length; i++) {
              for (let j = i + 1; j < mass.length; j++) {
                if (mass[j] === 1) {
                  break
                }
              }
              if (mass[i] === 1) {
                htmlSpecGood += specialist.getResultGood(i)
                count--
                if (count > 1) htmlSpecGood += ', '
                else if (count === 1) htmlSpecGood += ' и '
                else htmlSpecGood += '.</p><br />'
              }
            }

            // 2. Все плохо:
            let htmlSpecBad = ''
            let flagBad = 0
            let nameFunc = ''
            let sp = []
            let listQuest
            let countNew = 0
            if (countBad > 0) htmlSpecBad += '<p> Вы положительно ответили на следующие вопросы: </p><br />'
            for (let i = 0; i < 9; i++) {
              listQuest = ''
              if (mass[i] === 2) {
                flagBad++
                htmlSpecBad += flagBad + '. ' + specialist.getName(i) + '<br />'
                nameFunc = request.getQuestions(i)
                sp = store.getters[nameFunc].split(',')
                for (let j = 0; j < sp.length - 1; j++) {
                  if (sp[j] === '1') {
                    if (listQuest === '') listQuest += '<ul>'
                    listQuest += '<li>' + request.getQuestionsContex(i, j) + '</li>'
                  }
                  if (countNew === (sp.length - 2)) listQuest += '</ul>'
                  countNew++
                }
                htmlSpecBad += listQuest + '<br />'
              }
            }

            if (flagBad > 0) {
              htmlSpecBad += '<p>Эти симптомы могут привести к необратимым последствиям. Обратитесь к специалистам: терапевту, '
              for (let i = 0; i < 9; i++) {
                for (let j = i + 1; j < mass.length; j++) {
                  if (mass[j] === 2) {
                    break
                  }
                }
                if (mass[i] === 2) {
                  htmlSpecBad += specialist.getResultGood(i)
                  countBad--
                  if (countBad > 1) htmlSpecBad += ', '
                  else if (countBad === 1) htmlSpecBad += ' и '
                  else htmlSpecBad += '.</p>'
                }
              }
            }

            let htmlAdvices = ''
            if (flag > 0) {
              htmlAdvices += 'Придерживаться принципам здорового питания. <br />'
              htmlAdvices += '1) Включить в рацион: фрукты, овощи, бобовые и цельные злаки, ненасыщенные жиры (содержащиеся в рыбе, авокадо и орехах, подсолнечном, соевом и оливковом масле). <br />'
              htmlAdvices += '2) Избегать потребления: транс-жиров (замороженные пиццы, пироги, печенье, вафли и т.д.). Ограничить потребление (свободного сахара) до 12 чайных ложек без верха, соли до менее 5 грамм. Соль должна быть йодированной. <br />'
              htmlAdvices += '3) Поддерживайте нормальную массу тела. Индекс массы тела  от 18.5 до 25. <br />'
              htmlAdvices += '4) Выполняйте регулярные физические упражнения. 30 минут ходьбы в день + не менее 75 минут физической активности высокой интенсивности (плавание, бег) в неделю. <br />'
              htmlAdvices += '5) Избегайте стрессовых ситуаций. Сохраняйте оптимизм. Учитесь радоваться жизни. Соблюдайте режим сна и отдыха. <br />'
              htmlAdvices += '6) Откажитесь от курения и приема алкоголя. <br />'
            }

            let htmlAdvicesDop = ''
            htmlAdvicesDop += '<p>Регулярная диспансеризация позволит вам вовремя выявить изменения вашего здоровья! <br />'
            htmlAdvicesDop += 'Для граждан от 18 до 39 лет - 1 раз в три года <br /> '
            htmlAdvicesDop += 'Для граждан старше 40 лет - ежегодно </p>'

            let data = {
              result: htmlResult,
              resultComm: htmlComm,
              specGood: htmlSpecGood,
              specBad: htmlSpecBad,
              advices: htmlAdvices,
              advicesDop: htmlAdvicesDop
            }
            for (let k in data) {
              if (data.hasOwnProperty(k)) {
                if (typeof data[k] !== 'undefined') {
                  // talon = talon.replace(`{${k}}`, data[k].replace(/\/n/g, '<br>'))
                  talon = talon.replace(`{${k}}`, data[k])
                } else {
                  // console.log('====data[k]', k)
                }
              }
            }
            console.warn('TALON', talon)
            // let logger = PromobotLogger.getInstance()
            let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
            store.dispatch('robot/setPrinterData', {
              meta: { eventId },
              data: {
                mimeType: 'text/html',
                talon
              }
            })
          })
        }
      }
    })
  }
}
