const state = {
    mainPoint: null,
    poiPoints: null
};

const mutations = {
    setMainPoint(state, point) {
        state.mainPoint = point;
    },
    setPoiPoints(state, points) {
        state.poiPoints = points;
    }
}

const actions = {
    setPOI({
        commit
    }, points) {
        //funnyapi.search_poi(points => commit("setPoiPoints", points), params);
        commit("setPoiPoints", points)
    },
    setMainPoint({
        commit
    }, point) {
        //funnyapi.gis(point => commit("setMainPoint", point), params);
        commit("setMainPoint", point);
    }
}

export default {
    state,
    mutations,
    actions
}