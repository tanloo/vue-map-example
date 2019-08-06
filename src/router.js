import Vue from 'vue'
import Router from 'vue-router'
import TMap from './components/views/tmapView';
Vue.use(Router);

export default new Router({
    routes: [{
        path: "/tmap",
        name: "tmap",
        component: TMap
    }]
})