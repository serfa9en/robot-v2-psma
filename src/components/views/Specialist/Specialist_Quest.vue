<template>
    <div v-show="showComponent" class="settings">
        <div class="content" v-if="showStart">
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
                    <img :src="itemImageSpecialist">
                </div>
            </div>
            <button class="btn-dark-grad btn_next" v-on:click="toQuestion">Пройти<br>консультацию</button>
        </div>
        <div v-if="showQuest" class="content">
            <!--КАРУСЕЛЬ С ВОПРОСАМИ-->
            <div class="question text">
                <p>{{ this.question }}</p>
            </div>
            <div class="img-box">
                <img class="img-quest" :src=itemImageQuestion>
            </div>
            <div class="yes-no">
                <button class="btn btn-yes-no" v-on:click="next(1)">Да</button>
                <button class="btn btn-yes-no" v-on:click="next(0)">Нет</button>
                <button class="btn btn-dark-grad" v-on:click="toMeasurement" v-show="isMeasurement">Измерить</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'
import { getQuestion, getLength } from '../../../store/dataStorage/specialist'

export default {
  name: 'specialist_quest',
  data () {
    return {
      step: 'start', // шаг страниц
      question: '', // вопрос
      isMeasure: false, // есть ли измерение
      step_question: 0, // какой вопрос по счету

      // костыль --переделать доступ к пути картинки
      img_spec: 0, // начальное значение специалиста (только для картинок)
      img_dir: '0_cardiologist' // начальное значение папки картинок для вопросов (только для картинок)
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
      'getSpecialistPath'
    ]),
    showComponent () {
      return this.getStep === 'specialist_quest'
    },
    showStart () {
      return this.step === 'start'
    },
    showQuest () {
      return this.step === 'question'
    },
    isMeasurement () {
      return this.isMeasure
    },
    itemImageSpecialist () {
      return require(`../../../../public/dialog-images/specialist/main/${this.img_spec}.png`)
    },
    itemImageQuestion () {
      return require(`../../../../public/dialog-images/specialist/${this.img_dir}/${this.step_question}.png`)
    }
  },
  methods: {
    checkQuestion: function (str) {
      if (str[0] === '|') {
        this.isMeasure = true
        this.question = str.split('|')[1]
      } else {
        this.isMeasure = false
      }
    },
    toQuestion: function () {
      this.step = 'question'
      this.step_question = 0
      this.question = getQuestion(this.getSpecialistNumber, this.step_question)
      this.checkQuestion(this.question)
      this.img_spec = this.getSpecialistNumber
      this.img_dir = this.getSpecialistPath
      this.step_question++
    },
    // обработка кнопок Да/нет
    next: function (val) {
      if (this.step_question !== getLength(this.getSpecialistNumber)) {
        this.question = getQuestion(this.getSpecialistNumber, this.step_question)
        this.checkQuestion(this.question)
        this.step_question++
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
    .text {
      font-size: 50px;
      padding-left: 60px;
      display: flex;
      align-items: center;
      text-align: center;
    }

    .question {
      width: 80%;
      display: flex;
      align-items: center;
      text-align: center;
      font-size: 30px;
    }

    img {
      width: auto;
      height: 240px;
    }

    .part {
        width: 745px;
        height: auto;
        text-align: left;
        margin-left: 60px;
        font-size: 32px;
        line-height: 60px;
        color: #3E0E14;
        margin-top: -5px;
    }

    .btn {
        width: 230px;
        height: 70px;
        margin: 22px;
        font-size: 26px;
        font-weight: 700;

        &_next {
            width: 300px;
            font-size: 26px;
            font-weight: 700;
        }
    }
  }
}
</style>
