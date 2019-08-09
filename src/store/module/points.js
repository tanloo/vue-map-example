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
        commit("setPoiPoints", points)
    },
    setMainPoint({
        commit
    }, point) {
        commit("setMainPoint", point);
    }
}

export default {
    state,
    mutations,
    actions
}