<template>
    <div v-if="showComponent" class="settings">
        <h1 class="text">Риск развития {{ this.title }}</h1>
        <div class="container">
            <div class="container_block">
              <div class="img-box">
                <img :src=itemImageResult>
              </div>
            </div>
            <div class="container_block">
                 <p class="text text_result">{{ this.result_count }}</p>
            </div>
            <div class="container_block">
                <div class="box" :style="[{ 'background-color': `${ getCurrentDiseaseColor }` }]">
                    <p :style="styleColorBlock" class="text text_comment">{{ this.comment }}</p>
                    <p v-if="this.comment_d != ''" class="text text_recomend">{{ this.comment_d }}</p>
                </div>
            </div>
        </div>
        <div
        class="text colorBox"
        :style="[{ 'border': `${ getCurrentDiseaseBorderColor }` }]">
          {{ this.text }}
        </div>
        <div>
          <button class="btn-dark-grad" v-on:click="getRecomend">Получить <br> рекомендации</button>
          <button class="btn-yes-no" v-on:click="continueWork">Продолжить <br> обследование</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'disease_result',
  data () {
    return {
      title: null,
      path_img: null,
      comment: null,
      comment_d: null,
      result_count: null,
      text: null,
      number: null
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('ui', [
      'getCurrentDiseaseNumber',
      'getCurrentDiseaseTitle',
      'getCurrentDiseaseImg',
      'getCurrentDiseaseText',
      'getCurrentDiseaseComment',
      'getCurrentDiseaseCommentD',
      'getCurrentDiseaseColor',
      'getCurrentDiseaseBorderColor',
      'getResultDiseaseCountDiabetes',
      'getResultDiseaseCountReflux',
      'getResultDiseaseCountDepression',
      'getResultDiseaseCountOncologyMammaryCancer',
      'getResultDiseaseCountOncologyStomachCancer',
      'getResultDiseaseCountOncologyEsophagealCarcinoma',
      'getResultDiseaseCountOncologyBladderCancer',
      'getResultDiseaseCountOncologyLungCancer',
      'getResultDiseaseCountOncologyMelanoma',
      'getResultDiseaseCountOncologySkinCancer',
      'getResultDiseaseCountOncologyThroatCancer',
      'getResultDiseaseCountOncologyLaryngealCancer',
      'getResultDiseaseCountOncologyThyroidCancer',
      'getResultDiseaseCountOncologyBowelCancer'
    ]),
    showComponent () {
      if (this.$store.getters['app/getStep'] === 'disease_result') {
        this.number = this.getCurrentDiseaseNumber
        this.title = this.getCurrentDiseaseTitle
        this.path_img = this.getCurrentDiseaseImg
        this.comment = this.getCurrentDiseaseComment
        this.comment_d = this.getCurrentDiseaseCommentD
        this.result_count = this.getResult()
        this.text = this.getCurrentDiseaseText
        this.loggingCurrentStateName()
      }
      return this.$store.getters['app/getStep'] === 'disease_result'
    },
    itemImageResult () {
      return require(`../../../assets/img/disease/Result/${this.path_img}`)
    },
    styleColorBlock () {
      if (this.comment_d === '') {
        if (this.getCurrentDiseaseNumber === 3) {
          return { 'margin-top': '25px' }
        } else {
          return { 'margin-top': '60px' }
        }
      } else {
        return { 'margin-top': '25px' }
      }
    },
    setColor () {
      return { 'background-color': this.getCurrentDiseaseColor }
    }
  },
  methods: {
    loggingCurrentStateName: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/setPreStateName', {
        meta: { eventId },
        data: 'DISEASE_RESULT'
      })
    },
    getResult: function () {
      switch (this.number) {
        case 0: return this.getResultDiseaseCountDiabetes
        case 1: return this.getResultDiseaseCountReflux
        case 2: return this.getResultDiseaseCountDepression
        case 3: return this.getResultDiseaseCountProstatitis
        case 4: return this.getResultDiseaseCountOncologyMammaryCancer
        case 5: return this.getResultDiseaseCountOncologyStomachCancer
        case 6: return this.getResultDiseaseCountOncologyEsophagealCarcinoma
        case 7: return this.getResultDiseaseCountOncologyBladderCancer
        case 8: return this.getResultDiseaseCountOncologyLungCancer
        case 9: return this.getResultDiseaseCountOncologyMelanoma
        case 10: return this.getResultDiseaseCountOncologySkinCancer
        case 11: return this.getResultDiseaseCountOncologyThroatCancer
        case 12: return this.getResultDiseaseCountOncologyLaryngealCancer
        case 13: return this.getResultDiseaseCountOncologyThyroidCancer
        case 14: return this.getResultDiseaseCountOncologyBowelCancer
      }
    },
    continueWork: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'DISEASE_MAIN'
      })
    },
    getResultPrint: function () {
      // получить результаты
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'PRINT_VIEW'
      })
    },
    getRecomend: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      if (this.getCurrentDiseaseNumber === 2) {
        this.$store.dispatch('ui/setRecomendType', { meta: { eventId }, data: 3 })
      } else {
        this.$store.dispatch('ui/setRecomendType', { meta: { eventId }, data: 0 })
      }
      this.$store.dispatch('ui/setRecomendDiabetes', { meta: { eventId }, data: null })
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'RECOMEND_VIEW'
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
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .container {
    width: 100%;
    height: 230px;
    display: flex;
    justify-content: center;
    &_block {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: auto;
    }
  }

  .text {
    // margin: 25px;

    &_result {
      font-size: 60px;
      font-weight: 700;
    }

    &_comment {
      // margin-top: -50px;
      font-weight: 700;
      // display: flex;
    }

    &_recomend {
    }
  }

  .box {
    width: 337px;
    height: 190px;
    border-radius: 25px;
    font-size: 36px;
  }

  .colorBox {
    width: 850px;
    height: auto;
    background-color: #EAE8E8;
    font-size: 22px;
    padding: 15px;
    margin: 10px;
    margin-top: 40px;
    // border: 2px solid rebeccapurple;
  }

  button {
    width: 260px;
    height: 64px;
    font-size: 20px;
    font-weight: 700;
    margin: 20px;
  }
}
</style>
