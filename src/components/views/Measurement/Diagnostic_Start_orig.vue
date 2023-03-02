<template>
    <div v-show="showComponent" class="settings">
      <div class="content">
        <p class="text">Пройти отдельное обследование</p>
        <button class="btn-dark-main" :style="[{ 'background-color': `${ getButtonPressureColor }` }]" v-on:click="toDiagnostic">
          <div class="block">
            <div class="line icon-box">
               <img src="../../../assets/img/diagnostic/blood-pressure.png" class="icon">
            </div>
            <div class="line_data-res block" v-if="flagPressure">
              <div class="data">
                <p class="data_text">Давление</p>
                <p class="data_res">{{ this.dataPressure }}</p>
              </div>
              <div class="data">
                <p class="data_text">Пульс</p>
                <p class="data_res">{{ this.dataPulse }}</p>
              </div>
            </div>
          </div>
          <p>Артериальное давление <br> и пульс</p>
        </button>

        <button class="btn-dark-main" v-on:click="toHeigth" :style="[{ 'background-color': `${ getButtonWeightHeightColor }` }]">
          <div class="block">
            <div class="line icon-box">
              <img src="../../../assets/img/diagnostic/union.png" class="icon">
            </div>
            <div class="line_data-res block" v-if="flagWeightHeight">
              <div class="data">
                <p class="data_text">ИМТ</p>
                <p class="data_res">{{ this.dataImt }}</p>
              </div>
              <div class="data">
                <p class="data_text_imt">Рост</p>
                <p class="data_res_imt">{{ this.dataHeight }}</p>
              </div>
              <div class="data">
                <p class="data_text_imt">Вес</p>
                <p class="data_res_imt">{{ this.dataWeight }}</p>
              </div>
            </div>
          </div>
          <br>
          <p>Рост и вес</p>
        </button>

        <button class="btn-dark-main" :style="[{ 'background-color': `${ getButtonTemperatureColor }` }]" v-on:click="toDiagnostic">
          <div class="block">
            <div class="line icon-box">
              <img src="../../../assets/img/diagnostic/temperature.png" class="icon">
            </div>
            <div class="line_data-res" v-if="flagTemperature">
              <div class="data">
                <br>
                <p class="data_res">{{ this.dataTemperature }}</p>
              </div>
            </div>
          </div>
          <br>
          <p>Температура тела</p>
        </button>

        <button class="btn-dark-main" :style="[{ 'background-color': `${ getButtonSaturatsiyaColor }` }]" v-on:click="toDiagnostic">
          <div class="block">
            <div class="line icon-box">
              <img src="../../../assets/img/diagnostic/oxygen.png" class="icon">
            </div>
            <div class="line_data-res" v-if="flagSaturatsiya">
              <div class="data">
                <br>
                <p class="data_res">{{ this.dataSaturatsiya }}</p>
              </div>
            </div>
          </div>
          <p>Насыщение крови кислородом<br>(сатурация)</p>
        </button>

        <button class="btn-dark-main" :style="[{ 'background-color': `${ getButtonGlucometryColor }` }]" v-on:click="toDiagnostic">
          <div class="block">
            <div class="line icon-box">
              <img src="../../../assets/img/diagnostic/gluco.png" class="icon">
            </div>
            <div class="line_data-res" v-if="flagGlucometry">
              <div class="data">
                <p class="data_res">{{ this.dataGlucometry }}</p>
                <p class="data_text">ммоль/л</p>
              </div>
            </div>
          </div>
          <br>
          <p>Глюкоза крови</p>
        </button>

        <button class="btn-dark-main" :style="[{ 'background-color': `${ getButtonSpirographiaColor }` }]" disabled>
          <div class="block">
            <div class="line icon-box">
              <img src="../../../assets/img/diagnostic/spirometr.png" class="icon">
            </div>
            <p class="line_data-res" v-if="flagSpirographia">{{ this.dataSpirographia }}</p>
          </div>
          <p>Функция легких<br>(спирометрия)</p>
        </button>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'diagnostic_start',
  data () {
    return {
      flagPressure: false,
      flagGlucometry: false,
      flagTemperature: false,
      flagSaturatsiya: false,
      flagSpirographia: false,
      flagWeightHeight: false,

      dataPressure: null,
      dataPulse: null,
      dataGlucometry: null,
      dataTemperature: null,
      dataSaturatsiya: null,
      dataSpirographia: null,
      dataWeight: null,
      dataHeight: null,
      dataImt: null
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('ui', [
      'getButtonPressureColor',
      'getButtonGlucometryColor',
      'getButtonTemperatureColor',
      'getButtonSaturatsiyaColor',
      'getButtonSpirographiaColor',
      'getButtonWeightHeightColor',
      'getMeasurementPressure',
      'getMeasurementPulse',
      'getMeasurementGlucometry',
      'getMeasurementTemperature',
      'getMeasurementSaturatsiya',
      'getMeasurementSpirographia',
      'getMeasurementWeight',
      'getMeasurementHeight',
      'getMeasurementImt'
    ]),
    showComponent () {
      if (this.getStep === 'diagnostic_start') {
        this.loggingCurrentStateName()

        if (this.getMeasurementPressure != null) {
          // данные есть - отрисовываем элементы кнопки с результатом
          this.flagPressure = true
          this.dataPressure = this.getMeasurementPressure
          this.dataPulse = this.getMeasurementPulse
        }
        if (this.getMeasurementGlucometry != null) {
          // данные есть
          this.flagGlucometry = true
          this.dataGlucometry = this.getMeasurementGlucometry
        }
        if (this.getMeasurementTemperature != null) {
          // данные есть
          this.flagTemperature = true
          this.dataTemperature = this.getMeasurementTemperature
        }
        if (this.getMeasurementSaturatsiya != null) {
          // данные есть
          this.flagSaturatsiya = true
          this.dataSaturatsiya = this.getMeasurementSaturatsiya
        }
        if (this.getMeasurementSpirographia != null) {
          // данные есть
          this.flagSpirographia = true
          this.dataSpirographia = this.getMeasurementSpirographia
        }
        if (this.getMeasurementImt != null) {
          // данные есть
          this.flagWeightHeight = true
          this.dataWeight = this.getMeasurementWeight
          this.dataHeight = this.getMeasurementHeight
          this.dataImt = this.getMeasurementImt
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
    loggingCurrentStateName: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/setPreStateName', {
        meta: { eventId },
        data: 'DIAGNOSTIC_START'
      })
    },
    toHeigth: function () {
      // рост/вес
      // const el = document.querySelector('color_middle')
      // console.log(styles.background)
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'WIDTH_HEIGHT'
      })
    },
    toDiagnostic: function () {
      // измерения
    }
  }
}
</script>

<style scoped lang="scss">
.settings {
    width: 100%;
    height: 100%;

    .content {
      position: absolute;
      width: 100%;
      height: 100%;
      text-align: center;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      bottom: 0;

      button {
        width: 380px;
        height: 200px;
        margin: 10px;
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
          margin-top: 120px;
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
        }
      }
    }
}
</style>
