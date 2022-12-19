<template>
    <div class="promo__container" v-show="showComponent" @click="promoClick()">
        <img class="promo__img" src="../../assets/img/logo/logo_main.png"/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'wait_promo',
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('engine', [
      'getCurrentStateName'
    ]),
    showComponent () {
      return this.getStep === 'wait_promo'
    }
  },
  methods: {
    ...mapActions('engine', [
      'handlerClickMoveToState'
    ]),
    goToState (state) {
      this.handlerClickMoveToState({
        transition: state,
        data: state
      })
    },
    promoClick: function () {
      if (['WAIT_PROMO'].includes(this.$store.getters['engine/getCurrentStateName'])) {
        let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'MEET_FACE'
          // data: 'MAIN_VIEW'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.promo {
  &__container {
    position: absolute;
    z-index: 99;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
  }
  &__img {
    display: inline-flex;
    margin-bottom: 68px;
    width: auto;
    height: 216px;
  }
}
</style>
