<template>
  <transition name="slide">
    <div class="singer-detail">
      i am
    </div>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from "../../api/singer";
  import {ERR_OK} from "../../api/config";

  export default {
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getSingerDetail()
    },
    methods: {
      _getSingerDetail() {
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data.list)
          }
        })
      }
    }
  }

</script>

<style lang='stylus' scoped>
  @import '../../common/stylus/config.styl'
  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
</style>
