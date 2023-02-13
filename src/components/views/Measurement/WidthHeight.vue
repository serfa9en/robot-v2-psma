<template>
    <div v-show="showComponent" class="settings">
        <h1>THIS IS WEIGHT HEIGTH</h1>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'width_height',
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    showComponent () {
      if (this.getStep === 'width_height') {
        this.loggingCurrentStateName()
      }
      return this.getStep === 'width_height'
    }
  },
  methods: {
    loggingCurrentStateName: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/setPreStateName', {
        meta: { eventId },
        data: 'WIDTHHEIGHT'
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
    text-align: center;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
