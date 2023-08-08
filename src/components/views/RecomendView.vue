<template>
    <div  v-show="showComponent" class="settings">
      <!--<h1 class="text">Рекомендации</h1>-->
    <div v-if="type === 0 || this.type === 2 || this.type === 3">
      <div class="scroll">
        <div v-if="this.type === 0">
          <div class="container container_title">
            <div class="block_img">
              <img src="../../assets/img/recomend/0.png">
            </div>
            <div class="block_text">
              <p class="text title">Придерживайтесь здорового образа жизни </p>
            </div>
            <button class="btn-next btn-yes-no" v-on:click="getInfo">Подробнее</button>
          </div>
          <div>
            <div class="container">
              <div class="box">
                <!--<img class="box_img" src="../../assets/img/recomend/0.png">-->
                <p class="text">Придерживайтесь здорового питания</p>
              </div>
              <div class="box">
                <!--<img class="box_img" src="../../assets/img/recomend/0.png">-->
                <p class="text">Поддерживайте нормальную массу тела</p>
              </div>
              <div class="box">
                <!--<img class="box_img" src="../../assets/img/recomend/0.png">-->
                <p class="text">Выполняйте физические упражнения</p>
              </div>
            </div>
            <div class="container">
              <div class="box">
                <!--<img class="box_img" src="../../assets/img/recomend/0.png">-->
                <p class="text">Избегайте стресса</p>
              </div>
              <div class="box">
                <!--<img class="box_img" src="../../assets/img/recomend/0.png">-->
                <p class="text">Соблюдайте режим <br>сна и отдыха</p>
              </div>
              <div class="box">
                <!--<img class="box_img" src="../../assets/img/recomend/0.png">-->
                <p class="text">Откажитесь от курения <br>и алкоголя</p>
              </div>
            </div>
          </div>
        </div>
      <div v-if="this.diabet === 1">
        <hr>
        <div class="container container_title">
            <div class="block_img">
              <img src="../../assets/img/recomend/0.png">
            </div>
            <div class="block_text">
              <p class="text title">Уход за ногами</p>
            </div>
        </div>
        <div class="container">
          <div class="block_legs_add-list">
            <ul>
              <li class="text li_legs" v-for="item in legs" :key="item.message">
                  {{ item.message }}
                </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="this.type === 2">
        <p class="text ophtalmologist">Соблюдать гигиену зрения:</p>
        <div class="container">
            <div class="block_add-img">
              <img src="../../assets/img/specialist/6_ophtalmologist/2.png">
            </div>
            <div class="block_add-list">
              <ul>
                <li class="text li" v-for="item in items" :key="item.message">
                  {{ item.message }}
                </li>
              </ul>
            </div>
          </div>
      </div>
      <div v-if="this.type === 3">
        <p class="text ophtalmologist">Рекомендации:</p>
        <div class="container">
            <div class="block_add-img_dop_depr">
              <img src="../../assets/img/recomend/0.png">
            </div>
            <div class="block_add-list">
              <ul>
                    <li class="text li" v-for="item in depression" :key="item.message">
                      {{ item.message }}
                    </li>
                  </ul>
            </div>
          </div>
      </div>
    </div>
    <div>
      <button class="btn btn-dark-grad" v-on:click="print">Печать</button>
      <button class="btn btn-dark-grad" v-on:click="send">Отправить на почту</button>
      <button class="btn btn-yes-no" v-on:click="backView">Назад</button>
    </div>
    </div>
  <!--КНОПКА ПОДРОБНЕЕ-->
  <div v-if="this.type === 4">
      <div class="scroll">
        <div class="container">
        <div class="block_add-img_dop">
              <img src="../../assets/img/recomend/0.png">
            </div>
        <p class="text dop">Придерживайтесь здорового образа жизни:</p>
        </div>
        <div class="container">
            <div class="block_add-list_dop">
              <ul>
                <li class="text li">
                  Придерживаться принципам здорового питания
                  <ul>
                    <li class="text li_dop" v-for="item in health" :key="item.message">
                      {{ item.message }}
                    </li>
                  </ul>
                </li>
                <li class="text li">
                  Поддерживайте нормальную массу тела. Индекс массы тела  от 18.5 до 25
                </li>
                <li class="text li">
                  Выполняйте регулярные физические упражнения. 30 минут ходьбы в день + не менее 75 минут физической активности высокой интенсивности (плавание, бег) в неделю
                </li>
                <li class="text li">
                  Избегайте стрессовых ситуаций
                </li>
                <li class="text li">
                  Сохраняйте оптимизм. Учитесь радоваться жизни. Соблюдайте режим сна и отдыха
                </li>
                <li class="text li">
                  Отказаться от курения и приема алкоголя
                </li>
                <li v-if="this.reflux === true" class="text li">
                  Необходимо придерживаться дробного питания малыми порциями 5-6 раз в сутки
                </li>
              </ul>
            </div>
          </div>
      </div>
    <button class="btn btn-yes-no" v-on:click="backDis">Назад</button>
    </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'
