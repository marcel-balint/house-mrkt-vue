import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import axios from 'axios';

const getDataURL = 'https://api.intern.d-tt.nl/api/houses';
const myHeaders = new Headers();
myHeaders.append('X-Api-Key', 'GJXtOHyT8QP352l6BZgxY41dmMojFW_N');

const requestOptions = {
	headers: myHeaders,
};
const deleteRequestOptions = {
	method: 'DELETE',
	headers: myHeaders,
};

export default createStore({
	//Keep vuex data on page refresh
	plugins: [
		createPersistedState({
			storage: window.sessionStorage,
		}),
	],
	state: {
		houses: [],
		house: null,
		recomandations: null,
		inputCharacter: '',
		navLinksActiveClass: {
			home: true,
			about: false,
		},
	},

	getters: {
		getStateHouses(state) {
			return state.houses;
		},
		getHouse(state) {
			return state.house;
		},
		getRecomandations(state) {
			return state.recomandations;
		},
		getInputCharacter(state) {
			return state.inputCharacter;
		},
		getHome(state) {
			return state.navLinksActiveClass.home;
		},
		getAbout(state) {
			return state.navLinksActiveClass.about;
		},
	},
	mutations: {
		setHouseById(state, house) {
			state.house = house;
		},
		setHouses(state, houses) {
			state.houses = houses;
		},
		createNewHouse(headers) {
			axios.post(getDataURL, headers);
		},

		async delete({ dispatch }, houseId) {
			console.log('THE ID', houseId);
			return await fetch(getDataURL + '/' + houseId, deleteRequestOptions)
				.then(response => response.text())
				.then(result => {
					window.location.href = '/';
					console.log(dispatch, 'response', result);
					console.log(result);
				})
				.catch(error => console.log('error', error));
		},
		//Set a house displayed on <HouseDetailView/>
		setHouse(state, house) {
			console.log({ house });
			let newHouse = state.houses.find(
				el => Number(el.id) === Number(house)
			);
			console.log({ newHouse });
			//clear the current house
			if (state.house) {
				state.house = null;
			}
			//and attach a new house
			state.house = newHouse;
		},
		updateMessageSearch(state, message) {
			state.inputCharacter = message;
		},
		toggleClassHome(state) {
			state.navLinksActiveClass.home = true;
			state.navLinksActiveClass.about = false;
		},
		toggleClassAbout(state) {
			state.navLinksActiveClass.about = true;
			state.navLinksActiveClass.home = false;
		},
		getRecomandation(state) {
			//Exclude the current displayed house
			let filteredHouses = state.houses.filter(el => el !== state.house);

			//Get 3 random items
			let shuffled = [...filteredHouses].sort(() => 0.5 - Math.random());
			state.recomandations = shuffled.slice(0, 3);
		},
	},

	actions: {
		async getHouses({ commit }) {
			fetch(getDataURL, requestOptions)
				.then(response => response.json())
				.then(result => {
					commit('setHouses', result);
					console.log(result);
				})
				.catch(error => console.log('error', error));
		},

		newHouse({ commit }, data) {
			console.log(commit, 'response', data);
			return axios({
				method: 'POST',
				url: getDataURL,
				headers: {
					'X-Api-Key': 'GJXtOHyT8QP352l6BZgxY41dmMojFW_N',
				},
				data,
			});
		},

		updateHouse({ commit }, data) {
			console.log(commit, 'response', data);
			return axios({
				method: 'POST',
				url: getDataURL + '/' + data.id,
				headers: {
					'X-Api-Key': 'GJXtOHyT8QP352l6BZgxY41dmMojFW_N',
				},
				data,
			});
		},

		//Select a specific house based on id
		getHouseById({ commit, state }, houseId) {
			state.houses.find(house => {
				if (house.id === houseId) {
					let splittedStreet = house.location.street.split(' ');
					let houseInfo = splittedStreet.pop();
					let street_name = splittedStreet.join(' ');
					let splittedHouseInfo = houseInfo.split('-');

					let [house_number, numberAddition] = ['', ''];
					if (splittedHouseInfo.length > 1) {
						[house_number, numberAddition] = splittedHouseInfo;
					} else {
						house_number = splittedHouseInfo[0];
					}
					street_name = street_name.trim();
					house_number = house_number.trim();
					numberAddition = numberAddition.trim();
					house.location.street_name = street_name;
					house.location.house_number = house_number;
					house.location.numberAddition = numberAddition;

					commit('setHouseById', house);
				}
			});
		},

		setHouse({ commit }, houseId) {
			commit('setHouse', houseId);
		},

		getRecomandation({ commit }) {
			commit('getRecomandation');
		},
		delete({ commit }, houseId) {
			commit('delete', houseId);
		},
		toggleClassHome(context) {
			context.commit('toggleClassHome');
		},
		toggleClassAbout(context) {
			context.commit('toggleClassAbout');
		},
	},
	modules: {},
});
