import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    count: 0,
}

const mutations = {
    add(state) {
        state.count++;
    },
    jian(state) {
        state.count--;
    }
}

const getters = {
    count({ state }) {
        return state.count;
    }
}

const actions = {
    actionAdd({ commit }) {
        setTimeout(() => {
            commit('add');
        });
    },
    actionjian({ commit }) {
        setTimeout(() => {
            commit('jian');
        }, 1000)
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})

export default store;