<template>
  <div class="scroll-wrapper" ref="scrollWrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    },20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.scrollWrapper) {
        return
      }
      this.scrollWrapper = new BScroll(this.$refs.scrollWrapper,{
        probeType: this.probeType,
        click: this.click
      })
    },
    enable() {
      this.scrollWrapper && this.scrollWrapper.enable()
    },
    disable() {
      this.scrollWrapper && this.scrollWrapper.disable()
    },
    refresh() {
      this.scrollWrapper && this.scrollWrapper.refresh()
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.scrollWrapper.refresh()
      },20)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.scroll-wrapper
  height: 100%
  overflow: hidden
</style>
