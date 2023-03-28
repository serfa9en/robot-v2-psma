<template>
    <div v-show="showComponent" class="settings">
      <transition name="fade">
        <div class="content" v-if="step === 1">
            <div class="text">
                <p>{{ this.getSpecialistName }}</p>
            </div>
            <div class="container">
                <div class="block">
                    <p class="part">
                        Предлагаем пройти консультацию и получить необходимые рекомендации по Вашему здоровью.<br>
                        В этой части обследования Вы ответите на конкретные вопросы {{ this.getSpecialistDescription }}
                    </p>
                </div>
                <div class="block">
                    <img :src="itemImageSpecialist" class="img_main">
                </div>
            </div>
            <button class="btn-dark-grad btn_next" v-on:click="toQuestion">Пройти<br>консультацию</button>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="step === 2" class="content">
            <!--КАРУСЕЛЬ С ВОПРОСАМИ-->
            <div class="question text">
                <p class="quest_set">{{ this.question }}</p>
            </div>
            <div class="img-box">
                <img class="img-quest" :src=itemImageQuestion>
            </div>
            <div class="yes-no">
                <button class="btn btn_yn btn-yes-no" v-on:click="next(1)">Да</button>
                <button class="btn btn_yn btn-yes-no" v-on:click="next(0)">Нет</button>
                <button class="btn btn_yn btn-dark-grad" v-on:click="toMeasurement" v-show="isMeasurement">Измерить</button>
            </div>
        </div>
      </transition>
      <transition name="result">
        <div v-if="step === 3" class="content">
          <!--РЕЗУЛЬТАТ-->
          <div class="text result">
            <p>
              {{ this.title_result }}
            </p>
          </div>
          <div class="result_container" :style=backgroundStyle>
            <p class="result_block result_part">{{ this.text_result }}</p>
              <button class="result_block btn btn-yes-no" v-show="isBadResult" v-on:click="showDetails">Подробнее</button>
              <!--<button class="result_block btn btn-yes-no" v-show="isMeasurementResult" v-on:click="showRes">Подробнее</button> -->
          </div>
          <div class="">
                <img class="img" :src=itemImageResult>
          </div>
          <div>
            <p class="text result_text">
              {{ this.comment_result }}
            </p>
          </div>
          <div>
            <button class="btn_result btn-dark-grad">Получить <br> результаты</button>
            <button class="btn_result btn-yes-no" v-on:click="continueWork">Продолжить обследование</button>
          </div>
        </div>
      </transition>
      <!--КНОПКА ПОДРОБНЕЕ-->
      <transition name="result_add">
        <div v-if="step === 4" class="content">
          <div>
            <p class="text_add">Вы ответили положительно <br>на следующие вопросы:</p>
          </div>
          <div class="container">
            <div class="block_add-img">
              <img class="img_add" src="../../../../public/dialog-images/result/Result_bad.png">
            </div>
            <div class="block_add-list">
              <ul>
              <li class="text li" v-for="item in items" :key="item.message">
                {{ item.message }}
              </li>
            </ul>
            </div>
          </div>
          <div class="blocks" v-if="this.isMeasureProcess">
              <div v-if="this.is_imt" class="imt_box">
                <div class="tex_box_imt">
                  <p class="text tex_res_imt_add">Рост</p>
                </div>
                <div class="tex_box_imt">
                  <p class="text tex_res_imt">{{ this.imt_h }}</p>
                </div>
              </div>
              <div v-if="this.is_imt" class="imt_box">
                <div class="tex_box">
                  <p class="text tex_res_imt_add">Вес</p>
                </div>
                <div class="tex_box">
                  <p class="text tex_res_imt">{{ this.imt_w }}</p>
                </div>
              </div>
              <div v-if="this.is_imt" class="imt_box">
                <div class="tex_box">
                  <p class="text tex_res_imt_add">ИМТ</p>
                </div>
                <div class="tex_box">
                  <p class="text tex_res_imt">{{ this.imt_imt }}</p>
                </div>
              </div>
              <div v-if="this.is_gluco" class="imt_box">
                <div class="tex_box">
                  <p class="text tex_res_imt_add">Глюкоза</p>
                </div>
                <div class="tex_box">
                  <p class="text tex_res_imt">{{ this.gluco }}</p>
                </div>
              </div>
            </div>
          <button class="btn-dark-grad btn_next_add" v-on:click="back_add">Назад</button>
        </div>
      </transition>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'
