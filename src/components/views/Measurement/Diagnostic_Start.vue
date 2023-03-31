<template>
  <div class="container-promo" v-if="showComponent">
    <div class="content_block">
      <p class="text">Пройти отдельное обследование</p>
      <div class="mainStartBlock" :data-type="getLoadAppSettings.tiles.filter(item => item.active === 1).length">
        <div :key="index" v-for="(tile, index) in getLoadAppSettings.tiles.filter(item => item.active === 1)">

          <button
                v-if="tile.type === EXAMINATION_TYPE.TONOMETER"
                @click="doExamination(EXAMINATION_TYPE.TONOMETER)"
                class="btn-dark-main"
                :style="[{ 'background-color': `${ getButtonPressureColor }` }]">

                <div class="block">
                  <div class="line icon-box">
                    <img src="../../../assets/img/diagnostic/blood-pressure.png" class="icon">
                  </div>
                  <div class="line_data-res block" v-if="flagPressure">
                    <div class="data">
                      <p class="data_text">Давление</p>
                      <p class="data_res">{{ fRound(getMeasurementPressure, 0) }}/{{ fRound(getMeasurementPressureLow, 0) }}</p>
                    </div>
                    <div class="data">
                      <p class="data_text">Пульс</p>
                      <p class="data_res">{{ fRound(getMeasurementPulse, 0) }}</p>
                    </div>
                  </div>
                </div>
                <p>Артериальное давление <br> и пульс</p>
              </button>

              <button
                v-if="tile.type === EXAMINATION_TYPE.WEIGHT_HEIGHT"
                v-on:click="toImt()"
                class="btn-dark-main"
                :style="[{ 'background-color': `${ getButtonWeightHeightColor }` }]">

                <div class="block">
                  <div class="line icon-box">
                    <img src="../../../assets/img/diagnostic/union.png" class="icon">
                  </div>
                  <div class="line_data-res block" v-if="flagWeightHeight">
                    <div class="data">
                      <p class="data_text">ИМТ</p>
                      <p class="data_res">{{ fRound(getMeasurementImt, 0) }}</p>
                    </div>
                    <div class="data">
                      <p class="data_text_imt">Рост</p>
                      <p class="data_res_imt">{{ fRound(getMeasurementHeight, 0) }}</p>
                    </div>
                    <div class="data">
                      <p class="data_text_imt">Вес</p>
                      <p class="data_res_imt">{{ fRound(getMeasurementWeight, 1) }}</p>
                    </div>
                  </div>
                </div>
                <br>
                <p>Рост и вес</p>
              </button>

              <button
                v-if="tile.type === EXAMINATION_TYPE.THERMO"
                @click="doExamination(EXAMINATION_TYPE.THERMO_HEAD)"
                class="btn-dark-main"
                :style="[{ 'background-color': `${ getButtonTemperatureColor }` }]">

                <div class="block">
                  <div class="line icon-box">
                    <img src="../../../assets/img/diagnostic/temperature.png" class="icon">
                  </div>
                  <div class="line_data-res" v-if="flagTemperature">
                    <div class="data">
                      <br>
                      <p class="data_res">{{ fRound(getMeasurementTemperature, 1) }}</p>
                    </div>
                  </div>
                </div>
                <br>
                <p>Температура тела</p>
              </button>
          <button
            v-if="tile.type === EXAMINATION_TYPE.PULSEOXIMETER_SPIROMETER"
            @click="doExamination(EXAMINATION_TYPE.PULSEOXIMETER_SPIROMETER)"
            class="btn-dark-main"
            :style="[{ 'background-color': `${ getButtonSaturatsiyaColor }` }]">

            <div class="block">
              <div class="line icon-box">
                <img src="../../../assets/img/diagnostic/oxygen.png" class="icon">
              </div>
              <div class="line_data-res" v-if="flagSaturatsiya">
                <div class="data">
                  <br>
                  <div class="data_res">{{ fRound(getMeasurementSaturatsiya, 0) }}<div class="per">%</div>
                  </div>
                  <!--<p class="data_text">%</p>-->
                </div>
              </div>
            </div>
            <p>Насыщение крови кислородом<br>(сатурация)</p>
          </button>

          <button
            v-if="tile.type === EXAMINATION_TYPE.GLUCOMETER"
            @click="doExamination(EXAMINATION_TYPE.GLUCOMETER)"
            class="btn-dark-main"
            :style="[{ 'background-color': `${ getButtonGlucometryColor }` }]">

            <div class="block">
              <div class="line icon-box">
                <img src="../../../assets/img/diagnostic/gluco.png" class="icon">
              </div>
              <div class="line_data-res" v-if="flagGlucometry">
                <div class="data">
                  <p class="data_res">{{ fRound(getMeasurementGlucometry, 1) }}</p>
                  <p class="data_text">ммоль/л</p>
                </div>
              </div>
            </div>
            <br>
            <p>Глюкоза крови</p>
          </button>

          <button disabled
            v-if="tile.type === EXAMINATION_TYPE.SPIROG"
            class="btn-dark-main">

            <div class="block">
              <div class="line icon-box">
                <img src="../../../assets/img/diagnostic/spirometr.png" class="icon">
              </div>
              <p class="line_data-res" v-if="flagSpirographia">{{ fRound(getMeasurementSpirographia, 1) }}</p>
            </div>
            <p>Функция легких<br>(спирометрия)</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */
