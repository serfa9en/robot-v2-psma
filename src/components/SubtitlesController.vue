<template>
  <Subtitles
    :dev="false"
    :subtitles="getSubtitlesText"
    :sizes="[15, 15]"
    :mainStyle="mainStyle"
    :textStyle="textStyle"
  />
</template>

<script>
import { mapGetters } from 'vuex'

import Subtitles from '@/components/Subtitles'

export default {
  name: 'subtitles-controller',
  components: {
    Subtitles
  },
  computed: {
    ...mapGetters('ui', [
      'getSubtitlesText'
    ]),
    mainStyle () {
      return {
        'max-width': '800px',
        'margin': '0 auto',
        'max-height': '50px',
        'padding': '0',
        'vertical-align': 'top'
      }
    },
    textStyle () {
      return {

      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
