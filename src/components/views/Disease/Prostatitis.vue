<template>
    <div v-show="showComponent" class="settings">
      <!--НАЧАЛО ОПРОСА-->
      <transition name="fade">
        <div class="content" v-if="step === 1">
            <div class="text">
                <p>Простатит</p>
            </div>
            <div class="container">
                <div class="block">
                    <p class="part">
                        Предлагаем пройти опрос и получить необходимые рекомендации по Вашему здоровью.<br>
                        В этой части обследования Вы ответите на вопросы и узнаете риск развития простатит
                    </p>
            </div>
            <div class="block">
                    <img class="main-pic" src="../../../assets/img/disease/Reflux/main.png">
            </div>
        </div>
            <button class="btn-dark-grad btn_next" v-on:click="toQuestion">Пройти<br>консультацию</button>
        </div>
      </transition>

    <!--ВОПРОСЫ КАРУСЕЛЬКА-->
      <transition name="fade">
        <div v-if="step === 2" class="content">
          <div class="start_quest">
            <p class="text text_start">Как часто в течение последнего месяца...</p>
          </div>
            <div class="question text">
                <p class="quest_set">{{ this.question }}</p>
            </div>
            <div class="form">
                <label class="rad-label">
                    <input name="dzen" type="radio" value="1" class="rad-input">
                    <div class="rad-design"></div>
                    <div class="rad-text">Никогда</div>
                </label>
                <label class="rad-label">
                    <input name="dzen" type="radio" value="2" class="rad-input">
                    <div class="rad-design"></div>
                    <div class="rad-text">Реже 1 раза в неделю</div>
                </label>
                <label class="rad-label">
                    <input name="dzen" type="radio" value="3" class="rad-input">
                    <div class="rad-design"></div>
                    <div class="rad-text">Менее половины случаев</div>
                </label>
                <label class="rad-label">
                    <input name="dzen" type="radio" value="4" class="rad-input">
                    <div class="rad-design"></div>
                    <div class="rad-text">В половине случаев</div>
                </label>
                <label class="rad-label">
                    <input name="dzen" type="radio" value="5" class="rad-input">
                    <div class="rad-design"></div>
                    <div class="rad-text">Более половины случаев</div>
                </label>
                <label class="rad-label">
                    <input name="dzen" type="radio" value="6" class="rad-input">
                    <div class="rad-design"></div>
                    <div class="rad-text">Почти всегда</div>
                </label>
            </div>
            <div class="error">{{ this.error }}</div>
            <div class="yes-no">
                <button class="btn btn-dark-grad" v-on:click="radioButtonFunction()">Далее</button>
            </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="step === 3" class="content">
            <div class="question text">
                <p class="quest_set">Как бы Вы отнеслись к тому, если бы Вам пришлось жить с имеющимися у Вас проблемами с мочеиспусканием до конца жизни?</p>
            </div>
            <div class="form_quest">
                <label class="rad-label-quest">
                    <input name="dzen" type="radio" value="1" class="rad-input">
                    <div class="rad-design-quest"></div>
                    <div class="rad-text">Прекрасно</div>
                </label>
                <label class="rad-label-quest">
                    <input name="dzen" type="radio" value="2" class="rad-input">
                    <div class="rad-design-quest"></div>
                    <div class="rad-text">Хорошо</div>
                </label>
                <label class="rad-label-quest">
                    <input name="dzen" type="radio" value="3" class="rad-input">
                    <div class="rad-design-quest"></div>
                    <div class="rad-text">Удовлетворительно</div>
                </label>
                <label class="rad-label-quest">
                    <input name="dzen" type="radio" value="4" class="rad-input">
                    <div class="rad-design-quest"></div>
                    <div class="rad-text">Смешанное чувство</div>
                </label>
                <label class="rad-label-quest">
                    <input name="dzen" type="radio" value="5" class="rad-input">
                    <div class="rad-design-quest"></div>
                    <div class="rad-text">Неудовлетворительно</div>
                </label>
                <label class="rad-label-quest">
                    <input name="dzen" type="radio" value="6" class="rad-input">
                    <div class="rad-design-quest"></div>
                    <div class="rad-text">Плохо</div>
                </label>
                <label class="rad-label-quest">
                    <input name="dzen" type="radio" value="7" class="rad-input">
                    <div class="rad-design-quest"></div>
                    <div class="rad-text">Очень плохо</div>
                </label>
                <label class="rad-label-quest">
                    <input disabled name="dzen" type="radio" value="1" class="rad-input">
                    <div class="rad-text"><br></div>
                </label>
            </div>
            <div class="error">{{ this.error }}</div>
            <div class="yes-no">
                <button class="btn btn-dark-grad" v-on:click="radioButtonFunction()">Далее</button>
            </div>
        </div>
      </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'
import { getQuestionProstatitis } from '../../../store/dataStorage/disease'
import { getProstatitisResult, getProstatitisImg, getProstatitisText, getProstatitisColor, getProstatitisBorderColor } from '../../styled/setResultDisease'

