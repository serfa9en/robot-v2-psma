<template>
    <div v-if="showComponent" class="settings">
      <h1 class="text">Спасибо за прохождение комплексного обследования!</h1>
      <div class="block">
        <div class="card" v-on:click="getResult(0)">
          <p class="text">Давление</p>
          <div class="block_card">
            <img :src=itemImageResultPressure class="img-box">
            <p class="text text_data">{{ this.pressure }}</p>
          </div>
        </div>
        <div class="card" v-on:click="getResult(0)">
          <p class="text">Пульс</p>
          <div class="block_card">
            <img :src=itemImageResultPulse class="img-box">
            <p class="text text_data">{{ this.puls }}</p>
          </div>
        </div>
        <div class="card_temp">
          <p class="text">Температура</p>
          <div class="block_card">
            <img :src=itemImageResultTempr class="img-box">
            <p class="text text_data">{{ this.temperature }}</p>
          </div>
        </div>
        <div class="card" v-on:click="getResult(2)">
          <p class="text">Сатурация</p>
          <div class="block_card">
            <img :src=itemImageResultSaturat class="img-box">
            <p class="text text_data">{{ this.saturat }}</p>
          </div>
        </div>
      </div>

      <div class="block">
        <div class="card" v-on:click="getResult(3)">
          <p class="text">Глюкоза</p>
          <div class="block_card">
            <img :src=itemImageResultGluco class="img-box">
            <p class="text text_data">{{ this.gluco }}</p>
          </div>
        </div>
        <div class="card" v-on:click="getResult(4)">
          <p class="text">Рост</p>
          <div class="block_card">
            <img src="../../../assets/img/measurement/height.png" class="img-box">
            <p class="text text_data">{{ this.rost }}</p>
          </div>
        </div>
        <div class="card" v-on:click="getResult(4)">
          <p class="text">Вес</p>
          <div class="block_card">
            <img src="../../../assets/img/measurement/weight-scale.png" class="img-box">
            <p class="text text_data">{{ this.ves }}</p>
          </div>
        </div>
        <div class="card" v-on:click="getResult(4)">
          <p class="text">ИМТ</p>
          <div class="block_card">
            <img :src=itemImageResultImt class="img-box">
            <p class="text text_data">{{ this.imt }}</p>
          </div>
        </div>
      </div>
      <div class="buttonBox">
          <button class="btn-yes-no" v-on:click="printTalon">Получить <br> результаты</button>
          <!--<button class="btn-dark-grad">Получить <br> рекомендации</button>-->
          <button class="btn-dark-grad" v-on:click="continueWork">Продолжить <br> обследование</button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'
import { EXAMINATION_TYPE } from '@/constants'
import * as settingsRes from '../../styled/setColorButtons'

