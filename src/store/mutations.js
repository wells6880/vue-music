import * as types from './mutation-types'

const mutations = {
    [types.SET_SINGER](state,singer){
        state.singer = singer
        console.log('state.singer',state.singer)
    }
}

export default mutations