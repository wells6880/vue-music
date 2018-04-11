<template>
  <div class="recommend">
    <v-scroll ref="scroll" :data="discList" class="scroll">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <v-slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImg" :src="item.picUrl" alt="pic">
              </a>
            </div>
          </v-slider>
        </div>
        <div class="recommend-list">
          <h3 class="list-title">热门歌单推荐</h3>
          <ul class="list-content">
            <li class="item" v-for="item in discList">
              <div class="icon">
                <img v-lazy="item.imgurl" alt="icon">
              </div>
              <div class="text">
                <h4 class="disc">{{item.dissname}}</h4>
                <div class="creator-name">{{item.creator.name}}</div>
              </div>
            </li>
          </ul>
          <p class="list-end">暂无更多推荐</p>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <v-loading></v-loading>
      </div>
    </v-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import { ERR_OK } from "../../api/config"
import { getRecommend, getDiscList} from "../../api/recommend"
import vScroll from '../../base/scroll/scroll'
import vSlider from '../../base/slider/slider'
import vLoading from '../../base/loading/loading'

export default {
  components: {
    vScroll,
    vSlider,
    vLoading
  },
  data() {
    return {
      recommends: [],
      discList: []
    };
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      });
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    loadImg() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  },

};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import  '../../common/stylus/config.styl'

.recommend
  position: absolute
  width: 100%
  top: 88px
  bottom: 0
  .scroll
    height: 100%
    overflow: hidden
    .recommend-list
      .list-title
        text-align: center
        color: $color-theme
        font-size: $font-size-medium
        line-height: 44px
      .list-content
        .item
          display: flex
          width: 90%
          margin: 0 auto 20px
          &:last-child
            margin: 0 auto
          .icon
            img
              width: 60px
              height: 60px
              flex: 0 0 60px
              margin-right: 20px
          .text
            flex: 1
            font-size: $font-size-medium
            .disc
              color: $color-text
              margin-top: 10px
            .creator-name
              color: $color-text-d
              margin-top: 15px
      .list-end
        text-align: center
        font-size: $font-size-small
        color: $color-text-l
        height: 50px
        line-height: 50px
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
