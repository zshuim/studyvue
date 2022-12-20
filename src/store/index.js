import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginUserInfo: {},
        sideRoute: {},
        cancelAxios: null // 终止axios请求
    },

    mutations: {
        setUserINfo(state, userInfo) {
            state.loginUserInfo = userInfo;
        },
        setSideRoute(state, sideRoute) {
            this.state.sideRoute = sideRoute;
        },
        setCancelAxios(state, n) {
            state.cancelAxios = n
        },
        consol_state(state) {
            console.log(state);
        },
    },

    actions: {
        setCancelAxios({ commit }, n) {
            commit('setCancelAxios', n)
        },
        setUserINfoAsync(context, userInfo) {
            context.commit('setUserINfo', userInfo);
        },
        setSideRouteAsync(context, sideRoute) {
            context.commit('setSideRoute', sideRoute);
        },
    },

    getters : {},

})

