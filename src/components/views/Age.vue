<template>
    <div v-show="showComponent" class="settings">
        <div class="settings__center">
           <p class="text">Пожалуйста, введите Ваш возраст!</p>
          <input placeholder="Введите возраст..." id="userAge">
        </div>
        <button v-on:click="next" class="btn-dark-grad text-white">Далее</button>
        <div class="comment text">
          <p>Необходимо вводить возраст целым числом!</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'age_view',
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('ui', [
      'setUserAge'
    ]),
    showComponent () {
      return this.getStep === 'age_view'
    }
  },
  methods: {
    next: function () {
      // console.warn('AGE!')
      let age = document.getElementById('userAge').value
      // console.log(age)

      // проверка, что поле не пустое
      if (age === '') {
        // console.log('ПУСТО')
      } else {
        // проверка, что целое число
        age = Number(age)
        if (Number.isInteger(age)) {
          // console.log('INTEGER')
          let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
          // запоминаем возраст
          this.$store.dispatch('ui/setUserAge', {
            meta: { eventId },
            data: age
          })

          // переход на след страницу
          this.$store.dispatch('engine/handlerClickMoveToState', {
            meta: { eventId },
            data: 'MAIN_VIEW'
          })
        } else {
          // строка, дробь и то, что нам не подходит
        }
      }

      // переход на след страницу
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'MAIN_VIEW'
        // data: 'EXIT'
      })
      // очистка поля
      document.getElementById('userAge').value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
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
