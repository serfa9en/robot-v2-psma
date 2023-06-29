<template>
    <div  v-if="showComponent" class="settings">
        <div class="container-meeting">
            <div class="content_block">
                <div class="text">Как вы хотите получить результаты?</div>
                <img src="../../../public/dialog-images/result/Result_bad.png">
            </div>
            <div class="button_block">
                <button class="btn btn-dark-grad" v-on:click="print">Печать</button>
                <button class="btn btn-dark-grad" v-on:click="send" disabled>Отправить на почту</button>
                <button class="btn btn-yes-no" v-on:click="exit">Выход</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'
// import * as create from '../../store/plugins/createTalon'

export default {
  name: 'print_view',
  data () {
    return {
      templatePath: 'talon-template.html'
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('ui', [
      'getMeasurementGlucometry',
      'getMeasurementImt',
      'getFlagExit'
    ]),
    showComponent () {
      if (this.getStep === 'print_view') {
        this.pr = this.getMeasurementGlucometry
      }
      return this.getStep === 'print_view'
    }
  },
  methods: {
    /*
    ...mapActions('app', [
      'set_createTalon'
    ]),
    */
    // ...printDf,
    // ...createTalon,
    exit: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'MAIN_VIEW'
      })
    },
    send: function () {
      console.log('send')
      /*
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('robot/sendMailSendMail', {
        meta: { eventId },
        data: 'serfagen@gmail.com'
      })
      */
    },
    print: function () {
      console.log('print')
      // вызываем глобальную функцию формирования талона
      // printDf()
      // pp.printDf()
      // create.createTalon()
      // console.log('bdhjsbvgks?? = ', this.getMeasurementImt)
      // let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('app/set_create_talon', {
        meta: { eventId },
        data: true
      })
      console.log('this.getFlagExit = ', this.getFlagExit)
      if (this.getFlagExit === true) {
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'MEET_FACE'
        })
      } else {
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'MAIN_VIEW'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.settings {
  width: 100%;
  height: 100%;

  .container-meeting {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #fff;
    padding: 105px 0 105px;
    box-sizing: border-box;
    > div {
      flex: 1 1 100%;
    }

    > .content_block {
      width: 100%;
      p {
        font-size: 20px;
        line-height: 120%;
        max-width: 840px;
        margin: 0 auto;
      }
    }
    > .button_block {
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: flex-end;
      padding-bottom: 40px;
      width: 100%;
      .btn {
        width: 300px;
        height: 70px;
        font-size: 22px;
        font-weight: 700;
        padding: 10px;
        margin: 15px;
      }
    }
    .text {
      font-size: 30px;
      line-height: 120%;
      max-width: 786px;
      text-align: center;
      margin: 50px auto;
    }
/*
    button {
        font-family: 'Play', sans-serif;
        width: 300px;
        height: 70px;
        font-size: 20px;
        font-weight: 700;
        margin: 20px;
    }
    */
  }
}
</style>
