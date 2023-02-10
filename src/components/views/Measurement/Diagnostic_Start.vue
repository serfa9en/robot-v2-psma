<template>
    <div v-show="showComponent" class="settings">
        <p class="text">Пройти отдельное обследование</p>
        <button class="btn-dark-main" :style=setColorPressure>
            <img src="../../../assets/img/diagnostic/blood-pressure.png" class="icon line">
            <p class="line">Ghbdtn</p>
            <p class="line">Артериальное давление <br> и пульс</p>
        </button>

        <button class="btn-dark-main" v-on:click="toHeigth" :style="setColorWeightHeight">
            <img src="../../../assets/img/diagnostic/union.png" class="icon">
            <p>Рост и вес</p>
        </button>
        <button class="btn-dark-main" :style="setColorTemperature">
            <img src="../../../assets/img/diagnostic/temperature.png" class="icon">
            <p>Температура тела</p>
        </button>
        <button class="btn-dark-main" :style="setColorSaturatsiya">
            <img src="../../../assets/img/diagnostic/oxygen.png" class="icon">
            <p>Насыщение крови кислородом<br>(сатурация)</p>
        </button>
        <button class="btn-dark-main" :style="setColorGlucometry">
            <img src="../../../assets/img/diagnostic/gluco.png" class="icon">
            <p>Глюкоза крови</p>
        </button>
        <button class="btn-dark-main" :style="setColorSpirographia">
            <img src="../../../assets/img/diagnostic/spirometr.png" class="icon">
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
      flagWeightHeight: false
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
        if (this.getMeasurementWeightHeight != null) {
          // данные есть
          this.flagWeightHeight = true
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
    }
  }
}
</script>

<style scoped>
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
    height: 2.5em;
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
    margin-top: 25px;
    width: 75px;
    height: auto;
}

.line {
  display: inline-block;

}
</style>
