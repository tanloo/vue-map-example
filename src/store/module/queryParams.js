const state = {
    keyword: "",
    lon: null,
    lat: null,
    num: 20
}

const mutations = {
    setParams(state, params) {
        state.keyword = params.keyword;
        state.lon = params.lon;
        state.lat = params.lat;
        state.num = params.num;
    },
    resetParams(state) {
        state.keyword = "";
        state.lon = null;
        state.lat = null;
        state.num = 20;
    }
}

const actions = {
    setParams({
        commit
    }, params) {
        commit("setParams", params);
    },
    resetParams({
        commit
    }) {
        commit("resetParams");
    }
}

export default {
    state,
    mutations,
    actions
}