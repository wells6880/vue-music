<template>
  <v-scroll :data="data" class="listview">
    <ul>
      <li class="list-group" v-for="group in data">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="item in group.items">
            <img class="singer-img" v-lazy="item.avatar">
            <p class="singer-name">{{item.name}}</p>
          </li>
        </ul>
      </li>
    </ul>
    <!--<ul class="list-shortcut">-->
      <!--<li class="list-shortcut-item" v-for="item in shortcutList">{{item}}</li>-->
    <!--</ul>-->
  </v-scroll>

</template>

<script>
import vScroll from '../../base/scroll/scroll'

export default {
  components: {
    vScroll
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((item) => {
        return item.title.substr(0,1)
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import  '../../common/stylus/config.styl'

.listview
  .list-group
    .list-group-title
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
      line-height: 30px
      padding-left: 20px
    .list-group-item
      height: 60px
      display: flex
      align-items: center
      padding: 10px
      .singer-img
        width: 50px
        height: 50px
        border-radius: 50%
        flex: 0 0 50px
        margin: 0 20px
      .singer-name
        font-size: $font-size-medium
        color: $color-text-l
        flex: 1
</style>
