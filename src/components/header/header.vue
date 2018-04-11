<template>
  <div class="header">
    <i class="header-logo"></i>
    <h1 class="header-text">music</h1>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin.styl"
@import "../../common/stylus/config.styl"

.header
  height: 44px
  text-align: center
  .header-logo
    display:inline-block
    width: 30px
    height: 32px
    bg-img('logo')
    background-size 30px 32px
    margin: 6px 10px 0 0
    vertical-align: top
  .header-text
    display: inline-block
    line-height: 44px
    color: $color-theme
    font-size 20px
    vertical-align: top
</style>
