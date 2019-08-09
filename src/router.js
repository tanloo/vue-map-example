import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
const TMapView = () => import('./components/views/mapViews/TmapView');
const InfoView = () => import('./components/views/infoView/InfoView');
const LeafletView = () => import('./components/views/mapViews/LeafletView');
const BMapView = () => import('./components/views/mapViews/BmapView');
export default new Router({
    routes: [{
            path: "/tmap",
            name: "tmap",
            component: TMapView
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
        },
        {
            path: "/bmap",
            name: "bamp",
            component: BMapView
        }
    ]
})