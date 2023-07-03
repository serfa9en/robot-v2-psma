<template>
    <div  v-show="showComponent" class="settings">
      <!--<h1 class="text">Рекомендации</h1>-->
      <div class="scroll">
      <div v-if="this.type0">
          <div class="container container_title">
            <div class="block_img">
              <img src="../../assets/img/recomend/0.png">
            </div>
            <div class="block_text">
              <p class="text title">Придерживайтесь здорового образа жизни </p>
            </div>
          </div>
          <div>
            <div class="container">
              <div class="box">
                <!--<img class="box_img" src="../../assets/img/recomend/0.png">-->
                <p class="text">Придерживайтесь принципам здорового питания</p>
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
                <p class="text">Соблюдайте режим сна и отдыха</p>
              </div>
              <div class="box">
                <!--<img class="box_img" src="../../assets/img/recomend/0.png">-->
                <p class="text">Откажитесь от курения и алкоголя</p>
              </div>
            </div>
          </div>
      </div>
      <div v-if="this.type1">
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
      <div v-if="this.type2">
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
    </div>
      <button class="btn btn-dark-grad" v-on:click="backView">Назад</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'
import { getListRecomendFeetCare, getListRecomendOphtalmologist } from '../../store/dataStorage/recomendations'

export default {
  name: 'recomend_view',
  data () {
    return {
      type0: null,
      type1: null,
      type2: null,
      items: [
        {}
      ],
      legs: [
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
      'getRecomendType0',
      'getRecomendType1',
      'getRecomendType2'
    ]),
    ...mapGetters('engine', [
      'getPreStateName'
    ]),
    showComponent () {
      if (this.getStep === 'recomend_view') {
        this.type0 = this.getRecomendType0
        this.type1 = this.getRecomendType1
        this.type2 = this.getRecomendType2
        this.pre_state = this.getPreStateName
        this.setItems()
        this.setLegs()
        this.loggingCurrentStateName()
      }
      return this.getStep === 'recomend_view'
    }
  },
  methods: {
    loggingCurrentStateName: function () {
      console.log(this.getPreStateName)
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
    backView: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      if (this.pre_state === 'DISEASE_RESULT') {
        this.$store.dispatch('engine/handlerClickMoveToState', {
          meta: { eventId },
          data: 'DISEASE_RESULT'
        })
      } else {
        if (this.pre_state === 'SPECIALIST_QUEST') {
          this.$store.dispatch('engine/handlerClickMoveToState', {
            meta: { eventId },
            data: 'SPECIALIST_QUEST'
          })
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

  .container {
      width: 900px;
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
        // background: #EAE8E8;
        border-radius: 14px;
      }
    }
    .btn {
      width: 300px;
      height: 70px;
      font-size: 26px;
      font-weight: 700;
      margin-top: 0px;
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
    height: 160px;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid #B1A7A6;
    // background: #EAE8E8;
    border-radius: 10px;
    margin: 5px 10px 0 10px;

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
  margin-bottom: 20px;
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
      }

      &_add-list {
        width: 100%;
        text-align: left;
        margin-left: 50px;
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
    }

</style>
