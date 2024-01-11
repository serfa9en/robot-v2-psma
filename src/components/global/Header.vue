<template>
    <div class="settings" v-show="getHeaderEnabled === true">
        <div class="headerData">
            <div>
                <!--<div class="headerPhoto" v-show="getHeaderBtnLeftPhoto === true" :style="[{ 'background-image': `url(${ getFaceRecognizeGeneralFrame })` }]"></div>
                <p class="userName" v-if="getHeaderBtnLeftPhoto === true && getUserGet !== null && getUserGet.name">{{ getUserGet.name }}</p>-->

                <!--Для кнопки выход-->
                <!--<button class="btn" v-text="getHeaderBtnLeftText" @click="bntAction"></button>-->

                <!--Для гамбургера-->
                <input id="menu__toggle" type="checkbox" />
                <label class="menu__btn" for="menu__toggle">
                  <span></span>
                </label>
                <ul class="menu__box">
                  <li v-if="getExitItemsOncology"><a class="menu__item" href="#item" v-on:click="btnAction('ONCOLOGY_MAIN')">К выбору онкологии</a></li>
                  <li v-if="getExitItemsDisease"><a class="menu__item" href="#item" v-on:click="btnAction('DISEASE_MAIN')">К выбору болезни</a></li>
                  <li v-if="getExitItemsSpecialist"><a class="menu__item" href="#item" v-on:click="btnAction('SPECIALIST_START')">К выбору специалиста</a></li>
                  <li v-if="getExitItemsMeasurement"><a class="menu__item" href="#item" v-on:click="btnAction('DIAGNOSTIC_START')">К выбору измерения</a></li>
                  <li v-if="getExitItemsMain"><a class="menu__item" href="#item" v-on:click="btnAction('MAIN_VIEW')">На главную</a></li>
                  <li><a class="menu__item" href="#item" v-on:click="btnAction('PRINT_VIEW')">Печать</a></li>
                  <!--<li><a class="menu__item" href="#">На почту</a></li>-->
                  <li><a class="menu__item" href="#item" v-on:click="toRemove">Очистить результаты</a></li>
                  <li><a class="menu__item" href="#item" v-on:click="btnAction('EXIT')">Завершить</a></li>
                </ul>
            </div>
            <div>
                <div class="logo">
                    <img class="logo-img" src="../../../public/dialog-images/logo/logo_right.png" alt="logo">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'

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
      'getHeaderBtnLeftPhoto',
      'getExitItemsOncology',
      'getExitItemsDisease',
      'getExitItemsSpecialist',
      'getExitItemsMeasurement',
      'getExitItemsMain'
    ])
  },
  methods: {
    /*
    // Для кнопки Выход
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
    */

    // Для гамбургера
    btnAction: function (val) {
      document.getElementById('menu__toggle').checked = false
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: val
      })
    },
    toRemove: function () {
      // очистка результатов
      document.getElementById('menu__toggle').checked = false
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerCallScenario', {
        meta: { eventId },
        data: 'reset'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.settings {
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    z-index: 2000;
    background-color: #ffffff;
    border-bottom: 1px solid #ccc;
    .headerData {
        height: 100px;
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

    /*
    // Для кнопки "Выход"
    .btn {
        display: inline-block;
        background: #B1A7A6;
        border: 1px solid #B1A7A6;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 11px 15px;
        min-width: 140px;
        font-family: 'Play', sans-serif;
        font-size: 18px;
        line-height: 27px;
        font-style: normal;
        color: #ffffff;
        cursor: pointer;
    }
    */

    // Для гамбургера
    #menu__toggle {
  opacity: 0;
}
#menu__toggle:checked + .menu__btn > span {
  transform: rotate(45deg);
}
#menu__toggle:checked + .menu__btn > span::before {
  top: 0;
  transform: rotate(0deg);
}
#menu__toggle:checked + .menu__btn > span::after {
  top: 0;
  transform: rotate(90deg);
}
#menu__toggle:checked ~ .menu__box {
  left: 0 !important;
}
.menu__btn {
  position: fixed;
  top: 50px;
  left: 50px;
  width: 50px;
  height: 30px;
  cursor: pointer;
  z-index: 1;
}
.menu__btn > span,
.menu__btn > span::before,
.menu__btn > span::after {
  display: block;
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: #691B26;
  transition-duration: .25s;
}
.menu__btn > span::before {
  content: ' ';
  top: -15px;
}
.menu__btn > span::after {
  content: ' ';
  top: 15px;
}

.menu__box {
  display: block;
  position: fixed;
  top: 0;
  left: -100%;
  width: 300px;
  height: 100%;
  margin: 0;
  padding: 100px 0;
  list-style: none;
  background-color: #EAE8E8;
  box-shadow: 2px 2px 6px rgba(62, 14, 20, .4);
  transition-duration: .25s;
}
.menu__item {
  display: block;
  padding: 20px 50px;
  color: #3E0E14;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  transition-duration: .25s;
}
.menu__item:hover {
  background-color: #B1A7A6;
}
    .logo {
        // border: 2px solid palevioletred;
        display: inline-block;
        vertical-align: middle;
    }

    .logo-img {
      width: auto;
      height: auto;
    }
}
</style>
