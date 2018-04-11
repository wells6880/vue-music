<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="slider-dots">
      <span class="dot" :class="{active: index === currentIndex}" v-for="(item,index) in dots"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClsName} from "../../common/js/dom";

export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      dots: [],
      currentIndex: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if(this.autoPlay) {
        this._play()
      }
    }, 20)

    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  activated() {
    this.autoPlay && this._play()
  },
  deactivated() {
    clearTimeout(this.timer)
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClsName(child,'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }

      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }

      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider,{
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400,
        click: true
      })

      this.slider.on('scrollEnd', () => {
        let currentPage = this.slider.getCurrentPage().pageX
        if(this.loop) {
          currentPage -= 1
        }
        this.currentIndex = currentPage

        if(this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })

      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _play() {
      let nextIndex = this.currentIndex + 1

      if(this.loop) {
        nextIndex += 1
      }

      this.timer = setTimeout(() => {
        this.slider.goToPage(nextIndex,0,400)
      },this.interval)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/config.styl"

.slider
  min-height: 1px
  position: relative
  overflow: hidden
  .slider-group
    position: relative
    .slider-item
      display: inline-block
      a
        display: inline-block
        width: 100%
        img
          width: 100%
  .slider-dots
    position: absolute
    left: 0
    right: 0
    bottom: 12px
    text-align: center
    font-size: 0
    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background: $color-text-l
      &.active
        width: 20px
        border-radius: 5px
        background: $color-text-ll
</style>
