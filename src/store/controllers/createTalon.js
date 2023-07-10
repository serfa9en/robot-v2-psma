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
          // console.log('CONTROLLER - CREATE_TALON')
          // console.log('формирование талона')
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
            let countAll = 0
            if (store.getters['ui/getResultSpecialistCardiologist'] === true) {
              mass[0] = 1
              count++
              countAll++
            } else if (store.getters['ui/getResultSpecialistCardiologist'] === false) {
              mass[0] = 2
              countBad++
              countAll++
            }
            if (store.getters['ui/getResultSpecialistNeurologist'] === true) {
              mass[1] = 1
              count++
              countAll++
            } else if (store.getters['ui/getResultSpecialistNeurologist'] === false) {
              mass[1] = 2
              countBad++
              countAll++
            }
            if (store.getters['ui/getResultSpecialistGastroenterologist'] === true) {
              mass[2] = 1
              count++
              countAll++
            } else if (store.getters['ui/getResultSpecialistGastroenterologist'] === false) {
              mass[2] = 2
              countBad++
              countAll++
            }
            if (store.getters['ui/getResultSpecialistGynecologist'] === true) {
              mass[3] = 1
              count++
              countAll++
            } else if (store.getters['ui/getResultSpecialistGynecologist'] === false) {
              mass[3] = 2
              countBad++
              countAll++
            }
            if (store.getters['ui/getResultSpecialistUrologist'] === true) {
              mass[4] = 1
              count++
              countAll++
            } else if (store.getters['ui/getResultSpecialistUrologist'] === false) {
              mass[4] = 2
              countBad++
              countAll++
            }
            if (store.getters['ui/getResultSpecialistColoproctologist'] === true) {
              mass[5] = 1
              count++
              countAll++
            } else if (store.getters['ui/getResultSpecialistColoproctologist'] === false) {
              mass[5] = 2
              countBad++
              countAll++
            }
            if (store.getters['ui/getResultSpecialistOphtalmologist'] === true) {
              mass[6] = 1
              count++
              countAll++
            } else if (store.getters['ui/getResultSpecialistOphtalmologist'] === false) {
              mass[6] = 2
              countBad++
              countAll++
            }
            if (store.getters['ui/getResultSpecialistOtorinolaringologist'] === true) {
              mass[7] = 1
              count++
              countAll++
            } else if (store.getters['ui/getResultSpecialistOtorinolaringologist'] === false) {
              mass[7] = 2
              countBad++
              countAll++
            }
            if (store.getters['ui/getResultSpecialistEndocrinologist'] === true) {
              mass[8] = 1
              count++
              countAll++
            } else if (store.getters['ui/getResultSpecialistEndocrinologist'] === false) {
              mass[8] = 2
              countBad++
              countAll++
            }

            // let flag = count
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
            let htmlAdvicesOphtalmol = ''
            if (mass[6] !== 0) {
              htmlAdvicesOphtalmol += 'Соблюдать гигиену зрения: <br />'
              htmlAdvicesOphtalmol += '<ul><li>Обеспечивайте хорошее освещение вашего рабочего места</li>'
              htmlAdvicesOphtalmol += '<li>Делайте перерывы каждые 20 минут работы за компьютером</li>'
              htmlAdvicesOphtalmol += '<li>Старайтесь держать осанку</li>'
              htmlAdvicesOphtalmol += '<li>Защищайте глаза от воздействия ультрафиолетового излучения</li>'
              htmlAdvicesOphtalmol += '<li>Включите в ваш рацион питания жирные сорта рыб, овощи и фрукты, печень, орехи</li></ul>'
            }

            // риск развития заболевания
            let htmlDisease = ''
            let countDisease = 0
            if (store.getters['ui/getResultDiseaseCountDiabetes'] !== null) countDisease++
            if (store.getters['ui/getResultDiseaseCountReflux'] !== null) countDisease++
            if (store.getters['ui/getResultDiseaseCountDepression'] !== null) countDisease++
            if (store.getters['ui/getResultDiseaseCountDiabetesTrue'] !== null) countDisease++
            if (store.getters['ui/getResultDiseaseCountProstatitis'] !== null) countDisease++
            if (store.getters['ui/getResultDiseaseCountOncologyMammaryCancer'] !== null) countDisease++
            if (store.getters['ui/getResultDiseaseCountOncologyStomachCancer'] !== null) countDisease++
            if (store.getters['ui/getResultDiseaseCountOncologyEsophagealCarcinoma'] !== null) countDisease++
            if (store.getters['ui/getResultDiseaseCountOncologyBladderCancer'] !== null) countDisease++
            if (store.getters['ui/getResultDiseaseCountOncologyLungCancer'] !== null) countDisease++
            if (store.getters['ui/getResultDiseaseCountOncologyMelanoma'] !== null) countDisease++
            if (store.getters['ui/getResultDiseaseCountOncologySkinCancer'] !== null) countDisease++
            if (store.getters['ui/getResultDiseaseCountOncologyThroatCancer'] !== null) countDisease++
            if (store.getters['ui/getResultDiseaseCountOncologyLaryngealCancer'] !== null) countDisease++
            if (store.getters['ui/getResultDiseaseCountOncologyThyroidCancer'] !== null) countDisease++
            if (store.getters['ui/getResultDiseaseCountOncologyBowelCancer'] !== null) countDisease++

            if (countDisease > 0) htmlDisease += '<p>Риск развития заболеваний</p>'

            htmlDisease += (store.getters['ui/getResultDiseaseCountDiabetesTrue'] !== null ? request.getDisease(0, null) : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountDiabetes'] !== null
              ? '<p>Сахарный диабет: ' + store.getters['ui/getResultDiseaseCountDiabetes']
              + '<br>' + request.getDisease(1, store.getters['ui/getResultDiseaseCountDiabetes']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountReflux'] !== null
              ? '<p>Рефлюксная болезнь: ' + store.getters['ui/getResultDiseaseCountReflux']
              + request.getDisease(2, store.getters['ui/getResultDiseaseCountReflux']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountDepression'] !== null
              ? '<p>Депрессия: ' + store.getters['ui/getResultDiseaseCountDepression']
              + '<br>' + request.getDisease(3, store.getters['ui/getResultDiseaseCountDepression']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountProstatitis'] !== null
              ? '<p>Простатит: ' + store.getters['ui/getResultDiseaseCountProstatitis']
              + request.getDisease(4, store.getters['ui/getResultDiseaseCountProstatitis']) + '</p>' : '')

            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyMammaryCancer'] !== null
              ? '<p>Рак молочной железы: ' + store.getters['ui/getResultDiseaseCountOncologyMammaryCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyMammaryCancer'])
              + '<br>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyMammaryCancer']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyStomachCancer'] !== null
              ? '<p>Рак желудка: ' + store.getters['ui/getResultDiseaseCountOncologyStomachCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyStomachCancer'])
              + '<br>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyStomachCancer']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyEsophagealCarcinoma'] !== null
              ? '<p>Рак пищевода: ' + store.getters['ui/getResultDiseaseCountOncologyEsophagealCarcinoma']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyEsophagealCarcinoma'])
              + '<br>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyEsophagealCarcinoma']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyBladderCancer'] !== null
              ? '<p>Рак мочевого пузыря: ' + store.getters['ui/getResultDiseaseCountOncologyBladderCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyBladderCancer'])
              + '<br>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyBladderCancer']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyLungCancer'] !== null
              ? '<p>Рак легких: ' + store.getters['ui/getResultDiseaseCountOncologyLungCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyLungCancer'])
              + '<br>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyLungCancer']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyMelanoma'] !== null
              ? '<p>Меланома: ' + store.getters['ui/getResultDiseaseCountOncologyMelanoma']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyMelanoma'])
              + '<br>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyMelanoma']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologySkinCancer'] !== null
              ? '<p>Рак кожи: ' + store.getters['ui/getResultDiseaseCountOncologySkinCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologySkinCancer'])
              + '<br>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologySkinCancer']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyThroatCancer'] !== null
              ? '<p>Рак глотки: ' + store.getters['ui/getResultDiseaseCountOncologyThroatCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyThroatCancer'])
              + '<br>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyThroatCancer']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyLaryngealCancer'] !== null
              ? '<p>Рак гортани: ' + store.getters['ui/getResultDiseaseCountOncologyLaryngealCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyLaryngealCancer'])
              + '<br>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyLaryngealCancer']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyThyroidCancer'] !== null
              ? '<p>Рак щитовидной железы: ' + store.getters['ui/getResultDiseaseCountOncologyThyroidCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyThyroidCancer'])
              + '<br>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyThyroidCancer']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyBowelCancer'] !== null
              ? '<p>Рак кишечника: ' + store.getters['ui/getResultDiseaseCountOncologyBowelCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyBowelCancer'])
              + '<br>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyBowelCancer']) + '</p>' : '')
            htmlDisease += '<br />'

            if ((countAll > 1 && mass[6] !== 0)
              || (countAll > 0 && mass[6] === 0)
              || (countDisease > 0)) {
              htmlAdvices += 'Придерживаться принципам здорового образа жизни:'
              htmlAdvices += '<ul><li>Питайтесь правильно:'
              htmlAdvices += '<ul><li>Включить в рацион: фрукты, овощи, бобовые и цельные злаки, ненасыщенные жиры (содержащиеся в рыбе, авокадо и орехах, подсолнечном, соевом и оливковом масле)</li>'
              htmlAdvices += '<li>Избегать потребления: транс-жиров (замороженные пиццы, пироги, печенье, вафли и т.д.)</li>'
              htmlAdvices += '<li>Ограничить потребление (свободного сахара) до 12 чайных ложек без верха, соли до менее 5 грамм. Соль должна быть йодированной</li></ul></li>'
              htmlAdvices += '<li>Поддерживайте нормальную массу тела. Индекс массы тела  от 18.5 до 25 </li>'
              htmlAdvices += '<li>Выполняйте регулярные физические упражнения. 30 минут ходьбы в день + не менее 75 минут физической активности высокой интенсивности (плавание, бег) в неделю</li>'
              htmlAdvices += '<li>Избегайте стрессовых ситуаций</li>'
              htmlAdvices += '<li>Сохраняйте оптимизм. Учитесь радоваться жизни. Соблюдайте режим сна и отдыха</li>'
              htmlAdvices += '<li>Откажитесь от курения и приема алкоголя</li></ul>'
            }

            let htmlLegs = ''
            if (store.getters['ui/getResultDiseaseCountDiabetesTrue'] !== null) {
              htmlLegs += '<p>Уход за ногами:<br />'
              htmlLegs += '1. Ежедневно самостоятельно или с участием членов семьи осматривайте стопы, состояние кожи, включая промежутки между пальцами<br />'
              htmlLegs += '2. Немедленно сообщите лечащему врачу о наличии потертостей, порезов, трещин, царапин, ран и других повреждений кожи<br />'
              htmlLegs += '3. Ежедневно мойте ноги теплой водой (температура не ниже 37.0 С), просушивайте стопы аккуратно, мягким полотенцем, не забывая о межпальцевых промежутках<br />'
              htmlLegs += '4. При наличии ороговевшей кожи обработайте эти участки пемзой или специальной пилкой для кожи (не металлической). Не пользуйтесь для этих целей лезвием или ножницами<br />'
              htmlLegs += '5. Не используйте химические препараты или пластыри для удаления мозолей и ороговевшей кожи<br />'
              htmlLegs += '6. При сухой коже стоп после мытья смажьте их кремом, содержащим мочевину, кроме межпальцевых промежутков<br />'
              htmlLegs += '7. Осторожно обрабатывайте ногти, не закругляя уголки, используя пилочку, а не острые и режущие инструменты<br />'
              htmlLegs += '8. Для согревания ног пользуйтесь теплыми носками, а не грелкой или горячей водой, которые могут вызвать ожог из-за снижения чувствительности<br />'
              htmlLegs += '9. Носите бесшовные (или со швами наружу) носки/колготы, меняйте их ежедневно<br />'
              htmlLegs += '10. Не ходите без обуви дома и на улице, не надевайте обувь на босую ногу<br />'
              htmlLegs += '11. Проконсультируйтесь со специалистом кабинета «Диабетическая стопа» или ортопедом, нужно ли Вам носить профилактическую или сложную ортопедическую обувь<br />'
              htmlLegs += '12. Ежедневно осматривайте обувь: нет ли в ней инородного предмета, не завернулась ли стелька, так как это может привести к потертости кожи стоп<br />'
              htmlLegs += '13. При повреждении кожи (трещина, царапина, порез) не используйте спиртосодержащие и красящие растворы. Используйте для обработки бесцветные водные антисептические растворы</p>'
            }

            let htmlAdvicesDop = ''
            if (countAll > 0) {
              htmlAdvicesDop += '<p>Регулярная диспансеризация позволит вам вовремя выявить изменения вашего здоровья! <br />'
              htmlAdvicesDop += 'Для граждан от 18 до 39 лет - 1 раз в три года <br /> '
              htmlAdvicesDop += 'Для граждан старше 40 лет - ежегодно </p>'
            }

            let data = {
              result: htmlResult,
              resultComm: htmlComm,
              specGood: htmlSpecGood,
              specBad: htmlSpecBad,
              advicesOphtalmol: htmlAdvicesOphtalmol,
              disease: htmlDisease,
              advices: htmlAdvices,
              legsAdvices: htmlLegs,
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
