<template>
  <div class="container-home">
    <div class="container-body">
      <div class="box-top">
        <div class="box-top-upper">
          <h1 class="home-title">Houses</h1>
          <router-link to="/house/add">
            <img
              class="add-listingbtn-mobile"
              src="../assets/images/ic_plus_grey.png"
            />
          </router-link>

          <router-link to="/house/add" class="create-new">
            <img
              :src="require('../assets/images/ic_plus_white.png')"
              alt="create"
            />Create new</router-link
          >
        </div>
        <div class="box-top-lower">
          <form>
            <div class="form-input">
              <img
                :src="require('../assets/images/ic_search.png')"
                alt="search icon"
                class="search-icon"
              />
              <input
                type="search"
                v-model="inputCharacter"
                class="search-box"
                placeholder="Search for a house"
              />
              <img
                v-if="inputCharacter"
                :src="require('../assets/images/ic_clear.png')"
                alt="clear icon"
                class="clear-icon"
              />
            </div>
          </form>

          <div class="filter-btns">
            <button
              class="filter-btn-price"
              :class="priceActive ? 'active' : ''"
              @click="
                sortByPrice();
                activePrice();
              "
            >
              Price</button
            ><button
              class="filter-btn-size"
              :class="sizeActive ? 'active' : ''"
              @click="
                sortBySize();
                activeSize();
              "
            >
              Size
            </button>
          </div>
        </div>
      </div>
      <HousesComponent />
    </div>
  </div>
</template>

<script>
import HousesComponent from "../components/HousesComponent.vue";
import { mapMutations } from "vuex";

export default {
  data() {
    return { priceActive: true, sizeActive: false };
  },
  computed: {
    inputCharacter: {
      get() {
        return this.$store.state.inputCharacter;
      },

      set(value) {
        this.$store.commit("updateMessageSearch", value);
      },
    },
  },

  methods: {
    activePrice() {
      this.priceActive = true;
      this.sizeActive = false;
    },
    activeSize() {
      this.sizeActive = true;
      this.priceActive = false;
    },
    updateMessageSearch(e) {
      this.$store.commit("updateMessageSearch", e.target.value);
    },
    ...mapMutations(["sortByPrice", "sortBySize"]),
  },

  components: { HousesComponent },
};
</script>
<style scoped>
.active {
  background-color: #eb5440 !important;
}
/******** Montserrat font *****/
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");

* {
  font-family: "Montserrat";
}
.container-home {
  background-color: #f6f6f6;
  height: 100%;
  padding-bottom: 40px;
}
.container-body {
  width: 70%;
  margin: 0 auto;
}

.box-top {
  padding-top: 50px;
}

/*--- Removed the margin between navbar
      and container created by h1       ---*/
