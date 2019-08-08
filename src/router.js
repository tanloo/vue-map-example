import Vue from 'vue'
import Router from 'vue-router'
import TMap from './components/views/TmapView';
import InfoView from './components/views/InfoView';
import LeafletView from './components/views/LeafletView';
Vue.use(Router);

export default new Router({
    routes: [{
            path: "/tmap",
            name: "tmap",
            component: TMap
        },
        {
            path: "/info",
            name: "info",
            component: InfoView
        },
        {
            path: "/lmap",
            name: "lmap",
            component: LeafletView
        }
    ]
})