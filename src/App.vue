<template>
  <div id="id">
    <v-header></v-header>
    <v-tab></v-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import vHeader from './components/header/header.vue';
  import vTab from './components/tab/tab.vue';

export default {
  components:{
    vHeader,
    vTab
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
