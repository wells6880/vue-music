<template>
  <div class="tab">
    <router-link to="/recommend" class="tab-item" tag="div">
      <span class="tab-item-text">推荐</span>
    </router-link>
    <router-link to="/singer" class="tab-item" tag="div">
      <span class="tab-item-text">歌手</span>
    </router-link>
    <router-link to="/charts" class="tab-item" tag="div">
      <span class="tab-item-text">排行榜</span>
    </router-link>
    <router-link to="/search" class="tab-item" tag="div">
      <span class="tab-item-text">搜索</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">

export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/config.styl"

.tab
  display: flex
  text-align: center
  line-height: 44px
  .tab-item
    flex: 1
    display: inline-block
    font-size: $font-size-medium
    &.router-link-active
      .tab-item-text
        padding: 0 5px 5px
        color: $color-theme
        border-bottom: 2px solid $color-theme
</style>
