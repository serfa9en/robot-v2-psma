<template>
    <div v-show="showComponent" class="settings">
        <p class="text">Пройти отдельное обследование</p>
        <button class="btn-dark-main" :style=setColorPressure>
          <div class="block">
            <div class="icon-box">
               <img src="../../../assets/img/diagnostic/blood-pressure.png" class="icon line">
            </div>
            <p class="line_data-res" v-if="flagPressure">{{ this.dataPresure }}</p>
          </div>
          <p>Артериальное давление <br> и пульс</p>
        </button>

        <button class="btn-dark-main" v-on:click="toHeigth" :style="setColorWeightHeight">
          <div class="block">
            <div class="icon-box">
              <img src="../../../assets/img/diagnostic/union.png" class="icon">
            </div>
            <p class="line_data-res" v-if="flagWeightHeight">{{ this.dataWeightHeight }}</p>
          </div>
          <p>Рост и вес</p>
        </button>

        <button class="btn-dark-main" :style="setColorTemperature">
          <div class="block">
            <div class="icon-box">
              <img src="../../../assets/img/diagnostic/temperature.png" class="icon">
            </div>
            <p class="line_data-res" v-if="flagTemperature">{{ this.dataTemperature }}</p>
          </div>
            <p>Температура тела</p>
        </button>

        <button class="btn-dark-main" :style="setColorSaturatsiya">
          <div class="block">
            <div class="icon-box">
              <img src="../../../assets/img/diagnostic/oxygen.png" class="icon">
            </div>
            <p class="line_data-res" v-if="flagSaturatsiya">{{ this.dataSaturatsiya }}</p>
          </div>
            <p>Насыщение крови кислородом<br>(сатурация)</p>
        </button>

        <button class="btn-dark-main" :style="setColorGlucometry">
          <div class="block">
            <div class="icon-box">
              <img src="../../../assets/img/diagnostic/gluco.png" class="icon">
            </div>
            <p class="line_data-res" v-if="flagGlucometry">{{ this.dataGlucometry }}</p>
          </div>
            <p>Глюкоза крови</p>
        </button>

        <button class="btn-dark-main" :style="setColorSpirographia">
          <div class="block">
            <div class="icon-box">
              <img src="../../../assets/img/diagnostic/spirometr.png" class="icon">
            </div>
            <p class="line_data-res" v-if="flagSpirographia">{{ this.dataSpirographia }}</p>
          </div>
            <p>Функция легких<br>(спирометрия)</p>
        </button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'diagnostic_start',
  data () {
    return {
      st: null,
      flagPressure: false,
      flagGlucometry: false,
      flagTemperature: false,
      flagSaturatsiya: false,
      flagSpirographia: false,
      flagWeightHeight: false,

      dataPressure: null,
      dataGlucometry: null,
      dataTemperature: null,
      dataSaturatsiya: null,
      dataSpirographia: null,
      dataWeightHeight: null
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('ui', [
      'getButtonPressureColor',
      'getButtonGlucometry',
      'getButtonTemperature',
      'getButtonSaturatsiya',
      'getButtonSpirographia',
      'getButtonWeightHeight',
      'getMeasurementPressure',
      'getMeasurementGlucometry',
      'getMeasurementTemperature',
      'getMeasurementSaturatsiya',
      'getMeasurementSpirographia',
      'getMeasurementWeightHeight'
    ]),
    showComponent () {
      if (this.getStep === 'diagnostic_start') {
        this.loggingCurrentStateName()
        if (this.getMeasurementPressure != null) {
          // данные есть - отрисовываем элементы кнопки с результатом
          this.flagPressure = true
          this.dataPresure = this.getMeasurementPressure
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
        if (this.getMeasurementWeightHeight != null) {
          // данные есть
          this.flagWeightHeight = true
          this.dataWeightHeight = this.getMeasurementWeightHeight
        }
      }
      return this.getStep === 'diagnostic_start'
    },
    setColorPressure () {
      this.st = this.getButtonPressureColor
      return { 'background-color': this.st }
    },
    setColorWeightHeight () {
      this.st = this.getButtonWeightHeightColor
      return { 'background-color': this.st }
    },
    setColorTemperature () {
      this.st = this.getButtonTemperatureColor
      return { 'background-color': this.st }
    },
    setColorSaturatsiya () {
      this.st = this.getButtonSaturatsiyaColor
      return { 'background-color': this.st }
    },
    setColorGlucometry () {
      this.st = this.getButtonGlucometryColor
      return { 'background-color': this.st }
    },
    setColorSpirographia () {
      this.st = this.getButtonSpirographiaColor
      return { 'background-color': this.st }
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
        data: 'WIDTHHEIGHT'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.settings {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: absolute;
    text-align: center;
    bottom: 0;
}

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
    margin-top: 50px;
}

.icon {
    width: 75px;
    height: auto;
    margin-top: 20px;
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
  &_data-res {
    width: 200%;
    height: 60%;
    font-size: 50px;
    font-weight: 700;
  }
}
</style>