import { getListRecomendFeetCare, getListRecomendOphtalmologist, getListRecomendHealth, getDepression } from '../../store/dataStorage/recomendations'

export default {
  name: 'recomend_view',
  data () {
    return {
      type: null,
      diabet: null,
      reflux: null,
      items: [
        {}
      ],
      legs: [
        {}
      ],
      health: [
        {}
      ],
      depression: [
        {}
      ],
      pre_state: null
    }
  },
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('ui', [
      'getRecomendType',
      'getRecomendDiabetes',
      'getCurrentDiseaseNumber'
    ]),
    ...mapGetters('engine', [
      'getPreStateName'
    ]),
    showComponent () {
      if (this.getStep === 'recomend_view') {
        this.reflux = false
        this.setItems()
        this.setLegs()
        this.setDepressionItems()
        this.loggingCurrentStateName()
      }
      return this.getStep === 'recomend_view'
    }
  },
  methods: {
    loggingCurrentStateName: function () {
      if (this.getCurrentDiseaseNumber === 1) {
        this.reflux = true
      }
      if (this.getPreStateName === 'DISEASE_RESULT') {
        this.pre_state = 'DISEASE_RESULT'
      } else {
        if (this.getPreStateName === 'SPECIALIST_QUEST') {
          this.pre_state = 'SPECIALIST_QUEST'
        } else {
          if (this.getPreStateName === 'DIABETES') {
            this.pre_state = 'DIABETES'
          }
        }
      }
      this.type = this.getRecomendType
      this.diabet = this.getRecomendDiabetes
      // console.log(this.getPreStateName)
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/setPreStateName', {
        meta: { eventId },
        data: 'RECOMEND_VIEW'
      })
    },
    setItems: function () {
      this.items = [{}]
      for (let i = 0; i < 5; i++) {
        this.items.push({
          message: getListRecomendOphtalmologist(i)
        })
      }
    },
    setLegs: function () {
      this.legs = [{}]
      for (let i = 0; i < 13; i++) {
        this.legs.push({
          message: getListRecomendFeetCare(i)
        })
      }
    },
    setDepressionItems: function () {
      this.depression = [{}]
      for (let i = 0; i < 5; i++) {
        this.depression.push({
          message: getDepression(i)
        })
      }
    },
    getInfo: function () {
      this.type = 4
      this.diabet = 0
      // console.log('nfvgjgnvsk')
      // console.log(this.type)
      this.setHealth()
    },
    setHealth: function () {
      this.health = [{}]
      for (let i = 0; i < 3; i++) {
        this.health.push({
          message: getListRecomendHealth(i)
        })
      }
      // console.log(this.health)
    },
    backView: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: this.pre_state
      })
    },
    backDis: function () {
      this.type = this.getRecomendType
      this.diabet = this.getRecomendDiabetes
    },
    print: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('app/set_create_talon', {
        meta: { eventId },
        data: true
      })
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'MAIN_VIEW'
      })
    },
    send: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('engine/handlerClickMoveToState', {
        meta: { eventId },
        data: 'MAIL_VIEW'
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
      width: 1000px;
      height: auto;
      display: flex;
      text-align: center;
      // margin: 30px;
      margin-bottom: 15px;
      // border: 2px solid olive;
      &_title {
        // text-align: center;
        // margin-left: 60px;
        width: 100%;
        // padding: 10px 25px 10px 25px;
        background: #EAE8E8;
        border-radius: 14px;
      }

      /*
      &_title:hover {
        background: #F9F9F9;
        cursor: pointer;
      }
      */
    }

    #healthInfo:hover {
      background: #F9F9F9;
        cursor: pointer;
    }
    .btn {
      width: 300px;
      height: 70px;
      font-size: 20px;
      font-weight: 700;
      padding: 20px;
      margin: 15px;
    }
    .btn-next {
      width: 170px;
      height: 50px;
      margin: auto;
      margin-right: 15px;
      font-size: 22px;
      font-weight: 300;
    }
  }

  h1 {
    margin-top: -100px;
  }

  hr {
    border: 2px solid #B1A7A6;
  }

  .title {
    font-size: 26px;
    font-weight: 700;
    text-align: center;
  }

  .box {
    width: 300px;
    height: 140px;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid #B1A7A6;
    // background: #EAE8E8;
    border-radius: 10px;
    margin: 5px 10px 0 10px;
    padding: 15px;

    &_img {
      width: 60px;
      height: auto;
      margin-top: 15px;
    }

  }

