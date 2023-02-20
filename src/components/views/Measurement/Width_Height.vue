<template>
    <div v-show="showComponent" class="settings">
      <!--РОСТ-->
      <transition name="fade">
        <div class="content" v-if="step === 1">
          <div class="settings__center">
            <p class="text">Какой у Вас рост?</p>
            <img src="../../../../public/dialog-images/measurement/height.png">
            <div class="input-div">
              <input placeholder="Введите рост...">
              <div class="dop">см</div>
            </div>
          </div>
          <button v-on:click="next(0)" class="btn-dark-grad text-white">Далее</button>
        </div>
      </transition>

      <!--ВЕС-->
      <transition name="fade">
        <div class="content" v-if="step === 2">
          <div class="settings__center">
            <p class="text">Какой у Вас вес?</p>
            <img src="../../../../public/dialog-images/measurement/weight-scale.png">
            <div class="input-div">
              <input placeholder="Введите вес...">
              <div class="dop">кг</div>
            </div>
          </div>
          <button v-on:click="next(1)" class="btn-dark-grad text-white">Далее</button>
        </div>
      </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'width_height',
  data () {
    return {
      step: null // шаг страниц
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('engine', [
      'getPreStateName'
    ]),
    showComponent () {
      if (this.getStep === 'width_height') {
        this.loggingCurrentStateName()
        this.step = (this.getPreStateName === 'WIDTH_HEIGHT') ? 1 : 2
      }
      return this.getStep === 'width_height'
    }
  },
  methods: {
    loggingCurrentStateName: function () {
      if (this.getPreStateName === 'DIAGNOSTIC_START') {
        let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
        this.$store.dispatch('engine/setPreStateName', {
          meta: { eventId },
          data: 'WIDTH_HEIGHT'
        })
      }
    },
    next: function (val) {
      // проверка на введеное значение

      // переход
      if (val === 0) {
        this.step = 2
        let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
        this.$store.dispatch('engine/setPreStateName', {
          meta: { eventId },
          data: 'WIDTH_HEIGHT_2'
        })
      } else {
        // Переход к результатам
      }
    }
  }
}
</script>

<style scoped lang="scss">
.settings {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  // border: #3E0E14 solid 2px;
  &__center {
    // height: 200px;
    // border: #3E0E14 solid 2px;
    margin-top: 50px;
  }
}
.text {
  font-size: 30px;
}

.input-div {
  display: flex;
  justify-content: center;
}

img {
  width: 150px;
  height: auto;
}

input {
  width: 600px;
  height: 64px;
  background: #EAE8E8;
  border: 2px solid #3E0E14;
  box-sizing: border-box;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: 32px;
  padding-left: 27px;
  color: #3E0E14;
  margin: 25px 0 25px 25px;
}

.dop {
  width: 89px;
  height: 64px;
  border: 2px solid #3E0E14;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  box-sizing: border-box;
  margin-top: 25px;
  margin-left: -2px;
  background: #EAE8E8;
  color: #3E0E14;
  font-size: 32px;
  box-sizing: border-box;
  font-weight: 700;
}

input::placeholder {
  color: #B1A7A6;
}

button {
  width: 235px;
  height: 70px;
  font-size: 26px;
  margin-top: 20px;
}
</style>
