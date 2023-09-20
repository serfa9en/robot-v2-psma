<template>
    <div v-show="showComponent" class="settings">
      <!--<button class="button-print btn-yes-no">Печать</button>-->
      <div class="container">
        <div class="block btn-dark-main quest-but">
          <div class="quest-box" v-on:click="toDescription(0)">
              <img class="quest" src="../../../public/dialog-images/question.png">
            </div>
          <button class="btn-dark-main text-white" v-on:click="toSpecialist">
            <img class="img-main" src="../../assets/img/main/specialist.png">
            <p class="name">Пройти консультацию<br>узкого специалиста</p>
          </button>
        </div>
        <div class="block btn-dark-main">
          <div class="quest-box" v-on:click="toDescription(1)">
              <img class="quest" src="../../../public/dialog-images/question.png">
            </div>
          <button class="btn-dark-main text-white" v-on:click="next">
            <img class="img-main" src="../../assets/img/main/diagnostic.png">
            <p class="name">Пройти отдельное<br>обследование</p>
          </button>
        </div>
      </div>
      <div class="container">
        <div class="block btn-dark-main">
          <div class="quest-box" v-on:click="toDescription(2)">
              <img class="quest" src="../../../public/dialog-images/question.png">
            </div>
          <button class="btn-dark-main text-white" v-on:click="toExam">
            <img class="img-main" src="../../assets/img/main/clinical_exam.png">
            <p class="name">Пройти комплексное<br>обследование</p>
          </button>
        </div>
        <div class="block btn-dark-main">
          <div class="quest-box" v-on:click="toDescription(3)">
              <img class="quest" src="../../../public/dialog-images/question.png">
            </div>
          <button class="btn-dark-main text-white" v-on:click="toDisease">
            <img class="img-main" src="../../assets/img/main/risk_disease.png">
            <p class="name">Узнать риск<br>развития заболевания</p>
          </button>
        </div>
      </div>
      <Description/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'
import { getDescription } from '../styled/setDescription'
import Description from '@/components/views/Description'

export default {
  name: 'main_view',
  data () {
    return {
      textDescription: null
    }
  },
  components: {
    Description
  },
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('faces', [
      'getUserGeneral'
    ]),
    showComponent () {
      if (this.getStep === 'main_view') {
        // console.log('this.getUserGeneral.id = ', this.getUserGeneral.id)
        /*
        let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
        this.$store.dispatch('ui/setFlagExamination', {
          meta: { eventId },
          data: false
        })
        */
      }
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
      // console.log('bdhjsbvgks?? = ', this.getMeasurementGlucometry)
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      /*
      this.$store.dispatch('ui/setDescriptionEnabled', {
        meta: { eventId },
        data: true
      })
      */
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        // data: 'DESCRIPTION'
        data: 'SPECIALIST_START'
      })
    },
    toExam: function () {
      // переход на комплексное обследование
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'EXAMINATION'
        // data: 'EXAM_RESULT'
      })
    },
    toDisease: function () {
      // переход на ветку риска развития заболевания
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'DISEASE_MAIN'
      })
    },
    toDescription: function (val) {
      this.textDescription = getDescription(val)
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('ui/setDescription', {
        meta: { eventId },
        data: this.textDescription
      })
      this.$store.dispatch('ui/setDescriptionEnabled', {
        meta: { eventId },
        data: true
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

.button-print {
  width: 240px;
  height: 60px;
}

button {
    width: 450px;
    height: 180px;
}

.img-main {
  width: auto;
  margin-top: -30px;
  height: 100px;
  z-index: 100;
}

.quest-box {
  // width: 30px;.
  margin: 0;
  // border: 2px solid blue;
  border-radius: 10px;
  text-align: right;
  margin-right: 10px;
  margin-top: 10px;
}

/*
.quest-but:hover {
  background-color: #691B26;
    border-radius: 10px;
    border: none;
    color: #FFF;
}
*/

.quest {
  top: 0;
  right: 0;
  // margin-left: 30px;
}

.text-white {
    font-size: 26px;
    font-weight: 700;
    // border: 2px solid orange;
}

.name {
  margin-top: 10px;
}

.container {
    width: auto;
    height: auto;
    display: flex;
    text-align: center;
}

.block {
    width: 100%;
    height: auto;
    display: inline-block;
    text-align: center;
    margin: 23px 40px 23px 40px;
    z-index: 100;
}

</style>
