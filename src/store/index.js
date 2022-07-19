import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import axios from "axios";

const getDataURL = "https://api.intern.d-tt.nl/api/houses";
const headers = {
  "X-Api-Key": "GJXtOHyT8QP352l6BZgxY41dmMojFW_N",
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

    delete({ dispatch }, houseId) {
      console.log("idddddddddss", houseId);
      return axios
        .delete(getDataURL + "/" + houseId, {
          headers,
        })
        .then((response) => {
          // this.$router.push("/");
          window.location.href = "/";
          console.log(dispatch, "response", response);
          // dispatch("getHouses");
          console.log(JSON.stringify(response.data));
          response.status(200).end();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    displayRecomanded(state, house) {
      let newHouse = state.houses.find((el) => el.id === house);
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
      let filteredHouse = state.houses.filter((el) => el !== state.house);

      //Get 3 random items
      filteredHouse.sort(() => {
        Math.random() - Math.random();
      });
      state.recomandations = filteredHouse.slice(0, 3);
    },
  },

  actions: {
    async getHouses({ commit }) {
      await axios
        .get(getDataURL, { headers })
        .then((response) => {
          commit("setHouses", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    //Select a specific house based on id
    getHouseById({ commit, state }, houseId) {
      state.houses.find((house) => {
        if (house.id === houseId) {
          commit("setHouseById", house);
        }
      });
    },

    displayRecomandedHouse({ commit }, houseId) {
      commit("displayRecomanded", houseId);
    },

    getRecomandation({ commit }) {
      commit("getRecomandation");
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
