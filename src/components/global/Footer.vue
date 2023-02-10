<template>
    <div class="settings" v-show= true>
        <div class="settings-subtitles__wrapper footer">
            <div class="settings-subtitles__text">
            </div>
            <div class="settings-subtitles__abort-talk">
                <span class="microphone mic-background">
                    <img src='../../assets/img/global/mic.png' class="icon">
                </span>
                <span class="right-text text">Прервать</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'footer-component',
  computed: {
    ...mapGetters('app', [
      'getStep'
    ]),
    ...mapGetters('ui', [
      'getFooterEnabled'
    ])
  }
}
</script>

<style lang="scss" scoped>
.settings {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 2000;
    height: 96px;
    max-height: 105px;
    border-top: 1px solid #ccc;
    box-sizing: border-box;
    display: flex;
    flex-flow: wrap row;
    justify-content: center;
    align-content: flex-start;
    padding: 20px 50px;
    background: #fff;
    &-subtitles {
      &__wrapper {
        height: 65px;
        max-height: 65px;
        border-radius: 2px;
        width: 100%;
        padding: 10px 150px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &__text {
        max-height: 100%;
        overflow: hidden;
        text-align: center;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 23px;
      }
      .button_ghost {
        opacity: 0.5;
        pointer-events: none;
      }
      &__abort-talk {
        position: absolute;
        top: 20px;
        right: 50px;
        z-index: 10;
        display: inline-block;
        cursor: pointer;
        padding: 15px;
        .microphone {
            display: inline-block;
            vertical-align: middle;
            text-align: center;
            height: 32px;
            width: 32px;
            border-radius: 100px;
            margin-right: 8px;
        }
        .icon {
          margin-top: 5px;
        }
        .right-text {
            display: inline-block;
            vertical-align: middle;
            font-size: 18px;
            line-height: 21px;
            margin-right: 6px;
        }
      }
    }
}
</style>