export default {
  name: 'exam_result',
  data () {
    return {
      EXAMINATION_TYPE,
      pressure: null,
      puls: null,
      temperature: null,
      saturat: null,
      gluco: null,
      rost: null,
      ves: null,
      imt: null,

      iconPressure: null,
      iconPuls: null,
      iconTemperature: null,
      iconSaturat: null,
      iconGluco: null,
      iconRost: null,
      iconVes: null,
      iconImt: null,
      templatePath: 'talon-template.html'
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('ui', [
      'getReaultPressure', // давление
      'getReaultPulse', // пульс
      'getReaultGlucometry', // глюкоза
      'getReaultTemperature', // температура
      'getReaultSaturatsiya', // сатурация
      'getReaultImt', // имт

      'getMeasurementGlucometry',
      'getMeasurementPressure',
      'getMeasurementPressureLow',
      'getMeasurementPulse',
      'getMeasurementSaturatsiya',
      'getMeasurementWeight',
      'getMeasurementHeight',
      'getMeasurementImt',
      'getMeasurementTemperature'
    ]),
    showComponent () {
      if (this.$store.getters['app/getStep'] === 'exam_result') {
        this.pressure = this.getMeasurementPressure + '/' + this.getMeasurementPressureLow
        this.puls = this.getMeasurementPulse
        this.temperature = this.getMeasurementTemperature
        this.saturat = this.getMeasurementSaturatsiya
        this.gluco = this.getMeasurementGlucometry
        this.rost = this.getMeasurementHeight
        this.ves = this.getMeasurementWeight
        this.imt = this.getMeasurementImt

        this.iconPressure = this.getReaultPressure
        this.iconPuls = this.getReaultPulse
        this.iconTemperature = this.getReaultTemperature
        this.iconSaturat = this.getReaultSaturatsiya
        this.iconGluco = this.getReaultGlucometry
        this.iconImt = this.getReaultImt
      }
      return this.$store.getters['app/getStep'] === 'exam_result'
    },
    itemImageResultPressure () {
      return require(`../../../assets/img/measurement/result/${this.iconPressure}`)
    },
    itemImageResultPulse () {
      return require(`../../../assets/img/measurement/result/${this.iconPuls}`)
    },
    itemImageResultTemp () {
      return require(`../../../assets/img/measurement/result/${this.iconTemperature}`)
    },
    itemImageResultSaturat () {
      return require(`../../../assets/img/measurement/result/${this.iconSaturat}`)
    },
    itemImageResultGluco () {
      return require(`../../../assets/img/measurement/result/${this.iconGluco}`)
    },
    itemImageResultImt () {
      return require(`../../../assets/img/measurement/result/${this.iconImt}`)
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
        data: 'EXAM_RESULT'
      })
    },
    getResult: function (val) {
      // 0 - давление/пульс
      // 1 - температура
      // 2 - сатурация
      // 3 - глюкоза
      // 4 - имт
      // console.log('val = ', val)
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      let actions = []
      actions.push({ 'name': 'ui/setFlagFullExamination', 'options': true, 'timeout': 0 })
      switch (val) {
        case 0: {
          actions.push({ 'name': 'ui/setCurMeasurementNumber', 'options': EXAMINATION_TYPE.TONOMETER, 'timeout': 0 })
          actions.push({ 'name': 'ui/setNorm', 'options': settingsRes.setNormPressure(this.getMeasurementPressure, this.getMeasurementPulse), 'timeout': 0 })
          actions.push({ 'name': 'ui/setInfo', 'options': settingsRes.setInfoPressure(this.getMeasurementPressure, this.getMeasurementPulse), 'timeout': 0 })
          actions.push({ 'name': 'ui/setInfoAdd', 'options': settingsRes.setInfoAddPressure(this.getMeasurementPressure, this.getMeasurementPulse), 'timeout': 0 })
          break
        }
        case 2: {
          actions.push({ 'name': 'ui/setCurMeasurementNumber', 'options': EXAMINATION_TYPE.PULSEOXIMETER_SPIROMETER, 'timeout': 0 })
          actions.push({ 'name': 'ui/setNorm', 'options': settingsRes.setNormSaturatsiya(this.saturat), 'timeout': 0 })
          actions.push({ 'name': 'ui/setInfo', 'options': settingsRes.setInfoSaturatsiya(this.saturat), 'timeout': 0 })
          actions.push({ 'name': 'ui/setInfoAdd', 'options': settingsRes.setInfoAddSaturatsiya(this.saturat), 'timeout': 0 })
          break
        }
        case 3: {
          actions.push({ 'name': 'ui/setCurMeasurementNumber', 'options': EXAMINATION_TYPE.GLUCOMETER, 'timeout': 0 })
          actions.push({ 'name': 'ui/setNorm', 'options': settingsRes.setNormGlucometry(this.gluco), 'timeout': 0 })
          actions.push({ 'name': 'ui/setInfo', 'options': settingsRes.setInfoGlucometry(this.gluco), 'timeout': 0 })
          actions.push({ 'name': 'ui/setInfoAdd', 'options': settingsRes.setInfoAddGlucometry(this.gluco), 'timeout': 0 })
          break
        }
        case 4: {
          actions.push({ 'name': 'ui/setCurMeasurementNumber', 'options': EXAMINATION_TYPE.WEIGHT_HEIGHT, 'timeout': 0 })
          actions.push({ 'name': 'ui/setNorm', 'options': settingsRes.setNormImt(this.imt), 'timeout': 0 })
          actions.push({ 'name': 'ui/setInfo', 'options': settingsRes.setInfoImt(this.imt), 'timeout': 0 })
          actions.push({ 'name': 'ui/setInfoAdd', 'options': settingsRes.setInfoAddImt(this.imt), 'timeout': 0 })
          break
        }
      }
      actions.push({ 'name': 'engine/handlerClickMoveToState', 'options': 'RESULT', 'timeout': 0 })
      actions.forEach(item => {
        setTimeout(() => {
          this.$store.dispatch(item.name, { meta: { eventId }, data: item.options })
        }, item.timeout)
      })
    },
    continueWork: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'MAIN_VIEW'
      })
    },
    printTalon: function () {
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

  .block {
    width: 100%;
    display: flex;
    justify-content: center;

    &_card {
      width: 100%;
      display: flex;
      justify-content: center;
      // border: 2px red solid;
    }
  }

  .card {
    width: 244px;
    height: 142px;
    background: #EAE8E8;
    border-radius: 10px;
    display: inline-block;
    margin: 25px 15px;
    cursor: pointer;
    &_temp {
      width: 244px;
      height: 142px;
      background: #EAE8E8;
      border-radius: 10px;
      display: inline-block;
      margin: 25px 15px;
      cursor: default;
    }
  }

  .card:hover {
    background: #D9D9D9;
  }

  .text {
    font-size: 22px;
    margin-top: 15px;
    &_data {
      font-size: 40px;
      margin: 0;
      font-weight: 700;
    }
  }

  button {
    width: 260px;
    height: 64px;
    font-size: 20px;
    font-weight: 700;
    margin: 20px;
  }

  img {
    width: 70px;
    height: 70px;
  }

  .img-box {
    margin-right: 20px;
    // justify-content: center;
  }

}
</style>
