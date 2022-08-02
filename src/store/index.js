import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

import { apiKey } from "@/api";
import { getDataURL } from "@/api";
import { requestOptions } from "@/api";
import { deleteRequestOptions } from "@/api";

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
    recommendations: null,
    inputCharacter: "",
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
    getRecommendations(state) {
      return state.recommendations;
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
      return await fetch(getDataURL + "/" + houseId, deleteRequestOptions)
        .then((response) => response.text())
        .then((result) => {
          window.location.href = "/";
          console.log(dispatch, "response", result);
        })
        .catch((error) => console.log("error", error));
    },
    //Set house displayed on <HouseDetailView/> component
    setHouse(state, house) {
      let newHouse = state.houses.find((el) => Number(el.id) === Number(house));

      //clear the current house
      if (state.house) {
        state.house = null;
      }
      //and attach a new house
      state.house = newHouse;
    },
    sortByPrice(state) {
      state.houses.sort((a, b) => (a["price"] > b["price"] ? 1 : -1));
    },
    sortBySize(state) {
      state.houses.sort((a, b) => (a["size"] > b["size"] ? 1 : -1));
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
    setRecommendations(state) {
      //Exclude the current displayed house
      let filteredHouses = state.houses.filter((el) => el !== state.house);

      //Get 3 random items
      let shuffled = [...filteredHouses].sort(() => 0.5 - Math.random());
      state.recommendations = shuffled.slice(0, 3);
    },
  },

  actions: {
    async getHouses({ commit }) {
      await fetch(getDataURL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          commit("setHouses", result);
          console.log("getHouses", result);
        })
        .catch((error) => console.log("error", error));
    },

    newHouse({ commit }, data) {
      console.log(commit, "response", data);
      return axios({
        method: "POST",
        url: getDataURL,
        headers: {
          "X-Api-Key": apiKey,
        },
        data,
      });
    },

    updateHouse({ commit }, data) {
      console.log(commit, "response update", data);
      return axios({
        method: "POST",
        url: getDataURL + "/" + data.id,
        headers: {
          "X-Api-Key": apiKey,
        },
        data,
      });
    },

    //Select a specific house based on id
    getHouseById({ commit, state }, houseId) {
      state.houses.find((house) => {
        if (house.id === houseId) {
          //Split the 'street' string and assign new values for street_name,
          //house_number and numberAddition properties
          let splittedStreet = house.location.street.split(" ");
          let houseInfo = splittedStreet.pop();
          let street_name = splittedStreet.join(" ");
          let splittedHouseInfo = houseInfo.split(/-(.*)/s);

          let [house_number, numberAddition] = ["", ""];
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

          commit("setHouseById", house);
        }
      });
    },
    setHouse({ commit }, houseId) {
      commit("setHouse", houseId);
    },

    setRecommendations({ commit }) {
      commit("setRecommendations");
    },
    delete({ commit }, houseId) {
      commit("delete", houseId);
    },
    toggleClassHome(context) {
      context.commit("toggleClassHome");
    },
    toggleClassAbout(context) {
      context.commit("toggleClassAbout");
    },
  },
  modules: {},
});
