<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-img" :style="bgStyle" ref="bgImg"></div>
    <v-scroll :data="songs" class="list" ref="list">
      <v-song-list :songs="songs"></v-song-list>
    </v-scroll>
  </div>
6</template>

<script>
  import vScroll from '../../base/scroll/scroll'
  import vSongList from '../../base/song-list/song-list'

  export default {
    components: {
      vScroll,
      vSongList
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      bgImg: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      }
    },
    computed: {
      bgStyle() {
        return `background-image:url("${this.bgImg}")`
      }
    },
    mounted() {
      this.imgHeight = this.$refs.bgImg.clientHeight
      this.$refs.list.$el.style.top = `${this.imgHeight}px`
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/config.styl'
  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position: absolute
      top: 20px
      left: 20px
      color: $color-theme
      font-size: $font-size-large-x
      z-index: 10
    .title
      position: absolute
      top: 0
      left: 0
      right: 0
      margin: auto
      color: $color-text-ll
      font-size: $font-size-large
      line-height: 20px
      text-align: center
      z-index: 10
    .bg-img
      position: absolute
      top: 0
      width: 100%
      height: 0
      padding-top: 70%
      background-size: cover
      background-repeat: no-repeat
    .list
      position: absolute
      top: 0
      width: 100%
</style>
