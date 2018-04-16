<template>
  <v-scroll :data="data" class="listview" ref="listview" :probe-type="probeType" :listen-scroll="listenScroll"
            @scroll="scroll">
    <ul>
      <li class="list-group" v-for="group in data" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="item in group.items">
            <img class="singer-img" v-lazy="item.avatar">
            <p class="singer-name">{{item.name}}</p>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="list-shortcut" @touchstart="onShorcutTouchStart" @touchmove="onShorcutTouchMove">
      <li class="list-shortcut-item" v-for="(item,index) in shortcutList" :data-index="index"
          :class="{active: activeIdx === index}">{{item}}
      </li>
    </ul>
    <div class="list-fixed" v-show="fixedTitle" ref="listFixed">
      <h2>{{fixedTitle}}</h2>
    </div>
  </v-scroll>

</template>

<script>
  import vScroll from '../../base/scroll/scroll'
  import {getData} from "../../common/js/dom";

  const SHORCUT_HEIGHT = 18
  const LIST_TITLE_HEGHTI = 30

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
    data() {
      return {
        probeType: 3,
        listenScroll: true,
        touch: {},
        activeIdx: 0,
        scrollY: 0,
        diff: 0
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((item) => {
          return item.title.substr(0, 1)
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return
        }
        return this.data[this.activeIdx] ? this.data[this.activeIdx].title : ''
      }
    },
    created() {
      // this.probeType = 3
      // this.listenScroll = true
    },
    methods: {
      onShorcutTouchStart(e) {
        let activeIdx = parseInt(getData(e.target, 'index'))
        this._scrollTo(activeIdx)

        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.activeIdx = activeIdx
      },
      onShorcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let moveSpace = (this.touch.y2 - this.touch.y1) / SHORCUT_HEIGHT | 0
        let activeIdx = this.touch.activeIdx + moveSpace
        this._scrollTo(activeIdx)
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      _scrollTo(idx) {
        if (!idx && idx === 0) {
          return
        }
        if (idx < 0) {
          idx = 0
        }
        else if (idx > this.listHeight.length - 2) {
          idx = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[idx]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[idx], 0)
      },
      _clacHeight() {
        this.listHeight = []
        let height = 0
        this.listHeight.push(height)
        const list = this.$refs.listGroup
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._clacHeight()
        },20)
      },
      scrollY(newY) {
        const listHeihgt = this.listHeight
        //列表顶部向上滑动
        if (newY > 0) {
          this.activeIdx = 0
          return
        }
        //列表向下滑动，且不在底部
        for (let i = 0; i < listHeihgt.length - 1; i++) {
          let height1 = listHeihgt[i]
          let height2 = listHeihgt[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.activeIdx = i
            this.diff = height2 + newY
            return
          }
        }
        //列表底部向下滑动
        this.activeIdx = listHeihgt.length - 2
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < LIST_TITLE_HEGHTI) ? newVal - LIST_TITLE_HEGHTI : 0

        //在fixedTop值无变化时，不进行DOM操作，性能优化
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop

        // this.$refs.listFixed.style.transform = `translateY(${fixedTop}px)`
        // this.$refs.listFixed.style.top = `${fixedTop}px`
        //使用GPU加速
        this.$refs.listFixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/config.styl'

  .listview
    position: relative
    .list-group
      .list-group-title
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
        line-height: 30px
        padding-left: 20px
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        &:last-child
          padding: 20px 0 20px 30px
        .singer-img
          width: 50px
          height: 50px
          border-radius: 50%
          flex: 0 0 50px
          margin-right: 20px
        .singer-name
          font-size: $font-size-medium
          color: $color-text-l
          flex: 1
    .list-shortcut
      width: 20px
      height: 75%
      border-radius: 10px
      padding: 20px 0
      position: absolute
      top: 0
      bottom: 0
      right: 0
      margin: auto
      background: $color-background-d
      display: flex
      flex-direction: column
      text-align: center
      .list-shortcut-item
        padding: 3px
        font-size: $font-size-small
        color: $color-text-l
        &.active
          color: $color-theme
    .list-fixed
      width: 100%
      position: absolute
      top: 0
      left: 0
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
      line-height: 30px
      padding-left: 20px
</style>
