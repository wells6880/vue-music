<template>
  <div class="loading">
    <img class="loading-gif" src="./loading.gif">
    <p class="loading-text">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/config.styl"
.loading
  text-align: center
  .loading-gif
    width: 24px
    height: 24px
  .loading-text
    line-height: 20px
    font-size: $font-size-small
    color: $color-text-l
</style>
