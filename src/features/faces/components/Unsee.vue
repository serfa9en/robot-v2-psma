<template>
  <transition>
    <div :data-visible="showComponent" class="unsee-container" :data-startHeader="getHeaderBtnLeftPhoto">
      <table><tr>
        <td>
          <div class="unsee-lost-face" v-if="getFaceRecognizeGeneralFrame" :style="[{ 'background-image': `url(${ getFaceRecognizeGeneralFrame })` }]"></div>
        </td>
        <td>
          <h1 class="unsee-title">Я вас потерял. Вернитесь в кадр для продолжения</h1>
        </td>
        <td>
          <button class="unsee-button" @click="resolveUserLost">Начать сначала</button>
        </td>
      </tr></table>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'unsee',
  props: {
    title: {
      type: String,
      default: 'Я потерял вас'
    },
    description: {
      type: String,
      default: 'Пожалуйста, вернитесь в кадр для продолжения'
    },
    button: {
      type: String,
      default: 'Начать сначала'
    },
    customClass: {
      type: String,
      default: ''
    },
    action: {
      default: false
    }
  },
  watch: {
    getUserLost (isUserLost) {
      if (isUserLost === true) {
        clearInterval(this.interval)

        this.timer = this.getTimeoutsLostUser
        this.interval = setInterval(() => {
          this.timer = this.timer - 100

          if (this.timer < 0) {
            this.timer = this.getTimeoutsLostUser
            clearInterval(this.interval)
          }
        }, 100)
      }

      if (isUserLost === false) {
        this.timer = this.getTimeoutsLostUser
        clearInterval(this.interval)
      }
    }
  },
  data () {
    return {
      timer: null,
      interval: null
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('faces', [
      'getUserGeneral',
      'getUserLost',
      'getTimeoutsLostUser'
    ]),
    ...mapGetters('robot', [
      'getFaceRecognizeGeneralFrame',
      'getFaceRecognizeAutotracking',
      'getFaceRecognizeGeneralId',
      'getFaceRecognizeGeneralSetted'
    ]),
    ...mapGetters('engine', [
      'getCurrentStateName'
    ]),
    ...mapGetters('ui', [
      'getHeaderBtnLeftPhoto'
    ]),
    showComponent () {
      if (this.getUserLost === true && this.getFaceRecognizeAutotracking === false) {
        let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
        this.$store.dispatch('robot/keyboardHideRequest', {
          meta: { eventId }
        })
      }
      return (this.getUserLost === true && this.getFaceRecognizeAutotracking === false && this.getCurrentStateName !== 'SELECT_GENERAL')
    }
  },
  methods: {
    resolveUserLost () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      if (this.action === false) {
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'MEET_FACE'
        })
      } else {
        this.action()
      }
    }
  },
  filters: {
    timerFilter (val) {
      let seconds = moment(val).get('seconds')
      let minutes = moment(val).get('minutes')
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      return `${minutes}:${seconds}`
    }
  }
}
</script>

<style lang="scss" scoped>
.unsee-container {
  position: absolute;
  width: 100%;
  height: 100px;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  text-align: left;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #E04E39;
  padding: 0;
  box-sizing: border-box;
  transform: translateY(-100%);
  transition: transform .3s ease-in-out;
  > table {
    width: 100%;
    border-spacing: 0;
    td {
      padding: 0;
    }
    td:first-child {
      width: 100px;
    }
    td:last-child {
      width: 300px;
    }
  }
  .unsee-lost-face {
    width: 100px;
    height: 100px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .unsee-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 35px;
    color: #FFFFFF;
    width: 800px;
    margin: 0;
    text-align: center;
    box-sizing: border-box;
    padding: 0 20px;
  }
  .unsee-button {
    width: 240px;
    font-family: Play;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    color: #000000;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 13px;
    border: 0;
  }
}
.unsee-container[data-startHeader] {
  height: 180px;
  .unsee-lost-face {
    width: 180px;
    height: 180px;
  }
  > table {
    td:first-child  {
      width: 180px;
    }
  }
}

.unsee-container[data-visible] {
  transform: translateY(0);
}

</style>
