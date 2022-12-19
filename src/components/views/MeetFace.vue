<template>
  <div class="container-generalselector text" v-show="showComponent">
    <div class="content_block">
      <h1 class="title">С кем я взаимодействую? Выберите себя на экране</h1>
      <div class="videostream">
        <Videostream/>
      </div>
    </div>
    <div class="button_block">
      <button class="btn-dark-grad text-white" @click="toStartPage()">Далее</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Videostream from '@/components/Videostream.vue'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'meet_face',
  components: {
    Videostream
  },
  data () {
    return {
      userAwaitTimer: null
    }
  },
  watch: {
    isGeneralEnabled: function (val) {
      // если перед роботом один человек и робот его видит главным то из промо прокидываем его на главный
      if (val && this.getStateCount === 'ONE') {
        this.toStartPage()
      }
    },
    getStep: function (val) {
      if (val === 'meet_face') {
        clearTimeout(this.userAwaitTimer)
        this.userAwaitTimer = setTimeout(() => {
          const eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
          this.$store.dispatch('engine/handlerMoveToState', {
            meta: { eventId },
            data: 'WAIT_PROMO'
          })
        }, 20000)
      } else if (this.userAwaitTimer) {
        clearTimeout(this.userAwaitTimer)
      }
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep',
      'getLoadAppSettings'
    ]),
    ...mapGetters('faces', [
      'getUserGeneral',
      'getStateCount'
    ]),
    ...mapGetters('ui', [
      'getUserMet',
      'getIsExaminationStarted'
    ]),
    ...mapGetters('robot', [
      'getFaceRecognizeGeneralId',
      'getFaceRecognizeGeneralSetted'
    ]),
    showComponent () {
      return this.getStep === 'meet_face'
    },
    isGeneralEnabled () {
      return typeof this.getUserGeneral?.id_track !== 'undefined' && this.getFaceRecognizeGeneralSetted !== -1 && this.getFaceRecognizeGeneralId !== -2
    }
  },
  methods: {
    ...mapActions('handlers', [
      'faceRecognizeAddFaceRequest'
    ]),
    toStartPage: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerMoveToState', {
        meta: { eventId },
        data: 'AGE'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container-generalselector {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 50px 0 105px;
  box-sizing: border-box;
  > div {
    flex: 1 1 100%;
  }
  h1 {
    font-weight: normal;
    font-size: 32px;
    line-height: 37px;
    text-align: center;
  }
  .videostream {
    width: 100%;
    height: 380px;
  }
  .button_block {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 40px;
    width: 100%;
    .btn, .btn_psevdo {
      display: inline-block;
      background: transparent;
      border: 1px solid transparent;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 16px 25px;
      font-family: Circe;
      font-size: 22px;
      line-height: 32px;
      font-style: normal;
      font-weight: 500;
      color: #fff;
      margin: 0 10px;
      min-width: 360px;
      text-align: center;
      cursor: pointer;
      > img {
        display: inline-block;
        vertical-align: middle;
        max-height: 40px;
      }
    }
      .btn_psevdo {
            width: auto;
            padding: 13px 10px;
      }
      .btn[disabled] {
        opacity: 0.5;
      }

    .btn-dark-grad {
      width: 230px;
      height: 70px;
      font-size: 22px;
    }
  }
}
</style>
