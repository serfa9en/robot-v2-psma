import { EventInitiatorTypes, EventTypes } from 'promobot-logger'
import * as request from './requestResult'
import * as specialist from '../dataStorage/specialist'

export default function (logger) {
  return store => {
    store.subscribe((mutation) => {
      let payload = mutation.payload
      if (mutation.type === 'app/SET_CREATE_MAIL') {
        // console.log('CONTROLLER - CREATE_TALON')
        if (payload.data === true) {
          // формирование талона

          let templateMail = 'mail-template.html'
          fetch(templateMail).then(response => {
            return response.text()
          }).then(talon => {
            let htmlResult = ''
            let htmlSpec = ''
            let htmlDisease = ''
            let htmlAdvices = ''
            let resultName = ''
            let specialistName = ''
            let diseaseName = ''
            let adviceName = ''

            // формирование части измерений
            if (store.getters['ui/getMeasurementImt'] !== null
            || store.getters['ui/getMeasurementTemperature'] !== null
            || store.getters['ui/getMeasurementGlucometry'] !== null
            || store.getters['ui/getMeasurementSaturatsiya'] !== null
            || store.getters['ui/getMeasurementPressure'] !== null
            || store.getters['ui/getMeasurementPulse'] !== null) {
              resultName += 'Результаты измерений\n'
            }
            if (store.getters['ui/getMeasurementImt'] !== null) {
              htmlResult += 'Рост: ' + store.getters['ui/getMeasurementHeight'] + ' см\n'
              htmlResult += 'Вес: ' + store.getters['ui/getMeasurementWeight'] + ' кг\n'
              htmlResult += 'ИМТ: ' + store.getters['ui/getMeasurementImt'] + '\n'
              htmlResult += ' - ' + request.getComment(1, store.getters['ui/getMeasurementImt']) + '\n'
            }
            if (store.getters['ui/getMeasurementTemperature'] !== null) {
              htmlResult += 'Температура: ' + store.getters['ui/getMeasurementTemperature'] + ' &deg;С\n'
              htmlResult += ' - ' + request.getComment(0, store.getters['ui/getMeasurementTemperature']) + '\n'
            }
            if (store.getters['ui/getMeasurementGlucometry'] !== null) {
              htmlResult += 'Глюкоза: ' + store.getters['ui/getMeasurementGlucometry'] + ' ммоль/л\n'
              htmlResult += ' - ' + request.getComment(2, store.getters['ui/getMeasurementGlucometry']) + '\n'
            }
            if (store.getters['ui/getMeasurementSaturatsiya'] !== null) {
              htmlResult += 'Сатурация: ' + store.getters['ui/getMeasurementSaturatsiya'] + '%\n'
              htmlResult += ' - ' + request.getComment(3, store.getters['ui/getMeasurementSaturatsiya']) + '\n'
            }
            if (store.getters['ui/getMeasurementPressure'] !== null && store.getters['ui/getMeasurementPressureLow'] !== null) {
              htmlResult += 'Давление: ' + store.getters['ui/getMeasurementPressure'] + ' / ' + store.getters['ui/getMeasurementPressureLow'] + ' мм.рт.ст.\n'
              htmlResult += ' - ' + request.getCommentPressure(store.getters['ui/getMeasurementPressure'], store.getters['ui/getMeasurementPressureLow']) + '\n'
            }
            if (store.getters['ui/getMeasurementPulse'] !== null) {
              htmlResult += 'Пульс: ' + store.getters['ui/getMeasurementPulse'] + ' уд./мин.\n'
              htmlResult += ' - ' + request.getComment(4, store.getters['ui/getMeasurementPulse']) + '\n'
            }
            // console.log(htmlResult)

            // Результаты специалистов
            if (store.getters['ui/getResultSpecialistCardiologist'] !== null
            || store.getters['ui/getResultSpecialistNeurologist'] !== null
            || store.getters['ui/getResultSpecialistGastroenterologist'] !== null
            || store.getters['ui/getResultSpecialistGynecologist'] !== null
            || store.getters['ui/getResultSpecialistUrologist'] !== null
            || store.getters['ui/getResultSpecialistColoproctologist'] !== null
            || store.getters['ui/getResultSpecialistOphtalmologist'] !== null
            || store.getters['ui/getResultSpecialistOtorinolaringologist'] !== null
            || store.getters['ui/getResultSpecialistEndocrinologist'] !== null) {
              specialistName += 'Консультация специалиста\n'
            }
            let num = 0
            if (store.getters['ui/getResultSpecialistCardiologist'] !== null) {
              num++
              htmlSpec += '' + num + '.' + specialist.getName(0) + '\n'
              if (store.getters['ui/getResultSpecialistCardiologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(0) + '\n'
              } else {
                // плохо
                htmlSpec += createArrayQuest(0)
              }
            }
            if (store.getters['ui/getResultSpecialistNeurologist'] !== null) {
              num++
              htmlSpec += '' + num + '.' + specialist.getName(1) + '\n'
              if (store.getters['ui/getResultSpecialistNeurologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(1) + '\n'
              } else {
                // плохо
                htmlSpec += createArrayQuest(1)
              }
            }
            if (store.getters['ui/getResultSpecialistGastroenterologist'] !== null) {
              num++
              htmlSpec += '' + num + '.' + specialist.getName(2) + '\n'
              if (store.getters['ui/getResultSpecialistGastroenterologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(2) + '\n'
              } else {
                // плохо
                htmlSpec += createArrayQuest(2)
              }
            }
            if (store.getters['ui/getResultSpecialistGynecologist'] !== null) {
              num++
              htmlSpec += '' + num + '.' + specialist.getName(3) + '\n'
              if (store.getters['ui/getResultSpecialistGynecologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(3) + '\n'
              } else {
                // плохо
                htmlSpec += createArrayQuest(3)
              }
            }
            if (store.getters['ui/getResultSpecialistUrologist'] !== null) {
              num++
              htmlSpec += '' + num + '.' + specialist.getName(4) + '\n'
              if (store.getters['ui/getResultSpecialistUrologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(4) + '\n'
              } else {
                // плохо
                htmlSpec += createArrayQuest(4)
              }
            }
            if (store.getters['ui/getResultSpecialistColoproctologist'] !== null) {
              num++
              htmlSpec += '' + num + '.' + specialist.getName(5) + '\n'
              if (store.getters['ui/getResultSpecialistColoproctologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(5) + '\n'
              } else {
                // плохо
                htmlSpec += createArrayQuest(5)
              }
            }
            if (store.getters['ui/getResultSpecialistOphtalmologist'] !== null) {
              num++
              htmlSpec += '' + num + '.' + specialist.getName(6) + '\n'
              if (store.getters['ui/getResultSpecialistOphtalmologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(6) + '\n'
              } else {
                // плохо
                htmlSpec += createArrayQuest(6)
              }
              htmlSpec += 'Рекомендовано cоблюдать гигиену зрения:'
              htmlSpec += ' - ' + 'Обеспечивайте хорошее освещение вашего рабочего места' + '\n>'
              htmlSpec += ' - ' + 'Делайте перерывы каждые 20 минут работы за компьютером' + '\n'
              htmlSpec += ' - ' + 'Старайтесь держать осанку' + '\n'
              htmlSpec += ' - ' + 'Защищайте глаза от воздействия ультрафиолетового излучения' + '\n'
              htmlSpec += ' - ' + 'Включите в ваш рацион питания жирные сорта рыб, овощи и фрукты, печень, орехи' + '\n'
            }
            if (store.getters['ui/getResultSpecialistOtorinolaringologist'] !== null) {
              num++
              htmlSpec += '' + num + '.' + specialist.getName(7) + '\n'
              if (store.getters['ui/getResultSpecialistOtorinolaringologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(7) + '\n'
              } else {
                // плохо
                htmlSpec += createArrayQuest(7)
              }
            }
            if (store.getters['ui/getResultSpecialistEndocrinologist'] !== null) {
              num++
              htmlSpec += '' + num + '.' + specialist.getName(8) + '\n'
              if (store.getters['ui/getResultSpecialistEndocrinologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(8) + '\n'
              } else {
                // плохо
                htmlSpec += createArrayQuest(8)
              }
            }
            // htmlSpec += '<br />'

            // риск развития заболевания
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

            if (countDisease > 0) diseaseName += 'Риск развития заболеваний\n'

            htmlDisease += (store.getters['ui/getResultDiseaseCountDiabetesTrue'] !== null ? request.getDisease(0, null) : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountDiabetes'] !== null
              ? '<ul><li>Сахарный диабет: ' + store.getters['ui/getResultDiseaseCountDiabetes'] + '</li></ul>'
              + '<p>' + request.getDisease(1, store.getters['ui/getResultDiseaseCountDiabetes']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountReflux'] !== null
              ? '<ul><li>Рефлюксная болезнь: ' + store.getters['ui/getResultDiseaseCountReflux'] + '</li></ul>'
              + '<p>' + request.getDisease(2, store.getters['ui/getResultDiseaseCountReflux']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountDepression'] !== null
              ? '<ul><li>Депрессия: ' + store.getters['ui/getResultDiseaseCountDepression'] + '</li></ul>'
              + '<p>' + request.getDisease(3, store.getters['ui/getResultDiseaseCountDepression']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountProstatitis'] !== null
              ? '<ul><li>Простатит: ' + store.getters['ui/getResultDiseaseCountProstatitis']
              + request.getDisease(4, store.getters['ui/getResultDiseaseCountProstatitis']) + '</li></ul>' : '')

            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyMammaryCancer'] !== null
              ? '<ul><li>Рак молочной железы: ' + store.getters['ui/getResultDiseaseCountOncologyMammaryCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyMammaryCancer']) + '</li></ul>'
              + '<p>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyMammaryCancer']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyStomachCancer'] !== null
              ? '<ul><li>Рак желудка: ' + store.getters['ui/getResultDiseaseCountOncologyStomachCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyStomachCancer']) + '</li></ul>'
              + '<p>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyStomachCancer']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyEsophagealCarcinoma'] !== null
              ? '<ul><li>Рак пищевода: ' + store.getters['ui/getResultDiseaseCountOncologyEsophagealCarcinoma']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyEsophagealCarcinoma']) + '</li></ul>'
              + '<p>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyEsophagealCarcinoma']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyBladderCancer'] !== null
              ? '<ul><li>Рак мочевого пузыря: ' + store.getters['ui/getResultDiseaseCountOncologyBladderCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyBladderCancer']) + '</li></ul>'
              + '<p>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyBladderCancer']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyLungCancer'] !== null
              ? '<ul><li>Рак легких: ' + store.getters['ui/getResultDiseaseCountOncologyLungCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyLungCancer']) + '</li></ul>'
              + '<p>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyLungCancer']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyMelanoma'] !== null
              ? '<ul><li>Меланома: ' + store.getters['ui/getResultDiseaseCountOncologyMelanoma']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyMelanoma']) + '</li></ul>'
              + '<p>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyMelanoma']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologySkinCancer'] !== null
              ? '<ul><li>Рак кожи: ' + store.getters['ui/getResultDiseaseCountOncologySkinCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologySkinCancer']) + '</li></ul>'
              + '<p>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologySkinCancer']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyThroatCancer'] !== null
              ? '<ul><li>Рак глотки: ' + store.getters['ui/getResultDiseaseCountOncologyThroatCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyThroatCancer']) + '</li></ul>'
              + '<p>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyThroatCancer']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyLaryngealCancer'] !== null
              ? '<ul><li>Рак гортани: ' + store.getters['ui/getResultDiseaseCountOncologyLaryngealCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyLaryngealCancer']) + '</li></ul>'
              + '<p>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyLaryngealCancer']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyThyroidCancer'] !== null
              ? '<ul><li>Рак щитовидной железы: ' + store.getters['ui/getResultDiseaseCountOncologyThyroidCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyThyroidCancer']) + '</li></ul>'
              + '<p>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyThyroidCancer']) + '</p>' : '')
            htmlDisease += (store.getters['ui/getResultDiseaseCountOncologyBowelCancer'] !== null
              ? '<ul><li>Рак кишечника: ' + store.getters['ui/getResultDiseaseCountOncologyBowelCancer']
              + request.getDisease(5, store.getters['ui/getResultDiseaseCountOncologyBowelCancer']) + '</li></ul>'
              + '<p>' + request.getDisease(6, store.getters['ui/getResultDiseaseCountOncologyBowelCancer']) + '</p>' : '')
            // htmlDisease += '<br />'

            adviceName += 'Общие рекомендации\n'
            htmlAdvices += '1. Придерживайтесь принципам правильного питания:\n'
            htmlAdvices += '  - Включить в рацион: фрукты, овощи, бобовые и цельные злаки, ненасыщенные жиры (содержащиеся в рыбе, авокадо и орехах, подсолнечном, соевом и оливковом масле)\n'
            htmlAdvices += '  - Избегать потребления: транс-жиров (замороженные пиццы, пироги, печенье, вафли и т.д.)\n'
            htmlAdvices += '  - Ограничить потребление (свободного сахара) до 12 чайных ложек без верха, соли до менее 5 грамм. Соль должна быть йодированной\n'
            htmlAdvices += '2. Поддерживайте нормальную массу тела. Индекс массы тела  от 18.5 до 25\n'
            htmlAdvices += '3. Выполняйте регулярные физические упражнения. 30 минут ходьбы в день + не менее 75 минут физической активности высокой интенсивности (плавание, бег) в неделю\n'
            htmlAdvices += '4. Избегайте стрессовых ситуаций\n'
            htmlAdvices += '5. Сохраняйте оптимизм. Учитесь радоваться жизни. Соблюдайте режим сна и отдыха\n'
            htmlAdvices += '6. Откажитесь от курения и приема алкоголя\n'
            htmlAdvices += '\n'

            if (store.getters['ui/getResultDiseaseCountDiabetesTrue'] !== null) {
              htmlAdvices += 'Уход за ногами:\n'
              htmlAdvices += '1. Ежедневно самостоятельно или с участием членов семьи осматривайте стопы, состояние кожи, включая промежутки между пальцами\n'
              htmlAdvices += '2. Немедленно сообщите лечащему врачу о наличии потертостей, порезов, трещин, царапин, ран и других повреждений кожи\n'
              htmlAdvices += '3. Ежедневно мойте ноги теплой водой (температура не ниже 37.0 С), просушивайте стопы аккуратно, мягким полотенцем, не забывая о межпальцевых промежутках\n'
              htmlAdvices += '4. При наличии ороговевшей кожи обработайте эти участки пемзой или специальной пилкой для кожи (не металлической). Не пользуйтесь для этих целей лезвием или ножницами\n'
              htmlAdvices += '5. Не используйте химические препараты или пластыри для удаления мозолей и ороговевшей кожи\n'
              htmlAdvices += '6. При сухой коже стоп после мытья смажьте их кремом, содержащим мочевину, кроме межпальцевых промежутков\n'
              htmlAdvices += '7. Осторожно обрабатывайте ногти, не закругляя уголки, используя пилочку, а не острые и режущие инструменты\n'
              htmlAdvices += '8. Для согревания ног пользуйтесь теплыми носками, а не грелкой или горячей водой, которые могут вызвать ожог из-за снижения чувствительности\n'
              htmlAdvices += '9. Носите бесшовные (или со швами наружу) носки/колготы, меняйте их ежедневно\n'
              htmlAdvices += '10. Не ходите без обуви дома и на улице, не надевайте обувь на босую ногу\n'
              htmlAdvices += '11. Проконсультируйтесь со специалистом кабинета «Диабетическая стопа» или ортопедом, нужно ли Вам носить профилактическую или сложную ортопедическую обувь\n'
              htmlAdvices += '12. Ежедневно осматривайте обувь: нет ли в ней инородного предмета, не завернулась ли стелька, так как это может привести к потертости кожи стоп\n'
              htmlAdvices += '13. При повреждении кожи (трещина, царапина, порез) не используйте спиртосодержащие и красящие растворы. Используйте для обработки бесцветные водные антисептические растворы\n'
              htmlAdvices += '\n'
            }

            htmlAdvices += '\nРегулярная диспансеризация позволит вам вовремя выявить изменения вашего здоровья!\n'
            htmlAdvices += 'Для граждан от 18 до 39 лет - 1 раз в три года\n '
            htmlAdvices += 'Для граждан старше 40 лет - ежегодно\n'

            let textmail = resultName + htmlResult + specialistName + htmlSpec + diseaseName + htmlDisease + adviceName + htmlAdvices
            /*
            for (let k in textmail) {
              if (textmail.hasOwnProperty(k)) {
                if (typeof textmail[k] !== 'undefined') {
                  // talon = talon.replace(`{${k}}`, data[k].replace(/\/n/g, '<br>'))
                  talon = talon.replace(`{${k}}`, textmail[k])
                } else {
                  // console.log('====data[k]', k)
                }
              }
            }
            */

            // console.warn('MAIL', talon)
            // let logger = PromobotLogger.getInstance()
            let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
            store.dispatch('handlers/sendMailSendMail', {
              meta: { eventId },
              data: {
                email: store.getters['ui/getUserMail'],
                // email: 'serfagen@gmail.com',
                body: textmail
              }
            })
          })
        }
      }
      function createArrayQuest (ind) {
        let htmlSpec = ''
        htmlSpec += 'Вы положительно ответили на следующие вопросы:'
        let nameFunc = request.getQuestions(ind)
        let sp = store.getters[nameFunc].split(',')
        let listQuest = '<ul>'
        for (let i = 0; i < sp.length - 1; i++) {
          if (sp[i] === '1') {
            let question = request.getQuestionsContex(ind, i)
            if (question[0] === '|') {
              question = question.split('|')[1]
            }
            listQuest += '<li>' + question + '</li>'
          }
        }
        listQuest += '</ul></p>'
        htmlSpec += listQuest
        htmlSpec += '<p>Эти симптомы могут привести к необратимым последствиям. Обратитесь к терапевту или ' + specialist.getResultGood(ind) + '</p>'
        return htmlSpec
      }
    })
  }
}