import { mapGetters, mapActions } from 'vuex'
import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'
// import { getSpirigraphiaData, getSpirigraphiaDataCompare } from '@/utils'
import { EXAMINATION_TYPE, TOPIC_DATA } from '@/constants'
// import settings from '@/settings'
const uuidv4 = require('uuid/v4')

export default {
  name: 'diagnostic_start',
  data () {
    return {
      step: null,
      EXAMINATION_TYPE,
      TOPIC_DATA,
      flagPressure: false,
      flagGlucometry: false,
      flagTemperature: false,
      flagSaturatsiya: false,
      flagSpirographia: false,
      flagWeightHeight: false
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep',
      'getLoadAppSettings'
    ]),
    ...mapGetters('ui', [
      'getButtonPressureColor',
      'getButtonGlucometryColor',
      'getButtonTemperatureColor',
      'getButtonSaturatsiyaColor',
      'getButtonSpirographiaColor',
      'getButtonWeightHeightColor',
      'getSubtitlesEnabled',
      'getUserAge',
      'getUserGender',
      'getMeasurementWeight',
      'getMeasurementHeight',
      'getMeasurementImt',
      'getMeasurementPressure',
      'getMeasurementPressureLow',
      'getHeaderEnabled',
      'getFooterEnabled',

      'getMeasurementGlucometry',
      'getMeasurementSpirographia',
      'getMeasurementSaturatsiya',
      'getMeasurementPulse',
      'getMeasurementTemperature'
    ]),
    ...mapGetters('faces', [
      'getUserGeneral'
    ]),
    ...mapGetters('engine', [
      'getCurrentStateName'
    ]),
    ...mapGetters('robot', [
      'getFaceRecognizeInfo',
      'getUserGet'
    ]),
    showComponent () {
      if (this.getStep === 'diagnostic_start') {
        // console.warn('DIAGNISTIC START LOADING...')
        // console.log('result_temp = ', this.getMeasurementTemperature)
        this.loggingCurrentStateName()
        if (this.getMeasurementPressure != null) {
          // данные есть - отрисовываем элементы кнопки с результатом
          this.flagPressure = true
        }
        if (this.getMeasurementGlucometry != null) {
          // данные есть
          this.flagGlucometry = true
        }
        if (this.getMeasurementTemperature != null) {
          // данные есть
          this.flagTemperature = true
        }
        if (this.getMeasurementSaturatsiya != null) {
          // данные есть
          this.flagSaturatsiya = true
        }
        if (this.getMeasurementSpirographia != null) {
          // данные есть
          this.flagSpirographia = true
        }
        if (this.getMeasurementImt != null) {
          // данные есть
          this.flagWeightHeight = true
        }
      }
      return this.getStep === 'diagnostic_start'
    },
    setColorPressure () {
      return { 'background-color': this.getButtonPressureColor }
    },
    setColorWeightHeight () {
      return { 'background-color': this.getButtonWeightHeightColor }
    },
    setColorTemperature () {
      return { 'background-color': this.getButtonTemperatureColor }
    },
    setColorSaturatsiya () {
      return { 'background-color': this.getButtonSaturatsiyaColor }
    },
    setColorGlucometry () {
      return { 'background-color': this.getButtonGlucometryColor }
    },
    setColorSpirographia () {
      return { 'background-color': this.getButtonSpirographiaColor }
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
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/setPreStateName', {
        meta: { eventId },
        data: 'DIAGNOSTIC_START'
      })
    },
    fRound: function (data, num) {
      return (data === null) ? '' : String(Number(data).toFixed(num)).replace('.', ',')
    },
    toImt: function () {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'WIDTH_HEIGHT'
        // data: 'MEASUREMENT'
        // data: 'RESULT'
      })
    },
    doExamination: function (examination) {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      let actions = []
      actions.push({ 'name': 'ui/setCurMeasurementNumber', 'options': examination, 'timeout': 0 })
      // console.log('exam = ', examination)
      if (examination === EXAMINATION_TYPE.THERMO_HEAD) {
        // console.log('Examonation == ', examination)
        const options = {
          replica: {
            id: {
              uuid: uuidv4()
            },
            actions: 'app:org.promobot.termo',
            text: '"',
            type: 21
          },
          terminate: true
        }
        const thermoRequest = { userId: this.getUserGeneral.id }
        // console.log(thermoRequest)
        localStorage.setItem('tempSettings', JSON.stringify(thermoRequest))
        // console.log(localStorage)
        actions.push({ 'name': 'robot/dialogSayReplicByDataRequest', 'options': options, 'timeout': 0 })
        actions.push({ 'name': 'ui/setMeasurementStep', 'options': 1, 'timeout': 0 })
        actions.push({ 'name': 'ui/setMeasurementNum', 'options': 6, 'timeout': 0 })
      } else {
        let step = 1
        actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': true, 'timeout': 0 })
        actions.push({ 'name': 'ui/setMeasurementStep', 'options': step, 'timeout': 0 })
        actions.push({ 'name': 'ui/setMeasurementNum', 'options': examination, 'timeout': 0 })
      }
      actions.push({ 'name': 'ui/setFlagConsultation', 'options': false, 'timeout': 0 })
      actions.forEach(item => {
        setTimeout(() => {
          this.$store.dispatch(item.name, { meta: { eventId }, data: item.options })
        }, item.timeout)
      })
    },
    calculateResults () {
    }
  }
}
</script>

