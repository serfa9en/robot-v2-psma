<template>
    <div v-show="showComponent" class="settings">
      <div class="content">
        <div class="question text">
                <p class="quest_set">Вы страдаете сахарным диабетом?</p>
            </div>
            <div class="img-box">
                <img class="img-quest" src="../../assets/img/measurement/gluko.png">
            </div>
            <div class="yes-no">
                <button class="btn btn_yn btn-yes-no" v-on:click="next(1)">Да</button>
                <button class="btn btn_yn btn-yes-no" v-on:click="next(0)">Нет</button>
            </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'
import { EXAMINATION_TYPE } from '@/constants'

export default {
  name: 'question_gluko',
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    showComponent () {
      return this.getStep === 'question_gluko'
    }
  },
  methods: {
    next: function (val) {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      let actions = []
      if (val === 0) {
        // диабета нет
        /*
        this.$store.dispatch('ui/setIsDiabetes', {
          meta: { eventId },
          data: false
        })
        */
        actions.push({ 'name': 'ui/setIsDiabetes', 'options': false, 'timeout': 0 })
      } else {
        // диабет есть
        /*
        this.$store.dispatch('ui/setIsDiabetes', {
          meta: { eventId },
          data: true
        })
        */
        actions.push({ 'name': 'ui/setIsDiabetes', 'options': true, 'timeout': 0 })
      }
      actions.push({ 'name': 'ui/setCurMeasurementNumber', 'options': EXAMINATION_TYPE.GLUCOMETER, 'timeout': 0 })
      actions.push({ 'name': 'ui/setSpinnerEnabled', 'options': true, 'timeout': 0 })
      actions.push({ 'name': 'ui/setMeasurementStep', 'options': 1, 'timeout': 0 })
      actions.push({ 'name': 'ui/setMeasurementNum', 'options': EXAMINATION_TYPE.GLUCOMETER, 'timeout': 0 })
      actions.forEach(item => {
        setTimeout(() => {
          this.$store.dispatch(item.name, { meta: { eventId }, data: item.options })
        }, item.timeout)
      })
      /*
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'MEASUREMENT_2_1'
      })
      */
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

    .text {
      font-family: 'Play', sans-serif;
      font-size: 50px;
      align-items: center;
      text-align: center;
      margin-top: -40px;
    }

    .question {
      width: 80%;
      height: 100px;
      display: flex;
      align-items: center;
      text-align: center;
      font-size: 30px;
      margin: 20px;

      .quest_set {
        width: 100%;
        text-align: center;
      }
    }

    .img-quest {
      width: auto;
      height: 220px;
    }

    .img-box {
      width: 300px;
      height: 300px;
    }

    .btn {
        width: 230px;
        height: 60px;
        font-size: 26px;
        font-weight: 700;
        padding: 10px;
        margin: 15px;

        &_yn {
          width: 230px;
          height: 70px;
          font-size: 26px;
          font-weight: 700;
          margin-top: 30px;
        }

    }
  }
}
</style>
