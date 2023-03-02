<template>
    <div v-show="showComponent" class="settings">
      <transition name="fade">
        <div class="content" v-if="step === 1">
          <div class="text">
                <p>{{ this.h3 }}</p>
            </div>
            <div class="container">
                <div class="block">
                    <p class="part">{{ this.p }}</p>
                    <div class="part">
                      <button class="btn-dark-grad btn_next">Начать</button>
                    </div>
                </div>
                <div class="block video" v-html="rightHtml"></div>
            </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="content" v-if="step === 2"></div>
      </transition>
      <transition name="fade">
        <div class="content" v-if="step === 3"></div>
      </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'
// import Loader from '@/components/global/Loader'

export default {
  name: 'measurement',
  data () {
    return {
      state: null, // текущее состояние
      step: null, // шаг страниц
      h3: null,
      p: null,
      rightHtml: null,
      rightLoad: null
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('ui', [
      'getMeasurementNum',
      'getMeasurementStep'
    ]),
    ...mapGetters('engine', [
      'getCurrentStateName',
      'getPreStateName'
    ]),
    showComponent () {
      if (this.$store.getters['app/getStep'] === 'measurement') {
        this.step = 1
        console.log('this.getMeasurementNum = ', this.getMeasurementNum)
        console.log('this.getMeasurementStep = ', this.getMeasurementStep)
        console.log('HELP HELP HELP')
        if (this.getMeasurementNum === 2) {
          if (this.getMeasurementStep === 1) {
            this.state = 'MEASUREMENT_2_1'
            this.h3 = 'Глюкоза крови'
            this.p = 'Установите указательный палец в прибор как показано на видео.'
            this.rightHtml = '<video class="video" id="video" height="480" src="video/glucometry_index_finger.webm" loop autoplay mute></video>'
            this.rightLoad = null
          }
        }
        if (this.getMeasurementNum === 4) {
          if (this.getMeasurementStep === 1) {
            this.state = 'MEASUREMENT_4_1'
            this.h3 = 'Сатурация крови'
            this.p = 'Вставьте палец в прибор, как показано на видео. Датчик с красным светом должен быть направлен на подушечку'
            this.rightHtml = '<video class="video" id="video" height="480" src="video/pulseoximeter_new.webm" loop autoplay mute></video>'
            this.rightLoad = null
          }
        }
        if (this.getMeasurementNum === 5) {
          if (this.getMeasurementStep === 1) {
            this.state = 'MEASUREMENT_5_1'
            this.h3 = 'Артериальное давление'
            this.p = 'Наденьте манжету согласно инструкции на видео'
            this.rightHtml = '<video class="video" id="video" height="480" src="video/tonometry.webm" loop autoplay mute></video>'
            this.rightLoad = null
          }
        }
        if (this.getMeasurementNum === 6) {
          if (this.getMeasurementStep === 1) {
            this.state = 'MEASUREMENT_6_1'
            this.h3 = 'Температура'
            this.p = 'Изучите инструкцию и нажмите кнопку "Начать измерение"'
            this.rightHtml = '<video class="video" id="video" height="480" src="video/thermometryFinger.webm" loop autoplay mute></video>'
            this.rightLoad = null
          }
        }
        this.loggingCurrentStateName()
      }
      return this.$store.getters['app/getStep'] === 'measurement'
    }
  },
  methods: {
    loggingCurrentStateName: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/setPreStateName', {
        meta: { eventId },
        data: this.state
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
    }

    .block {
      width: 100%;
      height: 100%;
      display: inline-block;
    }

    .text {
      font-family: 'Play', sans-serif;
      font-size: 50px;
      align-items: center;
      text-align: center;
    }

    .part {
        width: 500px;
        height: auto;
        text-align: left;
        margin-left: 60px;
        font-size: 28px;
        line-height: 60px;
        color: #3E0E14;
        margin-top: 0;
    }

    .btn {
        font-size: 26px;
        &_next {
            width: 300px;
            height: 70px;
            font-size: 26px;
            font-weight: 700;
            margin-top: 30px;
        }
    }
  }
}
</style>
