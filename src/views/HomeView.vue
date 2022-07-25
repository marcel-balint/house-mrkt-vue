<template>
  <div class="container-home">
    <div class="container-body">
      <div class="box-top">
        <div class="box-top-upper">
          <h1 class="home-title">Houses</h1>
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
            <button class="filter-btn-price">Price</button
            ><button class="filter-btn-size">Size</button>
          </div>
        </div>
      </div>
      <HousesComponent />
    </div>
  </div>
</template>

<script>
import HousesComponent from "../components/HousesComponent.vue";
export default {
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
    updateMessageSearch(e) {
      this.$store.commit("updateMessageSearch", e.target.value);
    },
  },

  components: { HousesComponent },
};
</script>
<style scoped>
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
}
.box-top-upper {
  display: flex;
  justify-content: space-between;
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
  background-color: #eb5440;
}
.filter-btn-size {
  border-radius: 0px 10px 10px 0px;
}
</style>
