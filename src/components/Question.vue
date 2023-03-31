<template>
  <transition name="scale">
    <div v-if="getDialogQuestion" class="question-container">
      <div class="window">
        <div class="header">
          <div class="question">
            {{ getDialogQuestion.text }}
          </div>
          <!-- Улетает в лингву, чтобы убить вопрос -->
          <button @click="clickAnswer" class="close"></button>
        </div>
        <div class="button-container">
          <button :style="buttonStyle" class="button button_view_primary"
            v-for="(answer, index) in getDialogQuestion.answers"
            :key="index"
            @click="clickAnswer"
          >
            {{ answer }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'question-component',
  computed: {
    ...mapGetters('app', [
      'getLoadAppSettings'
    ]),
    ...mapGetters('robot', [
      'getDialogQuestion'
    ]),
    buttonStyle () {
      return this.getLoadAppSettings ? { ...this.getLoadAppSettings.btnMain } : {
        background: '#2589DE',
        borderColor: '#2589DE'
      }
    }
  },
  methods: {
    ...mapActions('robot', [
      'clickAnswer'
    ])
  }
}
</script>

<style lang="scss" scoped>
.question-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#2d2e38, .8);
  z-index: 2000000;
  display: flex;
  justify-content: center;
  align-items: center;
  .window {
    position: relative;
    display: inline-block;
    max-width: 1080px;
    min-width: 650px;
    min-height: 300px;
    background-color: #fff;
    border-radius: 5px;
    padding: 35px;
    margin: 0;
    box-sizing: border-box;
    text-align: center;
    .header {
      text-align: center;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 30px;
      line-height: 35px;
      color: #464646;
      padding: 0;
      margin: 0 0 40px;
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      opacity: 0.3;
      z-index: 2010;
      width: 50px;
      height: 50px;
      background: transparent;
      border: 0;
    }
    .close:hover {
      opacity: 1;
    }
    .close:before, .close:after {
      position: absolute;
      left: 15px;
      content: '';
      height: 33px;
      width: 2px;
      background-color: #333;
      margin: -15px 0 0 8px;
    }
    .close:before {
      transform: rotate(45deg);
    }
    .close:after {
      transform: rotate(-45deg);
    }
    .button-container button {
      display: inline-block;
      background: transparent;
      border: 1px solid transparent;
      box-sizing: border-box;
      border-radius: 2px;
      padding: 16px 25px;
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: 22px;
      line-height: 26px;
      color: #fff;
      margin: 10px;
      min-width: 260px;
      max-width: 360px;
      text-align: center;
      cursor: pointer;
    }
  }
}

</style>
