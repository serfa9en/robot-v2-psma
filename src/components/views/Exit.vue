<template>
    <div v-show="showComponent" class="settings">
        <div>
            <p class="text">Вы уверены, что хотите выйти?</p>
            <img src="../../../public/dialog-images/result/Result_bad.png">
        </div>
        <!--
        <div>
            <button class="btn btn_next btn-dark-grad" v-on:click="next">Продолжить</button>
        </div>
      -->
        <div>
            <button class="btn btn-yes-no" v-on:click="exit">Выход</button>
            <button class="btn btn-yes-no" v-on:click="toMainView">На главную</button>
            <button class="btn btn_next btn-dark-grad" v-on:click="next">Продолжить</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'exit_view',
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('engine', [
      'getPreStateName',
      'getCurrentStateName'
    ]),
    showComponent () {
      if (this.getStep === 'exit_view') {
        console.log(this.getCurrentStateName)
        console.log(this.getPreStateName)
      }
      return this.getStep === 'exit_view'
    }
  },
  methods: {
    next: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: this.getPreStateName
      })
    },
    exit: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'MEET_FACE'
      })
    },
    toMainView: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'MAIN_VIEW'
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
    position: absolute;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    bottom: 0;

    .text {
        font-size: 32px;
        margin: 50px;
    }
    .btn {
        width: 240px;
        height: 70px;
        margin: 25px;
        margin-top: 80px;
        font-size: 24px;

        &_next {
            font-weight: bold;
        }
    }
}
</style>
