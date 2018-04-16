<template>
    <div class="singer-detail">
        i am singer-detail
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'singer'
        ])
    },
    created() {
        console.log(this.singer)
    }
}

</script>

<style lang='stylus' scoped>

</style>
