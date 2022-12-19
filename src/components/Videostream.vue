<template>
  <div class="general-selector">
    <div class="general-selector__refresh" @click="refreshVideostream">
      <div class="general-selector__refresh__icon">
        <img class="refresh" src="../assets/img/global/refresh.png">
      </div>
      <div class="general-selector__refresh__text" :style="getLoadAppSettings && { ...getLoadAppSettings.refreshText }">Обновить</div>
    </div>
    <img
      class="general-selector__videostream"
      :src="videoSrc"
      @click="faceRecognizeGeneralTouchRequest"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'videostream',
  data () {
    return {
      videoSrc: 'http://localhost:8070/stream?topic=/facerecognition/image_raw&type=ros_compressed'
    }
  },
  computed: {
    ...mapGetters('app', [
      'getLoadAppSettings'
    ])
  },
  methods: {
    ...mapActions('handlers', [
      'faceRecognizeGeneralTouchRequest'
    ]),
    refreshVideostream () {
      this.videoSrc = ''
      setTimeout(() => {
        this.videoSrc = 'http://localhost:8070/stream?topic=/facerecognition/image_raw&type=ros_compressed'
      }, 100)
    }
  }
}
</script>
<style lang="scss" scoped>
  .general-selector {
    position: relative;
    &__videostream {

    }
    &__refresh {
      position: absolute;
      top: 16px;
      left: 84px;
      display: flex;
      align-items: center;
      border-radius: 32px;
      padding: 12px 20px 12px 12px;
      background-color: #ffffff;
      &__icon {
        display: inline-flex;
        margin-right: 10px;
        width: 32px;
        height: 32px;
      }
      &__text {
        display: inline-flex;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
      }
    }
  }
</style>
