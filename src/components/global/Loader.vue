<template>
    <styled-loader :loaderClassName="pre" :styles="styles" :class="`${pre}`">
        <div :class="`${pre}__content`" v-if="content" v-html="content"></div>
        <div :class="`${pre}__segment`"/>
        <div :class="`${pre}__segment`"/>
        <div :class="`${pre}__segment`"/>
        <div :class="`${pre}__segment`"/>
    </styled-loader>
</template>

<script>
import StyledLoader from '@/components/styled/loader'

export default {
  name: 'Loader',
  props: [
    'content',
    'styles'
  ],
  components: { StyledLoader },
  data () {
    return {
      pre: 'loader'
    }
  }
}
</script>
