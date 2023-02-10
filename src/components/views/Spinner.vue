<template>
  <div class="spinner" v-show="getSpinnerEnabled">
        <img class="spinner_gif" src="dialog-images/spinner_v3.gif"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Spinner',
  computed: mapGetters('ui', [
    'getSpinnerEnabled'
  ])
}
</script>

<style lang="scss">
.spinner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 765px;
  z-index: 2147483600;

  display: flex;
  justify-content: center;
  align-items: center;

  .spinner_gif {
    z-index: 2147483601;
    width: 238px;
    height: 238px;
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