import { getQuestion, getLength } from '../../../store/dataStorage/specialist'
import { EXAMINATION_TYPE } from '@/constants'

export default {
  name: 'specialist_quest',
  data () {
    return {
      step: null, // шаг страниц
      question: '', // вопрос
      isMeasure: null, // есть ли измерение
      step_question: 0, // какой вопрос по счету

      img_spec: null, // начальное значение специалиста (только для картинок)
      img_dir: '0_cardiologist', // начальное значение папки картинок для вопросов (только для картинок)

      answer_yes: null, // подсчет результатов
      title_result: null, // заголовок на странице результата
      text_result: null, // текст результата
      img_result: null,
      isBad: null,
      isMeasuremRes: null,
      comment_result: null,

      // атрибуты для вывода плохого результата
      quest_array: null,
      items: [
        {}
      ],
      array_list: [],
      EXAMINATION_TYPE,
      is_imt: null,
      is_gluco: null,
      imt_h: null,
      imt_w: null,
      imt_imt: null,
      gluco: null,

      // есть ли вообще в опроснике измерения
      isMeasureProcess: false
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('ui', [
      'getSpecialistNumber',
      'getSpecialistName',
      'getSpecialistDescription',
      'getSpecialistPath',
      'getSpecialistTextResult'
    ]),
    ...mapGetters('engine', [
      'getPreStateName'
    ]),
    ...mapGetters('ui', [
      'getMeasurementGlucometry',
      'getMeasurementWeight',
      'getMeasurementHeight',
      'getMeasurementImt'
    ]),
    showComponent () {
      if (this.getStep === 'specialist_quest') {
        // console.log('this.step_question = ', this.step_question)
        if (this.getPreStateName === 'SPECIALIST_START') {
          this.step = 1
          this.answer_yes = 0
          this.img_spec = this.getSpecialistNumber
          this.isMeasure = false
          this.isMeasureProcess = false
          this.isBad = false
          this.quest_array = [this.getLength]
          // init
          for (let i = 0; i < this.getLength; i++) {
            this.quest_array[i] = false
          }
          this.items = [{}]
          this.array_list = []
        }
        this.loggingCurrentStateName()
        this.measureProcess()
      }
      return this.getStep === 'specialist_quest'
    },
    isMeasurement () {
      return this.isMeasure
    },
    isBadResult () {
      return this.isBad
    },
    isMeasurementResult () {
      return this.isMeasuremRes && !this.isBad
    },
    itemImageSpecialist () {
      return require(`../../../../public/dialog-images/specialist/main/${this.img_spec}.png`)
    },
    itemImageQuestion () {
      let stepImg = this.step_question - 1
      return require(`../../../../public/dialog-images/specialist/${this.img_dir}/${stepImg}.png`)
    },
    itemImageResult () {
      return require(`../../../../public/dialog-images/result/${this.img_result}`)
    },
    backgroundStyle () {
      if (this.answer_yes > 0) {
        // bad
        return {
          'background-color': 'rgba(230,57,70, 0.1)'
        }
      } else {
        // good
        return {
          'background-color': 'rgba(132,173,0,0.1)'
        }
      }
    }
  },
  methods: {
    ...mapActions('engine', [
      'handlerClickMoveToState'
    ]),
    ...mapActions('handlers', [
      'userClickHandler'
    ]),
    loggingCurrentStateName: function () {
      if (this.getPreStateName === 'RESULT') {
        this.isMeasuremRes = true
        if ((this.step_question) !== getLength(this.getSpecialistNumber)) {
          this.step = 2
          this.question = getQuestion(this.getSpecialistNumber, this.step_question)
          this.checkQuestion(this.question)
          this.step_question++
        } else {
          // this.step = 3
          this.next(0)
        }
      }
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/setPreStateName', {
        meta: { eventId },
        data: 'SPECIALIST_QUEST'
      })
    },
    measureProcess: function () {
      // проверяем есть ли измерения
      console.log(this.quest_array)
    },
    checkQuestion: function (str) {
      if (str[0] === '|') {
        this.isMeasure = true
        this.question = str.split('|')[1]
        this.isMeasureProcess = true
      } else {
        this.isMeasure = false
      }
    },
    toQuestion: function () {
      this.step = 2
      this.step_question = 0
      this.question = getQuestion(this.getSpecialistNumber, this.step_question)
      this.checkQuestion(this.question)
      this.img_dir = this.getSpecialistPath
      this.step_question++
    },
    toMeasurement: function () {
      // console.log('this.step = ', this.step_question)
      // console.log('this.getSpecialistNumber = ', this.getSpecialistNumber)
      // this.measurement_flag = true
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      if (this.getSpecialistNumber === 0) {
        // кардиолог
        if (this.step_question === 5) {
          // this.is_imt = true
          // ИМТ
          this.$store.dispatch('ui/setFlagConsultation', {
            meta: { eventId },
            data: true
          })
          this.$store.dispatch('engine/handlerClickMoveToState', {
            meta: { eventId },
            data: 'WIDTH_HEIGHT'
          })
        } else {
          // сахар
          // this.is_gluco = true
          let actions = []
          actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': true, 'timeout': 0 })
          actions.push({ 'name': 'ui/setMeasurementStep', 'options': 1, 'timeout': 0 })
          actions.push({ 'name': 'ui/setMeasurementNum', 'options': EXAMINATION_TYPE.GLUCOMETER, 'timeout': 0 })
          this.$store.dispatch('ui/setFlagConsultation', {
            meta: { eventId },
            data: true
          })
          this.$store.dispatch('ui/setCurMeasurementNumber', {
            meta: { eventId },
            data: EXAMINATION_TYPE.GLUCOMETER
          })
          this.$store.dispatch('engine/handlerClickMoveToState', {
            meta: { eventId },
            data: 'MEASUREMENT_2_1'
          })
        }
      } else {
        // эндокринолог
        // сахар
        // this.is_gluco = true
        let actions = []
        actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': true, 'timeout': 0 })
        actions.push({ 'name': 'ui/setMeasurementStep', 'options': 1, 'timeout': 0 })
        actions.push({ 'name': 'ui/setMeasurementNum', 'options': EXAMINATION_TYPE.GLUCOMETER, 'timeout': 0 })
        this.$store.dispatch('ui/setFlagConsultation', {
          meta: { eventId },
          data: true
        })
        this.$store.dispatch('ui/setCurMeasurementNumber', {
          meta: { eventId },
          data: EXAMINATION_TYPE.GLUCOMETER
        })
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'MEASUREMENT_2_1'
        })
      }
    },
    // обработка кнопок Да/нет
    next: function (val) {
      if (val === 1) {
        this.answer_yes++
        this.quest_array[this.step_question - 1] = true
      }
      if (this.step_question !== getLength(this.getSpecialistNumber)) {
        this.question = getQuestion(this.getSpecialistNumber, this.step_question)
        this.checkQuestion(this.question)
        this.step_question++
      } else {
        // результат
        this.step = 3
        console.log('this.isMeasureProcess = ', this.isMeasureProcess)
        this.title_result = 'Спасибо за прохождение консультации ' + this.getSpecialistDescription + '!'
        if (this.getMeasurementImt > 25) {
          this.answer_yes++
          this.quest_array[4] = true
          this.is_imt = true
        }
        if (this.isMeasuremRes === true) {
          this.imt_h = this.getMeasurementHeight
          this.imt_w = this.getMeasurementWeight
          this.imt_imt = this.getMeasurementImt
          this.gluco = this.getMeasurementGlucometry
        }
        if (this.getMeasurementGlucometry >= 6.8) {
          this.answer_yes++
          this.quest_array[6] = true
          this.is_gluco = true
        }
        // console.log('getMeasurementImt = ', this.getMeasurementImt)
        if (this.answer_yes > 0) {
          // все плохо
          console.log('ПЛОХО')
          this.img_result = 'Result_bad.png'
          this.text_result = 'Вы ответили положительно на ряд вопросов'
          this.isBad = true
          this.comment_result = 'Эти симптомы могут привести к необратимым последствиям\n Обратитесь к специалисту'
        } else {
          // все хорошо
          console.log('ХОРОШО')
          this.img_result = 'Result_good.png'
          this.text_result = 'У вас отсутствуют характерные симптомы для срочного обращения к ' + this.getSpecialistTextResult
          this.comment_result = 'Регулярная диспансеризация позволит вам вовремя выявить изменения вашего здоровья!'
        }
      }
    },
    // доделать вывод вопросов
    showDetails: function () {
      this.step = 4
      let len = 0
      for (let i = 0; i < this.quest_array.length; i++) {
        if (this.quest_array[i] === true) {
          this.array_list[len] = getQuestion(this.getSpecialistNumber, i)
          if (this.array_list[len][0] === '|') {
            // console.log('nvdkls')
            this.array_list[len] = this.array_list[len].split('|')[1]
          }
          // this.array_list[len] = getQuestion(this.getSpecialistNumber, i)
          this.items.push({
            message: this.array_list[len]
          })
          len++
        }
      }
    },
    /*
    showRes: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'RESULT'
      })
    },
    */

    back_add: function () {
      this.step = 3
      this.items = [{}]
      this.array_list = []
    },

    // продолжить обследлование (вернуться на главную - результаты сохранить в БД)
    continueWork: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'MAIN_VIEW'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.settings {
  width: 100%;
  height: 100%;
  font-family: 'Play', sans-serif;

  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    bottom: 0;

    .container {
      width: 100%;
      height: auto;
      display: flex;
      text-align: center;
      // margin: 30px;
      margin-bottom: 15px;
    }

    .block {
      width: 100%;
      height: auto;
      display: inline-block;
      text-align: center;

      &_add-img {
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        right: 0;
      }

      &_add-list {
        width: 60%;
        text-align: left;
      }
    }

    .text {
      font-family: 'Play', sans-serif;
      font-size: 50px;
      align-items: center;
      text-align: center;
      margin-top: -40px;

      &_add {
        font-family: 'Play', sans-serif;
        color: #3E0E14;
        font-size: 30px;
        align-items: center;
        margin-top: 0px;
      }
    }

    .part {
        width: 770px;
        height: auto;
        text-align: left;
        margin-left: 60px;
        font-size: 28px;
        line-height: 60px;
        color: #3E0E14;
        margin-top: 0;
    }

    .question {
      width: 80%;
      height: 100px;
      display: flex;
      align-items: center;
      text-align: center;
      font-size: 30px;
      margin: 20px;

      .quest_set {
        width: 100%;
        text-align: center;
      }
    }

    .img-quest {
      width: auto;
      height: 240px;
    }

    .img-box {
      width: 300px;
      height: 300px;
    }

    .result_container {
      width: 670px;
      height: 110px;
      margin: 0;
      display: flex;
      text-align: center;
    }

    .result_block {
      width: 100%;
      height: auto;
      display: inline-block;
      text-align: center;
      margin: 0;
    }
    .result_text {
      width: 800px;
      font-size: 28px;
      text-align: center;
      margin-top: 10px;
    }

    .result_part {
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 28px;
        color: #3E0E14;
        margin: 15px;
    }

    .btn {
        width: 230px;
        height: 60px;
        font-size: 26px;
        font-weight: 700;
        padding: 10px;
        margin: 15px;

        &_next {
            width: 300px;
            height: 70px;
            font-size: 26px;
            font-weight: 700;
            margin-top: 30px;

            &_add {
              width: 300px;
              height: 70px;
              font-size: 26px;
              font-weight: 700;
              margin-top: 10px;
            }
        }

        &_result {
          width: 300px;
          height: 70px;
          margin: 22px;
          font-size: 26px;
          font-weight: 700;
        }

        &_yn {
          width: 230px;
          height: 70px;
          font-size: 26px;
          font-weight: 700;
          margin-top: 30px;
        }

    }

    .img {
      width: 120px;
      height: 120px;
      margin: 10px;

      &_add {
        width: 150px;
        height: 150px;
      }
    }

    .img_main {
      width: auto;
      height: 100%;
    }

    .result {
      font-size: 36px;
    }

    .li {
      margin: 15px;
      list-style: none;
      font-size: 20px;
      text-align: left;
    }

    .blocks {
    width: 400px;
    height: auto;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin-right: 30px;
    // border: 2px solid red;
  }
  .imt_box {
    width: 200px;
    // border: 2px solid rebeccapurple;
  }
  .tex {
    &_res {
      width: auto;
      height: auto;
      font-size: 40px;
      display: flex;
      margin: 0;
      margin-right: 15px;
      // border: 2px solid salmon;

      &_imt{
        width: auto;
        height: auto;
        font-size: 40px;
        // display: flex;
        margin: 0;

        &_add {
          font-size: 20px;
          margin: 0;
        }
      }
    }
  }
  }
}
</style>