export default {
  name: 'prostatitis',
  data () {
    return {
      step: null, // шаг страниц
      count: null,
      result: null,
      question: null,
      step_question: null,
      error: null
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
      'getCurrentDiseaseImg'
    ]),
    showComponent () {
      if (this.getStep === 'prostatitis') {
        this.loggingCurrentStateName()
      }
      return this.getStep === 'prostatitis'
    },
    itemImageResult () {
      return require(`../../../../public/dialog-images/result/${this.img_result}`)
    }
  },
  methods: {
    loggingCurrentStateName: function () {
      if (this.getPreStateName === 'DISEASE_MAIN') {
        this.step = 1
        this.count = 0
        this.step_question = 0
      }
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/setPreStateName', {
        meta: { eventId },
        data: 'PROSTATITIS'
      })
    },
    toQuestion: function () {
      this.step = 2
      this.question = getQuestionProstatitis(this.step_question)
      this.error = ''
    },
    radioButtonFunction: function () {
      let flag = false
      let val = 0
      var rad = document.getElementsByName('dzen')
      for (let i = 0; i < rad.length; i++) {
        if (rad[i].checked) {
          if (rad[i].value === '6') {
            val = 5
          } else {
            if (rad[i].value === '5') {
              val = 4
            } else {
              if (rad[i].value === '4') {
                val = 3
              } else {
                if (rad[i].value === '3') {
                  val = 2
                } else {
                  if (rad[i].value === '2') {
                    val = 1
                  } else {
                    if (rad[i].value === '7') {
                      val = 6
                    } else {
                      val = 0
                    }
                  }
                }
              }
            }
          }
          flag = true
        }
      }
      if (flag === false) {
        this.error = 'ОШИБКА! Выберите одно значение!'
      } else {
        this.count = this.count + val
        this.step_question++
        // console.log('this.count = ', this.count)
        this.toQuestion()
        for (let i = 0; i < rad.length; i++) {
          if (rad[i].checked) {
            rad[i].checked = false
          }
        }
        // console.log('this.count = ', this.count)
      }
      if (this.step_question === 7) {
        this.step++
      }
      if (this.step_question === 8) {
        // РЕЗУЛЬТАТ
        // console.log('this.resulT = ', this.count)
        this.result = getProstatitisResult(this.count)
        let image = getProstatitisImg(this.count)
        let text = getProstatitisText(this.count)
        let color = getProstatitisColor(this.count)
        let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
        this.$store.dispatch('ui/setCurrentDiseaseComment', {
          meta: { eventId },
          data: this.result
        })
        this.$store.dispatch('ui/setCurrentDiseaseCommentD', {
          meta: { eventId },
          data: ''
        })
        this.$store.dispatch('ui/setResultDiseaseCountProstatitis', {
          meta: { eventId },
          data: this.count
        })
        this.$store.dispatch('ui/setCurrentDiseaseNumber', {
          meta: { eventId },
          data: 3
        })
        this.$store.dispatch('ui/setCurrentDiseaseTitle', {
          meta: { eventId },
          data: 'простатита'
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
          data: getProstatitisBorderColor(this.count)
        })
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'DISEASE_RESULT'
        })
      }
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
      &_start {
        font-size: 32px;
        text-align: left;
      }
    }

    .start_quest {
      width: 1000px;
      margin: 0;
      padding: 0;
      margin-top: -40px;
      // border:#3E0E14 2px solid;
    }

    .not-bold {
        font-size: 24px;
        font-weight: 300;
    }

    .result_text {
      font-size: 30px;
      display: flex;
      align-items: center;
      text-align: center;
    }

    .question {
      width: 80%;
      height: 120px;
      margin-top: 25px;
      align-items: center;
      text-align: center;
      font-size: 26px;
      padding: 0;

      .quest_set {
        width: 100%;
        height: 50px;
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
        font-size: 28px;
        line-height: 50px;
        color: #3E0E14;
        margin-top: -5px;
    }

    .result_part {
        width: 100%;
        height: auto;
        text-align: center;
        margin-left: 60px;
        font-size: 30px;
        line-height: 35px;
        color: #3E0E14;
    }

    .btn {
        width: 230px;
        height: 70px;
        margin: 0;
        font-size: 26px;
        font-weight: 700;

        &_next {
            width: 300px;
            font-size: 26px;
            font-weight: 700;
        }

        &_result {
          width: 300px;
          height: 70px;
        margin: 22px;
        font-size: 26px;
        font-weight: 700;
        }
    }

    .form {
      width: 1070px;
      // height: 200px;
      display: inline-block;
      margin-top: 20px;
      padding: 20px;
      // border: 2px solid green;
      &_quest {
        width: 100%;
      // height: 200px;
      display: inline-block;
      margin-top: 20px;
      padding: 20px;
      // border: 2px solid green;
      }
    }
    .rad-label {
        width: 300px;
        // height: 80px;
        display: inline-block;
        align-items: center;
        padding: 14px 16px;
        cursor: pointer;
        transition: .3s;
        margin: 10px;
    }
    .rad-label-quest {
        width: 250px;
        // height: 80px;
        display: inline-block;
        align-items: center;
        padding: 14px 16px;
        cursor: pointer;
        transition: .3s;
        // margin: 10px;
    }
    .rad-label:hover,
    .rad-label:focus-within,
    .rad-label-quest:hover,
    .rad-label-quest:focus-within {
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
      left: 135px;
      border-radius: 100px;
      background: #691B26;
      border: 2px solid #3E0E14;
      position: relative;
    }
    .rad-design-quest {
      width: 22px;
      height: 22px;
      left: 115px;
      border-radius: 100px;
      background: #691B26;
      border: 2px solid #3E0E14;
      position: relative;
    }
    .rad-design::before,
    .rad-design-quest::before {
      content: '';
      display: inline-block;
      width: inherit;
      height: inherit;
      border-radius: inherit;
      background: hsl(0, 0%, 90%);
      transform: scale(1.1);
      transition: .3s;
    }

    .rad-input:checked+.rad-design::before,
    .rad-input:checked+.rad-design-quest::before {
      transform: scale(0);
    }

    .rad-text {
      color: #776462;
      margin-left: 0px;
      font-size: 22px;
      font-weight: 300;
      transition: .3s;
    }

    .rad-input:checked~.rad-text {
      color: #3E0E14;
    }

  }
  .error {
        width: auto;
        height: 50px;
        color: red;
        font-size: 22px;
        font-weight: 700;
    }
}
</style>
