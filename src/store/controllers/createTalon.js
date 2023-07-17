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
          // формирование талона

          let templatePath = 'talon-template.html'
          fetch(templatePath).then(response => {
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
              resultName += '<h3>Результаты измерений</h3>'
            }
            if (store.getters['ui/getMeasurementImt'] !== null) {
              htmlResult += '<ul><li>Рост: ' + store.getters['ui/getMeasurementHeight'] + ' см</li>'
              htmlResult += '<li>Вес: ' + store.getters['ui/getMeasurementWeight'] + ' кг</li>'
              htmlResult += '<li>ИМТ: ' + store.getters['ui/getMeasurementImt'] + '</li></ul>'
              htmlResult += '<p>' + request.getComment(1, store.getters['ui/getMeasurementImt']) + '</p>'
            }
            if (store.getters['ui/getMeasurementTemperature'] !== null) {
              htmlResult += '<ul><li>Температура: ' + store.getters['ui/getMeasurementTemperature'] + ' &deg;С</li></ul>'
              htmlResult += '<p>' + request.getComment(0, store.getters['ui/getMeasurementTemperature']) + '</p>'
            }
            if (store.getters['ui/getMeasurementGlucometry'] !== null) {
              htmlResult += '<ul><li>Глюкоза: ' + store.getters['ui/getMeasurementGlucometry'] + ' ммоль/л</li></ul>'
              htmlResult += '<p>' + request.getComment(2, store.getters['ui/getMeasurementGlucometry']) + '</p>'
            }
            if (store.getters['ui/getMeasurementSaturatsiya'] !== null) {
              htmlResult += '<ul><li>Сатурация: ' + store.getters['ui/getMeasurementSaturatsiya'] + '%</li></ul>'
              htmlResult += '<p>' + request.getComment(3, store.getters['ui/getMeasurementSaturatsiya']) + '</p>'
            }
            if (store.getters['ui/getMeasurementPressure'] !== null && store.getters['ui/getMeasurementPressureLow'] !== null) {
              htmlResult += '<ul><li>Давление: ' + store.getters['ui/getMeasurementPressure'] + ' / ' + store.getters['ui/getMeasurementPressureLow'] + ' мм.рт.ст.</li></ul>'
              htmlResult += '<p>' + request.getCommentPressure(store.getters['ui/getMeasurementPressure'], store.getters['ui/getMeasurementPressureLow']) + '</p>'
            }
            if (store.getters['ui/getMeasurementPulse'] !== null) {
              htmlResult += '<ul><li>Пульс: ' + store.getters['ui/getMeasurementPulse'] + ' уд./мин.</li></ul>'
              htmlResult += '<p>' + request.getComment(4, store.getters['ui/getMeasurementPulse']) + '</p>'
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
              specialistName += '<h3>Консультация специалиста</h3>'
            }
            let num = 0
            if (store.getters['ui/getResultSpecialistCardiologist'] !== null) {
              num++
              htmlSpec += '<p>' + num + '.' + specialist.getName(0) + '<br />'
              if (store.getters['ui/getResultSpecialistCardiologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(0) + '</p>'
              } else {
                // плохо
                htmlSpec += createArrayQuest(0)
              }
            }
            if (store.getters['ui/getResultSpecialistNeurologist'] !== null) {
              num++
              htmlSpec += '<p>' + num + '.' + specialist.getName(1) + '<br />'
              if (store.getters['ui/getResultSpecialistNeurologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(1) + '</p>'
              } else {
                // плохо
                htmlSpec += createArrayQuest(1)
              }
            }
            if (store.getters['ui/getResultSpecialistGastroenterologist'] !== null) {
              num++
              htmlSpec += '<p>' + num + '.' + specialist.getName(2) + '<br />'
              if (store.getters['ui/getResultSpecialistGastroenterologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(2) + '</p>'
              } else {
                // плохо
                htmlSpec += createArrayQuest(2)
              }
            }
            if (store.getters['ui/getResultSpecialistGynecologist'] !== null) {
              num++
              htmlSpec += '<p>' + num + '.' + specialist.getName(3) + '<br />'
              if (store.getters['ui/getResultSpecialistGynecologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(3) + '</p>'
              } else {
                // плохо
                htmlSpec += createArrayQuest(3)
              }
            }
            if (store.getters['ui/getResultSpecialistUrologist'] !== null) {
              num++
              htmlSpec += '<p>' + num + '.' + specialist.getName(4) + '<br />'
              if (store.getters['ui/getResultSpecialistUrologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(4) + '</p>'
              } else {
                // плохо
                htmlSpec += createArrayQuest(4)
              }
            }
            if (store.getters['ui/getResultSpecialistColoproctologist'] !== null) {
              num++
              htmlSpec += '<p>' + num + '.' + specialist.getName(5) + '<br />'
              if (store.getters['ui/getResultSpecialistColoproctologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(5) + '</p>'
              } else {
                // плохо
                htmlSpec += createArrayQuest(5)
              }
            }
            if (store.getters['ui/getResultSpecialistOphtalmologist'] !== null) {
              num++
              htmlSpec += '<p>' + num + '.' + specialist.getName(6) + '<br />'
              if (store.getters['ui/getResultSpecialistOphtalmologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(6) + '</p>'
              } else {
                // плохо
                htmlSpec += createArrayQuest(6)
              }
              htmlSpec += 'Рекомендовано cоблюдать гигиену зрения:'
              htmlSpec += '<ul><li>' + 'Обеспечивайте хорошее освещение вашего рабочего места' + '</li>'
              htmlSpec += '<li>' + 'Делайте перерывы каждые 20 минут работы за компьютером' + '</li>'
              htmlSpec += '<li>' + 'Старайтесь держать осанку' + '</li>'
              htmlSpec += '<li>' + 'Защищайте глаза от воздействия ультрафиолетового излучения' + '</li>'
              htmlSpec += '<li>' + 'Включите в ваш рацион питания жирные сорта рыб, овощи и фрукты, печень, орехи' + '</li></ul>'
            }
            if (store.getters['ui/getResultSpecialistOtorinolaringologist'] !== null) {
              num++
              htmlSpec += '<p>' + num + '.' + specialist.getName(7) + '<br />'
              if (store.getters['ui/getResultSpecialistOtorinolaringologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(7) + '</p>'
              } else {
                // плохо
                htmlSpec += createArrayQuest(7)
              }
            }
            if (store.getters['ui/getResultSpecialistEndocrinologist'] !== null) {
              num++
              htmlSpec += '<p>' + num + '.' + specialist.getName(8) + '<br />'
              if (store.getters['ui/getResultSpecialistEndocrinologist'] === true) {
                // хорошо
                htmlSpec += request.getSpecialistGood(8) + '</p>'
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

            if (countDisease > 0) diseaseName += '<h3>Риск развития заболеваний</h3>'

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

            adviceName += '<h3>Общие рекомендации</h3>'
            htmlAdvices += '<p>1. Придерживайтесь принципам правильного питания:<br />'
            htmlAdvices += '<ul><li>Включить в рацион: фрукты, овощи, бобовые и цельные злаки, ненасыщенные жиры (содержащиеся в рыбе, авокадо и орехах, подсолнечном, соевом и оливковом масле)</li>'
            htmlAdvices += '<li>Избегать потребления: транс-жиров (замороженные пиццы, пироги, печенье, вафли и т.д.)</li>'
            htmlAdvices += '<li>Ограничить потребление (свободного сахара) до 12 чайных ложек без верха, соли до менее 5 грамм. Соль должна быть йодированной</li></ul></p>'
            htmlAdvices += '<p>2. Поддерживайте нормальную массу тела. Индекс массы тела  от 18.5 до 25<br />'
            htmlAdvices += '3. Выполняйте регулярные физические упражнения. 30 минут ходьбы в день + не менее 75 минут физической активности высокой интенсивности (плавание, бег) в неделю<br />'
            htmlAdvices += '4. Избегайте стрессовых ситуаций<br />'
            htmlAdvices += '5. Сохраняйте оптимизм. Учитесь радоваться жизни. Соблюдайте режим сна и отдыха<br />'
            htmlAdvices += '6. Откажитесь от курения и приема алкоголя</p>'
            htmlAdvices += '<br />'

            if (store.getters['ui/getResultDiseaseCountDiabetesTrue'] !== null) {
              htmlAdvices += '<h3>Уход за ногами:</h3>'
              htmlAdvices += '<p>1. Ежедневно самостоятельно или с участием членов семьи осматривайте стопы, состояние кожи, включая промежутки между пальцами<br />'
              htmlAdvices += '2. Немедленно сообщите лечащему врачу о наличии потертостей, порезов, трещин, царапин, ран и других повреждений кожи<br />'
              htmlAdvices += '3. Ежедневно мойте ноги теплой водой (температура не ниже 37.0 С), просушивайте стопы аккуратно, мягким полотенцем, не забывая о межпальцевых промежутках<br />'
              htmlAdvices += '4. При наличии ороговевшей кожи обработайте эти участки пемзой или специальной пилкой для кожи (не металлической). Не пользуйтесь для этих целей лезвием или ножницами<br />'
              htmlAdvices += '5. Не используйте химические препараты или пластыри для удаления мозолей и ороговевшей кожи<br />'
              htmlAdvices += '6. При сухой коже стоп после мытья смажьте их кремом, содержащим мочевину, кроме межпальцевых промежутков<br />'
              htmlAdvices += '7. Осторожно обрабатывайте ногти, не закругляя уголки, используя пилочку, а не острые и режущие инструменты<br />'
              htmlAdvices += '8. Для согревания ног пользуйтесь теплыми носками, а не грелкой или горячей водой, которые могут вызвать ожог из-за снижения чувствительности<br />'
              htmlAdvices += '9. Носите бесшовные (или со швами наружу) носки/колготы, меняйте их ежедневно<br />'
              htmlAdvices += '10. Не ходите без обуви дома и на улице, не надевайте обувь на босую ногу<br />'
              htmlAdvices += '11. Проконсультируйтесь со специалистом кабинета «Диабетическая стопа» или ортопедом, нужно ли Вам носить профилактическую или сложную ортопедическую обувь<br />'
              htmlAdvices += '12. Ежедневно осматривайте обувь: нет ли в ней инородного предмета, не завернулась ли стелька, так как это может привести к потертости кожи стоп<br />'
              htmlAdvices += '13. При повреждении кожи (трещина, царапина, порез) не используйте спиртосодержащие и красящие растворы. Используйте для обработки бесцветные водные антисептические растворы</p>'
              htmlAdvices += '<br />'
            }

            htmlAdvices += '<p>Регулярная диспансеризация позволит вам вовремя выявить изменения вашего здоровья! <br />'
            htmlAdvices += 'Для граждан от 18 до 39 лет - 1 раз в три года <br /> '
            htmlAdvices += 'Для граждан старше 40 лет - ежегодно </p>'

            let data = {
              resultTitle: resultName,
              result: htmlResult,
              specialistTitle: specialistName,
              specialist: htmlSpec,
              diseaseTitle: diseaseName,
              disease: htmlDisease,
              adviceTitle: adviceName,
              advice: htmlAdvices
            }
            /*
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
            */
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
