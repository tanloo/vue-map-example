import Vue from 'vue'
import Router from 'vue-router'
import TMap from './components/views/TmapView';
import infoView from './components/views/InfoView';
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
            component: infoView
        }
    ]
})