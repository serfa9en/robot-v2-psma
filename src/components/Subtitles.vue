<template>
  <div>
    <div class="subtitles-component"
      :style="[mainStyle]"
    >
      <div id="subtitles-component" class="subtitles-component__text"
        :style="[textStyle, calcFontSize]"
      >
        {{ trimmedText }}
      </div>
    </div>
    <input class="test-input" v-if="dev" type="text" v-model="text">
  </div>
</template>

<script>
export default {
  name: 'subtitles',
  props: {
    dev: {
      type: Boolean,
      default: false
    },
    subtitles: {
      type: String,
      default: ''
    },
    // Sizes of Font for change
    sizes: {
      type: Array,
      default: () => {
        return [14, 12, 10]
      }
    },
    // Styles
    mainStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    textStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      $div: null,
      line: null,
      maxLength: null,
      // For dev mode
      text: ''
    }
  },
  watch: {
    trimmedText (val) {
      if (val) {
        this.$div.textContent = val
      } else {
        this.$div.textContent = ''
      }

      // TODO
      // Избавиться от привязки по id элемента
      if (document.getElementById('subtitles-component')) {
        let sw = document.getElementById('subtitles-component').clientWidth
        this.line = Math.ceil(this.$div.clientWidth / sw) > 1
          ? Math.ceil(this.$div.clientWidth / sw)
          : 1
      } else {
        this.line = 1
      }

      if (process.env.NODE_ENV === 'development') {
        if (this.dev === true) {
          // console.log('line count:', this.line)
        }
      }
    }
  },
  computed: {
    calcFontSize () {
      let text = this.subtitles

      //    if (process.env.NODE_ENV === 'development') {
      //      if (this.dev === true) {
      //        text = this.text
      //      }
      //    }
      //    return {'font-size': `${this.sizes[ this.line - 1 ]}px`}
      if (text && text.length > 135) {
        return { 'font-size': '15px' }
      } else {
        return { 'font-size': '22px' }
      }
    },
    trimmedText () {
      let text = this.subtitles

      if (process.env.NODE_ENV === 'development') {
        if (this.dev === true) {
          text = this.text
        }
      }

      if (text && (text.length > this.maxLength)) {
        return text.slice(0, this.maxLength) + '...'
      }
      return text
    }
  },
  mounted () {
    // TODO
    // Избавиться от привязки к body.
    // Пробовал обернуть $div в $wrapper, но
    // при $wrapper.width 100%/px съедает всю память
    document.body.style.overflow = 'hidden'

    this.$div = document.createElement('div')

    this.$div.style.fontSize = this.sizes[0] + 'px'
    this.$div.style.position = 'absolute'
    this.$div.style.top = '0'
    this.$div.style.whiteSpace = 'nowrap'
    this.$div.style.width = 'auto'
    this.$div.style.minWidth = '100%'
    this.$div.style.height = 'auto'
    this.$div.style.visibility = 'hidden'

    if (process.env.NODE_ENV === 'development') {
      if (this.dev === true) {
        this.$div.style.visibility = 'initial'
      }
    }

    document.body.appendChild(this.$div)

    let line = 0

    while (line <= this.sizes.length) {
      this.$div.textContent = this.$div.textContent + ' w'

      // TODO
      // Избавиться от привязки по id элемента
      if (document.getElementById('subtitles-component')) {
        let sw = document.getElementById('subtitles-component').clientWidth
        line = Math.ceil(this.$div.clientWidth / sw) > 1
          ? Math.ceil(this.$div.clientWidth / sw)
          : 0
      }
    }

    // -10% чтобы не вылазил в 3 строки.
    // TODO
    // Исправить это
    // this.maxLength = Math.round(this.$div.textContent.length - (this.$div.textContent.length * 0.1))
    this.maxLength = 190

    if (process.env.NODE_ENV === 'development') {
      if (this.dev === true) {
        // console.log('max length:', this.maxLength)
      }
    }

    this.$div.textContent = ''
  },
  destroyed () {
    this.$div.remove()
  }
}
</script>

<style lang="scss">
.subtitles-component {
  position: relative;
  z-index: 100;
  // margin: 15px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1115px;

  &__text {
    text-align: center;
    user-select: none;
    width: 1115px;
  }
}

.test-input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
}
</style>
