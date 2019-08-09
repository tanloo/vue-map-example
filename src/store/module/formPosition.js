const state = {
    lng: 121.48926,
    lat: 31.23149,
}

const mutations = {
    setFormPosition(state, position) {
        state.lng = position.lng;
        state.lat = position.lat;
    }
}

const actions = {
    setFormPosition({
        commit
    }, position) {
        commit("setFormPosition", position);
    }
}

export default {
    state,
    mutations,
    actions
}