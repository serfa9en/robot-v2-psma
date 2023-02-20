<template>
    <div v-show="showComponent" class="settings">
      <div>
        <button class="btn-dark-main text-white" v-on:click="toSpecialist">
            <img src="../../assets/img/main/specialist.png">
            <p>Пройти консультацию<br>узкого специалиста</p>
        </button>
        <button class="btn-dark-main text-white" v-on:click="next">
            <img src="../../assets/img/main/diagnostic.png">
            <p>Пройти отдельное<br>обследование</p>
        </button>
      </div>
      <div>
        <button class="btn-dark-main text-white" disabled>
            <img src="../../assets/img/main/clinical_exam.png">
            <p>Пройти комплексное<br>обследование</p>
        </button>
        <button class="btn-dark-main text-white" v-on:click="toDisease" disabled>
            <img src="../../assets/img/main/risk_disease.png">
            <p>Узнать риск<br>развития заболевания</p>
        </button>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'main_view',
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    showComponent () {
      return this.getStep === 'main_view'
    }
  },
  methods: {
    next: function () {
      // переход на след страницу
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'DIAGNOSTIC_START'
      })
    },
    toSpecialist: function () {
      // переход на ветку специалистов
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'SPECIALIST_START'
      })
    },
    toDisease: function () {
      // переход на ветку риска развития заболевания
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'DISEASE_MAIN'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.settings {
    width: 100%;
    height: 100%;
    position: absolute;
    text-align: center;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

button {
    width: 450px;
    height: 240px;
    margin: 23px 28px 23px 28px;
}
img {
    margin-top: 15px;
}

.text-white {
    font-size: 26px;
    font-weight: 700;
}

</style>
