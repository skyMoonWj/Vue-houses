import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

var state = {
	houses:[],
	house:{},
	options:['','','','','']
}

var mutations = {
	choseHouses(state,houses){
		state.houses = houses
	},
	choseHouse(state,house){
		state.house = house
	},
	choseOptions(state,options){
		state.options[options.optionsNum]=options.value
	}
}

var actions = {
	choseHouses({commit}){
		commit('choseHouses')
	},
	choseHouse({commit}){
		commit('showDetail')
	},
	choseOptions({commit}){
		commit('choseOptions')
	}
}

var getters = {
	houses(state){
		return state.houses
	},
	house(state){
		return state.house
	},
	options(state){
		return state.options
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
