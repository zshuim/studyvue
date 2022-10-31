import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginUserInfo: {},
        sideroute: {},
    },

    mutations: {
        setUserINfo(state,userInfo) {
            state.loginUserInfo = userInfo;
        },
        setSideRoute(state, sideRoute) {
            this.state.sideRoute = sideRoute;
        },
        consol_state(state) {
            console.log(state);
        },
    },

    actions: {
        setUserINfoAsync(context, userInfo) {
            context.commit('setUserINfo', userInfo);
        },
        setSideRouteAsync(context, sideRoute) {
            context.commit('setSideRoute', sideRoute);
        },
    },

    getters : {},

})

