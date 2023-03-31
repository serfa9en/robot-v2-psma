<template>
    <div v-if="showComponent" class="settings">
        <div class="content" v-if="this.step === null">
            <div class="text">
                <p>Комплексное обследование</p>
            </div>
            <div class="container">
                <div class="block">
                    <p class="part">
                        Описание обследование, что будет происходить и т.д.
                    </p>
                </div>
                <div class="block">
                    <img class="img_main" src="../../../assets/img/measurement/Clinical_exam.png">
                </div>
            </div>
            <button class="btn-dark-grad btn_next" v-on:click="toNext">Пройти<br>обследование</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'examination',
  data () {
    return {
      step: null,
      examination: null
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('ui', [
      'getStepExamination'
    ]),
    ...mapGetters('engine', [
      'getPreStateName'
    ]),
    showComponent () {
      if (this.getStep === 'examination') {
        if (this.getStepExamination > 0) {
          this.toNext()
        }
        this.loggingCurrentStateName()
        this.step = this.getStepExamination
        this.examination = this.getMeasurement(this.getStepExamination)
        console.log('this.step = ', this.step)
        console.log('this.stepExam = ', this.getStepExamination)
      }
      return this.getStep === 'examination'
    }
  },
  methods: {
    loggingCurrentStateName: function () {
      console.log('this.getPreStateName = ', this.getPreStateName)
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      if (this.getPreStateName === 'RESULT') {
        console.log('loggingCurrentStateName = EXAMINATION => RESULT')
        let ex = this.getStepExamination + 1
        // actions.push({ 'name': 'ui/setStepExamination', 'options': ex, 'timeout': 0 })
        this.$store.dispatch('ui/setStepExamination', {
          meta: { eventId },
          data: ex
        })
      }
      console.log('this.stepExam2 = ', this.getStepExamination)
      // let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/setPreStateName', {
        meta: { eventId },
        data: 'EXAMINATION'
      })
    },
    getMeasurement: function (val) {
      if (val === null) return 4 // сатурация
      if (val === 1) return 2 // глюкоза
      if (val === 2) return 5 // давление
      // if (val === 4) return 61 // температура
      if (val === 3) return 3 // рост/вес
    },
    toNext: function () {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      let actions = []
      // console.log(this.examination)
      actions.push({ 'name': 'ui/setCurMeasurementNumber', 'options': this.examination, 'timeout': 0 })
      actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': true, 'timeout': 0 })
      actions.push({ 'name': 'ui/setMeasurementStep', 'options': 1, 'timeout': 0 })
      actions.push({ 'name': 'ui/setMeasurementNum', 'options': this.examination, 'timeout': 0 }) // измерение
      actions.push({ 'name': 'ui/setFlagExamination', 'options': true, 'timeout': 0 })
      actions.forEach(item => {
        setTimeout(() => {
          this.$store.dispatch(item.name, { meta: { eventId }, data: item.options })
        }, item.timeout)
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
      // margin: 30px;
      margin-bottom: 15px;
    }

    .block {
      width: 100%;
      height: auto;
      display: inline-block;
      text-align: center;
    }

    .text {
      font-family: 'Play', sans-serif;
      font-size: 50px;
      align-items: center;
      text-align: center;
      margin-top: -40px;
    }

    .part {
        width: 770px;
        height: auto;
        text-align: left;
        margin-left: 60px;
        font-size: 28px;
        line-height: 60px;
        color: #3E0E14;
        margin-top: 0;
    }
    .btn {
        width: 230px;
        height: 60px;
        font-size: 26px;
        font-weight: 700;
        padding: 10px;
        margin: 15px;

        &_next {
            width: 300px;
            height: 70px;
            font-size: 26px;
            font-weight: 700;
            margin-top: 30px;
        }
    }

    .img_main {
      width: auto;
      height: 100%;
    }

  }
}
</style>
