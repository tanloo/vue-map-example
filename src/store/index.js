import Vue from 'vue';
import Vuex from 'vuex';
import points from './module/points';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        points
    }
})