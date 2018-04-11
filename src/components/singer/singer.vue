<template>
    <div class="singer" @click="selectSinger">
        i am singer
        <v-singer-detail v-if=""></v-singer-detail>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapMutations} from 'vuex'
import vSingerDetail from '../singer-detail/singer-detail'

export default {
    components: {
        vSingerDetail
    },
    created() { 
        
    },
    methods: {
        selectSinger() {
            this.setSinger('zhou')
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        })
    }
    
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
