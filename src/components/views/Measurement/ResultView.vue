<template>
    <div v-if="showComponent" class="settings">
      <!-- Вместо Title выводим фразу результата
        Пример: (У Вас значительно повышена температура тела) -->
        <h1 class="text">{{ this.title }}</h1>
        <div v-if="this.typeScreen === 0">
          <div class="block">
            <div class="box">
              <img :src=itemImageResult>
            </div>
            <div class="text_box">
              <p class="text text_res">{{ this.result }}</p>
              <p class="text text_add">{{ text_res }}</p>
            </div>
          </div>
        </div>

        <div v-if="this.typeScreen === 1">
          <div class="block">
            <div class="block">
              <div class="box">
                <img :src=itemImagePr>
              </div>
              <div class="text_box">
                <p class="text text_res">{{ this.result }}</p>
              </div>
            </div>
            <div class="block">
              <div class="box">
                <img :src=itemImagePulse>
              </div>
              <div class="text_box">
                <p class="text text_res">{{ this.pulse_res }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="this.typeScreen === 2">
          <div class="block">
            <div class="block">
              <div class="box">
                <img :src=itemImageResult>
              </div>
            </div>
            <div class="block">
              <div class="imt_box">
                <div class="text_box_imt">
                  <p class="text text_res_imt_add">Рост</p>
                </div>
                <div class="text_box_imt">
                  <p class="text text_res_imt">{{ this.imt_h }}</p>
                </div>
              </div>
              <div class="imt_box">
                <div class="text_box">
                  <p class="text text_res_imt_add">Вес</p>
                </div>
                <div class="text_box">
                  <p class="text text_res_imt">{{ this.imt_w }}</p>
                </div>
              </div>
              <div class="imt_box">
                <div class="text_box">
                  <p class="text text_res_imt_add">ИМТ</p>
                </div>
                <div class="text_box">
                  <p class="text text_res_imt">{{ this.imt_imt }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text colorBox" v-if="this.comment !== null">
          {{ this.comment }}
        </div>
        <div class="text colorBox_not" v-if="this.comment_add !== null">
          {{ this.comment_add }}
        </div>
        <div class="buttonBox" v-show="flagFullExam === false">
          <button class="btn-yes-no" v-if="this.flagCons === false || this.flagExam === false" v-on:click="getResultPrint">Получить <br> результаты</button>
          <button class="btn-dark-grad" v-on:click="continueWork">Продолжить обследование</button>
          <button class="btn-yes-no" v-on:click="repeatWork">Повторить <br> измерение</button>
        </div>
        <div v-show="flagFullExam">
          <button class="btn-dark-grad" v-on:click="returnView">Назад</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'result_view',
  data () {
    return {
      title: null,
      result: null,
      imt_h: null,
      imt_w: null,
      imt_imt: null,
      text_res: null,
      pulse_res: null,
      imgPath: null,
      imgPathPr: null,
      imgPathPulse: null,
      comment: null,
      comment_add: null,

      // 0 - температура, глюкоза, сатурация
      // 1 - давление
      // 2 - ИМТ
      // 3 - спирография
      typeScreen: null,
      flagCons: null,
      flagExam: null,
      templatePath: 'talon-template-dop.html'
      // flagFullExam: null
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('ui', [
      'getMeasurementNum',
      'getFlagConsultation',
      'getFlagExamination',
      'getFlagFullExamination',
      'getNorm',
      'getCurMeasurementNumber',
      'getMeasurementStep',
      'getInfo',
      'getInfoAdd',

      'getReaultPressure',
      'getReaultPulse',
      'getReaultGlucometry',
      'getReaultTemperature',
      'getReaultSaturatsiya',
      'getReaultImt',

      'getMeasurementGlucometry',
      'getMeasurementPressure',
      'getMeasurementPressureLow',
      'getMeasurementPulse',
      'getMeasurementSaturatsiya',
      'getMeasurementSpirographia',
      'getMeasurementWeight',
      'getMeasurementHeight',
      'getMeasurementImt',
      'getMeasurementTemperature'
    ]),
    ...mapGetters('robot', [
      'getFaceRecognizeGeneralId'
    ]),
    showComponent () {
      if (this.$store.getters['app/getStep'] === 'result_view') {
        this.flagCons = this.getFlagConsultation
        this.flagExam = this.getFlagExamination
        // this.flagFullExam = this.getFlagFullExamination
        // flagCons = true (если мы попали в комплексное обследование)
        // flagCons = false (если это отдельное измерение)
        console.log('getFlagConsultation = ', this.getFlagConsultation)
        console.log('getFlagFullExamination = ', this.flagFullExam)
        console.log('this.getMeasurementNum = ', this.getMeasurementNum)
        this.loggingCurrentStateName()
        console.log('getCurMeasurementNumber = ', this.getCurMeasurementNumber)
        if (this.getCurMeasurementNumber === 2) {
          // console.log('nvjks = ', this.getReaultGlucometry)
          this.result = this.getMeasurementGlucometry
          this.text_res = 'ммоль/л'
          this.imgPath = this.getReaultGlucometry
          this.comment = this.getInfo
          this.comment_add = this.getInfoAdd
          this.typeScreen = 0
        }
        if (this.getCurMeasurementNumber === 3) {
          // console.log('nvjks = ', this.getReaultImt)
          this.imt_h = this.getMeasurementHeight
          this.imt_w = this.getMeasurementWeight
          this.imt_imt = this.getMeasurementImt
          this.imgPath = this.getReaultImt
          this.comment = this.getInfo
          this.comment_add = this.getInfoAdd
          this.typeScreen = 2
        }
        if (this.getCurMeasurementNumber === 4) {
          console.log(this.getReaultSaturatsiya)
          this.result = this.getMeasurementSaturatsiya
          this.text_res = '%'
          this.imgPath = this.getReaultSaturatsiya
          this.comment = this.getInfo
          this.comment_add = this.getInfoAdd
          this.typeScreen = 0
        }
        if (this.getCurMeasurementNumber === 5) {
          this.result = this.getMeasurementPressure + '/' + this.getMeasurementPressureLow
          this.pulse_res = this.getMeasurementPulse
          this.imgPathPr = this.getReaultPressure
          this.imgPathPulse = this.getReaultPulse
          this.comment = this.getInfo
          this.comment_add = this.getInfoAdd
          console.log(this.imgPathPr)
          this.typeScreen = 1
        }
        if (this.getCurMeasurementNumber === 61) {
          this.result = this.getMeasurementTemperature
          this.imgPath = this.getReaultTemperature
          this.comment = this.getInfo
          this.comment_add = this.getInfoAdd
          this.typeScreen = 0
        }
        this.title = this.getNorm
      }
      return this.$store.getters['app/getStep'] === 'result_view'
    },
    flagFullExam () {
      if (this.getFlagFullExamination === true) return true
      else return false
    },
    itemImageResult () {
      console.log(this.imgPath)
      return require(`../../../assets/img/measurement/result/${this.imgPath}`)
    },
    itemImagePr () {
      return require(`../../../assets/img/measurement/result/${this.imgPathPr}`)
    },
    itemImagePulse () {
      return require(`../../../assets/img/measurement/result/${this.imgPathPulse}`)
    }
  },
  methods: {
    loggingCurrentStateName: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/setPreStateName', {
        meta: { eventId },
        data: 'RESULT'
      })
    },
    repeatWork: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      if (this.getCurMeasurementNumber === 3) {
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'WIDTH_HEIGHT'
        })
      } else {
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'MEASUREMENT_' + this.getCurMeasurementNumber + '_1'
        })
      }
    },
    continueWork: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      if (this.flagCons === true) {
        // консультация
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'SPECIALIST_QUEST'
        })
      } else {
        if (this.flagExam === true) {
          // комплексное обследование
          this.$store.dispatch('engine/handlerClickMoveToState', {
            meta: { eventId },
            data: 'EXAMINATION'
          })
        } else {
          // отдельное измерение
          this.$store.dispatch('engine/handlerClickMoveToState', {
            meta: { eventId },
            data: 'DIAGNOSTIC_START'
          })
        }
      }
    },
    returnView: function () {
      // let logger = PromobotLogger.getInstance()
      // console.log('vndfkjibn')
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'EXAM_RESULT'
      })
    },
    getResultPrint: function () {
      // получить результаты
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'PRINT_VIEW'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.settings {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  // border: #3E0E14 solid 2px;
  &__center {
    // height: 200px;
    // border: #3E0E14 solid 2px;
    margin-top: 50px;
    align-items: center;
    text-align: center;
  }
  .box {
    width: auto;
    height: 120px;
    display: flex;
    margin: 15px;
    // border: 2px solid red;
  }

  .block {
    width: 400px;
    height: 200px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin-right: 30px;
    // border: 2px solid red;
  }

  .text_box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    // border: 2px green solid;
  }
  .text {
    &_res {
      width: auto;
      height: auto;
      font-size: 60px;
      display: flex;
      margin: 0;
      margin-right: 15px;
      // border: 2px solid salmon;

      &_imt{
        width: auto;
        height: auto;
        font-size: 60px;
        // display: flex;
        margin: 0;

        &_add {
          font-size: 30px;
          margin: 0;
        }
      }
    }
    &_add {
      width: 200px;
      height: auto;
      font-size: 30px;
      display: flex;
      margin: 0;
      margin-top: 15px;
      // border: 2px solid firebrick;
    }
  }

  .imt_box {
    width: 200px;
    margin: 25px;
    // border: 2px solid rebeccapurple;
  }

  .colorBox {
    width: 850px;
    height: auto;
    background-color: #EAE8E8;
    font-size: 24px;
    padding: 15px;
    margin: 10px;
    margin-top: 15px;
    &_not {
      width: 840px;
      height: auto;
      font-size: 18px;
      margin: 10px;
    }
  }

  button {
    font-family: 'Play', sans-serif;
    width: 260px;
    height: 64px;
    font-size: 20px;
    font-weight: 700;
    margin: 20px;
  }
}

</style>
