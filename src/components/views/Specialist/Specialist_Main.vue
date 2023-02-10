<template>
    <div v-show="showComponent" class="settings">
        <p class="text">Пройти опрос специалиста</p>
        <div>
            <button class="btn-dark-main" v-on:click="specialist(0)" v-text=getSpecName(0)></button>
            <button class="btn-dark-main" v-on:click="specialist(1)" v-text=getSpecName(1)></button>
            <button class="btn-dark-main" v-on:click="specialist(2)" v-text=getSpecName(2)></button>
        </div>
        <div>
            <button class="btn-dark-main" v-on:click="specialist(3)" v-text=getSpecName(3)></button>
            <button class="btn-dark-main" v-on:click="specialist(4)" v-text=getSpecName(4)></button>
            <button class="btn-dark-main" v-on:click="specialist(5)" v-text=getSpecName(5)></button>
        </div>
        <div>
            <button class="btn-dark-main" v-on:click="specialist(6)" v-text=getSpecName(6)></button>
            <button class="btn-dark-main" v-on:click="specialist(7)" v-text=getSpecName(7)></button>
            <button class="btn-dark-main" v-on:click="specialist(8)" v-text=getSpecName(8)></button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getName } from '../../../store/dataStorage/specialist'
import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'specialist',
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('app', [
      'setStep'
    ]),
    ...mapGetters('ui', [
      'setSpecialistNumber'
    ]),
    showComponent () {
      if (this.getStep === 'specialist') {
        this.loggingCurrentStateName()
      }
      return this.getStep === 'specialist'
    }
  },
  methods: {
    loggingCurrentStateName: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/setPreStateName', {
        meta: { eventId },
        data: 'SPECIALIST_START'
      })
    },
    getSpecName: function (val) {
      return getName(val)
    },
    specialist: function (val) {
      // логгируем в store
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('ui/setSpecialistNumber', {
        meta: { eventId },
        data: val
      })

      // переходим на другой экран - экран обработки консультации
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'SPECIALIST_QUEST'
      })
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

button {
    width: 300px;
    height: 120px;
    margin: 20px;
    font-weight: 700;
    font-size: 24px;
}

p {
    width: 100%;
    font-weight: 700;
    font-size: 30px;
    display: flex;
    flex-flow: wrap row;
    justify-content: center;
    align-content: center;
}
</style>
