<template>
    <div v-show="showComponent" class="settings">
      <!--НАЧАЛО ОПРОСА-->
      <transition name="fade">
        <div class="content" v-if="step === 1">
            <div class="text">
                <p>{{ this.title }}</p>
            </div>
            <div class="container">
              <div class="block">
                    <p class="part">
                        Предлагаем пройти опрос и получить необходимые рекомендации по Вашему здоровью.<br>
                        В этой части обследования Вы ответите на вопросы и узнаете риск развития {{ this.context_title }}
                    </p>
                </div>
                <div class="block">
                    <img :src="itemImageOncology" class="img_main">
                </div>
              </div>
            <button class="btn-dark-grad btn_next" v-on:click="toQuestion">Пройти<br>консультацию</button>
        </div>
      </transition>
    <!--КАРУСЕЛЬ С ВОПРОСАМИ-->
      <transition name="fade">
        <div v-if="step === 2" class="content">
          <div class="question text">
                <p class="quest_set">{{ this.question }}</p>
            </div>
            <div class="yes-no">
                <button class="btn btn-yes-no" v-on:click="next(1)">Да</button>
                <button class="btn btn-yes-no" v-on:click="next(0)">Нет</button>
            </div>
        </div>
      </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'
import { getNameStr, getQuestion, getLengthPoints, getPoints, getContextOncology } from '../../../store/dataStorage/oncology'
import { getResultOncology, getImgOncology, getTextOncology, getColorOncology, getBorderColorOncology } from '../../styled/setResultDisease'

export default {
  name: 'oncology_quest',
  data () {
    return {
      step: null, // шаг страниц
      title: null, // название болезни
      context_title: null, // падеж болезни для описания опроса
      img_main: null,
      question_step: null,
      question: null,
      length_questions: null,
      count: null
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('ui', [
      'getOncologyNumber',
      'getOncologyName',
      'getContextOncology',
      'getPathOncology'
    ]),
    ...mapGetters('engine', [
      'getPreStateName'
    ]),
    showComponent () {
      if (this.getStep === 'oncology_quest') {
        // console.log(getPoints(0, 2))
        this.title = this.getOncologyName
        this.context_title = this.getContextOncology
        this.img_main = this.getPathOncology
        this.length_questions = getLengthPoints(this.getOncologyNumber)
        this.loggingCurrentStateName()
      }
      return this.getStep === 'oncology_quest'
    },
    itemImageOncology () {
      return require(`../../../assets/img/disease/Oncology/${this.img_main}.png`)
    }
  },
  methods: {
    loggingCurrentStateName: function () {
      if (this.getPreStateName === 'ONCOLOGY_MAIN') {
        this.step = 1
        this.question_step = 0
        this.count = 0
      }
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/setPreStateName', {
        meta: { eventId },
        data: 'ONCOLOGY_QUEST'
      })
    },
    toQuestion: function () {
      this.step = 2
      this.question = getQuestion(this.getOncologyNumber, 0)
    },
    next: function (value) {
      if (this.question_step < this.length_questions - 1) {
        let temp
        if (value === 1) {
          // ответ - ДА
          temp = getPoints(this.getOncologyNumber, this.question_step)
        } else {
          // ответ - НЕТ
          temp = 0
        }
        this.count = this.count + temp
        this.question_step = this.question_step + 1
        this.question = getQuestion(this.getOncologyNumber, this.question_step)
      } else {
        // Результат
        let temp
        if (value === 1) {
          // ответ - ДА
          temp = getPoints(this.getOncologyNumber, this.question_step)
        } else {
          // ответ - НЕТ
          temp = 0
        }
        this.count = this.count + temp
        // console.log(this.count)
        this.result = getResultOncology(this.count)
        let image = getImgOncology(this.count)
        let text = getTextOncology(this.count)
        let color = getColorOncology(this.count)

        let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
        this.$store.dispatch('ui/setCurrentDiseaseComment', {
          meta: { eventId },
          data: this.result
        })
        this.$store.dispatch('ui/setCurrentDiseaseCommentD', {
          meta: { eventId },
          data: ''
        })
        // let str = getNameStr(this.getOncologyNumber)
        this.$store.dispatch(getNameStr(this.getOncologyNumber), {
          meta: { eventId },
          data: this.count
        })
        this.$store.dispatch('ui/setCurrentDiseaseNumber', {
          meta: { eventId },
          data: this.getOncologyNumber + 4
        })
        this.$store.dispatch('ui/setCurrentDiseaseTitle', {
          meta: { eventId },
          data: getContextOncology(this.getOncologyNumber)
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
          data: getBorderColorOncology(this.count)
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
      width: 100%;
      height: auto;
      display: inline-block;
      text-align: center;
    }

    .img_main {
      width: auto;
      height: 100%;
    }

    .text {
      font-size: 50px;
      text-align: center;
    }

    .question {
      width: 800px;
      height: 220px;
      // display: block;
      // justify-content: center;
      margin-top: 100px;
      // text-align: center;
      font-size: 26px;

      .quest_set {
        width: 100%;
        height: 50px;
        // margin: 0;
        // text-align: center;
        // border: 2px solid red;
      }
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

    .btn {
        width: 270px;
        height: 70px;
        font-size: 26px;
        font-weight: 700;
        margin: 25px;
        // bottom: 0;

        &_next {
            width: 270px;
            font-size: 26px;
            font-weight: 700;
        }
    }
  }
}
</style>
