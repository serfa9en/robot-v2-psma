<template>
    <div v-show="showComponent" class="settings">
        <p class="text">Расчитать риск развития заболевания</p>
        <div class="container">
            <div class="block">
                <button class="btn-dark-main" v-on:click="toTemplateDisease(0)">
                    <p>Сахарный диабет</p>
                </button>
            </div>
            <div class="block">
                 <button class="btn-dark-main" v-on:click="toTemplateDisease(1)">
                    <p>Рефлюксная болезнь</p>
                </button>
            </div>
            <div class="block">
                <img src="../../../../public/dialog-images/disease/Disease_main.png">
            </div>
        </div>
        <div class="container">
            <div class="block">
                <button class="btn-dark-main" v-on:click="toTemplateDisease(2)">
                <p>Депрессия</p>
            </button>
            </div>
            <div class="block">
                <button class="btn-dark-main" disabled v-on:click="toOncology">
                <p>Онкология</p>
            </button>
            </div>
            <div class="block">
                <button class="btn-dark-main" v-on:click="toTemplateDisease(3)">
                <p>Простатит</p>
            </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'disease_main',
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    showComponent () {
      if (this.getStep === 'disease_main') {
        this.loggingCurrentStateName()
      }
      return this.getStep === 'disease_main'
    }
  },
  methods: {
    loggingCurrentStateName: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/setPreStateName', {
        meta: { eventId },
        data: 'DISEASE_MAIN'
      })
    },
    toTemplateDisease: function (val) {
      // логгируем в store
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('ui/setDiseaseNumber', {
        meta: { eventId },
        data: val
      })

      // переход к шаблону опросника
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'DISEASE_QUEST'
      })
    },
    toOncology: function () {

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
}

p {
    width: 100%;
    height: 2.5em;
    font-weight: 700;
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

.container {
    width: 840px;
    height: auto;
    display: flex;
    text-align: center;
    margin-left: 40px;
}

img {
    margin-top: -20px;
    margin-left: 70px;
}

.block {
    width: 100%;
    height: auto;
    display: inline-block;
    text-align: center;
    margin: 10px;
}

</style>
