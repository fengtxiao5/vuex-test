import {createStore, createLogger} from "vuex";
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
    allCards:[
        // {
        //     name:'1.png',
        //     number:'1',
        //     status:'1', 0-反面 1-正面 2 不展示
        // }
    ],
    currentCard: null,
    needReverse: null,
    reversing: false,
}



export default createStore({
    state,
    getters,
    actions,
    mutations,
    plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : []
})




