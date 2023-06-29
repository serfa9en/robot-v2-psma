<template>
    <div v-show="showComponent" class="settings">
      <section class="card">
        <p class="text">Расчитать риск развития онкологического заболевания</p>
        <div id="screen-1" class="card--content top">
          <div class="box">
            <div class="container">
              <div class="block">
                <button class="btn-dark-main text-white" v-on:click="toTemplateDisease(0)">Рак молочной <br>железы</button>
              </div>
              <div class="block">
                <button class="btn-dark-main text-white" v-on:click="toTemplateDisease(1)">Рак желудка</button>
              </div>
              <div class="block">
                  <img src="../../../assets/img/disease/main_oncology.png">
              </div>
            </div>
            <div class="container">
              <div class="block">
                <button class="btn-dark-main text-white" v-on:click="toTemplateDisease(2)">Рак пищевода</button>
              </div>
              <div class="block">
                <button class="btn-dark-main text-white" v-on:click="toTemplateDisease(3)">Рак предстательной железы,<br> рак мочевого пузыря</button>
              </div>
              <div class="block">
                <button class="btn-dark-main text-white" v-on:click="toTemplateDisease(4)">Рак легкого</button>
              </div>
            </div>
          </div>
          <div class="box arrow">
            <a href="#screen-2">
            <img src="../../../../public/dialog-images/arrow-right.png">
          </a>
          </div>
        </div>
        <div id="screen-2" class="card--content top">
          <div class="box">
            <a href="#screen-1">
            <img src="../../../../public/dialog-images/arrow-left.png">
          </a>
          </div>
          <div class="box">
          <div class="container">
            <div class="block">
              <button class="btn-dark-main text-white" v-on:click="toTemplateDisease(5)">Меланома</button>
            </div>
            <div class="block">
              <button class="btn-dark-main text-white" v-on:click="toTemplateDisease(6)">Рак кожи</button>
            </div>
            <div class="block">
              <button class="btn-dark-main text-white" v-on:click="toTemplateDisease(7)">Рак органов полости <br>рта и глотки</button>
            </div>
          </div>
          <div class="container">
            <div class="block">
              <button class="btn-dark-main text-white" v-on:click="toTemplateDisease(8)">Рак гортани</button>
            </div>
            <div class="block">
              <button class="btn-dark-main text-white" v-on:click="toTemplateDisease(9)">Рак щитовидной <br>железы</button>
            </div>
            <div class="block">
              <button class="btn-dark-main text-white" v-on:click="toTemplateDisease(10)">Рак кишечника</button>
            </div>
          </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { PromobotLogger, EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'oncology_main',
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    showComponent () {
      if (this.getStep === 'oncology_main') {
        this.loggingCurrentStateName()
      }
      return this.getStep === 'oncology_main'
    }
  },
  methods: {
    loggingCurrentStateName: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/setPreStateName', {
        meta: { eventId },
        data: 'ONCOLOGY_MAIN'
      })
    },
    toTemplateDisease: function (val) {
      // логгируем в store
      let logger = PromobotLogger.getInstance()
      let eventId = logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('ui/setOncologyNumber', {
        meta: { eventId },
        data: val
      })

      // переход к шаблону опросника
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'ONCOLOGY_QUEST'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.settings {
  width: 100%;
  height: 100%;
  margin: 0;
  text-align: center;
  display: flex;
  bottom: 0;
  justify-content: center;
  align-items: center;
}

  button {
    width: 315px;
    height: 165px;
    margin: 15px;
  }

  .top {
      margin-top: 90px;
    }

  p {
    width: 100%;
    font-weight: 700;
    font-size: 30px;
    position: absolute;
    text-align: center;
  }

.card {
  min-width: 100%;
  min-height: 550px;
  display: flex;
  overflow-x: auto;
  text-align: center;
  scroll-behavior: smooth;
}
.container {
    width: 1100px;
    height: auto;
    display: flex;
    text-align: center;
    margin-left: 40px;
}

.block {
    width: 100%;
    height: auto;
    display: inline-block;
    text-align: center;
}

.box {
  width: auto;
  height: auto;
  display: inline-block;
}

.card--content {
  min-width: 1280px;
}

.card::-webkit-scrollbar {
  width: 800px;
}

.card::-webkit-scrollbar-track {
  background: #FFFFFF;
}

.card::-webkit-scrollbar-thumb {
  background: #85212F;
  border-radius: 10px;
  border: 2px solid #3E0E14;
}

.text-white {
  font-weight: 700;
  font-size: 22px;
}

</style>
