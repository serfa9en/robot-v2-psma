<template>
    <div v-show="showComponent" class="settings">
      <!--НАЧАЛО ОПРОСА-->
      <transition name="fade">
        <div class="content" v-if="step === 1">
            <div class="text">
                <p>{{ this.title }}</p>
            </div>
            <div class="block">
                    <p class="part">
                        Предлагаем пройти опрос и получить необходимые рекомендации по Вашему здоровью.<br>
                        В этой части обследования Вы ответите на конкретные вопросы и узнаете риск развития {{ this.context_title }}
                    </p>
                </div>
            <button class="btn-dark-grad btn_next" v-on:click="toQuestion">Пройти<br>консультацию</button>
        </div>
      </transition>
    <!--КАРУСЕЛЬ С ВОПРОСАМИ-->
      <transition name="fade">
        <div v-if="step === 2" class="content">
            <div class="question text">
                <p>вопрос</p>
            </div>
            <div class="yes-no">
                <button class="btn btn-yes-no" v-on:click="next(1)">Да</button>
                <button class="btn btn-yes-no" v-on:click="next(0)">Нет</button>
            </div>
        </div>
      </transition>

      <!--РЕЗУЛЬТАТ-->
      <transition name="result">
        <div v-if="step === 3" class="content">
          <div>
            <p class="text result">
              Заголовок
            </p>
          </div>
          <div class="result_container">
            <p class="result_block result_part">Текст</p>
          </div>
          <div class="img-box">
                <img class="img" :src=itemImageResult>
          </div>
          <div>
            <p class="text result_text">
              Комментарий
            </p>
          </div>
          <div>
            <button class="btn_result btn-dark-grad">Получить результаты</button>
            <button class="btn_result btn-yes-no" v-on:click="continueWork">Продолжить обследование</button>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'disease_quest',
  data () {
    return {
      step: null, // шаг страниц
      title: null, // название болезни
      context_title: null // падеж болезни для описания опроса
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('ui', [
      'getDiseasetNumber',
      'getDiseaseName',
      'getContextDisease'
    ]),
    showComponent () {
      if (this.getStep === 'disease_quest') {
        this.step = 1
        this.title = this.getDiseaseName
        this.context_title = this.getContextDisease
        this.loggingCurrentStateName()
      }
      return this.getStep === 'disease_quest'
    },
    itemImageResult () {
      return require(`../../../../public/dialog-images/result/${this.img_result}`)
    }
  },
  methods: {
    loggingCurrentStateName: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/setPreStateName', {
        meta: { eventId },
        data: 'DISEASE_QUEST'
      })
    },
    toQuestion: function () {
      this.step = 2
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
      padding-left: 60px;
      display: flex;
      align-items: center;
      text-align: center;
    }

    .result_text {
      font-size: 30px;
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

    .img-quest {
      width: auto;
      height: 240px;
    }

    .part {
        width: 800px;
        height: auto;
        text-align: center;
        margin-left: 60px;
        font-size: 32px;
        line-height: 60px;
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
        margin: 22px;
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

    .img {
      width: 120 px;
      height: 120 px;
    }

    .result {
      margin-top: -13px;
      font-size: 36px;
    }

  }
}
</style>
