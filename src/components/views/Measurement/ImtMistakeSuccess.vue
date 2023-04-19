<template>
  <div v-if="showComponent" class="wrapper">
    <div class="container-meeting" v-if="showComponent && getStep === 'saturatsiyaError'">
      <div class="content_block">
        <div class="text">Сатурация крови: проверьте, правильно ли расположен палец в приборе</div>
        <!--img src="../../assets/img/mistake.png" /-->
        <!--<div v-html="errorPic"></div>-->
        <img src="../../../../public/dialog-images/result/Result_bad.png">
      </div>
      <div class="button_block">
        <button class="btn btn-dark-grad" @click="goToSaturatsiya(0)">Начать сначала</button>
        <button class="btn btn-yes-no" @click="goToSaturatsiya(1)">Назад</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'imtMistake',
  components: {

  },
  data () {
    return {
      realImt: null,
      actImt: 0,
      beforeKg: null,
      afterKg: null,
      errorPic: false
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep',
      'getSessionName',
      'getMeetingTalk',
      'getIsImportantPhrase',
      'getLoadAppSettings'
    ]),
    ...mapGetters('ui', [
      'getSubtitlesEnabled',
      'getImtStep',
      'getUserGrowth',
      'getUserWeight',
      'getImtFacts',
      'getImtMistake'
    ]),
    ...mapGetters('faces', [
      'getUserGeneral'
    ]),
    ...mapGetters('engine', [
      'getCurrentStateName'
    ]),
    showComponent () {
      if (this.$store.getters['app/getStep'] === 'imtMistakeSuccess') {
        // eslint-disable-next-line vue/no-async-in-computed-properties
        setTimeout(() => {
          if (this.$store.getters['app/getIsImportantPhrase'] !== true) {
            let logger = PromobotLogger.getInstance()
            let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
            let name = ''
            if (this.$store.getters['app/getSessionName'] !== '') {
              name = this.$store.getters['app/getSessionName'] + ' '
            }
            console.log('==name', name + this.$store.getters['ui/getImtFacts'][this.actImt].say_text)
            this.$store.dispatch('robot/sendDialogMuteOn', {
              meta: { eventId }
            })
            this.$store.dispatch('app/setIsImportantPhrase', {
              meta: { eventId },
              data: true
            })
            // eslint-disable-next-line vue/no-async-in-computed-properties
            setTimeout(() => {
              this.$store.dispatch('robot/sendDialogMuteOff', {
                meta: { eventId }
              })
              this.$store.dispatch('app/setIsImportantPhrase', {
                meta: { eventId },
                data: false
              })
            }, 12000)
          }
        }, 50)
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (this.$store.getters['app/getStep'] === 'imtMistakeSuccess' || this.$store.getters['app/getStep'] === 'glucometerError' || this.$store.getters['app/getStep'] === 'saturatsiyaError' || this.$store.getters['app/getStep'] === 'spirographiaError') console.log('ERROR = ', this.getStep)
      return (this.$store.getters['app/getStep'] === 'imtMistakeSuccess' || this.$store.getters['app/getStep'] === 'glucometerError' || this.$store.getters['app/getStep'] === 'saturatsiyaError' || this.$store.getters['app/getStep'] === 'spirographiaError')
    },
    paramData () {
      return this.$store.getters['ui/getImtMistake'] === false
    }
  },
  methods: {
    toSmoke: function () {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'SMOKE'
      })
    },
    getActDiv (value) {
      if (value === this.actImt) return 'act_div'
    },
    getRealImt () {
      let growth = this.$store.getters['ui/getUserGrowth']
      let weight = Number(this.$store.getters['ui/getUserWeight']).toFixed(0)
      this.realImt = Math.round(weight / (growth * growth / (100 * 100)))
      let _this = this
      this.$store.getters['ui/getImtFacts'].map((imtFa, i, arr) => {
        if (_this.realImt >= imtFa.intervalStart && _this.realImt < imtFa.intervalStop) _this.actImt = i
      })
      if (this.actImt - 1 >= 0) {
        this.beforeKg = weight - Math.round(this.$store.getters['ui/getImtFacts'][this.actImt - 1].intervalStop * (growth * growth / (100 * 100)))
        if (this.beforeKg < 0) this.beforeKg = 0
      }
      if (this.actImt + 1 < this.$store.getters['ui/getImtFacts'].length) {
        this.afterKg = Math.round(this.$store.getters['ui/getImtFacts'][this.actImt + 1].intervalStart * (growth * growth / (100 * 100))) - weight - 1
        if (this.afterKg < 0) this.afterKg = 0
      }
    },
    getInfo: function (a, b) {
      let m = (a > 0) ? a : '<'
      let l = (b < 100) ? b - 0.1 : '>'
      if (m === '<') {
        return m + ' ' + l
      } else if (l === '>') {
        return l + ' ' + m
      } else {
        return m + ' - ' + l
      }
    },
    getActImt: function (value) {
      return (value === this.actImt) ? '-1' : ''
    },
    goToSpirographia: function (num) {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      if (num === 0) {
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'MEASUREMENT_4_5'
        })
      } else if (num === 1) {
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'DIAGNOSTIC_START'
        })
      }
    },
    goToSaturatsiya: function (num) {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      if (num === 0) {
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'MEASUREMENT_4_1'
        })
      } else if (num === 1) {
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'DIAGNOSTIC_START'
        })
      }
    },
    goToGlukometr: function (num) {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      if (num === 0) {
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'DIAGNOSTIC_START'
        })
      } else if (num === 1) {
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'MEASUREMENT_2_1'
        })
      }
    },
    goToImt: function () {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      if (this.$store.getters['engine/getCurrentStateName'] === 'IMT-MISTAKE-S') {
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'IMT-S'
        })
      } else {
        if (this.$store.getters['ui/getImtStep'] === 0) {
          this.$store.dispatch('engine/handlerClickMoveToState', {
            meta: { eventId },
            data: 'IMT'
          })
        } else if (this.$store.getters['ui/getImtStep'] === 1) {
          this.$store.dispatch('engine/handlerClickMoveToState', {
            meta: { eventId },
            data: 'IMT-1'
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  .container-meeting {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #fff;
    padding: 105px 0 105px;
    box-sizing: border-box;
    > div {
      flex: 1 1 100%;
    }
    > .content_block {
      width: 100%;
      p {
        font-size: 20px;
        line-height: 120%;
        max-width: 840px;
        margin: 0 auto;
      }
    }
    > .button_block {
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: flex-end;
      padding-bottom: 40px;
      width: 100%;
      .btn {
        width: 300px;
        height: 70px;
        font-size: 26px;
        font-weight: 700;
        padding: 10px;
        margin: 15px;
      }
    }
    .text {
      font-size: 30px;
      line-height: 120%;
      max-width: 786px;
      text-align: center;
      margin: 50px auto;
    }
  }
}

</style>
