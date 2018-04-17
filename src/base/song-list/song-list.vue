<template>
  <div class="song-list">
    <ul>
      <li class="song-list-item" v-for="item in songs">
        <div class="song-content">
          <h2 class="name">{{item.name}}</h2>
          <p class="info">{{songInfo(item)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      }
    },
    computed: {},
    methods: {
      songInfo(item) {
        return `${item.singer} · ${item.album}`
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/config.styl'

  .song-list
    .song-list-item
      padding: 20px
      .song-content
        .name
          font-size: $font-size-medium
          color: $color-text-ll
        .info
          font-size: $font-size-medium
          color: $color-text-l
          margin-top: 10px
</style>
