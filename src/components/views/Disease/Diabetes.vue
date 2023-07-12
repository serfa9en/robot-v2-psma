<template>
    <div v-show="showComponent" class="settings">
      <!--НАЧАЛО ОПРОСА-->
      <transition name="fade">
        <div class="content" v-if="step === 1">
            <div class="text">
                <p>Сахарный диабет</p>
            </div>
            <div class="container">
                <div class="block">
                    <p class="part">
                        В этой части обследования Вы ответите на вопросы и узнаете риск развития сахарного диабета<br>
                        Опросник состоит из 8-ми вопросов и позволяет оценить риск развития сахарного диабета 2-го типа в ближайшие 10 лет
                    </p>
            </div>
            <div class="block">
                    <img class="main-pic" src="../../../assets/img/disease/Diabetes/main.png">
            </div>
        </div>
            <button class="btn-dark-grad btn_next" v-on:click="toQuestion">Пройти<br>консультацию</button>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="step === 2" class="content">
            <div class="question text">
                <p class="quest_set">Есть ли у Вас сахарный диабет?</p>
            </div>
            <div class="img-box">
                <img class="img-quest" src="../../../../public/dialog-images/result/Result_bad.png">
            </div>
            <div class="yes-no">
                <button class="btn btn-yes-no" v-on:click="quest_0(1)">Да</button>
                <button class="btn btn-yes-no" v-on:click="quest_0(0)">Нет</button>
                <button class="btn btn-yes-no" v-on:click="quest_0(0)">Не знаю</button>
            </div>
        </div>
      </transition>

    <!--ВОПРОСЫ-->
      <transition name="fade">
        <div v-if="step === 3" class="content">
            <div class="question text">
                <p class="quest_set">Был ли у Ваших родственников сахарный диабет 1 или 2 типа?</p>
            </div>
            <div class="img-box">
                <img class="img-quest" src="../../../assets/img/disease/Diabetes/main.png">
            </div>
            <div class="yes-no">
                <button class="btn btn-yes-no" v-on:click="quest_1(5)">Да</button>
                <button class="btn btn-yes-no" v-on:click="quest_1(0)">Нет</button>
            </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="step === 4" class="content">
            <div class="question text">
                <p class="quest_set">Выберите подходящий вариант:</p>
            </div>
            <div>
                <img src="../../../../public/dialog-images/result/Result_bad.png">
            </div>
            <div class="form">
                <label class="rad-label">
                    <input name="dzen" type="radio" value="dzen" class="rad-input">
                    <div class="rad-design"></div>
                    <div class="rad-text">Бабушка / дедушка, тётя / дядя, двоюродные братья / сестры</div>
                </label>
                <label class="rad-label">
                    <input name="dzen" type="radio" value="nedzen" class="rad-input">
                    <div class="rad-design"></div>
                    <div class="rad-text">Родители, брат / сестра, собственный ребенок</div>
                </label>
            </div>
            <div class="error">{{ this.error }}</div>
            <div class="yes-no">
                <button class="btn btn-dark-grad" v-on:click="radioButtonFunction()">Далее</button>
            </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="step === 5" class="content">
            <div class="question text">
                <p class="quest_set">Обнаруживали ли у Вас когда-либо уровень глюкозы (сахара) крови выше нормы (во время диспансеризации, профосмотров, во время болезни или беременности)?</p>
            </div>
            <div class="img-box">
                <img class="img-quest" src="../../../assets/img/disease/Diabetes/main.png">
            </div>
            <div class="yes-no">
                <button class="btn btn-yes-no" v-on:click="next(5)">Да</button>
                <button class="btn btn-yes-no" v-on:click="next(0)">Нет</button>
            </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="step === 6" class="content">
            <div class="question text">
                <p class="quest_set">Принимали ли Вы когда-либо регулярно лекарства для снижения артериального давления?</p>
            </div>
            <div class="img-box">
                <img class="img-quest" src="../../../assets/img/disease/Diabetes/main.png">
            </div>
            <div class="yes-no">
                <button class="btn btn-yes-no" v-on:click="next(2)">Да</button>
                <button class="btn btn-yes-no" v-on:click="next(0)">Нет</button>
            </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="step === 7" class="content">
            <div class="question text">
                <p class="quest_set">Делаете ли вы физические упражнения по 30 минут каждый день или 3 часа в течение недели?</p>
            </div>
            <div class="img-box">
                <img class="img-quest" src="../../../assets/img/disease/Diabetes/main.png">
            </div>
            <div class="yes-no">
                <button class="btn btn-yes-no" v-on:click="next(0)">Да</button>
                <button class="btn btn-yes-no" v-on:click="next(2)">Нет</button>
            </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="step === 8" class="content">
            <div class="question text">
                <p class="quest_set">Вы едите овощи, фрукты или ягоды <b>каждый день</b>?</p>
            </div>
            <div class="img-box">
                <img class="img-quest" src="../../../assets/img/disease/Diabetes/main.png">
            </div>
            <div class="yes-no">
                <button class="btn btn-yes-no" v-on:click="next(0)">Да</button>
                <button class="btn btn-yes-no" v-on:click="next(1)">Нет</button>
            </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="step === 9" class="content">
            <div class="question text">
                <p class="quest_set">Ваш пол?</p>
            </div>
            <div class="img-box">
                <img class="img-quest" src="../../../assets/img/disease/Diabetes/main.png">
            </div>
            <div class="yes-no">
                <button class="btn btn-yes-no" v-on:click="quest_8(0)">Мужчина</button>
                <button class="btn btn-yes-no" v-on:click="quest_8(1)">Женщина</button>
            </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="step === 10" class="content">
            <div class="question text">
                <p class="quest_set">Укажите вашу окружность талии</p>
            </div>
            <div class="img-box">
                <img class="img-quest" src="../../../assets/img/disease/Diabetes/main.png">
            </div>
            <div class="yes-no">
                <button class="btn btn-yes-no" v-on:click="next(0)">
                    <div>{{ this.answ1 }}</div>
                    <div class="not-bold">{{ this.dop1 }}</div>
                </button>
                <button class="btn btn-yes-no" v-on:click="next(3)">
                    <div>{{ this.answ2 }}</div>
                    <div class="not-bold">{{ this.dop2 }}</div>
                </button>
                <button class="btn btn-yes-no" v-on:click="next(4)">
                    <div>{{ this.answ3 }}</div>
                    <div class="not-bold">{{ this.dop3 }}</div>
                </button>
            </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="step === 11" class="content">
            <div class="question text">
                <p class="quest_set">Какой ваш индекс массы тела?</p>
            </div>
            <div class="img-box">
                <img class="img-quest" src="../../../assets/img/disease/Diabetes/main.png">
            </div>
            <div class="yes-no">
                <button class="btn btn-yes-no" v-on:click="next(0)">Менее 25</button>
                <button class="btn btn-yes-no" v-on:click="next(1)">25 - 30</button>
                <button class="btn btn-yes-no" v-on:click="next(3)">Более 30</button>
                <button class="btn btn-dark-grad" v-on:click="toMeasurement">Измерить</button>
            </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="step === 12" class="content">
            <div class="question text">
                <p class="quest_set">Ваш возраст?</p>
            </div>
            <div class="img-box">
                <img class="img-quest" src="../../../assets/img/disease/Diabetes/main.png">
            </div>
            <div class="yes-no">
                <button class="btn btn-yes-no" v-on:click="next(0)">Менее 45</button>
                <button class="btn btn-yes-no" v-on:click="next(2)">45 - 54</button>
                <button class="btn btn-yes-no" v-on:click="next(3)">54 - 64</button>
                <button class="btn btn-yes-no" v-on:click="next(4)">Более 65</button>
            </div>
        </div>
      </transition>

      <!--РЕЗУЛЬТАТ-->
      <transition name="result">
        <div v-if="step === 14" class="content">
          <div>
            <p class="text result">
              Ошибка!
            </p>
          </div>
          <p class="result_part">
              Вы ответили, что у Вас имеется <b>сахарный диабет</b>, выполнить расчет риска развития сахарного диабета невозможно. Вам необходимо регулярно наблюдаться у вашего лечащего врача.
            </p>
          <div class="text result_text">
            Ознакомьтесь с нашими рекомендациями:
            <ul>
                <li>
                  Рекомендации по здоровому образу жизни
                </li>
                <li>
                  Правила ухода за ногами при сахарном диабете
                </li>
              </ul>
          </div>
          <div>
            <!--<button class="btn_result btn-yes-no" v-on:click="print">Получить<br> результаты</button>-->
            <button class="btn_result btn-dark-grad" v-on:click="getRecomend">Получить <br> рекомендации</button>
            <button class="btn_result btn-yes-no" v-on:click="continueWork">Продолжить обследование</button>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'
