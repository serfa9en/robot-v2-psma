<template>
    <div v-if="getDescriptionEnabled" class="description">
        <div class="content">
          <div class="conteiner">
            <div class="button-block">
              <button v-on:click="close">
                <img class="icon" src="../../../public/dialog-images/close.png" alt="">
              </button>
            </div>
            <div class="description-text">
              <h1>{{ this.getDescription }}</h1>
              <!--<img src="../../../public/dialog-images/information.png">-->
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { EventInitiatorTypes, EventTypes } from 'promobot-logger'

export default {
  name: 'Description',
  computed: mapGetters('ui', [
    'getDescriptionEnabled',
    'getDescription'
  ]),
  methods: {
    close: function () {
      let eventId = global.logger.logEvent(EventInitiatorTypes.USER, EventTypes.CLICK)
      this.$store.dispatch('ui/setDescriptionEnabled', {
        meta: { eventId },
        data: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.description {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 765px;
  z-index: 2147483600;

  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    width: 800px;
    height: 500px;
    background: #FFFFFF;
    z-index: 2147483601;
    display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  .conteiner {
    width: 100%;
    height: 100%;
  }

  .button-block {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content:flex-end;
    align-items: center;
  }

  button {
    width: 60px;
    height: 60px;
    border: none;
    background: #FFFFFF;
    margin-right: 10px;
    margin-top: 30px;
    cursor: pointer;
  }

  .icon {
    width: 50px;
    height: auto;
  }

  .description-text {
    width: 750px;
    height: 400px;
    display: flex;
    justify-content:center;
    align-items: center;
    // border: #ff0519 solid 2px;
    margin-left: 25px;
  }

  h1 {
    color: #3E0E14;
  }

}

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 765px;
    z-index: 1200;
    background-color: rgba(0, 0, 0, 0.5);
      // filter: blur(10px);
  }
}
</style>