.home-title {
  margin-top: 0;
  padding-top: 13px;
  font-size: 32px;
}
.box-top-upper {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 30px;
}
.box-top-lower {
  display: flex;
  justify-content: space-between;
  padding-bottom: 25px;
}
.create-new {
  width: 215px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eb5440;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 600;
  border-radius: 10px;
}
.create-new img {
  width: 20px;
  height: 20px;
  margin-right: 16px;
}
/*---    Input field styles   ---*/
.form-input {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-input .search-icon {
  position: absolute;
  left: 25px;
  width: 20px;
}

.form-input .clear-icon {
  position: absolute;
  right: 20px;
  width: 20px;
  cursor: pointer;
}

.search-box {
  border: none;
  outline: none;
  background-color: #e8e8e8;
  width: 500px;
  height: 50px;
  border-radius: 10px;
}
.search-box::placeholder {
  color: #c3c3c3;
  font-size: 14px;
}
.form-input input[type="search"] {
  padding-left: 55px;
}

input::-webkit-search-cancel-button {
  background-color: transparent;
  -webkit-appearance: none;
  height: 30px;
  width: 30px;
  cursor: pointer;
  margin-right: 17px;
  border-radius: 50%;
  z-index: 1;
}

/*---    Filter buttons styles   ---*/
.filter-btns {
  position: relative;
  width: 350px;
  height: 50px;
  display: flex;
}

.filter-btn-price,
.filter-btn-size {
  width: 50%;
  border: none;
  background-color: #c3c3c3;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
}
.filter-btn-price {
  border-radius: 10px 0px 0px 10px;
}
.filter-btn-size {
  border-radius: 0px 10px 10px 0px;
}

/*---    Media Queries   ---*/

@media (max-width: 1500px) {
  .search-box {
    width: 450px;
  }
  .filter-btns {
    width: 300px;
  }
  .create-new {
    width: 190px;
  }
  .create-new img {
    margin-right: 10px;
    font-size: 17px;
  }
}
@media (max-width: 1300px) {
  .home-title {
    font-size: 31px;
  }
  .search-box {
    width: 375px;
  }
  .filter-btns {
    width: 250px;
  }
  .create-new {
    width: 170px;
    font-size: 17px;
  }
  .create-new img {
    margin-right: 5px;
  }
}

@media (max-width: 1000px) {
  .home-title {
    font-size: 30px;
  }
  .search-box {
    width: 330px;
  }
  .filter-btns {
    width: 210px;
  }
  .create-new {
    width: 150px;
    font-size: 15px;
  }
  .create-new img {
    margin-right: 6px;
    width: 19px;
    height: 19px;
  }
}

@media (max-width: 950px) {
  .home-title {
    font-size: 29px;
  }
  .search-box {
    height: 45px;
  }
  .form-input .search-icon {
    left: 20px;
    width: 17px;
  }
  .create-new {
    height: 45px;
  }
  .create-new img {
    width: 17px;
  }
  .filter-btns {
    height: 45px;
  }
}

@media (max-width: 870px) {
  .search-box {
    width: 310px;
  }
}
@media (max-width: 850px) {
  .home-title {
    font-size: 28px;
  }
  .search-box {
    width: 270px;
  }
  .create-new {
    font-size: 14px;
  }
  .create-new img {
    margin-right: 8px;
  }
  .filter-btns {
    width: 190px;
  }
}

@media (max-width: 730px) {
  .container-body {
    width: 75%;
  }
  .box-top {
    padding-top: 35px;
  }
  .box-top-lower {
    padding-bottom: 10px;
  }
  .home-title {
    font-size: 26px;
  }
  .form-input input[type="search"] {
    padding-left: 45px;
  }
  .search-box {
    width: 270px;
  }
  .filter-btns {
    width: 170px;
  }
  .create-new {
    width: 140px;
    font-size: 13px;
  }
  .create-new img {
    margin-right: 4px;
    height: 17px;
  }
  .filter-btn-price,
  .filter-btn-size {
    font-size: 17px;
  }
}
@media (max-width: 630px) {
  .container-body {
    margin-bottom: 70px;
  }
  .create-new {
    display: none;
  }
  .box-top-upper {
    align-items: center;
    padding-bottom: 20px;
  }
  .home-title {
    margin: auto;
    padding-top: 0px;
  }
  .add-listingbtn-mobile {
    width: 30px;
  }
  .form-input {
    width: auto;
  }
  .search-box {
    width: 495px;
  }
  .box-top-lower {
    flex-direction: column;
    height: 135px;
    justify-content: space-around;
  }
  .filter-btns {
    width: auto;
  }
}
@media (max-width: 630px) {
  .container-body {
    width: 80%;
  }
}

@media (max-width: 530px) {
  .container-body {
    width: 90%;
  }
  .home-title {
    font-size: 18px;
  }
  .filter-btn-price {
    border-radius: 5px 0px 0px 5px;
  }
  .filter-btn-size {
    border-radius: 0px 5px 5px 0px;
  }
  .filter-btn-price,
  .filter-btn-size {
    font-size: 12px;
  }
  .search-box,
  .filter-btns {
    height: 40px;
  }
  .box-top-lower {
    height: 120px;
  }
  .form-input {
    font-size: 12px;
  }
  .form-input input {
    border-radius: 7px;
  }
  .add-listingbtn-mobile {
    width: 25px;
  }
}

@media (max-width: 380px) {
  .box-top {
    padding-top: 30px;
  }
  .search-box,
  .filter-btns {
    height: 35px;
  }
  .box-top-lower {
    height: 115px;
  }
}

@media (min-width: 630px) {
  .add-listingbtn-mobile {
    display: none;
  }
}
</style>