import { getDiabetesBorderColor, getDiabetesResult, getDiabetesImg, getDiabetesText, getDiabetesColor, getDiabetesResultD } from '../../styled/setResultDisease'

export default {
  name: 'diabetes',
  data () {
    return {
      step: null, // шаг страниц
      count: null,
      result: null,
      error: null,
      answ1: null,
      answ2: null,
      answ3: null,
      dop1: null,
      dop2: null,
      dop3: null
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('engine', [
      'getPreStateName'
    ]),
    ...mapGetters('ui', [
      'getUserAge',
      'getMeasurementImt',
      'getCurrentDiseaseImg'
    ]),
    showComponent () {
      if (this.getStep === 'diabetes') {
        this.error = ''
        this.loggingCurrentStateName()
      }
      return this.getStep === 'diabetes'
    }
  },
  methods: {
    calculateIMT: function () {
      if (this.getMeasurementImt < 25) {
        // console.log('менее 25')
        this.count = this.count + 0
      } else {
        if (this.getMeasurementImt < 30) {
          // console.log('25 - 30')
          this.count = this.count + 1
        } else {
          if (this.getMeasurementImt >= 30) {
            // console.log('более 30')
            this.count = this.count + 3
          }
        }
      }
      this.step++
    },
    loggingCurrentStateName: function () {
      if (this.getPreStateName === 'DISEASE_MAIN') {
        this.step = 1
        this.count = 0
      }
      if (this.getPreStateName === 'RESULT') {
        this.calculateIMT()
      }
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/setPreStateName', {
        meta: { eventId },
        data: 'DIABETES'
      })
    },
    toQuestion: function () {
      this.step = 2
    },
    quest_0: function (val) {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      if (val === 0) {
        this.step++
        this.$store.dispatch('ui/setResultDiseaseCountDiabetesTrue', {
          meta: { eventId },
          data: null
        })
      } else {
        this.step = 14
        this.$store.dispatch('ui/setResultDiseaseCountDiabetesTrue', {
          meta: { eventId },
          data: true
        })
        this.$store.dispatch('ui/setResultDiseaseCountDiabetes', {
          meta: { eventId },
          data: null
        })
      }
    },
    quest_1: function (val) {
      if (val === 0) {
        // нажали НЕТ
        this.step = 5
      } else {
        this.step = 4
      }
    },
    radioButtonFunction: function () {
      let flag = false
      let val = 0
      var rad = document.getElementsByName('dzen')
      for (let i = 0; i < rad.length; i++) {
        if (rad[i].checked) {
          if (rad[i].value === 'dzen') {
            val = 3
          } else {
            val = 5
          }
          flag = true
        }
      }
      if (flag === false) {
        this.error = 'ОШИБКА! Выберите одно значение!'
      } else {
        this.count = this.count + val
        this.step++
      }
    },
    quest_8: function (val) {
      if (val === 0) {
        // male
        this.answ1 = 'менее 94 см'
        this.answ2 = '94-102 см'
        this.answ3 = 'более 102 см'
        this.dop1 = 'S-L/48-52'
        this.dop2 = 'ХL-2XL/54-56'
        this.dop3 = '>3XL/>58'
      } else {
        // female
        this.answ1 = 'менее 80 см'
        this.answ2 = '80-88 см'
        this.answ3 = 'более 88 см'
        this.dop1 = 'S-L/42-48'
        this.dop2 = 'ХL-2XL/50-54'
        this.dop3 = '>3XL/>56'
      }
      this.count = this.count + val
      this.step++
    },
    next: function (val) {
      this.count = this.count + val
      this.step++
      if (this.step === 12) {
        // console.log('getUserAge = ', this.getUserAge)
        if (this.getUserAge < 45) {
          this.count = this.count + 0
        } else {
          if (this.getUserAge < 54) {
            this.count = this.count + 2
          } else {
            if (this.getUserAge < 64) {
              this.count = this.count + 3
            } else {
              this.count = this.count + 4
            }
          }
        }
        this.step++
      }
      if (this.step === 13) {
        // РЕЗУЛЬТАТ
        this.result = getDiabetesResult(this.count)
        let resultD = getDiabetesResultD(this.count)
        let image = getDiabetesImg(this.count)
        let text = getDiabetesText(this.count)
        let color = getDiabetesColor(this.count)
        let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
        this.$store.dispatch('ui/setCurrentDiseaseCommentD', {
          meta: { eventId },
          data: resultD
        })
        this.$store.dispatch('ui/setCurrentDiseaseComment', {
          meta: { eventId },
          data: this.result
        })
        this.$store.dispatch('ui/setResultDiseaseCountDiabetes', {
          meta: { eventId },
          data: this.count
        })
        this.$store.dispatch('ui/setCurrentDiseaseNumber', {
          meta: { eventId },
          data: 0
        })
        this.$store.dispatch('ui/setCurrentDiseaseTitle', {
          meta: { eventId },
          data: 'сахарного диабета'
        })
        this.$store.dispatch('ui/setCurrentDiseaseImg', {
          meta: { eventId },
          data: image
        })
        this.$store.dispatch('ui/setCurrentDiseaseText', {
          meta: { eventId },
          data: text
        })
        this.$store.dispatch('ui/setCurrentDiseaseColor', {
          meta: { eventId },
          data: color
        })
        this.$store.dispatch('ui/setCurrentDiseaseBorderColor', {
          meta: { eventId },
          data: getDiabetesBorderColor(this.count)
        })
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'DISEASE_RESULT'
        })
      }
    },
    toMeasurement: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('ui/setFlagDiseaseDiabetes', {
        meta: { eventId },
        data: true
      })
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'WIDTH_HEIGHT'
      })
    },
    getRecomend: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('ui/setRecomendType', { meta: { eventId }, data: 0 })
      this.$store.dispatch('ui/setRecomendDiabetes', { meta: { eventId }, data: 1 })
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'RECOMEND_VIEW'
      })
    },

    // продолжить обследлование (вернуться на главную - результаты сохранить в БД)
    continueWork: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'DISEASE_MAIN'
      })
    },
    print: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'PRINT_VIEW'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.settings {
  width: 100%;
  height: 100%;

  .content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #fff;
    box-sizing: border-box;
    padding: 145px 0 105px;

    .container {
      width: 100%;
      height: 240px;
      display: flex;
      text-align: center;
      margin: 25px;
    }

    .block {
        width: 800px;
        height: auto;
    }

    .main-pic {
        width: 200px;
        height: 200px;
    }

    .result_container {
      width: 646px;
      height: 120px;
      display: flex;
      text-align: center;
      background: rgba(230, 57, 70, 0.1);
    }

    .result_block {
      width: 100%;
      height: auto;
      display: inline-block;
      text-align: center;
    }
    .text {
      font-size: 50px;
      text-align: center;
    }

    .not-bold {
        font-size: 24px;
        font-weight: 300;
    }

    .result_text {
      font-size: 30px;
      align-items: center;
      text-align: center;
    }

    .question {
      width: 80%;
      height: 120px;
      align-items: center;
      text-align: center;
      font-size: 30px;
      padding: 0;

      .quest_set {
        width: 100%;
        height: auto;
        margin: 0;
        text-align: center;
      }
    }

    .img-quest {
      width: auto;
      height: 240px;
    }

    .part {
        width: 750px;
        height: auto;
        text-align: left;
        margin-left: 60px;
        font-size: 26px;
        line-height: 50px;
        color: #3E0E14;
        margin-top: -5px;
    }

    .result_part {
        width: 80%;
        height: auto;
        text-align: center;
        font-size: 30px;
        line-height: 35px;
        padding: 15px;
        color: #3E0E14;
        background: rgba(230, 57, 70, 0.1);
    }

    .btn {
        width: 250px;
        height: 70px;
        margin: 22px;
        font-size: 26px;
        font-weight: 700;

        &_next {
            width: 250px;
            font-size: 26px;
            font-weight: 700;
        }

        &_result {
          width: 250px;
          height: 70px;
        margin: 22px;
        font-size: 26px;
        font-weight: 700;
        }
    }

    .img {
      width: 120 px;
      height: 120 px;
    }
    .img-box {
      width: 300px;
      height: 300px;
    }

    .result {
      margin-top: -13px;
      font-size: 36px;
    }

    .form {
      width: 1100px;
      display: inline-block;
      margin: 20px;
      // border: 2px solid red;
    }
    .rad-label {
        display: flex;
        align-items: center;
        border-radius: 100px;
        padding: 14px 16px;
        margin: 10px 0;
        cursor: pointer;
        transition: .3s;
    }
    .rad-label:hover,
    .rad-label:focus-within {
        background: #EAE8E8;
    }

    .rad-input {
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      height: 1px;
      opacity: 0;
      z-index: -1;
    }

    .rad-design {
      width: 22px;
      height: 22px;
      border-radius: 100px;
      background: #691B26;
      border: 2px solid #3E0E14;
      position: relative;
    }

    .rad-design::before {
      content: '';
      display: inline-block;
      width: inherit;
      height: inherit;
      border-radius: inherit;
      background: hsl(0, 0%, 90%);
      transform: scale(1.1);
      transition: .3s;
    }

    .rad-input:checked+.rad-design::before {
      transform: scale(0);
    }

    .rad-text {
      color: #776462;
      margin-left: 14px;
      font-size: 26px;
      font-weight: 700;
      transition: .3s;
    }

    .rad-input:checked~.rad-text {
      color: #3E0E14;
    }

    .error {
        color: red;
        font-size: 22px;
        font-weight: 700;
    }

    ul {
      text-align: left;
      font-size: 24px;
    }

  }
}
</style>