<style lang="scss" scoped>

.container-promo {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
  padding: 80px 0 105px;
  box-sizing: border-box;
  > div {
    flex: 1 1 100%;
  }
   p {
          width: 100%;
          font-weight: 500;
          font-size: 22px;
          display: flex;
          flex-flow: wrap row;
          justify-content: center;
          align-content: center;
  }
  .text {
          font-weight: 700;
          font-size: 30px;
      }
      .icon {
          width: 75px;
          height: auto;
      }

      .block {
        width: 100%;
        height: 60%;
        display: flex;
        justify-content: center;
      }

      .icon-box {
        width: 100%;
        height: 60%;
      }
      .line {
        display: inline-block;
        margin-top: 40px;
        &_data-res {
          width: 200%;
          height: 60%;
          margin-top: 40px;
        }
      }
      .per {
        font-size: 20px;
        display: inline-flex;
      }

      .data {
        margin-right: 20px;
        &_text {
          font-size: 24px;
          margin: 0;

          &_imt {
            font-size: 20px;
            margin: 5px 0 0 0;
          }
        }

        &_res {
          font-size: 40px;
          font-weight: 700;
          margin: 0;
          &_imt {
            font-size: 30px;
            font-weight: 700;
            margin-top: 10px;
          }
          &_min{
            display: inline-block;
            font-size: 20px;
            font-weight: 700;
            margin: 0;
          }
        }
      }
  .mainStartBlock {
    height: 100%;
    button {
      width: 380px;
      height: 200px;
      margin: 10px;
    }
    > div {
      width: 380px;
      height: 200px;
      margin: 5px;
      display: inline-block;
      vertical-align: middle;
      box-sizing: border-box;
      > div {
        display: inline-block;
        padding: 0 15px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border: 2px solid blue;
      }
    }
  }
}

</style>