.scroll {
  width: auto;
  height: 490px;
  // text-align: center;
  scrollbar-width: thin;          /* "auto" или "thin" */
  overflow: scroll; /* Добавляем полосы прокрутки */
  padding: 0 30px 0px 30px;
  margin-bottom: 10px;
  margin-top: -40px;
  // border: 2px solid #B1A7A6;
  border-radius: 10px;
}

  .scroll::-webkit-scrollbar {
    width: 15px;
  }

  .scroll::-webkit-scrollbar-track {
    background: rgb(255, 255, 255);
  }

  .scroll::-webkit-scrollbar-thumb {
    background-color: #691B26;    /* цвет бегунка */
  border-radius: 20px;       /* округлось бегунка */
  border: 2px solid #3E0E14;  /* отступ вокруг бегунка */
  }

  .ophtalmologist {
    font-size: 26px;
    font-weight: 700;
    text-align: left;
  }

  .dop {
    font-size: 26px;
    font-weight: 700;
    text-align: left;
    margin-top: 50px;
  }

  .block {
      width: 100%;
      height: auto;
      display: inline-block;
      text-align: center;

      &_add-img {
        width: 250px;
        height: 200px;
        padding-left: 50px;
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &_dop {
          width: 120px;
        height: auto;
        padding-right: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &_depr {
          width: 230px;
        height: 200px;
        padding-right: 50px;
        padding-top: 50px;
        display: flex;
        }
        }
      }

      &_add-list {
        width: 100%;
        text-align: left;
        margin-left: 50px;

        &_dop {
          width: 100%;
        text-align: left;
        margin: 0;
        }
      }

      &_legs {
        width: auto;
      height: auto;
      // text-align: center;
      // border: 2px solid red;

      &_add-list {
        width: 100%;
        text-align: left;
        // border: 2px solid green;
      }
      }

      &_img {
        width: 60px;
        height: auto;
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        align-items: center;
        margin: 10px 25px 10px 25px;
        // border: 2px solid red;
      }

      &_text {
        width: 100%;
        text-align: center;
        // margin-top: 10px;
      }
    }

  img {
    width: 100%;
    height: 100%;
  }

  ul {
    width: auto;
    height: auto;
    // border: 2px solid blue;
  }
  .li {
      margin: 15px;
      font-size: 20px;
      // text-align: left;
      list-style: none;

      &_legs {
      margin: 15px;
      font-size: 20px;
      // text-align: left;
      list-style: none;
      }

      &_dop {
        margin: 15px;
        font-size: 18px;
        list-style:none;
      }
    }

</style>
