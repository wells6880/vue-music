<template>
  <transition name="slide">
    <v-music-list :title="title" :bgImg="bgImg" :songs="songs"></v-music-list>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from "../../api/singer"
  import {ERR_OK} from "../../api/config"
  import vMusicList from '../../base/music-list/music-list'
  import {createSong} from '../../common/js/song'

  export default {
    components: {
      vMusicList
    },
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.singer.name
      },
      bgImg() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getSingerDetail()
    },
    methods: {
      _getSingerDetail() {
        if (!this.singer.id) {
          this.$router.push({
            path: '/singer'
          })
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style lang='stylus' scoped>

</style>
