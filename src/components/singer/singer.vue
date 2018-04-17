<template>
  <div class="singer">
    <v-listview :data="singers" @select="selectSinger"></v-listview>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSingerList} from '../../api/singer'
  import {ERR_OK} from "../../api/config"
  import Singer from '../../common/js/singer'
  import vListview from '../../base/listview/listview'
  import vSingerDetail from '../singer-detail/singer-detail'
  import {mapMutations} from 'vuex'

  const HOT_NAME = '热门'
  const HOT_SINGERS_LENGTH = 10

  export default {
    components: {
      vSingerDetail,
      vListview
    },
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSingers(res.data.list)
          }
        })
      },
      _normalizeSingers(list) {
        /*歌手分类*/
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          //hot分类
          if (index < HOT_SINGERS_LENGTH) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          //姓名大写字母分类
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        /*歌手排序*/
        let hot = []
        let rest = []
        for (let key in map) {
          if (map[key].title === HOT_NAME) {
            hot.push(map[key])
          }
          else {
            rest.push(map[key])
          }
        }
        rest.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(rest)
      },
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
