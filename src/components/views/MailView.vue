<template>
    <div  v-if="showComponent" class="settings">
        <div class="settings__center">
           <p class="text">Пожалуйста, введите Ваш адрес электронной почты!</p>
          <input placeholder="mail@gmail.com" id="userMail">
        </div>
        <div class="error">{{ this.error }}</div>
        <button v-on:click="send" class="btn-dark-grad text-white">Отправить</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'
// import * as create from '../../store/plugins/createTalon'

export default {
  name: 'mail_view',
  data () {
    return {
      error: null,
      templateMail: 'mail-template.html'
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
      if (this.getStep === 'mail_view') {
        this.pr = this.getMeasurementGlucometry
      }
      return this.getStep === 'mail_view'
    }
  },
  methods: {
    exit: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'MAIN_VIEW'
      })
    },
    send: function () {
      // проверка адреса
      let adr = document.getElementById('userMail').value
      // console.log(adr)

      // проверка, что поле не пустое
      if (adr === '') {
        this.error = 'Введите адрес!'
      } else {
        if (adr.search('@') !== -1) {
          // отправка
          let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
          this.$store.dispatch('ui/setUserMail', {
            meta: { eventId },
            data: adr
          })
          this.$store.dispatch('app/set_create_mail', {
            meta: { eventId },
            data: true
          })
          document.getElementById('userMail').value = ''
          this.error = ''

          // отбойник, что письмо отправлено
          console.log('Отправлено!')

          // выход
          this.$store.dispatch('engine/handlerClickMoveToState', {
            meta: { eventId },
            data: 'MAIN_VIEW'
          })
        } else {
          this.error = 'Введите корректный адрес!'
        }
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
.error {
        width: auto;
        height: 30px;
        color: red;
        font-size: 22px;
        font-weight: 700;
    }

input {
  width: 600px;
  height: 64px;
  background: #EAE8E8;
  border: 2px solid #3E0E14;
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 32px;
  padding-left: 27px;
  color: #3E0E14;
  margin: 25px;
}

input::placeholder {
  color: #B1A7A6
}

button {
  width: 235px;
  height: 70px;
  font-size: 26px;
  margin-top: 40px;
}

.comment {
  // border: #3E0E14 solid 2px;
  font-size: 24px;
  margin-top: 30px;
}
</style>
