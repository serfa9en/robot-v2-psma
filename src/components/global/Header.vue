<template>
    <div class="settings" v-show="getHeaderEnabled === true">
        <div class="headerData">
            <div>
                <!--<div class="headerPhoto" v-show="getHeaderBtnLeftPhoto === true" :style="[{ 'background-image': `url(${ getFaceRecognizeGeneralFrame })` }]"></div>
                <p class="userName" v-if="getHeaderBtnLeftPhoto === true && getUserGet !== null && getUserGet.name">{{ getUserGet.name }}</p>-->
                <button class="btn" v-text="getHeaderBtnLeftText" @click="bntAction"></button>
            </div>
            <div>
                <div class="logo">
                    <img src="../../assets/img/logo/logo_right.png" alt="logo">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'header-component',
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('ui', [
      'getHeaderEnabled',
      'getHeaderBtnLeftText',
      'getHeaderBtnLeftAction',
      'getHeaderBtnLeftEnabled',
      'getHeaderBtnLeftPhoto'
    ])
  },
  methods: {
    bntAction: function () {
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      for (let key in this.$store.getters['ui/getHeaderBtnLeftAction']) {
        this.$store.dispatch(key, {
          meta: { eventId },
          data: this.getHeaderBtnLeftAction[key]
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.settings {
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    height: 138px;
    box-sizing: border-box;
    padding: 0;
    z-index: 2000;
    background-color: #ffffff;
    border-bottom: 1px solid #ccc;
    .headerData {
        height: 100%;
        display: flex;
        flex-flow: wrap row;
        justify-content: center;
        align-content: center;
        padding: 0 60px;
        > div {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex: 1 1 100px;
        }
        > div:nth-child(2) {
            flex: 2 1 100px;
            justify-content: center;
        }
        > div:last-child {
            justify-content: flex-end;
        }
    }

    .btn {
        display: inline-block;
        background: #B1A7A6;
        border: 1px solid #B1A7A6;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 11px 15px;
        min-width: 140px;
        font-family: Circe;
        font-size: 18px;
        line-height: 27px;
        font-style: normal;
        color: #ffffff;
        cursor: pointer;
    }
    .logo {
        display: inline-block;
        vertical-align: middle;
    }
}
</style>
